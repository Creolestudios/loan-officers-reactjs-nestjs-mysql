import {
  Injectable,
  HttpException,
  HttpStatus,
  BadRequestException,
  BadGatewayException,
  NotFoundException,
  HttpService,
} from '@nestjs/common';
import { Repository, Not, IsNull, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { GlobalResponseType } from 'src/utils/types';
import {
  ResponseMap,
  SuccessMessage,
  PaymentFor,
  UserRole,
  VALIDATION_MSG,
  Invitation_send,
  BrandedApp_Approved_Status,
  Recurring_Term,
  Billing_Status,
  CurrentCountryData,
  SubscriptionType,
  Playstore_Status,
  Branded_App_Status,
  Activity_Category,
  Discount_Type,
  QRCODE_DEFULT_SIZES,
  ColorSchemaArrayDefault,
} from 'src/utils/constant';
import { Subscription_Plans } from 'src/shared/entity/subscription_plans.entity';
import {
  AddLODto,
  SubscriptionDto,
  PromocodeDto,
  BrandedAppApplyDto,
  BrandedAppSubscriptionDto,
} from 'src/dto/subscription.dto';
import { Users } from 'src/shared/entity/users.entity';
import { Billing_Details } from 'src/shared/entity/billing_details.entity';

import { Loan_Officers_Details } from 'src/shared/entity/loan_officers_details.entity';
import { Branded_App_Users } from 'src/shared/entity/branded_app_users.entity';
import { Branded_App_Info } from 'src/shared/entity/branded_app_info.entity';
import { Promo_Codes } from 'src/shared/entity/promo_codes.entity';
import { Future_Promo_Codes } from 'src/shared/entity/future_promo_codes.entity';
import {
  addDeepLinkBranch,
  createQrCode,
  isValidPromocodeForUser,
  momentDateJsConvert,
  RevokeAccess,
} from 'src/utils/functions';
import { isEmpty, round } from 'lodash';
import { Recent_Activity } from 'src/shared/entity/recent_activity.entity';
import stripe from 'src/utils/stripe.utils';
import Stripe from 'stripe';
import { removeImageToS3 } from 'src/utils/helper';
@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Loan_Officers_Details)
    private loanOfficersDetailsRepository: Repository<Loan_Officers_Details>,
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    @InjectRepository(Billing_Details)
    private billingDetailsRepository: Repository<Billing_Details>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(Branded_App_Users)
    private brandedAppUserRepository: Repository<Branded_App_Users>,
    @InjectRepository(Branded_App_Info)
    private brandedAppInfoRepository: Repository<Branded_App_Info>,
    @InjectRepository(Promo_Codes)
    private promoCodeRepository: Repository<Promo_Codes>,
    @InjectRepository(Subscription_Plans)
    private subscriptionPlanRepository: Repository<Subscription_Plans>,
    @InjectRepository(Future_Promo_Codes)
    private futurePromoCodeRepository: Repository<Future_Promo_Codes>,
    private readonly httpService: HttpService,
  ) {}

  async createSubscriptionForLO(user: Users, subscriptionDto: SubscriptionDto): GlobalResponseType {
    try {
      const loDetails = await this.loanOfficersDetailsRepository.findOne({
        where: {
          user_id: user.id,
          deleted_at: IsNull(),
        },
      });

      if (!loDetails) {
        throw new NotFoundException(VALIDATION_MSG.lo_not_exist);
      }

      const subscription = await this.subscriptionPlanRepository.findOne({
        where: {
          id: subscriptionDto.plan_id,
          deleted_at: IsNull(),
        },
      });

      if (!subscription) {
        throw new NotFoundException(VALIDATION_MSG.subscription_plan_not_exits);
      }

      const billing = await this.billingDetailsRepository.findOne({
        where: {
          user_id: user.id,
          subscription_plan_id: subscription.id,
          payment_for: PaymentFor.signUpSubscription,
          stripe_customer_status: null,
          deleted_at: IsNull(),
          credits_id: IsNull(),
        },
      });

      const creditsHistory = await Billing_Details.createQueryBuilder('credit_history')
        .innerJoin('credits', 'credits', 'credits.id = credit_history.credits_id')
        .where(
          'credit_history.user_id = :userId AND credit_history.payment_for = :standard AND credit_history.stripe_customer_status IS NULL AND credit_history.recurring_subscription IS NULL AND credit_history.deleted_at IS NULL',
          {
            userId: user.id,
            standard: PaymentFor.signUpSubscription,
          },
        )
        .select(['credit_history.id AS id', 'credit_history.expiry_at AS expiry_at', 'credits.id AS user_id'])
        .getRawOne();

      // Subscription exists
      if (billing) {
        throw new BadRequestException(VALIDATION_MSG.subscription_exits);
      }

      let promoCode;
      if (subscriptionDto?.promo_code) {
        promoCode = await this.promoCodeRepository.findOne({
          where: {
            promo_code: subscriptionDto.promo_code,
            deleted_at: IsNull(),
          },
        });

        if (!promoCode) {
          throw new BadGatewayException(VALIDATION_MSG.promo_code_not_found);
        }

        if (promoCode) {
          if (moment(promoCode.end_date).isBefore(moment())) {
            throw new BadGatewayException(VALIDATION_MSG.promoCode_expired);
          }
          if (!(await isValidPromocodeForUser(user, promoCode.id))) {
            throw new BadGatewayException(VALIDATION_MSG.promoCode_cannot_use);
          }
        }
      }
      if (!promoCode) {
        let usersfutureCode = await this.futurePromoCodeRepository.findOne({
          where: {
            user_id: user,
            used_on: IsNull(),
            deleted_at: IsNull(),
          },
          order: {
            id: 'DESC',
          },
        });
        if (usersfutureCode && moment(usersfutureCode.end_date).isAfter(moment())) {
          promoCode = await this.promoCodeRepository.findOne({
            where: {
              id: usersfutureCode.promo_code_id,
              deleted_at: IsNull(),
            },
          });
          if (promoCode) {
            if (!(await isValidPromocodeForUser(user, promoCode.id))) {
              promoCode = undefined;
            }
            usersfutureCode.used_on = new Date();
            usersfutureCode.deleted_at = new Date();
            await usersfutureCode.save();
          }
        }
      }

      const cardToken = await stripe.tokens.create({
        card: {
          number: subscriptionDto.card_number,
          exp_month: subscriptionDto.exp_month.toString(),
          exp_year: subscriptionDto.exp_year.toString(),
          cvc: subscriptionDto.cvv,
          address_line1: subscriptionDto.billing_address,
          address_zip: subscriptionDto.zip_code,
          address_city: subscriptionDto.city,
          address_state: subscriptionDto.state,
          address_country: CurrentCountryData.code,
        },
      });

      const customerData = await this.retrieveCustomerOrCreateNew(user, subscriptionDto, loDetails);

      await stripe.customers.createSource(customerData.id, {
        source: cardToken.id,
      });

      let subtractAmount;

      if (promoCode && Discount_Type[promoCode.discount_type]) {
        //for percentage
        if (promoCode.discount_type === 0) {
          subtractAmount = (subscription.plan_fees / 100) * promoCode.discount;
        }
        //for flatDiscount
        else if (promoCode.discount_type === 1) {
          subtractAmount = promoCode.discount;
        }
      }

      const transactionDetails = await stripe.charges.create({
        description: subscription?.plan_name,
        amount: subtractAmount
          ? round(round(subscription.plan_fees - subtractAmount, 2) * 100, 2)
          : round(round(subscription.plan_fees, 2) * 100, 2),
        currency: CurrentCountryData.currency,
        customer: customerData.id,
      });

      const billingDetails = new Billing_Details();
      billingDetails.user_id = loDetails.user_id;
      billingDetails.subscription_plan_id = subscription.id;
      billingDetails.payment_for = PaymentFor.signUpSubscription;

      if (promoCode) {
        billingDetails.promo_code = promoCode.promo_code;
        billingDetails.promo_code_id = promoCode.id;
        billingDetails.actual_amount = subscription.plan_fees;
        billingDetails.discounted_amount = subtractAmount;
        billingDetails.amount_paid = round(subscription.plan_fees - subtractAmount, 2);
      } else {
        billingDetails.promo_code = null;
        billingDetails.promo_code_id = null;
        billingDetails.actual_amount = subscription.plan_fees;
        billingDetails.discounted_amount = 0;
        billingDetails.amount_paid = round(subscription.plan_fees, 2);
      }

      billingDetails.payment_method = 'Stripe';
      billingDetails.transaction_details = JSON.stringify(transactionDetails);
      billingDetails.transaction_id = transactionDetails?.balance_transaction as string;

      let recurring_subscription = 1;
      Object.keys(Recurring_Term).forEach(key => {
        if (Recurring_Term[key] === subscription.duration) {
          recurring_subscription = +key;
        }
      });

      billingDetails.recurring_subscription = recurring_subscription;
      billingDetails.status = 1;
      billingDetails.stripe_customer_status = null;
      // Month and Year only for recurring
      if (creditsHistory) {
        billingDetails.expiry_at = momentDateJsConvert(recurring_subscription, creditsHistory.expiry_at).endOf('day').toDate();
      } else {
        billingDetails.expiry_at = momentDateJsConvert(recurring_subscription).endOf('day').toDate();
      }
      await billingDetails.save();

      loDetails.stripe_customer_id = customerData.id;
      loDetails.status = 2;
      await loDetails.save();

      return ResponseMap({
        message: SuccessMessage.subscibe_completed,
        customer_id: customerData.id,
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async retrieveCustomerOrCreateNew(
    user: Users,
    subscriptionDto: SubscriptionDto,
    loDetails: Loan_Officers_Details,
  ): Promise<Stripe.Customer | Stripe.DeletedCustomer> {
    try {
      let customer: Stripe.Customer | Stripe.DeletedCustomer;
      if (loDetails?.stripe_customer_id) {
        customer = await stripe.customers.retrieve(loDetails?.stripe_customer_id);
      } else {
        const customerParams = {
          email: user.email,
          name: user.first_name + ' ' + user.last_name,
          address: {
            line1: subscriptionDto.billing_address,
            postal_code: subscriptionDto.zip_code,
            city: subscriptionDto.city,
            state: subscriptionDto.state,
            country: 'US',
          },
        };
        customer = await stripe.customers.create(customerParams);
      }

      return customer;
    } catch (error) {
      console.log(error);
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getBillingDeatilsForPayment(user: Users): GlobalResponseType {
    try {
      let paymentObj = {};
      const billingDetails = await this.brandedAppUserRepository.findOne({
        where: {
          loan_officer_id: user.id,
          deleted_at: null,
        },
        order: {
          id: 'DESC',
        },
      });

      if (!billingDetails) {
        throw new BadGatewayException(VALIDATION_MSG.billingDetails_not_fount);
      }
      paymentObj['subscription fees'] = billingDetails.subscription_amount;
      paymentObj['Taxes'] = billingDetails.taxes;
      paymentObj['Additional charges'] = billingDetails.additional_charges;
      paymentObj['Total amount'] = round(
        billingDetails.subscription_amount + billingDetails.taxes + billingDetails.additional_charges,
        2,
      );

      return ResponseMap(
        {
          payment_details: paymentObj,
        },
        'success',
      );
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createSubscriptionForBrandedApp(user: Users, subscriptionDto: BrandedAppSubscriptionDto): GlobalResponseType {
    try {
      const brandedAppUserDetails = await this.brandedAppUserRepository.findOne({
        where: {
          loan_officer_id: user.id,
          status: In([BrandedApp_Approved_Status.active, BrandedApp_Approved_Status.expired]),
          deleted_at: IsNull(),
        },
        order: {
          id: 'DESC',
        },
      });

      if (!brandedAppUserDetails) {
        throw new BadGatewayException(VALIDATION_MSG.brandedApp_not_apply);
      }

      const loDetails = await this.loanOfficersDetailsRepository.findOne({
        where: {
          user_id: user.id,
          deleted_at: IsNull(),
        },
      });
      if (!loDetails) {
        throw new BadGatewayException(VALIDATION_MSG.lo_not_exist);
      }

      const coBrandedUsers = await this.userRepository.find({
        where: {
          parent_id: user.id,
          role: 5,
          deleted_at: IsNull(),
        },
      });

      const billingData = await this.billingDetailsRepository.findOne({
        where: {
          payment_for: PaymentFor.signUpSubscription,
          user_id: user.id,
          deleted_at: IsNull(),
        },
      });

      if (!billingData) {
        throw new BadRequestException(VALIDATION_MSG.signup_subscription_not_exits);
      }

      const billing = await this.billingDetailsRepository.findOne({
        where: {
          user_id: user.id,
          payment_for: PaymentFor.brandedAppSubscription,
          credits_id: IsNull(),
          stripe_customer_status: null,
          deleted_at: null,
        },
        order: {
          id: 'DESC',
        },
      });

      if (billing) {
        throw new BadRequestException(VALIDATION_MSG.subscription_exits);
      }

      const cardToken = await stripe.tokens.create({
        card: {
          number: subscriptionDto.card_number,
          exp_month: subscriptionDto.exp_month.toString(),
          exp_year: subscriptionDto.exp_year.toString(),
          cvc: subscriptionDto.cvv,
          address_line1: subscriptionDto.billing_address,
          address_zip: subscriptionDto.zip_code,
          address_city: subscriptionDto.city,
          address_state: subscriptionDto.state,
          address_country: CurrentCountryData.code,
        },
      });

      await stripe.customers.retrieve(loDetails.stripe_customer_id);
      await stripe.customers.createSource(loDetails.stripe_customer_id, {
        source: cardToken.id,
      });
      const total = round(
        round(
          brandedAppUserDetails.additional_charges +
            brandedAppUserDetails.taxes +
            brandedAppUserDetails.subscription_amount,
          2,
        ) * 100,
        2,
      );

      const transactionDetails = await stripe.charges.create({
        description: 'Plan Test',
        amount: total,
        currency: CurrentCountryData.currency,
        customer: loDetails.stripe_customer_id,
      });

      const billingDetails = new Billing_Details();
      billingDetails.user_id = loDetails.user_id;
      billingDetails.branded_user_id = brandedAppUserDetails.id;
      billingDetails.subscription_plan_id = billingData.subscription_plan_id;
      billingDetails.payment_for = PaymentFor.brandedAppSubscription;
      billingDetails.payment_method = 'Stripe';
      billingDetails.transaction_details = JSON.stringify(transactionDetails);
      billingDetails.transaction_id = transactionDetails?.balance_transaction as string;
      billingDetails.actual_amount = brandedAppUserDetails.subscription_amount;
      billingDetails.discounted_amount = 0;
      billingDetails.amount_paid =
        brandedAppUserDetails.subscription_amount +
        brandedAppUserDetails.taxes +
        brandedAppUserDetails.additional_charges;
      // Annual Branded App Subscription
      billingDetails.recurring_subscription = 5;
      billingDetails.expiry_at = momentDateJsConvert(billingDetails.recurring_subscription).endOf('day').toDate();
      billingDetails.status = 1;
      billingDetails.stripe_customer_status = null;

      await billingDetails.save();

      if (brandedAppUserDetails.status !== BrandedApp_Approved_Status.active) {
        brandedAppUserDetails.status = BrandedApp_Approved_Status.active;
      }

      brandedAppUserDetails.config_id = process.env.BUNDLE_IDENTIFIER + user.id;
      await brandedAppUserDetails.save();

      if (loDetails.qr_code) {
        const qrcode = JSON.parse(loDetails.qr_code);
        const qrcodeLink = qrcode.map(element => ({
          link: element.link,
        }));
        for (let i = 0; i < qrcodeLink.length; i++) {
          await removeImageToS3(`${qrcodeLink[i].link}`, process.env.AWS_S3_BUCKET_QRCODE);
        }
      }

      coBrandedUsers.map(async element => {
        const coBrandedDetails = await this.loanOfficersDetailsRepository.findOne({
          where: {
            user_id: element.id,
            deleted_at: null,
          },
        });
        if (coBrandedDetails) {
          coBrandedDetails.link = await addDeepLinkBranch(this.httpService, {
            config_id: brandedAppUserDetails.config_id,
            id: element.id,
          });
          coBrandedDetails.qr_code = JSON.stringify(await createQrCode(QRCODE_DEFULT_SIZES, loDetails.link));
          await coBrandedDetails.save();
        }
      });

      loDetails.link = await addDeepLinkBranch(this.httpService, {
        config_id: brandedAppUserDetails.config_id,
        id: user.id,
      });
      loDetails.qr_code = JSON.stringify(await createQrCode(QRCODE_DEFULT_SIZES, loDetails.link));
      await loDetails.save();

      return ResponseMap({
        message: SuccessMessage.subscibe_completed,
      });
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * TODO Can be Optimized
   * @param user
   * @param subscription_type
   */
  async getSubscription(user: Users, subscription_type: string): GlobalResponseType {
    try {
      const subscriptionData = await this.billingDetailsRepository.findOne({
        select: [
          `branded_user_id`,
          `amount_paid`,
          `payment_method`,
          `payment_for`,
          `recurring_subscription`,
          `created_at`,
          `subscription_plan_id`,
          `stripe_customer_status`,
        ],
        where: {
          user_id: user.id,
          payment_for: subscription_type,
          deleted_at: null,
        },
        order: {
          created_at: 'DESC',
        },
      });
      if (!subscriptionData) {
        throw new BadGatewayException(VALIDATION_MSG.data_not_found);
      }

      if (subscriptionData.stripe_customer_status === null) {
        const data = await this.subscriptionPlanRepository.findOne({
          id: subscriptionData.subscription_plan_id,
        });
        subscriptionData['recurring_term'] = Recurring_Term[subscriptionData.recurring_subscription];
        subscriptionData['subscription_plan_name'] = data.plan_name;
      }

      delete subscriptionData.recurring_subscription;
      delete subscriptionData.subscription_plan_id;
      let brandedAppData: Branded_App_Users;
      let branded_app_reject: Branded_App_Users;
      brandedAppData = await this.brandedAppUserRepository.findOne({
        where: {
          loan_officer_id: user.id,
          subscription_amount: Not('NULL'),
          reject_reason: null,
          deleted_at: null,
        },
        order: {
          id: 'DESC',
        },
      });
      branded_app_reject = await this.brandedAppUserRepository.findOne({
        where: {
          loan_officer_id: user.id,
          subscription_amount: null,
          reject_reason: Not('NULL'),
          deleted_at: null,
        },
        order: {
          id: 'DESC',
        },
      });

      let statusData = {};
      statusData['status'] = 'Pending';

      if (branded_app_reject) {
        statusData['status'] = 'Rejected';
        statusData['branded_user_id'] = branded_app_reject.id;
      }

      if (brandedAppData) {
        statusData['status'] = 'Approved';
        statusData['branded_user_id'] = brandedAppData.id;
      }

      if (brandedAppData?.status === BrandedApp_Approved_Status.expired) {
        statusData['status'] = 'Expired';
        statusData['branded_user_id'] = brandedAppData.id;
      }

      if (subscriptionData.stripe_customer_status === 'Cancelled') {
        return ResponseMap(
          {
            message: SuccessMessage.subscription_cancelled,
            Branded_App_Status: statusData,
          },
          'success',
        );
      }

      if (subscriptionData.stripe_customer_status === 'Expired') {
        return ResponseMap(
          {
            message: SuccessMessage.subscription_expired,
            Branded_App_Status: statusData,
          },
          'success',
        );
      }

      if (subscriptionData.payment_for === 'Standard') {
        let branded_app_apply = {};

        const brandedApp = await this.brandedAppUserRepository.findOne({
          where: {
            loan_officer_id: user.id,
            deleted_at: null,
          },
          order: {
            id: 'DESC',
          },
        });

        branded_app_apply['status'] = 'Pending';

        if (!brandedApp) {
          branded_app_apply['status'] = false;
        } else if (brandedApp) {
          if (brandedApp.status === BrandedApp_Approved_Status.cancelled) {
            branded_app_apply['status'] = 'Cancelled';
            branded_app_apply['branded_user_id'] = brandedApp.id;
          } else if (brandedApp.status === BrandedApp_Approved_Status.pending) {
            branded_app_apply['status'] = 'Pending';
            branded_app_apply['branded_user_id'] = brandedApp.id;
          } else if (brandedApp.status === BrandedApp_Approved_Status.expired) {
            branded_app_apply['status'] = 'Expired';
            branded_app_apply['branded_user_id'] = brandedApp.id;
          } else if (brandedApp.status === BrandedApp_Approved_Status.rejected) {
            branded_app_apply['status'] = 'Rejected';
            branded_app_apply['branded_user_id'] = brandedApp.id;
          } else {
            branded_app_apply['status'] = 'Approved';
            branded_app_apply['branded_user_id'] = brandedApp.id;
          }
        } else if (branded_app_reject) {
          branded_app_apply['status'] = 'Rejected';
          branded_app_apply['branded_user_id'] = branded_app_reject.id;
        }

        return ResponseMap(
          {
            Subscription_list: subscriptionData,
            branded_app_apply: branded_app_apply,
          },
          'success',
        );
      }

      if (subscriptionData.payment_for === 'BrandedApp') {
        return ResponseMap(
          {
            Subscription_list: subscriptionData,
            Branded_App_Status: statusData,
          },
          'success',
        );
      }
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async billingHistoryForBrandedApp(user: Users): GlobalResponseType {
    try {
      const billingDetails = await this.billingDetailsRepository.find({
        where: {
          user_id: user,
          payment_for: PaymentFor.brandedAppSubscription,
          credits_id: IsNull(),
          deleted_at: null,
        },
      });

      const billingDetailsArray = billingDetails.map(element => {
        return {
          transaction_id: element.transaction_id,
          subscription_plan_id: element.subscription_plan_id,
          payment_method: element.payment_method,
          recurring_subscription: Recurring_Term[element.recurring_subscription],
          amount_paid: element.amount_paid,
          status: Billing_Status[element.status],
          date: element.created_at,
        };
      });
      for (let i = 0; i < billingDetailsArray.length; i++) {
        const data = await this.subscriptionPlanRepository.findOne({
          where: {
            id: billingDetailsArray[i].subscription_plan_id,
          },
        });

        billingDetailsArray[i]['subscription_plan_name'] = data.plan_name;
        delete billingDetailsArray[i].subscription_plan_id;
      }
      return ResponseMap(
        {
          Billing_History: billingDetailsArray,
        },
        'success',
      );
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async billingHistory(user: Users): GlobalResponseType {
    try {
      const billingDetails = await this.billingDetailsRepository.find({
        where: {
          user_id: user,
          payment_for: PaymentFor.signUpSubscription,
          deleted_at: null,
          credits_id: IsNull(),
        },
      });
      const billingDetailsArray = billingDetails.map(element => {
        return {
          transaction_id: element.transaction_id,
          subscription_plan_id: element.subscription_plan_id,
          payment_method: element.payment_method,
          recurring_subscription: Recurring_Term[element.recurring_subscription],
          amount_paid: element.amount_paid,
          status: Billing_Status[element.status],
          date: element.created_at,
        };
      });
      for (let i = 0; i < billingDetailsArray.length; i++) {
        const data = await this.subscriptionPlanRepository.findOne({
          where: {
            id: billingDetailsArray[i].subscription_plan_id,
          },
        });

        billingDetailsArray[i]['subscription_plan_name'] = data.plan_name;
        delete billingDetailsArray[i].subscription_plan_id;
      }
      return ResponseMap(
        {
          Billing_History: billingDetailsArray,
        },
        'success',
      );
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async cancelSubscription(user: Users, subscription_type: string, branded_user_id?: number): GlobalResponseType {
    try {
      if (
        subscription_type !== SubscriptionType.brandedAppSubscription &&
        subscription_type !== SubscriptionType.standardSubscription
      ) {
        throw new BadRequestException(VALIDATION_MSG.subscription_plan_not_exits);
      }

      if (subscription_type === SubscriptionType.brandedAppSubscription) {
        const brandedAppUserDetail = await this.brandedAppUserRepository.findOne({
          where: {
            id: branded_user_id,
            status: Not(BrandedApp_Approved_Status.cancelled),
            deleted_at: IsNull(),
          },
          order: {
            id: 'DESC',
          },
        });

        if (!brandedAppUserDetail) {
          throw new BadRequestException(VALIDATION_MSG.brandedApp_not_found);
        }

        if (brandedAppUserDetail.status === BrandedApp_Approved_Status.expired) {
          throw new BadRequestException(VALIDATION_MSG.branded_app_expired);
        }

        brandedAppUserDetail.status = BrandedApp_Approved_Status.cancelled;
        await brandedAppUserDetail.save();

        const billingDetails = await this.billingDetailsRepository.findOne({
          where: {
            user_id: user.id,
            branded_user_id: branded_user_id,
            payment_for: subscription_type,
            credits_id: IsNull(),
            stripe_customer_status: null,
            deleted_at: null,
          },
          order: {
            created_at: 'DESC',
          },
        });

        if (billingDetails) {
          billingDetails.stripe_customer_status = 'Cancelled';
          await billingDetails.save();
        }

        return ResponseMap(
          {
            message: SuccessMessage.subscription_cancelled,
          },
          'success',
        );
      } else if (subscription_type === SubscriptionType.standardSubscription) {
        const loDetails = await this.loanOfficersDetailsRepository.findOne({
          where: {
            user_id: user.id,
            status: Not(3),
            deleted_at: IsNull(),
          },
        });

        if (!loDetails) {
          throw new NotFoundException(VALIDATION_MSG.lo_standard_subscripion_not_found);
        }
        loDetails.status = 3;
        await loDetails.save();

        const billingDetails = await this.billingDetailsRepository.findOne({
          where: {
            user_id: user.id,
            payment_for: subscription_type,
            credits_id: IsNull(),
            stripe_customer_status: null,
            deleted_at: null,
          },
          order: {
            created_at: 'DESC',
          },
        });

        if (billingDetails) {
          billingDetails.stripe_customer_status = 'Cancelled';
          await billingDetails.save();
        }

        return ResponseMap(
          {
            message: SuccessMessage.subscription_cancelled,
          },
          'success',
        );
      }
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getLO(user: Users): GlobalResponseType {
    try {
      const loDetails = await this.usersRepository.find({
        where: {
          parent_id: user.id,
          role: UserRole.LO,
          deleted_at: null,
        },
      });

      const newArr = loDetails.map(element => {
        return {
          id: element.id,
          name: element.first_name + ' ' + element.last_name,
          email: element.email,
        };
      });
      return ResponseMap(
        {
          Loan_Officers_list: newArr,
        },
        'success',
      );
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async addLoanOfficer(user: Users, addLoDto: AddLODto): GlobalResponseType {
    try {
      const loDetails = await this.usersRepository.findOne({
        where: {
          // name: addLoDto.name,
          email: addLoDto.email,
          role: UserRole.LO,
          deleted_at: null,
        },
      });

      const parentLoDetails = await this.loanOfficersDetailsRepository.findOne({
        where: {
          user_id: user.id,
          deleted_at: IsNull(),
        },
      });

      if (!loDetails) {
        throw new BadRequestException(VALIDATION_MSG.account_not_exist);
      }

      if (loDetails.parent_id == user) {
        throw new BadRequestException(VALIDATION_MSG.lo_exist);
      }

      // Give Error if adding a lo which is already Added by someone.
      if (loDetails.parent_id) {
        throw new BadRequestException(VALIDATION_MSG.lo_cannot_add);
      }

      const standardSubscription = await this.billingDetailsRepository.findOne({
        where: {
          user_id: loDetails.id,
          payment_for: PaymentFor.signUpSubscription,
          status: 1, // Success
          stripe_customer_status: IsNull(),
          expiry_at: Not(IsNull()),
          deleted_at: IsNull(),
        },
      });
      if (!standardSubscription) {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            message: VALIDATION_MSG.lo_standard_subscripion_not_found,
          },
          HttpStatus.FORBIDDEN,
        );
      }
      const loanOfficer = await this.loanOfficersDetailsRepository.findOne({
        where: {
          user_id: loDetails.id,
          deleted_at: IsNull(),
        },
      });

      let colorSchema = JSON.parse(parentLoDetails?.app_color_scheme_settings ?? '[]');
      loanOfficer.app_color_scheme_settings = JSON.stringify(colorSchema);

      await loanOfficer.save();

      loDetails.parent_id = user;
      await loDetails.save();
      await this.addDefaultCompanyFieldsTOLoanOfficer(user, loDetails);

      // Logout all the sessions of the normal LO and his/her BO,
      await RevokeAccess(loDetails.id);
      return ResponseMap(
        {
          message: SuccessMessage.add_loanOfficer,
        },
        'success',
      );
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private async addDefaultCompanyFieldsTOLoanOfficer(parentLo: Users, loanOfficer: Users): Promise<void> {
    try {
      // Save DEFAULTS : Dashboard/AppMenu Company Links
      const defaults = await this.loanOfficersDetailsRepository.findOne({
        where: {
          user_id: parentLo.id,
          deleted_at: null,
        },
      });
      const loanOfficerDetail = await this.loanOfficersDetailsRepository.findOne({
        where: {
          user_id: loanOfficer.id,
          status: Not(3),
          deleted_at: IsNull(),
        },
      });

      const brandedAppUserDetails = await this.brandedAppUserRepository.findOne({
        where: {
          loan_officer_id: parentLo.id,
          status: BrandedApp_Approved_Status.active,
          deleted_at: IsNull(),
        },
      });

      const coBrandedUsers = await this.userRepository.find({
        where: {
          parent_id: loanOfficer.id,
          role: 5,
          deleted_at: IsNull(),
        },
      });

      if (!isEmpty(defaults)) {
        let dashboardCompany = null;
        let appMenuCompany = null;
        const dashboard_company_links = JSON.parse(defaults.dashboard_company_links);
        if (dashboard_company_links) {
          dashboardCompany = dashboard_company_links.map(link => {
            return {
              ...link,
              isChangeable: false,
            };
          });

          dashboardCompany?.forEach(link => {
            if (!defaults.dashboard_menu_details.includes(link.id)) {
              link.isChecked = false;
            } else {
              link.isChecked = true;
            }
          });
        }

        const appMenu_company_links = JSON.parse(defaults.appMenu_company_links);
        if (appMenu_company_links) {
          appMenuCompany = appMenu_company_links.map(link => {
            return {
              ...link,
              isChangeable: false,
            };
          });

          appMenuCompany?.forEach(link => {
            if (!defaults.app_menu_details.includes(link.id)) {
              link.isChecked = false;
            } else {
              link.isChecked = true;
            }
          });
        }

        if (loanOfficerDetail) {
          loanOfficerDetail.dashboard_company_links = dashboardCompany && JSON.stringify(dashboardCompany);
          loanOfficerDetail.appMenu_company_links = appMenuCompany && JSON.stringify(appMenuCompany);

          if (loanOfficerDetail.qr_code) {
            const qrcode = JSON.parse(loanOfficerDetail.qr_code);
            const qrcodeLink = qrcode.map(element => ({
              link: element.link,
            }));
            for (let i = 0; i < qrcodeLink.length; i++) {
              await removeImageToS3(`${qrcodeLink[i].link}`, process.env.AWS_S3_BUCKET_QRCODE);
            }
          }
          loanOfficerDetail.link = await addDeepLinkBranch(this.httpService, {
            config_id: brandedAppUserDetails?.config_id ? brandedAppUserDetails.config_id : null,
            id: loanOfficer.id,
          });
          loanOfficerDetail.qr_code = JSON.stringify(await createQrCode(QRCODE_DEFULT_SIZES, loanOfficerDetail.link));
          await this.loanOfficersDetailsRepository.save(loanOfficerDetail);
        }
        if (!isEmpty(coBrandedUsers)) {
          coBrandedUsers.map(async element => {
            const coBrandedDetails = await this.loanOfficersDetailsRepository.findOne({
              where: {
                user_id: element.id,
                deleted_at: null,
              },
            });
            if (coBrandedDetails) {
              const qrcode = JSON.parse(coBrandedDetails.qr_code);
              const qrcodeLink = qrcode.map(element => ({
                link: element.link,
              }));
              for (let i = 0; i < qrcodeLink.length; i++) {
                await removeImageToS3(`${qrcodeLink[i].link}`, process.env.AWS_S3_BUCKET_QRCODE);
              }
              coBrandedDetails.link = await addDeepLinkBranch(this.httpService, {
                config_id: brandedAppUserDetails.config_id,
                id: element.id,
              });
              coBrandedDetails.qr_code = JSON.stringify(await createQrCode(QRCODE_DEFULT_SIZES, coBrandedDetails.link));
              await coBrandedDetails.save();
            }
          });
        }
      }
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Delete Loan Officer
  async deleteLoanOfficer(id: number, user: Users): GlobalResponseType {
    try {
      const userDetail = await this.usersRepository.findOne({
        where: {
          id: id,
          parent_id: user.id,
          deleted_at: null,
        },
      });

      if (!userDetail) {
        throw new BadRequestException(VALIDATION_MSG.lo_not_exist);
      }
      userDetail.parent_id = null;
      await userDetail.save();

      const loanOfficerDetail = await this.loanOfficersDetailsRepository.findOne({
        where: {
          user_id: id,
          status: Not(3),
          deleted_at: IsNull(),
        },
      });

      const coBrandedUsers = await this.userRepository.find({
        where: {
          parent_id: id,
          role: 5,
          deleted_at: IsNull(),
        },
      });

      // brandedApp borrowers
      const borrowers = await this.userRepository.find({
        where: {
          parent_id: id,
          role: 3,
          signed_brand_id: user.id,
          deleted_at: IsNull(),
        },
      });

      if (loanOfficerDetail) {
        if (loanOfficerDetail.qr_code) {
          const qrcode = JSON.parse(loanOfficerDetail.qr_code);
          const qrcodeLink = qrcode.map(element => ({
            link: element.link,
          }));
          for (let i = 0; i < qrcodeLink.length; i++) {
            await removeImageToS3(`${qrcodeLink[i].link}`, process.env.AWS_S3_BUCKET_QRCODE);
          }
        }
        loanOfficerDetail.link = await addDeepLinkBranch(this.httpService, { id: loanOfficerDetail.user_id });
        loanOfficerDetail.qr_code = JSON.stringify(await createQrCode(QRCODE_DEFULT_SIZES, loanOfficerDetail.link));
        loanOfficerDetail.app_color_scheme_settings = JSON.stringify(ColorSchemaArrayDefault);
        await loanOfficerDetail.save();
      }
      if (coBrandedUsers) {
        coBrandedUsers.map(async element => {
          const coBrandedDetails = await this.loanOfficersDetailsRepository.findOne({
            where: {
              user_id: element.id,
              deleted_at: null,
            },
          });
          if (coBrandedDetails) {
            const qrcode = JSON.parse(coBrandedDetails.qr_code);
            const qrcodeLink = qrcode.map(element => ({
              link: element.link,
            }));
            for (let i = 0; i < qrcodeLink.length; i++) {
              await removeImageToS3(`${qrcodeLink[i].link}`, process.env.AWS_S3_BUCKET_QRCODE);
            }
            coBrandedDetails.link = await addDeepLinkBranch(this.httpService, {
              id: element.id,
            });
            coBrandedDetails.qr_code = JSON.stringify(await createQrCode(QRCODE_DEFULT_SIZES, coBrandedDetails.link));
            await coBrandedDetails.save();
          }
        });
      }

      borrowers?.forEach(async element => {
        element.parent_id = null;
        await element.save();
      });

      // Logout all the sessions of the Employee LO and his/her BO,
      await RevokeAccess(userDetail.id);
      return ResponseMap({
        id,
      });
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Branded APP Information
  async brandedAppInformation(): GlobalResponseType {
    try {
      const loanOfficerDetail = await this.brandedAppInfoRepository.findOne({
        select: [`id`, `heading`, `detail_description`, `created_at`],
        where: {
          deleted_at: null,
        },
      });
      return ResponseMap(
        {
          loanOfficerDetail,
        },
        'Success',
      );
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Branded APP Apply
  async brandedAppApply(user: Users, brandedAppApplyDto: BrandedAppApplyDto): GlobalResponseType {
    try {
      const brandedAppApplied = await this.brandedAppUserRepository.findOne({
        where: {
          loan_officer_id: user.id,
          deleted_at: null,
          reject_reason: null,
          status: Not(BrandedApp_Approved_Status.cancelled),
        },
        order: {
          id: 'DESC',
        },
      });

      if (brandedAppApplied) {
        if (brandedAppApplied.status === BrandedApp_Approved_Status.pending) {
          throw new BadGatewayException(VALIDATION_MSG.brandedApp_request_pending);
        } else if (brandedAppApplied.status === BrandedApp_Approved_Status.expired) {
          throw new BadGatewayException(VALIDATION_MSG.branded_app_expired);
        } else if (
          brandedAppApplied.status === BrandedApp_Approved_Status.active ||
          brandedAppApplied.status === BrandedApp_Approved_Status.in_active
        ) {
          throw new BadGatewayException(VALIDATION_MSG.brandedApp_apply_alredy);
        }
      }

      //Create new branded app user
      //Even If status is 4:rejected OR 5:cancelled
      const brandedApp = new Branded_App_Users();
      brandedApp.loan_officer_id = user;
      brandedApp.name = brandedAppApplyDto.name;
      brandedApp.email = brandedAppApplyDto.email;
      brandedApp.company_name = brandedAppApplyDto.company_name;
      brandedApp.app_name = brandedAppApplyDto.app_name;
      brandedApp.subscription_amount = null;
      brandedApp.taxes = null;
      brandedApp.additional_charges = null;
      brandedApp.reject_reason = null;
      brandedApp.status = BrandedApp_Approved_Status.pending;
      brandedApp.invitation_send = Invitation_send.yes;
      brandedApp.created_at = new Date();
      brandedApp.updated_at = new Date();
      await brandedApp.save();

      const recent_activity = new Recent_Activity();
      recent_activity.activity_category = 2;
      recent_activity.activity_text = Activity_Category[2];
      recent_activity.activity_by_id = user.id;
      recent_activity.activity_by_name = user.first_name + ' ' + user.last_name;
      await recent_activity.save();

      return ResponseMap(
        {
          message: SuccessMessage.branded_app_request,
        },
        'success',
      );
    } catch (error) {
      console.log(error);
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async brandedAppApproved(id: number): GlobalResponseType {
    try {
      const brandedAppDetails = await this.brandedAppUserRepository.findOne({
        where: {
          loan_officer_id: id,
          deleted_at: null,
        },
        order: {
          id: 'DESC',
        },
      });

      if (!brandedAppDetails) {
        throw new BadRequestException(VALIDATION_MSG.brandedApp_not_found);
      }

      if (brandedAppDetails.invitation_send === Invitation_send.no) {
        throw new BadRequestException(VALIDATION_MSG.brandedApp_not_approved);
      }

      if (brandedAppDetails.status !== 1 && brandedAppDetails.status !== 2) {
        throw new BadRequestException(`BrandedApp is ${BrandedApp_Approved_Status[brandedAppDetails.status]}`);
      }

      return ResponseMap(
        {
          message: SuccessMessage.branded_app_approved,
        },
        'success',
      );
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Get Subscription Plan created By Admin
  async getSubscriptionPlan(): GlobalResponseType {
    try {
      const subscriptionPlan = await this.subscriptionPlanRepository.find({
        select: [`id`, `plan_name`, `plan_fees`, `duration`, `plan_details`],
        where: {
          deleted_at: null,
        },
      });

      return ResponseMap(
        {
          subscription_plans: subscriptionPlan,
        },
        'success',
      );
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Promocode Apply
  async promocodeApply(user: Users, promocodeDto: PromocodeDto): GlobalResponseType {
    try {
      const billingDetails = await this.billingDetailsRepository.findOne({
        where: {
          user_id: user.id,
          stripe_customer_status: null,
          payment_for: PaymentFor.signUpSubscription,
          credits_id: IsNull(),
          deleted_at: null,
        },
      });
      if (!billingDetails) {
        throw new BadGatewayException(VALIDATION_MSG.signup_subscription_not_exits);
      }
      if (billingDetails) {
        const promocodeData = await this.promoCodeRepository.findOne({
          where: {
            promo_code: promocodeDto.promoCode,
            deleted_at: null,
          },
        });
        if (!promocodeData) {
          throw new BadGatewayException(VALIDATION_MSG.promo_code_not_found);
        }
        if (promocodeData.end_date <= new Date()) {
          throw new BadGatewayException(VALIDATION_MSG.promoCode_expired);
        }
        if (!(await isValidPromocodeForUser(user, promocodeData.id))) {
          throw new BadGatewayException(VALIDATION_MSG.promoCode_cannot_use);
        }
        if (promocodeData) {
          const futurePromoCodeData = await this.futurePromoCodeRepository.findOne({
            where: {
              user_id: user.id,
              promo_code: promocodeData.promo_code,
              deleted_at: null,
            },
          });
          if (futurePromoCodeData) {
            throw new BadGatewayException(VALIDATION_MSG.future_promo_codes);
          }
          const futurePromoCodes = new Future_Promo_Codes();
          futurePromoCodes.user_id = user;
          futurePromoCodes.promo_code_id = promocodeData.id;
          futurePromoCodes.promo_code = promocodeData.promo_code;
          futurePromoCodes.start_date = promocodeData.start_date;
          futurePromoCodes.end_date = promocodeData.end_date;
          futurePromoCodes.created_at = new Date();
          futurePromoCodes.updated_at = new Date();
          await futurePromoCodes.save();
        }
      }
      return ResponseMap(
        {
          message: SuccessMessage.future_promo_code,
        },
        'success',
      );
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Get Future Promocodes
  async getFuturePromocodes(user: Users): GlobalResponseType {
    try {
      let canAdd = true;
      const futurePromoCodeData = await this.futurePromoCodeRepository.find({
        where: {
          user_id: user,
          // deleted_at: null,
        },
      });

      const futureCodeAdded = await this.futurePromoCodeRepository.findOne({
        where: {
          user_id: user,
          deleted_at: IsNull(),
          used_on: IsNull(),
        },
      });

      if (futureCodeAdded) {
        canAdd = false;
      }

      const futureCodes = await Promise.all(
        futurePromoCodeData.map(async futureCode => {
          const promocodeData = await this.promoCodeRepository.findOne({
            where: {
              id: futureCode.promo_code_id,
              // deleted_at: null,
            },
          });
          if (
            promocodeData?.end_date > new Date() &&
            promocodeData?.deleted_at === null &&
            (await isValidPromocodeForUser(user, promocodeData.id)) &&
            futureCode.used_on === null &&
            futureCode.deleted_at === null
          ) {
            return {
              promocode: promocodeData?.promo_code,
              discountType: promocodeData?.discount_type,
              discount: promocodeData?.discount,
              isActive: 'Active',
            };
          } else {
            return {
              promocode: promocodeData?.promo_code,
              discountType: promocodeData?.discount_type,
              discount: promocodeData?.discount,
              isActive: 'Inactive',
            };
          }
        }),
      );

      return ResponseMap(
        {
          futureCodes,
          canAdd,
        },
        'success',
      );
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Get Playstore Status Set By Admin
  async getPlaystoreStatus(user: Users): GlobalResponseType {
    try {
      const brandedAppDetails = await this.brandedAppUserRepository.findOne({
        where: {
          loan_officer_id: user.id,
          status: BrandedApp_Approved_Status.active,
          deleted_at: null,
        },
        order: {
          id: 'DESC',
        },
      });

      if (!brandedAppDetails) {
        throw new BadRequestException(VALIDATION_MSG.brandedApp_not_found);
      }

      return ResponseMap(
        {
          playstore_status: Playstore_Status[brandedAppDetails.playstore_status],
          brandedApp_status: Branded_App_Status[brandedAppDetails.status],
        },
        'success',
      );
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
