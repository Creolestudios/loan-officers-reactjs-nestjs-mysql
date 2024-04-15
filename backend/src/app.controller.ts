import { Body, Controller, Get, HttpException, HttpService, HttpStatus, Param, Post, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Loan_Officers_Details } from './shared/entity/loan_officers_details.entity';
import { Loan_Programs } from './shared/entity/loan_programs.entity';
import { isEmpty } from 'lodash';
import { getConnection, In, IsNull, Not } from 'typeorm';
import { Users } from './shared/entity/users.entity';
import {
  AFFORDABILITY,
  BrandedApp_Approved_Status,
  CalculationTypeConst,
  ColorSchemaArrayDefault,
  CONVENTIONAL,
  DEFAULT_FHA_LOAN_PROGRAM_DESCRIPTION,
  DEFAULT_PRIVACY_POLICY_DESCRIPTION,
  FHADefaultLoanFactor,
  FHADefaultTypes,
  JUMBO,
  LinksType,
  NOTIFICATION_CATEGORY,
  QRCODE_DEFULT_SIZES,
  ResponseMap,
  ServiceFeesDefaults,
  ShouldRefinanceDisclaimer,
  SHOULD_REFINANCE,
  USDA,
  UserRole,
  VA,
} from './utils/constant';
import { v4 as uuidv4 } from 'uuid';
import { Learning_Center } from './shared/entity/learning_center.entity';
import { Checklists } from './shared/entity/checklists.entity';
import { Service_Fees } from './shared/entity/service_fees.entity';
import { Calculation_Types } from './shared/entity/calculation_types.entity';
import { mortgage_guide_array } from 'src/utils/constant';
import {
  addDeepLinkBranch,
  createDefaultCompanyLinks,
  createDefaultLinks,
  createQrCode,
  getGrayIcons,
  getGreenIcons,
  getWhiteIcons,
  profileLinks,
} from './utils/functions';
import { User_Address } from './shared/entity/user_address.entity';
import * as fs from 'fs';
import * as bcrypt from 'bcrypt';
import { createNewFirebaseUser } from './utils/firebase.utils';
import { Legal_Details } from './shared/entity/legal_details.entity';
import { Glossaries } from './shared/entity/glossaries.entity';
import { Messages } from './shared/entity/messages.entity';
import { Push_Notifications } from './shared/entity/push_notifications.entity';
import { ResponseGlobalInterface, SuccessResponse } from './utils/types';
import { Branded_App_Users } from './shared/entity/branded_app_users.entity';
import { removeImageToS3 } from './utils/helper';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly httpService: HttpService) {}

  // NOTE: this route is just for testing daily report
  @Post('/test_daily_report')
  async testDailyReport(): Promise<any> {
    return await this.appService.reportCheck(true);
  }

  @Get()
  serverCheck(): ResponseGlobalInterface<SuccessResponse> {
    return this.appService.serverCheck();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  @Get('redirect-link')
  redirectWebLink(@Query('id') id: number, @Res() res: Response) {
    return this.appService.redirectWebLink(id, res);
  }

  @Get('/script/change-deep-link/:id')
  async changeDeepLink(@Param('id') loId: number): Promise<{ message: string }> {
    const brandedAppUserDetails = await Branded_App_Users.findOne({
      where: {
        loan_officer_id: loId,
        status: BrandedApp_Approved_Status.active,
        reject_reason: IsNull(),
        deleted_at: IsNull(),
      },
    });

    const loDetails = await Loan_Officers_Details.findOne({
      where: {
        user_id: loId,
        deleted_at: IsNull(),
      },
    });

    const coBrandedUsers = await Users.find({
      where: {
        parent_id: loId,
        role: 5,
        deleted_at: IsNull(),
      },
    });

    const employee = await Users.find({
      where: {
        parent_id: loId,
        role: 6,
        deleted_at: IsNull(),
      },
    });

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
      const coBrandedDetails = await Loan_Officers_Details.findOne({
        where: {
          user_id: element.id,
          deleted_at: null,
        },
      });
      if (coBrandedDetails) {
        coBrandedDetails.link = await addDeepLinkBranch(this.httpService, {
          config_id: brandedAppUserDetails?.config_id ? brandedAppUserDetails.config_id : null,
          id: element.id,
        });
        coBrandedDetails.qr_code = JSON.stringify(await createQrCode(QRCODE_DEFULT_SIZES, loDetails.link));
        await coBrandedDetails.save();
      }
    });

    employee.map(async element => {
      const employeeDetails = await Loan_Officers_Details.findOne({
        where: {
          user_id: element.id,
          deleted_at: null,
        },
      });
      if (employeeDetails) {
        employeeDetails.link = await addDeepLinkBranch(this.httpService, {
          config_id: brandedAppUserDetails?.config_id ? brandedAppUserDetails.config_id : null,
          id: element.id,
        });
        employeeDetails.qr_code = JSON.stringify(await createQrCode(QRCODE_DEFULT_SIZES, loDetails.link));
        await employeeDetails.save();
      }
    });

    loDetails.link = await addDeepLinkBranch(this.httpService, {
      config_id: brandedAppUserDetails?.config_id ? brandedAppUserDetails.config_id : null,
      id: loId,
    });
    loDetails.qr_code = JSON.stringify(await createQrCode(QRCODE_DEFULT_SIZES, loDetails.link));
    await loDetails.save();

    if (brandedAppUserDetails?.config_id) {
      brandedAppUserDetails.config_id = process.env.BUNDLE_IDENTIFIER + loId;
      await brandedAppUserDetails.save();
    }

    return ResponseMap({ message: 'Success change deep-link ' });
  }

  @Get('/script/deep-link-default')
  async deepLinkDefault(): Promise<{ message: string }> {
    const loDetails = await Loan_Officers_Details.find();
    loDetails.map(async user => {
      user.link = await addDeepLinkBranch(this.httpService, { id: user.user_id });
      await user.save();
    });

    return ResponseMap({ message: 'Success enter deep-link-default' });
  }

  @Get('/script/co-brand-lo-default')
  async coBrandLoDefaultDefault(): Promise<{ message: string }> {
    const loanOfficerDetail = await Loan_Officers_Details.find();
    if (loanOfficerDetail) {
      for (let i = 0; i < loanOfficerDetail.length; i++) {
        loanOfficerDetail[i].loan_officers_id = JSON.stringify([]);
        await loanOfficerDetail[i].save();
      }
    }

    return ResponseMap({ message: 'Success enter service-fees-is-default' });
  }

  @Get('/script/admin-lo-details')
  async adminLoDetails(): Promise<{ message: string }> {
    const userAdmin = await Users.findOne({
      where: {
        role: UserRole.ADMIN,
      },
    });

    if (userAdmin) {
      const loanOfficer = new Loan_Officers_Details();
      loanOfficer.user_id = userAdmin;
      loanOfficer.status = 1;
      loanOfficer.link = await addDeepLinkBranch(this.httpService, userAdmin);
      loanOfficer.qr_code = JSON.stringify(await createQrCode(QRCODE_DEFULT_SIZES, loanOfficer.link));
      loanOfficer.notification_settings = JSON.stringify({
        direct_message: false,
        document_upload: false,
        app_download_from_link: false,
      });

      loanOfficer.report_settings = JSON.stringify({
        daily_report: false,
        weekly_report: true,
      });

      loanOfficer.social_links = JSON.stringify({
        website_link: null,
        facebook_link: null,
        twitter_link: null,
        linkedin_link: null,
        google_link: null,
        youtube_link: null,
        pinterest_link: null,
        tikTok_link: null,
        instagram_link: null,
      });

      loanOfficer.app_color_scheme_settings = JSON.stringify(ColorSchemaArrayDefault);

      loanOfficer.email_signatures = JSON.stringify([]);

      loanOfficer.auto_responders_settings = JSON.stringify({
        from_email: null,
        from_name: null,
        subject: null,
        email_body: null,
      });

      loanOfficer.dashboard_menu_details = JSON.stringify(createDefaultLinks(LinksType));

      loanOfficer.app_menu_details = JSON.stringify(createDefaultLinks(LinksType));

      loanOfficer.mortgage_guide = JSON.stringify(mortgage_guide_array);

      loanOfficer.save();
    }

    return ResponseMap({ message: 'admin panel detail' });
  }

  @Get('/script/calculation-default-property')
  async calculationDefaultProperty(): Promise<{ message: string }> {
    const calculationTypes = await Calculation_Types.find();
    if (calculationTypes) {
      for (let i = 0; i < calculationTypes.length; i++) {
        // const default = calculationTypes[i]
        let property_price = 20;
        const defaultValue = JSON.parse(calculationTypes[i].calculation_default_values);
        if (defaultValue?.new_loan_amount) {
          property_price = defaultValue.new_loan_amount;
        }

        defaultValue.property_price = property_price;
        calculationTypes[i].calculation_default_values = JSON.stringify(defaultValue);

        await calculationTypes[i].save();
      }
    }

    return ResponseMap({ message: 'Success enter cal-property-default' });
  }

  @Get('/script/mortgage-guide')
  async mortgageGuide(): Promise<{ message: string }> {
    const loanOfficerDetails = await Loan_Officers_Details.find();
    for (let i = 0; i < loanOfficerDetails.length; i++) {
      loanOfficerDetails[i].mortgage_guide = JSON.stringify(mortgage_guide_array);
      loanOfficerDetails[i].save();
    }
    return ResponseMap({ message: 'Success enter Mortgage-guide' });
  }

  @Get('/script/color-schema')
  async colorSchema(): Promise<{ message: string }> {
    const loanOfficerDetails = await Loan_Officers_Details.find();
    for (let i = 0; i < loanOfficerDetails.length; i++) {
      loanOfficerDetails[i].app_color_scheme_settings = JSON.stringify(ColorSchemaArrayDefault);
      loanOfficerDetails[i].save();
    }
    return ResponseMap({ message: 'Success enter Color-schema' });
  }

  @Get('/script/report-settings')
  async reportSettings(): Promise<{ message: string }> {
    const loanOfficerDetails = await Loan_Officers_Details.find();
    for (let i = 0; i < loanOfficerDetails.length; i++) {
      loanOfficerDetails[i].report_settings = JSON.stringify({
        daily_report: false,
        weekly_report: false,
      });
      loanOfficerDetails[i].save();
    }
    return ResponseMap({ message: 'Success enter Report-Settings' });
  }

  @Get('/script/auto-responder')
  async autoResponder(): Promise<{ message: string }> {
    const loanOfficerDetails = await Loan_Officers_Details.find();
    for (let i = 0; i < loanOfficerDetails.length; i++) {
      loanOfficerDetails[i].auto_responders_settings = JSON.stringify({
        from_email: null,
        from_name: null,
        subject: null,
        email_body: null,
      });
      loanOfficerDetails[i].save();
    }
    return ResponseMap({ message: 'Success enter auto-responder' });
  }

  @Get('/script/email-signature/default')
  async emailSignatureDefault(): Promise<{ message: string }> {
    const loanOfficerDetails = await Loan_Officers_Details.find();
    for (let i = 0; i < loanOfficerDetails.length; i++) {
      loanOfficerDetails[i].email_signatures = JSON.stringify([]);
      loanOfficerDetails[i].save();
    }
    return ResponseMap({ message: 'Success enter email-signature default' });
  }

  @Get('/script/loanprogram')
  async loanProgram(): Promise<{ message: string }> {
    const admin = await Users.findOne({
      where: {
        role: 1,
      },
    });
    const loDetails = await Loan_Officers_Details.find({
      where: {
        user_id: Not(admin.id),
      },
    });

    const adminPrograms = await Loan_Programs.find({
      where: {
        loan_officer_id: admin.id,
      },
    });
    await Promise.all(
      loDetails.map(async officer => {
        const loanPrograms = await Loan_Programs.find({
          where: {
            deleted_at: null,
            loan_officer_id: officer.user_id,
          },
        });
        const programs = adminPrograms.map(element => {
          return {
            loan_officer_id: () => officer.user_id.toString(),
            program_name: element.program_name,
            program_description: element.program_description,
            program_icon: element.program_icon,
            is_default: true,
          };
        });

        if (isEmpty(loanPrograms)) {
          await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Loan_Programs)
            .values(programs)
            .execute();
        }
      }),
    );

    return ResponseMap({ message: 'Success enter loanprogram' });
  }

  @Get('/script/learncenter')
  async learnCenter(): Promise<{ message: string }> {
    const admin = await Users.findOne({
      where: {
        role: 1,
      },
    });
    const loDetails = await Loan_Officers_Details.find({
      where: {
        user_id: Not(admin.id),
      },
    });

    const adminPrograms = await Learning_Center.find({
      where: {
        loan_officer_id: admin.id,
      },
    });
    await Promise.all(
      loDetails.map(async officer => {
        const loanPrograms = await Learning_Center.find({
          where: {
            deleted_at: null,
            loan_officer_id: officer.user_id,
          },
        });
        const programs = adminPrograms.map(element => {
          return {
            loan_officer_id: () => officer.user_id.toString(),
            title: element.title,
            description: element.description,
            is_default: true,
          };
        });

        if (isEmpty(loanPrograms)) {
          await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Learning_Center)
            .values(programs)
            .execute();
        }
      }),
    );

    return ResponseMap({ message: 'Success enter loanprogram' });
  }

  @Get('/script/checklist')
  async checklistGet(): Promise<{ message: string }> {
    const admin = await Users.findOne({
      where: {
        role: 1,
      },
    });
    const loDetails = await Loan_Officers_Details.find({
      where: {
        user_id: Not(admin.id),
      },
    });

    const adminChecklists = await Checklists.find({
      where: {
        loan_officer_id: admin.id,
      },
    });
    await Promise.all(
      loDetails.map(async officer => {
        const checklistExists = await Checklists.find({
          where: {
            deleted_at: null,
            loan_officer_id: officer.user_id,
          },
        });
        const programs = adminChecklists.map(element => {
          const id = () => `${officer.user_id}`;
          return {
            loan_officer_id: id,
            checklist_name: element.checklist_name,
            check_list_required_items: element.check_list_required_items,
            is_default: true,
          };
        });

        if (isEmpty(checklistExists)) {
          await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Checklists)
            .values(programs)
            .execute();
        }
      }),
    );

    return ResponseMap({ message: 'Success enter loanprogram' });
  }

  @Get('/script/fees')
  async serviceFeesAddAdmin(): Promise<{ message: string }> {
    const admin = await Users.findOne({
      where: {
        role: 1,
      },
    });

    if (!isEmpty(admin)) {
      const serviceFees = [];
      Object.keys(ServiceFeesDefaults).map(element => {
        serviceFees.push({
          loan_officer_id: admin.id,
          service_name: element,
          service_fee: ServiceFeesDefaults[element],
        });
      });

      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Service_Fees)
        .values(serviceFees)
        .execute();
    }

    return ResponseMap({ message: 'Success enter loanprogram' });
  }

  @Get('/script/fees-lo')
  async serviceFeesAddLO(): Promise<{ message: string }> {
    const admin = await Users.findOne({
      where: {
        role: 1,
      },
    });
    const loDetails = await Loan_Officers_Details.find({
      where: {
        user_id: Not(admin.id),
      },
    });

    const serviceExists = await Service_Fees.find({
      where: {
        deleted_at: null,
        loan_officer_id: admin,
      },
    });
    try {
      if (!isEmpty(admin)) {
        await Promise.all(
          loDetails.map(async officer => {
            const servicesFiltered = serviceExists.map(element => {
              return {
                loan_officer_id: () => `${officer.user_id}`,
                service_fee: element.service_fee,
                service_name: element.service_name,
              };
            });

            if (!isEmpty(servicesFiltered)) {
              await getConnection()
                .createQueryBuilder()
                .insert()
                .into(Service_Fees)
                .values(servicesFiltered)
                .execute();
            }
          }),
        );
      }
    } catch (error) {
      console.log(error, 'catch error');
    }

    return ResponseMap({ message: 'Success enter service' });
  }

  @Get('/script/cal/fha/admin')
  async calculationAddFhaAdmin(): Promise<{ message: string }> {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Calculation_Types)
      .values({
        loan_officer_id: () => '208',
        calculation_name: 'FHA',
        calculator_disclaimer: '',
        calculation_default_values: JSON.stringify({
          ...FHADefaultTypes,
        }),
        calculation_loan_factors: JSON.stringify([
          {
            id: uuidv4(),
            ...FHADefaultLoanFactor,
          },
        ]),
      })
      .execute();

    return ResponseMap({ message: 'Success enter FHA' });
  }

  @Get('/script/cal/fha')
  async calculationAddFha(): Promise<{ message: string }> {
    const admin = await Users.findOne({
      where: {
        role: 1,
      },
    });
    const loDetails = await Loan_Officers_Details.find({
      where: {
        user_id: Not(admin.id),
      },
    });

    loDetails.map(async officer => {
      // FHA Calculation Default Fields
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Calculation_Types)
        .values({
          loan_officer_id: officer.user_id,
          calculation_name: 'FHA',
          calculator_disclaimer: '',
          calculation_default_values: JSON.stringify({
            ...FHADefaultTypes,
          }),
          calculation_loan_factors: JSON.stringify([
            {
              id: uuidv4(),
              ...FHADefaultLoanFactor,
            },
          ]),
        })
        .execute();
    });

    return ResponseMap({ message: 'Success enter FHA' });
  }

  @Get('/script/cal/update-fha')
  async calculationUpdateFha(): Promise<{ message: string }> {
    const calTypes = await Calculation_Types.find();

    calTypes.map(async cal => {
      // FHA Calculation Default Fields
      cal.calculation_default_values = JSON.stringify({
        new_loan_amount: 350000,
        property_price_min: 0.0,
        property_price_max: 780000,
        downpayment_min: 3.5,
        property_tax: 1.2,
        hazard_insurance: 800,
        mortgage_term: 30,
        fha_upfront_mip: 1.75,
        min_interest_rate: 1.25,
        max_interest_rate: 5.56,
        interest_rate_15: 2.25,
        interest_rate_30: 3.5,
      });
      cal.calculation_loan_factors = JSON.stringify([
        {
          id: '112fd413-4d02-4dc3-a68d-973db6a3e7d8',
          year: 15,
          loan_min: 100,
          loan_max: 200,
          ltv_min: 0,
          ltv_max: 85,
          fico_min: 10,
          fico_max: 60,
          mi: 0.0,
        },
        {
          id: '212fd413-4d02-4dc3-a68d-973db6a3e7d8',
          year: 30,
          loan_min: 100,
          loan_max: 200,
          ltv_min: 0,
          ltv_max: 85,
          fico_min: 10,
          fico_max: 60,
          mi: 0.0,
        },
        {
          id: '292fd413-4d02-4dc3-a68d-973db6a3e7d8',
          year: 30,
          loan_min: 0,
          loan_max: 680000,
          ltv_min: 25,
          ltv_max: 100,
          fico_min: 20,
          fico_max: 80,
          mi: 0.85,
        },
      ]);

      await cal.save();
    });

    return ResponseMap({ message: 'Success enter FHA' });
  }

  @Get('/script/cal/conventional/admin')
  async calculationAddConventAdmin(): Promise<{ message: string }> {
    const admin = await Users.findOne({
      where: {
        role: 1,
      },
    });
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Calculation_Types)
      .values({
        loan_officer_id: admin,
        calculation_name: CONVENTIONAL,
        calculator_disclaimer: '',
        calculation_default_values: JSON.stringify({
          new_loan_amount: 350000,
          property_price_min: 0.0,
          property_price_max: 780000,
          downpayment_min: 3.5,
          property_tax: 1.2,
          hazard_insurance: 800,
          mortgage_term: 30,
          min_interest_rate: 1.25,
          max_interest_rate: 5.56,
          interest_rate_15: 2.25,
          interest_rate_30: 3.5,
          interest_rate_10: 2.25,
          interest_rate_20: 2.27,
        }),
        calculation_loan_factors: JSON.stringify([
          {
            id: '292fd413-4d02-4dc3-a68d-973db6a3e7d8',
            year: 30,
            ltv_min: 90,
            ltv_max: 95,
            fico_min: 720,
            fico_max: 759,
            mi: 0.62,
          },
          {
            id: '392fd413-4d02-4dc3-a68d-973db6a3e7d8',
            year: 30,
            ltv_min: 90,
            ltv_max: 95,
            fico_min: 680,
            fico_max: 719,
            mi: 0.89,
          },
          {
            id: '492fd413-4d02-4dc3-a68d-973db6a3e7d8',
            year: 30,
            ltv_min: 90,
            ltv_max: 95,
            fico_min: 300,
            fico_max: 679,
            mi: 1.15,
          },
          {
            id: '592fd413-4d02-4dc3-a68d-973db6a3e7d8',
            year: 30,
            ltv_min: 95,
            ltv_max: 97,
            fico_min: 760,
            fico_max: 850,
            mi: 1.05,
          },
          {
            id: '692fd413-4d02-4dc3-a68d-973db6a3e7d8',
            year: 30,
            ltv_min: 95,
            ltv_max: 97,
            fico_min: 720,
            fico_max: 759,
            mi: 1.1,
          },
          {
            id: '792fd413-4d02-4dc3-a68d-973db6a3e7d8',
            year: 30,
            ltv_min: 95,
            ltv_max: 97,
            fico_min: 680,
            fico_max: 719,
            mi: 1.31,
          },
          {
            id: '892fd413-4d02-4dc3-a68d-973db6a3e7d8',
            year: 30,
            ltv_min: 95,
            ltv_max: 97,
            fico_min: 300,
            fico_max: 679,
            mi: 1.48,
          },
        ]),
      })
      .execute();

    return ResponseMap({ message: 'Success enter FHA' });
  }

  @Get('/script/cal/conventional')
  async calculationAddConvent(): Promise<{ message: string }> {
    const admin = await Users.findOne({
      where: {
        role: 1,
      },
    });
    const loDetails = await Loan_Officers_Details.find({
      where: {
        user_id: Not(admin.id),
      },
    });
    const adminCalDetails = await Calculation_Types.findOne({
      where: {
        calculation_name: CONVENTIONAL,
        loan_officer_id: admin,
      },
    });

    loDetails.map(async officer => {
      // FHA Calculation Default Fields
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Calculation_Types)
        .values({
          loan_officer_id: officer.user_id,
          calculation_name: CONVENTIONAL,
          calculator_disclaimer: '',
          calculation_default_values: adminCalDetails.calculation_default_values,
          calculation_loan_factors: adminCalDetails.calculation_loan_factors,
        })
        .execute();
    });

    return ResponseMap({ message: 'Success enter FHA' });
  }

  @Get('/script/cal/jumbo/admin')
  async calculationAddJumboAdmin(): Promise<{ message: string }> {
    const admin = await Users.findOne({
      where: {
        role: 1,
      },
    });

    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Calculation_Types)
      .values({
        loan_officer_id: admin,
        calculation_name: JUMBO,
        calculator_disclaimer: '',
        calculation_default_values: JSON.stringify({
          new_loan_amount: 350000,
          property_price_min: 0.0,
          property_price_max: 1000000,
          downpayment_min: 3.5,
          property_tax: 1.2,
          hazard_insurance: 800,
          mortgage_term: 30,
          min_interest_rate: 1.25,
          max_interest_rate: 5.56,
          interest_rate_15: 2.25,
          interest_rate_30: 3.5,
          interest_rate_10: 2.25,
          interest_rate_20: 2.27,
        }),
        calculation_loan_factors: JSON.stringify([
          {
            id: '292fd413-4d02-4dc3-a68d-973db6a3e7d8',
            year: 30,
            ltv_min: 90,
            ltv_max: 95,
            fico_min: 720,
            fico_max: 759,
            mi: 0.62,
          },
          {
            id: '392fd413-4d02-4dc3-a68d-973db6a3e7d8',
            year: 30,
            ltv_min: 90,
            ltv_max: 95,
            fico_min: 680,
            fico_max: 719,
            mi: 0.89,
          },
          {
            id: '492fd413-4d02-4dc3-a68d-973db6a3e7d8',
            year: 30,
            ltv_min: 90,
            ltv_max: 95,
            fico_min: 300,
            fico_max: 679,
            mi: 1.15,
          },
          {
            id: '592fd413-4d02-4dc3-a68d-973db6a3e7d8',
            year: 30,
            ltv_min: 95,
            ltv_max: 97,
            fico_min: 760,
            fico_max: 850,
            mi: 1.05,
          },
          {
            id: '692fd413-4d02-4dc3-a68d-973db6a3e7d8',
            year: 30,
            ltv_min: 95,
            ltv_max: 97,
            fico_min: 720,
            fico_max: 759,
            mi: 1.1,
          },
          {
            id: '792fd413-4d02-4dc3-a68d-973db6a3e7d8',
            year: 30,
            ltv_min: 95,
            ltv_max: 97,
            fico_min: 680,
            fico_max: 719,
            mi: 1.31,
          },
          {
            id: '892fd413-4d02-4dc3-a68d-973db6a3e7d8',
            year: 30,
            ltv_min: 95,
            ltv_max: 97,
            fico_min: 300,
            fico_max: 679,
            mi: 1.48,
          },
        ]),
      })
      .execute();

    return ResponseMap({ message: 'Success enter JUMBO' });
  }

  @Get('/script/cal/jumbo')
  async calculationAddJumbo(): Promise<{ message: string }> {
    const admin = await Users.findOne({
      where: {
        role: 1,
      },
    });

    const loDetails = await Loan_Officers_Details.find({
      where: {
        user_id: Not(admin.id),
      },
    });

    const adminCalDetails = await Calculation_Types.findOne({
      where: {
        calculation_name: JUMBO,
        loan_officer_id: admin,
      },
    });

    loDetails.map(async officer => {
      // JUMBO Calculation Default Fields
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Calculation_Types)
        .values({
          loan_officer_id: officer.user_id,
          calculation_name: JUMBO,
          calculator_disclaimer: '',
          calculation_default_values: adminCalDetails.calculation_default_values,
          calculation_loan_factors: adminCalDetails.calculation_loan_factors,
        })
        .execute();
    });

    return ResponseMap({ message: 'Success enter JUMBO' });
  }

  @Get('/script/cal/usda/admin')
  async calculationAddUsdaAdmin(): Promise<{ message: string }> {
    const admin = await Users.findOne({
      where: {
        role: 1,
      },
    });

    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Calculation_Types)
      .values({
        loan_officer_id: admin,
        calculation_name: USDA,
        calculator_disclaimer: '',
        calculation_default_values: JSON.stringify({
          new_loan_amount: 350000,
          property_price_min: 0.0,
          property_price_max: 2000000,
          downpayment_min: 3.5,
          property_tax: 1.2,
          hazard_insurance: 800,
          mortgage_term: 30,
          usda_guarantee_fees: 1.0,
          min_interest_rate: 1.25,
          max_interest_rate: 5.56,
          interest_rate_15: 2.25,
          interest_rate_30: 3.5,
          interest_rate_10: 2.25,
          interest_rate_20: 2.27,
        }),
        calculation_loan_factors: JSON.stringify([
          {
            id: '292fd413-4d02-4dc3-a68d-973db6a3e7d8',
            ltv_min: 0,
            ltv_max: 24,
            fico_min: 0,
            fico_max: 750,
            mi: 0.32,
          },
          {
            id: '392fd413-4d02-4dc3-a68d-973db6a3e7d8',
            ltv_min: 25,
            ltv_max: 50,
            fico_min: 0,
            fico_max: 850,
            mi: 0.25,
          },
          {
            id: '492fd413-4d02-4dc3-a68d-973db6a3e7d8',
            ltv_min: 51,
            ltv_max: 100,
            fico_min: 0,
            fico_max: 850,
            mi: 0.35,
          },
        ]),
      })
      .execute();

    return ResponseMap({ message: 'Success enter JUMBO' });
  }

  @Get('/script/cal/usda')
  async calculationAddUsda(): Promise<{ message: string }> {
    const admin = await Users.findOne({
      where: {
        role: 1,
      },
    });

    const loDetails = await Loan_Officers_Details.find({
      where: {
        user_id: Not(admin.id),
      },
    });

    const adminCalDetails = await Calculation_Types.findOne({
      where: {
        calculation_name: USDA,
        loan_officer_id: admin,
      },
    });

    loDetails.map(async officer => {
      // JUMBO Calculation Default Fields
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Calculation_Types)
        .values({
          loan_officer_id: officer.user_id,
          calculation_name: USDA,
          calculator_disclaimer: '',
          calculation_default_values: adminCalDetails.calculation_default_values,
          calculation_loan_factors: adminCalDetails.calculation_loan_factors,
        })
        .execute();
    });

    return ResponseMap({ message: 'Success enter USDA' });
  }

  @Get('/script/cal/va/admin')
  async calculationAddVAAdmin(): Promise<{ message: string }> {
    const admin = await Users.findOne({
      where: {
        role: 1,
      },
    });

    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Calculation_Types)
      .values({
        loan_officer_id: admin,
        calculation_name: VA,
        calculator_disclaimer: '',
        calculation_default_values: JSON.stringify({
          new_loan_amount: 350000,
          property_price_min: 0.0,
          property_price_max: 2000000,
          downpayment_min: 3.5,
          property_tax: 1.2,
          hazard_insurance: 800,
          mi: 0.0,
          mortgage_term: 30,
          min_interest_rate: 1.25,
          max_interest_rate: 5.56,
          interest_rate_15: 2.25,
          interest_rate_30: 3.5,
          interest_rate_10: 2.25,
          interest_rate_20: 2.27,
        }),
        calculation_loan_factors: JSON.stringify([
          {
            id: 1,
            name: 'Regular Military',
            down_0: {
              first: 2.3,
              subsequent: 3.6,
            },
            down_5: {
              first: 1.65,
              subsequent: 1.65,
            },
            down_10: {
              first: 1.4,
              subsequent: 1.4,
            },
          },
          {
            id: 2,
            name: 'Reserves/National Guard',
            down_0: {
              first: 2.3,
              subsequent: 3.6,
            },
            down_5: {
              first: 1.65,
              subsequent: 1.65,
            },
            down_10: {
              first: 1.4,
              subsequent: 1.4,
            },
          },
        ]),
      })
      .execute();

    return ResponseMap({ message: 'Success enter JUMBO' });
  }

  @Get('/script/cal/va')
  async calculationAddVa(): Promise<{ message: string }> {
    const admin = await Users.findOne({
      where: {
        role: 1,
      },
    });

    const loDetails = await Loan_Officers_Details.find({
      where: {
        user_id: Not(admin.id),
      },
    });

    const adminCalDetails = await Calculation_Types.findOne({
      where: {
        calculation_name: VA,
        loan_officer_id: admin,
      },
    });

    loDetails.map(async officer => {
      // JUMBO Calculation Default Fields
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Calculation_Types)
        .values({
          loan_officer_id: officer.user_id,
          calculation_name: VA,
          calculator_disclaimer: '',
          calculation_default_values: adminCalDetails.calculation_default_values,
          calculation_loan_factors: adminCalDetails.calculation_loan_factors,
        })
        .execute();
    });

    return ResponseMap({ message: 'Success enter VA' });
  }

  @Get('/script/cal/affordability/admin')
  async calculationAffordabilityAdmin(): Promise<{ message: string }> {
    const admin = await Users.findOne({
      where: {
        role: 1,
      },
    });

    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Calculation_Types)
      .values({
        loan_officer_id: admin,
        calculation_name: AFFORDABILITY,
        calculator_disclaimer: '',
        calculation_default_values: JSON.stringify({
          new_loan_amount: 350000,
          property_price_min: 0.0,
          property_price_max: 2000000,
          downpayment_min: 3.5,
          annual_gross_income: 50000,
          annual_gross_income_min: 0,
          annual_gross_income_max: 2000000,
          monthly_debts: 7500,
          monthly_debts_min: 0,
          monthly_debts_max: 10000,
          property_tax: 1.2,
          hazard_insurance: 800,
          mi: 0.0,
          mortgage_term: 30,
          min_interest_rate: 1.25,
          max_interest_rate: 5.56,
          interest_rate_15: 2.25,
          interest_rate_30: 3.5,
          interest_rate_10: 2.25,
          interest_rate_20: 2.27,
        }),
        calculation_loan_factors: JSON.stringify([
          {
            id: '292fd413-4d02-4dc3-a68d-973db6a3e7d8',
            ltv_min: 0,
            ltv_max: 24,
            fico_min: 0,
            fico_max: 750,
            mi: 0.32,
          },
          {
            id: '392fd413-4d02-4dc3-a68d-973db6a3e7d8',
            ltv_min: 25,
            ltv_max: 50,
            fico_min: 0,
            fico_max: 850,
            mi: 0.25,
          },
          {
            id: '492fd413-4d02-4dc3-a68d-973db6a3e7d8',
            ltv_min: 51,
            ltv_max: 100,
            fico_min: 0,
            fico_max: 850,
            mi: 0.35,
          },
        ]),
      })
      .execute();

    return ResponseMap({ message: 'Success enter JUMBO' });
  }

  @Get('/script/cal/affordability')
  async calculationAddAffordability(): Promise<{ message: string }> {
    const admin = await Users.findOne({
      where: {
        role: 1,
      },
    });
    const loDetails = await Loan_Officers_Details.find({
      where: {
        user_id: Not(admin.id),
      },
    });

    const adminCalDetails = await Calculation_Types.findOne({
      where: {
        calculation_name: AFFORDABILITY,
        loan_officer_id: admin,
      },
    });

    loDetails.map(async officer => {
      // JUMBO Calculation Default Fields
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Calculation_Types)
        .values({
          loan_officer_id: officer.user_id,
          calculation_name: AFFORDABILITY,
          calculator_disclaimer: '',
          calculation_default_values: adminCalDetails.calculation_default_values,
          calculation_loan_factors: adminCalDetails.calculation_loan_factors,
        })
        .execute();
    });

    return ResponseMap({ message: 'Success enter affordability' });
  }

  @Get('/script/cal/should-refinance/admin')
  async calculationAddShouldRefinanceAdmin(): Promise<{ message: string }> {
    const admin = await Users.findOne({
      where: {
        role: 1,
      },
    });

    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Calculation_Types)
      .values({
        loan_officer_id: admin,
        calculation_name: SHOULD_REFINANCE,
        calculator_disclaimer: ShouldRefinanceDisclaimer,
        calculation_default_values: JSON.stringify({}),
        calculation_loan_factors: JSON.stringify([]),
      })
      .execute();

    return ResponseMap({ message: 'Success enter should-refinance admin' });
  }

  @Get('/script/cal/should-refinance/lo')
  async calculationAddShouldRefinanceLo(): Promise<{ message: string }> {
    const admin = await Users.findOne({
      where: {
        role: 1,
      },
    });

    const adminCalDetails = await Calculation_Types.findOne({
      where: {
        calculation_name: SHOULD_REFINANCE,
        loan_officer_id: admin,
      },
    });

    const loDetails = await Loan_Officers_Details.find({
      where: {
        user_id: Not(admin.id),
      },
    });

    loDetails.map(async officer => {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Calculation_Types)
        .values({
          loan_officer_id: officer.user_id,
          calculation_name: SHOULD_REFINANCE,
          calculator_disclaimer: adminCalDetails.calculator_disclaimer,
          calculation_default_values: adminCalDetails.calculation_default_values,
          calculation_loan_factors: adminCalDetails.calculation_loan_factors,
        })
        .execute();
    });

    return ResponseMap({ message: 'Success enter should-refinance LO' });
  }

  @Get('/script/cobrand/calculationType/delete')
  async deleteCalculationType(): Promise<{ message: string }> {
    const user = await Users.find({
      where: {
        role: 5,
      },
    });
    for (let i = 0; i < user.length; i++) {
      const calculation = await Calculation_Types.find({
        where: {
          loan_officer_id: user[i].id,
        },
      });
      for (let j = 0; j < calculation.length; j++) {
        await calculation[j].remove();
      }
    }

    return ResponseMap({ message: 'Delete calculation Types for CoBranded Officer' });
  }

  @Get('/script/saveAddress')
  async saveDefaultAddress(): Promise<{ message: string }> {
    const user = await Users.find({
      where: {
        role: 5,
      },
    });
    for (let i = 0; i < user.length; i++) {
      const userAddress = await User_Address.findOne({
        where: {
          user_id: user[i].id,
        },
      });
      if (!userAddress) {
        let addressObj = new User_Address();
        addressObj.user_id = user[i].id;
        addressObj.country_id = 1;
        addressObj.city = '1';
        addressObj.state_id = 50;
        addressObj.zip_code = '385696';
        addressObj.street_details = 'Ahmedabad';
        await addressObj.save();
      }
    }

    return ResponseMap({ message: 'user address save successfully' });
  }

  /**
   * Would be used to add initial data of the Admin and default values of the LO officer
   * @param payload
   * @returns
   */
  @Post('/script/add-all-defaults-for-admin')
  async addAllDefaultValuesForAdmin(@Body() payload: { email: string }): Promise<{ message: string }> {
    try {
      const signupDataAdmin = {
        email: payload.email,
        first_name: 'Admin',
        last_name: 'Loantack',
        contact_code: 12,
        contact_number: 5896585475,
        company_name: 'Loantack',
        password: 'Loantack@123',
        role: UserRole.ADMIN,
      };

      const returnAllActivityRecords = {};

      // DATABASE Entry
      const user = new Users();
      user.email = signupDataAdmin.email;
      user.role = signupDataAdmin.role;
      user.first_name = signupDataAdmin.first_name;
      user.last_name = signupDataAdmin.last_name;
      user.contact_code = signupDataAdmin.contact_code;
      user.contact_number = signupDataAdmin.contact_number;
      user.company_name = signupDataAdmin.company_name;
      user.salt = await bcrypt.genSalt();
      user.password = await this.hashpassword(signupDataAdmin.password, user.salt);
      //  user.verification_code = randomCode();
      //  user.code_created_at = new Date();

      // Firebase user creation - auth
      const fireUserDetail = await createNewFirebaseUser(user, signupDataAdmin /*emailVerified: true/false */);
      user.firebase_user_id = fireUserDetail?.uid ?? null;
      /**
       * FIELDS LEFT :(Users)
       *
       * want_branded_app, verification_code, is_reset, code_created_at, remember_me, app_menu_details,
       * forgot_password_code, profile_photo, lo_selection, referred_to, referred_to_and_installed, co_branded_notify,
       */
      user.verified_at = new Date();
      const newAdmin = await user.save();

      returnAllActivityRecords['user_id'] = newAdmin?.id;
      returnAllActivityRecords['firebase_user_id'] = newAdmin?.firebase_user_id;

      // AUTH0 access token
      // const responseAuth0Token = await this.auth0Accesstoken();
      // const { access_token: auth0Token } = responseAuth0Token.data;

      // returnAllActivityRecords['auth0Token'] = auth0Token;

      // AUTH0 Signup
      // await this.httpService
      //   .post(
      //     `${process.env.AUTH0_DOMAIN}dbconnections/signup`,
      //     {
      //       client_id: `${process.env.AUTH0_CLIENT_ID}`,
      //       email: signupDataAdmin.email,
      //       password: signupDataAdmin.password,
      //       connection: 'Username-Password-Authentication',
      //       user_metadata: {
      //         role: signupDataAdmin.role.toString(),
      //         company_name: signupDataAdmin.company_name,
      //         contact_number: signupDataAdmin.contact_code + '-' + signupDataAdmin.contact_number,
      //       },
      //     },
      //     {
      //       headers: {
      //         Authorization: `Bearer ${auth0Token}`,
      //       },
      //     },
      //   )
      //   .toPromise()
      //   .catch(error => console.log(error, 'Auth0 Error'));

      // Admin New LoanOfficer details
      const loanOfficer = new Loan_Officers_Details();
      loanOfficer.user_id = newAdmin;
      loanOfficer.status = 2; // active
      loanOfficer.link = await addDeepLinkBranch(this.httpService, newAdmin);
      loanOfficer.qr_code = JSON.stringify(await createQrCode([50, 75, 100, 200], loanOfficer.link));
      loanOfficer.enable_disable_status = 1;
      loanOfficer.dual_link = null; // look
      loanOfficer.notification_settings = JSON.stringify({
        direct_message: false,
        document_upload: false,
        app_download_from_link: false,
      });

      loanOfficer.report_settings = JSON.stringify({
        daily_report: false,
        weekly_report: true,
      });

      loanOfficer.social_links = JSON.stringify({
        website_link: null,
        facebook_link: null,
        twitter_link: null,
        linkedin_link: null,
        google_link: null,
        youtube_link: null,
        pinterest_link: null,
        tikTok_link: null,
        instagram_link: null,
      });

      loanOfficer.app_color_scheme_settings = JSON.stringify(ColorSchemaArrayDefault);

      loanOfficer.email_signatures = JSON.stringify([]);
      loanOfficer.loan_officers_id = JSON.stringify([]);

      loanOfficer.auto_responders_settings = JSON.stringify({
        from_email: null,
        from_name: null,
        subject: null,
        email_body: null,
      });

      loanOfficer.dashboard_menu_details = JSON.stringify(createDefaultLinks(LinksType));
      loanOfficer.dashboard_company_links = JSON.stringify(createDefaultCompanyLinks(LinksType));

      loanOfficer.app_menu_details = JSON.stringify(createDefaultLinks(LinksType));
      loanOfficer.appMenu_company_links = JSON.stringify(createDefaultCompanyLinks(LinksType));

      loanOfficer.mortgage_guide = JSON.stringify(mortgage_guide_array);
      loanOfficer.bio = null;
      loanOfficer.welcome_text = null;
      loanOfficer.profile_links = profileLinks(user, '');

      /**
       * FIELDS LEFT:(Loan_Officers_Details)
       * designation, licence, bio, welcome_text, has_branded_app, profile_bio_settings,
       * profile_contact_settings, profile_link_settings, logo,
       * dashboard_menu_custom_links, app_menu_custom_links, stripe_customer_id       *
       */
      const newLODetailsAdmin = await loanOfficer.save();
      returnAllActivityRecords['lo_details_id'] = newLODetailsAdmin?.id;
      returnAllActivityRecords['lo_details_Deeplink'] = newLODetailsAdmin?.link;

      //Admin Loan_Programs defaults creation
      const loanProgramData = {
        program_name: 'FHA', // Program Name : FHA / Conventional
        program_description: DEFAULT_FHA_LOAN_PROGRAM_DESCRIPTION,
        is_default: true,
        program_icon: 'house.png', // Icon : house.png / card.png
      };
      const loanPrograms = new Loan_Programs();
      loanPrograms.loan_officer_id = newAdmin.id;
      loanPrograms.program_name = loanProgramData.program_name;
      loanPrograms.program_description = loanProgramData.program_description;
      loanPrograms.is_default = loanProgramData.is_default;
      loanPrograms.program_icon = loanProgramData.program_icon;
      loanPrograms.sequence_number = 1;

      const newLoanProgram = await loanPrograms.save();

      returnAllActivityRecords['loan_program_id'] = newLoanProgram?.id;
      returnAllActivityRecords['loan_program_name'] = newLoanProgram?.program_name;

      //Admin Learning_Center defaults creation
      const learningCenterData = {
        title: 'Is a Mortgage Right For You?',
        description: 'Description here ! !',
        isDefault: true,
      };
      const newLearningCenterDetail = new Learning_Center();
      newLearningCenterDetail.title = learningCenterData.title;
      newLearningCenterDetail.description = learningCenterData.description;
      newLearningCenterDetail.loan_officer_id = newAdmin.id; // LOOK: User.id is given
      newLearningCenterDetail.is_default = learningCenterData.isDefault; // LOOK
      newLearningCenterDetail.sequence_number = 1;

      const newLearningCenter = await newLearningCenterDetail.save();

      returnAllActivityRecords['learning_center_id'] = newLearningCenter?.id;
      returnAllActivityRecords['learning_center_title'] = newLearningCenter?.title;

      //Admin Legal_Details defaults creation
      const legalDetailsDisclaimerData = {
        title: 'Hey there this is my new legal title',
        description: '<p>Hi there this is legal description 3</p><p><br></p><p><br></p>',
      };
      const legalDetailsPrivacyData = {
        title: 'Hey there this is my new legal title',
        description: DEFAULT_PRIVACY_POLICY_DESCRIPTION,
      };
      //Disclaimer(Legal_Details)
      const disclaimerLegalDetail = new Legal_Details();
      disclaimerLegalDetail.title = legalDetailsDisclaimerData.title;
      disclaimerLegalDetail.description = legalDetailsDisclaimerData.description;
      disclaimerLegalDetail.detail_type = 0; // disclaimer
      disclaimerLegalDetail.loan_officer_id = newAdmin.id;
      const newDisclaimerLegal = await disclaimerLegalDetail.save();

      returnAllActivityRecords['legal_details_disclaimer_id'] = newDisclaimerLegal?.id;
      returnAllActivityRecords['legal_details_disclaimer_title'] = newDisclaimerLegal?.title;
      //PrivacyPolicy(Legal_Details)
      const privacyPolicyLegalDetail = new Legal_Details();
      privacyPolicyLegalDetail.title = legalDetailsPrivacyData.title;
      privacyPolicyLegalDetail.description = legalDetailsPrivacyData.description;
      privacyPolicyLegalDetail.detail_type = 1; // privacyPolicy
      privacyPolicyLegalDetail.loan_officer_id = newAdmin.id;
      const newPPLegal = await privacyPolicyLegalDetail.save();

      returnAllActivityRecords['legal_details_pp_id'] = newPPLegal?.id;
      returnAllActivityRecords['legal_details_pp_title'] = newPPLegal?.title;

      //Admin Glossaries defaults creation
      const glossariesData = {
        title: 'Balanced Scorecard',
        description:
          '<p>A balanced scorecard is a&nbsp;<a href="https://www.investopedia.com/terms/s/strategic-management.asp" rel="noopener noreferrer" target="_blank">strategic management</a>&nbsp;performance metric used to identify and improve various internal business functions and their resulting external outcomes. Balanced scorecards are used to measure and provide feedback to organizations. Data collection is crucial to providing quantitative results as managers and executives gather and interpret the information and use it to make better decisions for the organization.</p>',
      };
      const glossaries = new Glossaries();
      glossaries.title = glossariesData.title;
      glossaries.description = glossariesData.description;
      const newGlossaries = await glossaries.save();

      returnAllActivityRecords['glossaries_id'] = newGlossaries?.id;
      returnAllActivityRecords['glossaries_title'] = newGlossaries?.description;

      //Admin Calculation_Types defaults creation
      // 1) FHA
      const FHADataDefaults = {
        FHADefaultTypesData: {
          new_loan_amount: 320000.8,
          property_price_min: 0,
          property_price_max: 2000000,
          property_price: 400000,
          downpayment_min: 3.5,
          property_tax: 1.25,
          hazard_insurance: 800,
          mortgage_term: 30,
          fha_upfront_mip: 1.75,
          min_interest_rate: 0,
          max_interest_rate: 10,
          interest_rate_15: 3.5,
          interest_rate_30: 4.5,
        },

        FHADefaultLoanFactorData: [
          {
            id: '212fd413-4d02-4dc3-a68d-973db6a3e7d8',
            year: 15,
            loan_min: 0,
            loan_max: 625499,
            ltv_min: 0,
            ltv_max: 90,
            fico_min: 0,
            fico_max: 850,
            mi: 0.45,
          },
          {
            id: '292fd413-4d02-4dc3-a68d-973db6a3e7d8',
            year: 15,
            loan_min: 0,
            loan_max: 625499,
            ltv_min: 90,
            ltv_max: 100,
            fico_min: 0,
            fico_max: 850,
            mi: 0.7,
          },
          {
            id: '0513c700-e367-41d1-ac44-842babc0656a',
            year: 15,
            loan_min: 0,
            loan_max: 2000000,
            ltv_min: 0,
            ltv_max: 78,
            fico_min: 0,
            fico_max: 850,
            mi: 0.45,
          },
          {
            id: '026b94a6-28ca-4d5d-add4-3a08cd435000',
            year: 15,
            loan_min: 625500,
            loan_max: 2000000,
            ltv_min: 0,
            ltv_max: 90,
            fico_min: 0,
            fico_max: 850,
            mi: 0.7,
          },
          {
            id: '6d0067cc-3cbf-4f57-8eb2-73814f3ed5f4',
            year: 15,
            loan_min: 625500,
            loan_max: 2000000,
            ltv_min: 90,
            ltv_max: 100,
            fico_min: 0,
            fico_max: 850,
            mi: 0.95,
          },
          {
            id: '583f6c68-b73b-45a2-a2c7-50cf7c03bf1a',
            year: 30,
            loan_min: 0,
            loan_max: 625500,
            ltv_min: 0,
            ltv_max: 95,
            fico_min: 0,
            fico_max: 850,
            mi: 0.8,
          },
          {
            id: '738c2e20-2b5f-4ada-9d53-337f34d004a1',
            year: 30,
            loan_min: 0,
            loan_max: 625500,
            ltv_min: 95,
            ltv_max: 100,
            fico_min: 0,
            fico_max: 850,
            mi: 0.85,
          },
          {
            id: 'c399fa23-03a2-4fdc-a05d-feedfde59a2c',
            year: 30,
            loan_min: 625501,
            loan_max: 2000000,
            ltv_min: 0,
            ltv_max: 95,
            fico_min: 0,
            fico_max: 850,
            mi: 1,
          },
          {
            id: '7a94f497-6141-4ff1-b1a7-7fe290532dbc',
            year: 30,
            loan_min: 625501,
            loan_max: 2000000,
            ltv_min: 95,
            ltv_max: 100,
            fico_min: 0,
            fico_max: 850,
            mi: 1.05,
          },
        ],
        FHA_disclaimer:
          'LoanTack helps you determine your monthly mortgage payment by estimating your total loan amount, mortgage term length, and interest rate. Accurate estimates rely on the user entering accurate FICO score, property taxes and applicable HOA fees. Any calculation results are estimates, not final loan amounts, and are not guaranteed. FHA Disclaimer',
      };

      const calculationTypesFHA = new Calculation_Types();
      calculationTypesFHA.loan_officer_id = newAdmin;
      calculationTypesFHA.calculation_name = CalculationTypeConst.fha;
      calculationTypesFHA.calculator_disclaimer = FHADataDefaults.FHA_disclaimer;
      calculationTypesFHA.calculation_default_values = JSON.stringify({
        ...FHADataDefaults.FHADefaultTypesData,
      });
      calculationTypesFHA.calculation_loan_factors = JSON.stringify(FHADataDefaults?.FHADefaultLoanFactorData);
      calculationTypesFHA.is_enable = true;

      const newcalculationTypesFHA = await calculationTypesFHA.save();
      returnAllActivityRecords['calculation_type_fha_id'] = newcalculationTypesFHA?.id;

      // 2) Conventional
      const ConventionalDataDefaults = {
        ConventionalDefaultTypesData: {
          downpayment_min: 2,
          hazard_insurance: 800,
          interest_rate_15: 2.25,
          interest_rate_30: 3.75,
          max_interest_rate: 5.56,
          min_interest_rate: 1.25,
          mortgage_term: 30,
          new_loan_amount: 320000,
          property_price: 400000,
          property_price_max: 2000000,
          property_price_min: 100000,
          property_tax: 1.25,
          interest_rate_10: 2.25,
          interest_rate_20: 2.27,
        },

        ConventionalDefaultLoanFactorData: [
          {
            id: '292fd413-4d02-4dc3-a68d-973db6a3e7d8',
            year: 30,
            ltv_min: 90,
            ltv_max: 95,
            fico_min: 720,
            fico_max: 759,
            mi: 0.62,
          },
          {
            id: '392fd413-4d02-4dc3-a68d-973db6a3e7d8',
            year: 30,
            ltv_min: 90,
            ltv_max: 95,
            fico_min: 680,
            fico_max: 719,
            mi: 0.89,
          },
          {
            id: '492fd413-4d02-4dc3-a68d-973db6a3e7d8',
            year: 30,
            ltv_min: 90,
            ltv_max: 95,
            fico_min: 300,
            fico_max: 679,
            mi: 1.15,
          },
          {
            id: '592fd413-4d02-4dc3-a68d-973db6a3e7d8',
            year: 30,
            ltv_min: 95,
            ltv_max: 97,
            fico_min: 760,
            fico_max: 850,
            mi: 1.05,
          },
          {
            id: '692fd413-4d02-4dc3-a68d-973db6a3e7d8',
            year: 30,
            ltv_min: 95,
            ltv_max: 97,
            fico_min: 720,
            fico_max: 759,
            mi: 1.1,
          },
          {
            id: '792fd413-4d02-4dc3-a68d-973db6a3e7d8',
            year: 30,
            ltv_min: 95,
            ltv_max: 97,
            fico_min: 680,
            fico_max: 719,
            mi: 1.31,
          },
        ],

        Conventional_disclaimer:
          'LoanTack helps you determine your monthly mortgage payment by estimating your total loan amount, mortgage term length, and interest rate. Accurate estimates rely on the user entering accurate FICO score, property taxes and applicable HOA fees. Any calculation results are estimates, not final loan amounts, and are not guaranteed. Conventional Disclaimer',
      };

      const calculationTypesConventional = new Calculation_Types();
      calculationTypesConventional.loan_officer_id = newAdmin;
      calculationTypesConventional.calculation_name = CalculationTypeConst.conventional;
      calculationTypesConventional.calculator_disclaimer = ConventionalDataDefaults.Conventional_disclaimer;
      calculationTypesConventional.calculation_default_values = JSON.stringify({
        ...ConventionalDataDefaults.ConventionalDefaultTypesData,
      });
      calculationTypesConventional.calculation_loan_factors = JSON.stringify(
        ConventionalDataDefaults.ConventionalDefaultLoanFactorData,
      );
      calculationTypesConventional.is_enable = true;

      const newcalculationTypesConventional = await calculationTypesConventional.save();
      returnAllActivityRecords['calculation_type_conventional_id'] = newcalculationTypesConventional?.id;

      // 3) Jumbo
      const JumboDataDefaults = {
        JumboDefaultTypesData: {
          downpayment_min: 3.5,
          hazard_insurance: 800,
          interest_rate_15: 2.25,
          interest_rate_30: 3.5,
          max_interest_rate: 5.56,
          min_interest_rate: 1.25,
          mortgage_term: 30,
          new_loan_amount: 2000000,
          property_price: 2500000,
          property_price_max: 10000000,
          property_price_min: 1000000,
          property_tax: 1.2,
          interest_rate_10: 2.25,
          interest_rate_20: 2.27,
        },

        JumboDefaultLoanFactorData: [
          {
            id: '292fd413-4d02-4dc3-a68d-973db6a3e7d8',
            year: 30,
            ltv_min: 90,
            ltv_max: 95,
            fico_min: 720,
            fico_max: 759,
            mi: 0.62,
          },
          {
            id: '392fd413-4d02-4dc3-a68d-973db6a3e7d8',
            year: 30,
            ltv_min: 90,
            ltv_max: 95,
            fico_min: 680,
            fico_max: 719,
            mi: 0.89,
          },
          {
            id: '492fd413-4d02-4dc3-a68d-973db6a3e7d8',
            year: 30,
            ltv_min: 90,
            ltv_max: 95,
            fico_min: 300,
            fico_max: 679,
            mi: 1.15,
          },
          {
            id: '592fd413-4d02-4dc3-a68d-973db6a3e7d8',
            year: 30,
            ltv_min: 95,
            ltv_max: 97,
            fico_min: 760,
            fico_max: 850,
            mi: 1.05,
          },
          {
            id: '692fd413-4d02-4dc3-a68d-973db6a3e7d8',
            year: 30,
            ltv_min: 95,
            ltv_max: 97,
            fico_min: 720,
            fico_max: 759,
            mi: 1.1,
          },
          {
            id: '792fd413-4d02-4dc3-a68d-973db6a3e7d8',
            year: 30,
            ltv_min: 95,
            ltv_max: 97,
            fico_min: 680,
            fico_max: 719,
            mi: 1.31,
          },
          {
            id: '892fd413-4d02-4dc3-a68d-973db6a3e7d8',
            year: 30,
            ltv_min: 95,
            ltv_max: 97,
            fico_min: 300,
            fico_max: 679,
            mi: 1.48,
          },
        ],

        Jumbo_disclaimer:
          'LoanTack helps you determine your monthly mortgage payment by estimating your total loan amount, mortgage term length, and interest rate. Accurate estimates rely on the user entering accurate FICO score, property taxes and applicable HOA fees. Any calculation results are estimates, not final loan amounts, and are not guaranteed. JUMBO disclaimer',
      };

      const calculationTypesJumbo = new Calculation_Types();
      calculationTypesJumbo.loan_officer_id = newAdmin;
      calculationTypesJumbo.calculation_name = CalculationTypeConst.jumbo;
      calculationTypesJumbo.calculator_disclaimer = JumboDataDefaults.Jumbo_disclaimer;
      calculationTypesJumbo.calculation_default_values = JSON.stringify({
        ...JumboDataDefaults.JumboDefaultTypesData,
      });
      calculationTypesJumbo.calculation_loan_factors = JSON.stringify(JumboDataDefaults.JumboDefaultLoanFactorData);
      calculationTypesJumbo.is_enable = true;

      const newcalculationTypesJumbo = await calculationTypesJumbo.save();
      returnAllActivityRecords['calculation_type_jumbo_id'] = newcalculationTypesJumbo?.id;

      // 4) USDA
      const USDADataDefaults = {
        USDADefaultTypesData: {
          downpayment_min: 3.5,
          hazard_insurance: 800,
          interest_rate_15: 2.25,
          interest_rate_30: 4.5,
          max_interest_rate: 5.56,
          min_interest_rate: 1.25,
          mortgage_term: 15,
          new_loan_amount: 400000,
          property_price: 500000,
          property_price_max: 10000000,
          property_price_min: 400000,
          property_tax: 1.25,
          usda_guarantee_fees: 1.5,
          interest_rate_10: 2.25,
          interest_rate_20: 2.27,
        },

        USDADefaultLoanFactorData: [
          {
            id: '292fd413-4d02-4dc3-a68d-973db6a3e7d8',
            ltv_min: 0,
            ltv_max: 100,
            fico_min: 0,
            fico_max: 850,
            mi: 0.35,
          },
        ],

        USDA_disclaimer:
          'LoanTack helps you determine your monthly mortgage payment by estimating your total loan amount, mortgage term length, and interest rate. Accurate estimates rely on the user entering accurate FICO score, property taxes and applicable HOA fees. Any calculation results are estimates, not final loan amounts, and are not guaranteed.\nUSDA Disclaimer',
      };

      const calculationTypesUSDA = new Calculation_Types();
      calculationTypesUSDA.loan_officer_id = newAdmin;
      calculationTypesUSDA.calculation_name = CalculationTypeConst.usda;
      calculationTypesUSDA.calculator_disclaimer = USDADataDefaults.USDA_disclaimer;
      calculationTypesUSDA.calculation_default_values = JSON.stringify({
        ...USDADataDefaults.USDADefaultTypesData,
      });
      calculationTypesUSDA.calculation_loan_factors = JSON.stringify(USDADataDefaults.USDADefaultLoanFactorData);
      calculationTypesUSDA.is_enable = true;

      const newcalculationTypesUSDA = await calculationTypesUSDA.save();
      returnAllActivityRecords['calculation_type_usda_id'] = newcalculationTypesUSDA?.id;

      // 5) VA
      const VADataDefaults = {
        VADefaultTypesData: {
          downpayment_min: 0,
          hazard_insurance: 1800,
          interest_rate_15: 2.25,
          interest_rate_30: 3.5,
          max_interest_rate: 5.56,
          min_interest_rate: 1.25,
          mortgage_term: 30,
          new_loan_amount: 1200000,
          property_price: 1500000,
          property_price_max: 8000000,
          property_price_min: 1000000,
          property_tax: 1.25,
          mi: 0.35,
          interest_rate_10: 2.25,
          interest_rate_20: 2.27,
        },

        VADefaultLoanFactorData: [
          {
            id: 1,
            name: 'Regular Military',
            down_0: { first: 2.3, subsequent: 3.6 },
            down_5: { first: 1.65, subsequent: 1.65 },
            down_10: { first: 1.4, subsequent: 1.4 },
          },
          {
            id: 2,
            name: 'Reserves/National Guard',
            down_0: { first: 2.3, subsequent: 3.6 },
            down_5: { first: 1.65, subsequent: 1.65 },
            down_10: { first: 1.4, subsequent: 1.4 },
          },
        ],

        VA_disclaimer:
          'LoanTack helps you determine your monthly mortgage payment by estimating your total loan amount, mortgage term length, and interest rate. Accurate estimates rely on the user entering accurate FICO score, property taxes and applicable HOA fees. Any calculation results are estimates, not final loan amounts, and are not guaranteed.\nVA Disclaimer',
      };

      const calculationTypesVA = new Calculation_Types();
      calculationTypesVA.loan_officer_id = newAdmin;
      calculationTypesVA.calculation_name = CalculationTypeConst.va;
      calculationTypesVA.calculator_disclaimer = VADataDefaults.VA_disclaimer;
      calculationTypesVA.calculation_default_values = JSON.stringify({
        ...VADataDefaults.VADefaultTypesData,
      });
      calculationTypesVA.calculation_loan_factors = JSON.stringify(VADataDefaults.VADefaultLoanFactorData);
      calculationTypesVA.is_enable = true;

      const newcalculationTypesVA = await calculationTypesVA.save();
      returnAllActivityRecords['calculation_type_va_id'] = newcalculationTypesVA?.id;

      // 6) Affordability
      const AffordabilityDataDefaults = {
        AffordabilityDefaultTypesData: {
          downpayment_min: 3.5,
          hazard_insurance: 1800,
          interest_rate_15: 2.25,
          interest_rate_30: 3.5,
          max_interest_rate: 5.56,
          min_interest_rate: 1.25,
          mortgage_term: 30,
          new_loan_amount: 280000,
          property_price: 350000,
          property_price_max: 10000000,
          property_price_min: 0,
          property_tax: 1.2,
          annual_gross_income: 1250000,
          annual_gross_income_max: 3000000,
          annual_gross_income_min: 0,
          mi: 0.125,
          monthly_debts: 10000,
          monthly_debts_max: 25000,
          monthly_debts_min: 0,
          interest_rate_10: 2.25,
          interest_rate_20: 2.27,
        },

        AffordabilityDefaultLoanFactorData: [
          {
            id: '292fd413-4d02-4dc3-a68d-973db6a3e7d8',
            ltv_min: 0,
            ltv_max: 24,
            fico_min: 0,
            fico_max: 750,
            mi: 0.32,
          },
          {
            id: '392fd413-4d02-4dc3-a68d-973db6a3e7d8',
            ltv_min: 25,
            ltv_max: 50,
            fico_min: 0,
            fico_max: 850,
            mi: 0.25,
          },
          {
            id: '492fd413-4d02-4dc3-a68d-973db6a3e7d8',
            ltv_min: 51,
            ltv_max: 100,
            fico_min: 0,
            fico_max: 850,
            mi: 0.35,
          },
          {
            id: '7c6073e8-6002-4e59-9807-79ebd42fd4dd',
            ltv_min: 40,
            ltv_max: 100,
            fico_min: 0,
            fico_max: 850,
            mi: 0.12,
          },
        ],

        Affordability_disclaimer:
          'Affordability Disclaimer - LoanTack helps you determine your monthly mortgage payment by estimating your total loan amount, mortgage term length, and interest rate. Accurate estimates rely on the user entering accurate FICO score, property taxes and applicable HOA fees. Any calculation results are estimates, not final loan amounts, and are not guaranteed.',
      };

      const calculationTypesAffordability = new Calculation_Types();
      calculationTypesAffordability.loan_officer_id = newAdmin;
      calculationTypesAffordability.calculation_name = CalculationTypeConst.affordability;
      calculationTypesAffordability.calculator_disclaimer = AffordabilityDataDefaults.Affordability_disclaimer;
      calculationTypesAffordability.calculation_default_values = JSON.stringify({
        ...AffordabilityDataDefaults.AffordabilityDefaultTypesData,
      });
      calculationTypesAffordability.calculation_loan_factors = JSON.stringify(
        AffordabilityDataDefaults.AffordabilityDefaultLoanFactorData,
      );
      calculationTypesAffordability.is_enable = true;

      const newcalculationTypesAffordability = await calculationTypesAffordability.save();
      returnAllActivityRecords['calculation_type_affordability_id'] = newcalculationTypesAffordability?.id;

      // 7) Should I Refinance
      const ShouldRefinanceDataDefaults = {
        ShouldRefinanceDefaultTypesData: {},

        ShouldRefinanceDefaultLoanFactorData: [],

        ShouldRefinance_disclaimer: '',
      };

      const calculationTypesShouldRefinance = new Calculation_Types();
      calculationTypesShouldRefinance.loan_officer_id = newAdmin;
      calculationTypesShouldRefinance.calculation_name = CalculationTypeConst.should_refinance;
      calculationTypesShouldRefinance.calculator_disclaimer = ShouldRefinanceDataDefaults.ShouldRefinance_disclaimer;
      calculationTypesShouldRefinance.calculation_default_values = JSON.stringify({
        ...ShouldRefinanceDataDefaults.ShouldRefinanceDefaultTypesData,
      });
      calculationTypesShouldRefinance.calculation_loan_factors = JSON.stringify(
        ShouldRefinanceDataDefaults.ShouldRefinanceDefaultLoanFactorData,
      );

      const newcalculationTypesShouldRefinance = await calculationTypesShouldRefinance.save();
      returnAllActivityRecords['calculation_type_should_refinance_id'] = newcalculationTypesShouldRefinance?.id;

      //Admin Messages defaults creation
      const messagesData = {
        message_title: 'Announcements',
        message_body: 'This is to notify you that our portal is under staging.',
      };

      const messages = new Messages();
      messages.message_title = messagesData.message_title;
      messages.message_body = messagesData.message_body;
      const newMessages = await messages.save();

      returnAllActivityRecords['messages_id'] = newMessages?.id;
      returnAllActivityRecords['messages_title'] = newMessages?.message_title;
      //Admin Messages notification
      const push_notification = new Push_Notifications();
      push_notification.notification_by = newAdmin;
      push_notification.notification_text = `ADMIN: ${messagesData.message_title}`;
      push_notification.notification_category = NOTIFICATION_CATEGORY.Receives_msg_admin;
      const newPushNotification = await push_notification.save();

      returnAllActivityRecords['push_notification_id'] = newPushNotification?.id;
      returnAllActivityRecords['push_notification_text'] = newPushNotification?.notification_text;

      //Admin Checklists defaults creation
      const checklistsData = {
        checklist_name: 'Items Needed',
        checklist_items: [
          {
            id: '2800a93c-cf1a-421e-8a36-11a0f7a523d0',
            name: "Driver's License",
          },
          {
            id: 'dd596b40-1e85-4768-a36d-aa1e8937afc1',
            name: 'Social Security Card',
          },
          { id: 'f52c641a-010a-4875-aca9-5a744bd8dc28', name: 'W2s' },
        ],
      };

      const newChecklist = new Checklists();
      newChecklist.checklist_name = checklistsData.checklist_name;
      newChecklist.check_list_required_items = JSON.stringify(checklistsData.checklist_items);
      newChecklist.loan_officer_id = newAdmin;
      newChecklist.is_default = true;
      newChecklist.sequence_number = 1;

      const createdChecklist = await newChecklist.save();

      returnAllActivityRecords['checklists_id'] = createdChecklist?.id;
      returnAllActivityRecords['checklists_name'] = createdChecklist?.checklist_name;

      //Admin Service Fees defaults creation
      const serviceFeesData = [
        {
          service_name: 'Administrative',
          service_fee: 1500,
        },
        {
          service_name: 'Application',
          service_fee: 500,
        },
        {
          service_name: 'Appraisal',
          service_fee: 500,
        },
        {
          service_name: 'Closing',
          service_fee: 0,
        },
        {
          service_name: 'Commitment',
          service_fee: 0,
        },
        {
          service_name: 'Courier',
          service_fee: 0,
        },
        {
          service_name: 'Credit Report',
          service_fee: 0,
        },
        {
          service_name: 'Document Prep',
          service_fee: 0,
        },
        {
          service_name: 'Flood',
          service_fee: 0,
        },
        {
          service_name: 'Inspection',
          service_fee: 0,
        },
        {
          service_name: 'Notary',
          service_fee: 0,
        },
        {
          service_name: 'Processing',
          service_fee: 0,
        },
        {
          service_name: 'Recording',
          service_fee: 0,
        },
        {
          service_name: 'Survey',
          service_fee: 0,
        },
        {
          service_name: 'Tax Service',
          service_fee: 0,
        },
        {
          service_name: 'Underwriting',
          service_fee: 0,
        },
        {
          service_name: 'Wire Transfer',
          service_fee: 0,
        },
        {
          service_name: 'Other',
          service_fee: 0,
        },
      ];

      await Promise.all(
        serviceFeesData.map(async serviceFee => {
          const newServiceFees = new Service_Fees();
          newServiceFees.loan_officer_id = newAdmin.id;
          newServiceFees.service_name = serviceFee.service_name;
          newServiceFees.service_fee = serviceFee.service_fee;
          newServiceFees.is_default = true;

          await newServiceFees.save();
        }),
      );

      return ResponseMap(returnAllActivityRecords, 'Success all done');
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/script/extra-col-null')
  async nullExtraColOfLoanOfficier(): Promise<{ message: string }> {
    const loOfficers = await Loan_Officers_Details.find();

    await Promise.all(
      loOfficers.map(async loOfficer => {
        loOfficer.extra_column = null;
        loOfficer.save();
      }),
    );

    return ResponseMap({ message: 'Success updated to null' });
  }

  @Get('/script/update-links-type')
  async udpateDefaultColumnsToBlobLinks(): Promise<{ message: string }> {
    const loOfficers = await Loan_Officers_Details.find();

    await Promise.all(
      loOfficers.map(async loOfficer => {
        const dasboardMenu = loOfficer.dashboard_menu_details ?? null;
        const dasboardCompanyMenu = loOfficer.dashboard_company_links ?? null;
        const dasboardCustomMenu = loOfficer.dashboard_menu_custom_links ?? null;
        const appMenu = loOfficer.app_menu_details ?? null;
        const appCompanyMenu = loOfficer.appMenu_company_links ?? null;
        const appCustomMenu = loOfficer.app_menu_custom_links ?? null;

        loOfficer.extra_column = JSON.stringify({
          dasboardMenu,
          dasboardCompanyMenu,
          dasboardCustomMenu,
          appMenu,
          appCompanyMenu,
          appCustomMenu,
        });
        loOfficer.save();
      }),
    );

    return ResponseMap({ message: 'Success updated the links type 🌎' });
  }

  @Get('/script/add-data-to-col')
  async addMenuLinkToColOfLoanOfficier(): Promise<{ message: string }> {
    const loOfficers = await Loan_Officers_Details.find();

    await Promise.all(
      loOfficers.map(async loOfficer => {
        const data = JSON.parse(loOfficer.extra_column);
        loOfficer.dashboard_menu_details = data.dasboardMenu;
        loOfficer.dashboard_company_links = data.dasboardCompanyMenu;
        loOfficer.dashboard_menu_custom_links = data.dasboardCustomMenu;
        loOfficer.app_menu_details = data.appMenu;
        loOfficer.appMenu_company_links = data.appCompanyMenu;
        loOfficer.app_menu_custom_links = data.appCustomMenu;

        loOfficer.save();
      }),
    );

    return ResponseMap({ message: 'Success updated col to menus' });
  }

  @Get('/script/remove-dm-links')
  async removeDMFromExistingLinks(): Promise<{ message: string }> {
    const loOfficers = await Loan_Officers_Details.find();

    await Promise.all(
      loOfficers.map(async loOfficer => {
        let dasboardMenu = loOfficer.dashboard_menu_details ? JSON.parse(loOfficer.dashboard_menu_details) : null;
        let dasboardCompanyMenu = loOfficer.dashboard_company_links
          ? JSON.parse(loOfficer.dashboard_company_links)
          : null;
        let appMenu = loOfficer.app_menu_details ? JSON.parse(loOfficer.app_menu_details) : null;
        let appCompanyMenu = loOfficer.appMenu_company_links ? JSON.parse(loOfficer.appMenu_company_links) : null;

        if (dasboardMenu) {
          dasboardMenu = dasboardMenu.filter(menu => menu.id !== 'MESSAGE' && menu.name !== 'DM');
          loOfficer.dashboard_menu_details = JSON.stringify(dasboardMenu);
        }
        if (dasboardCompanyMenu) {
          dasboardCompanyMenu = dasboardCompanyMenu.filter(menu => menu.id !== 'MESSAGE' && menu.name !== 'DM');
          loOfficer.dashboard_company_links = JSON.stringify(dasboardCompanyMenu);
        }
        if (appMenu) {
          appMenu = appMenu.filter(menu => menu.id !== 'MESSAGE' && menu.name !== 'DM');
          loOfficer.app_menu_details = JSON.stringify(appMenu);
        }
        if (appCompanyMenu) {
          appCompanyMenu = appCompanyMenu.filter(menu => menu.id !== 'MESSAGE' && menu.name !== 'DM');
          loOfficer.appMenu_company_links = JSON.stringify(appCompanyMenu);
        }

        await loOfficer.save();
      }),
    );

    return ResponseMap({ message: 'Success removed dm' });
  }

  @Get('/script/add-dm-links')
  async addDMForExistingLinks(): Promise<{ message: string }> {
    const loOfficers = await Loan_Officers_Details.find();

    await Promise.all(
      loOfficers.map(async loOfficer => {
        let dasboardMenu = loOfficer.dashboard_menu_details ? JSON.parse(loOfficer.dashboard_menu_details) : null;
        let appMenu = loOfficer.app_menu_details ? JSON.parse(loOfficer.app_menu_details) : null;

        if (dasboardMenu) {
          dasboardMenu.push({
            id: 'MESSAGE',
            type: 1,
            name: 'DM',
            sequence: Object.keys(dasboardMenu).length + 1,
            icon: {
              white: getWhiteIcons('message'),
              gray: getGrayIcons('message'),
              green: getGreenIcons('message'),
            },
          });
          loOfficer.dashboard_menu_details = JSON.stringify(dasboardMenu);
        }
        if (appMenu) {
          appMenu.push({
            id: 'MESSAGE',
            type: 1,
            name: 'DM',
            sequence: Object.keys(dasboardMenu).length + 1,
            icon: {
              white: getWhiteIcons('message'),
              gray: getGrayIcons('message'),
              green: getGreenIcons('message'),
            },
          });
          loOfficer.app_menu_details = JSON.stringify(appMenu);
        }

        await loOfficer.save();
      }),
    );

    return ResponseMap({ message: 'Success add dm' });
  }

  public hashpassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  @Get('/script/update-links-for-employee-lo/:id')
  async updateEmployeeLoLinks(@Param('id') id: number): Promise<{ message: string }> {
    const brandedAppDetails = await Branded_App_Users.findOne({
      where: {
        loan_officer_id: id,
        status: 1,
        reject_reason: IsNull(),
        deleted_at: IsNull(),
      },
    });

    if (brandedAppDetails) {
      const employeeLo = await Users.find({
        where: {
          parent_id: id,
          role: UserRole.LO,
          deleted_at: IsNull(),
        },
      });

      employeeLo.map(async employee => {
        const loanOfficerDetail = await Loan_Officers_Details.findOne({
          where: {
            user_id: employee,
            deleted_at: IsNull(),
          },
        });

        let companyLinkObject = JSON.parse(loanOfficerDetail.appMenu_company_links);

        companyLinkObject = companyLinkObject.filter(link => link.id !== 'REVIEWS');
        loanOfficerDetail.appMenu_company_links = JSON.stringify(companyLinkObject);
        await loanOfficerDetail.save();
      });
    }
    return ResponseMap({ message: 'Successfully updated the links' });
  }

  @Get('/script/update-links-for-profile')
  async updateDashboardHeaderLinks(): Promise<{ message: string }> {
    const userDetails = await Users.find({
      where: {
        role: UserRole.LO,
        deleted_at: IsNull(),
      },
    });

    userDetails.map(async user => {
      const loanOfficerDetail = await Loan_Officers_Details.findOne({
        where: {
          user_id: user,
          deleted_at: IsNull(),
        },
      });

      loanOfficerDetail.profile_links = profileLinks(user, '');
      await loanOfficerDetail.save();
    });

    return ResponseMap({ message: 'Successfully updated the dashboard header links' });
  }

  // Add appointment label in dashboard header links
  @Get('/script/add_appointment_label')
  async addLabel(): Promise<{ message: string }> {
    const userDetails = await Users.find({
      where: {
        role: UserRole.LO,
        deleted_at: IsNull(),
      },
    });

    userDetails.map(async user => {
      const loanOfficerDetail = await Loan_Officers_Details.findOne({
        where: {
          user_id: user,
          deleted_at: IsNull(),
        },
      });

      const links: any = JSON.parse(loanOfficerDetail.profile_links);

      if (links) {
        links['appointment'].appointment_label = "Label";
        loanOfficerDetail.profile_links = JSON.stringify(links);
        await loanOfficerDetail.save();
      }
    });

    return ResponseMap({ message: 'Successfully updated the dashboard header links - appointment label' });
  }

  @Get('/script/update-deep-link')
  async updateDeepLinks(): Promise<{ message: string }> {
    const loDetails = await Loan_Officers_Details.find({
      where: {
        deleted_at: IsNull(),
      },
    });

    loDetails.forEach(async loan_officer => {
      const user = await Users.findOne({
        where: {
          id: loan_officer.user_id,
          deleted_at: IsNull(),
        },
      });

      const brandedAppUserDetails = await Branded_App_Users.findOne({
        where: {
          loan_officer_id: user.parent_id ? user.parent_id : user.id,
          status: BrandedApp_Approved_Status.active,
          reject_reason: IsNull(),
          deleted_at: IsNull(),
        },
      });

      // co branding users and employee LOs
      const coBrandedUsers = await Users.find({
        where: {
          parent_id: loan_officer.user_id,
          role: In([2, 5]),
          deleted_at: IsNull(),
        },
      });

      if (loan_officer.qr_code) {
        const qrcode = JSON.parse(loan_officer.qr_code);
        const qrcodeLink = qrcode.map(element => ({
          link: element.link,
        }));
        for (let i = 0; i < qrcodeLink.length; i++) {
          await removeImageToS3(`${qrcodeLink[i].link}`, process.env.AWS_S3_BUCKET_QRCODE);
        }
      }

      coBrandedUsers.map(async element => {
        const coBrandedDetails = await Loan_Officers_Details.findOne({
          where: {
            user_id: element.id,
            deleted_at: null,
          },
        });
        if (coBrandedDetails) {
          if (coBrandedDetails.qr_code) {
            const qrcode = JSON.parse(coBrandedDetails.qr_code);
            const qrcodeLink = qrcode.map(element => ({
              link: element.link,
            }));
            for (let i = 0; i < qrcodeLink.length; i++) {
              await removeImageToS3(`${qrcodeLink[i].link}`, process.env.AWS_S3_BUCKET_QRCODE);
            }
          }
          coBrandedDetails.link = await addDeepLinkBranch(this.httpService, {
            config_id: brandedAppUserDetails?.config_id ? brandedAppUserDetails.config_id : null,
            id: element.id,
          });
          coBrandedDetails.qr_code = JSON.stringify(await createQrCode(QRCODE_DEFULT_SIZES, coBrandedDetails.link));
          await coBrandedDetails.save();
        }
      });

      loan_officer.link = await addDeepLinkBranch(this.httpService, {
        config_id: brandedAppUserDetails?.config_id ? brandedAppUserDetails.config_id : null,
        id: loan_officer.user_id,
      });
      loan_officer.qr_code = JSON.stringify(await createQrCode(QRCODE_DEFULT_SIZES, loan_officer.link));
      await loan_officer.save();
    });

    return ResponseMap({ message: 'Successfully updated deep-link' });
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const readFilePromise = file => {
  let data = fs.readFileSync(file);
  return data;
};
