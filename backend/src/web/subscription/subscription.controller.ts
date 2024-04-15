import {
  Controller,
  UseInterceptors,
  Post,
  HttpCode,
  Get,
  Body,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  HttpStatus,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { WEB, PREFIX } from 'src/utils/constant';
import { SentryInterceptor } from 'src/shared/interceptor/sentry.interceptor';
import { JwtWebLOAuthGuard } from 'src/web/auth/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { SubscriptionService } from './subscription.service';
import { GetUser } from 'src/shared/get-user.decorator';
import { Users } from 'src/shared/entity/users.entity';
import { GlobalResponseType } from 'src/utils/types';
import {
  SubscriptionDto,
  PromocodeDto,
  AddLODto,
  BrandedAppApplyDto,
  BrandedAppSubscriptionDto,
} from 'src/dto/subscription.dto';

@Controller(`${WEB}${PREFIX}/subscription`)
@UseInterceptors(SentryInterceptor)
@ApiTags('Web')
export class SubscriptionController {
  constructor(private subscriptionService: SubscriptionService) {}

  /**
   *
   * @param subscription_type type of subscription(Standard,BrandedApp)
   * @param user Lo details
   * @returns Details of the type of subscription of the LO
   */
  // ANCHOR Get Subscription details of LO
  @Get('/type/:subscription_type')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtWebLOAuthGuard)
  getSubscription(@Param('subscription_type') subscription_type: string, @GetUser() user: Users): GlobalResponseType {
    return this.subscriptionService.getSubscription(user, subscription_type);
  }

  /**
   *
   * @param subscriptionDto Subscription Plan id and card details.
   * @param user Lo details
   * @returns Stripe customer id and Success message
   */
  //ANCHOR - CREATE SUBSCRIPTION FOR LO
  @Post()
  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  @UseGuards(JwtWebLOAuthGuard)
  createSubscriptionForLO(@Body() subscriptionDto: SubscriptionDto, @GetUser() user: Users): GlobalResponseType {
    return this.subscriptionService.createSubscriptionForLO(user, subscriptionDto);
  }

  /**
   *
   * @param user lo details
   * @returns List of billing details of a LO for standard subscription
   */
  //ANCHOR - BILLING HISTORY Standard Subscription
  @Get('/billing-history')
  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  @UseGuards(JwtWebLOAuthGuard)
  getBillingHistory(@GetUser() user: Users): GlobalResponseType {
    return this.subscriptionService.billingHistory(user);
  }

  /**
   *
   * @param user LO details
   * @returns List of billing details of LO for brandedApp
   */
  //ANCHOR - BILLING HISTORY BRANDAPP
  @Get('/branded-app/billing-history')
  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  @UseGuards(JwtWebLOAuthGuard)
  getBillingHistoryForBrandedApp(@GetUser() user: Users): GlobalResponseType {
    return this.subscriptionService.billingHistoryForBrandedApp(user);
  }

  /**
   *
   * @param user LO details
   * @returns Payment details of the branded app
   */
  //ANCHOR - BRANDAPP PAYMENT DETAILS
  @Get('/payment')
  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  @UseGuards(JwtWebLOAuthGuard)
  getBillingDeatilsForPayment(@GetUser() user: Users): GlobalResponseType {
    return this.subscriptionService.getBillingDeatilsForPayment(user);
  }

  /**
   *
   * @param subscriptionDto brandedApp subscription details
   * @param user LO details
   * @returns Success message if branded app is subscribed
   */
  //ANCHOR - CREATE BRANDAPP SUBSCRIPTION FOR LO
  @Post('/branded-app')
  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  @UseGuards(JwtWebLOAuthGuard)
  createSubscriptionForBrandedApp(
    @Body() subscriptionDto: BrandedAppSubscriptionDto,
    @GetUser() user: Users,
  ): GlobalResponseType {
    return this.subscriptionService.createSubscriptionForBrandedApp(user, subscriptionDto);
  }

  /**
   *
   * @param subscription_type (standard,brandedApp) which type of subscription to be cancelled
   * @param branded_user_id brandedAppUser id, if brandedApp cancel
   * @param user LO details
   * @returns Success message on cancel subscription
   */
  //ANCHOR - CANCEL SUBSCRIPTION FOR LO : STANDARD and BRANDED
  @Get('/cancel/:subscription_type')
  @HttpCode(HttpStatus.OK)
  @UsePipes(
    new ValidationPipe({
      transform: true,
    }),
  )
  @UseGuards(JwtWebLOAuthGuard)
  cancelSubscription(
    @Param('subscription_type') subscription_type: string,
    @Query('branded_user_id') branded_user_id: number,
    @GetUser() user: Users,
  ): GlobalResponseType {
    return this.subscriptionService.cancelSubscription(user, subscription_type, branded_user_id);
  }

  /**
   *
   * @returns Branded App information
   */
  //ANCHOR - BRANDED APP INFORMATION FOR LO
  @Get('/branded-app/information')
  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  @UseGuards(JwtWebLOAuthGuard)
  brandedAppInformation(): GlobalResponseType {
    return this.subscriptionService.brandedAppInformation();
  }

  /**
   *
   * @param user Lo details
   * @returns List of all (Employee)loan officers under the current LO
   */
  // ANCHOR - List of all (Employee)Loan officer under current LO
  @Get('/branded-app/user')
  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  @UseGuards(JwtWebLOAuthGuard)
  getBrandedAppUser(@GetUser() user: Users): GlobalResponseType {
    return this.subscriptionService.getLO(user);
  }

  /**
   *
   * @param addLoDto name and email of lo to be added
   * @param user Lo details
   * @returns Success if loanofficer added as employee.
   */
  // ANCHOR Add Employee for LO
  @Post('/branded-app/add-lo')
  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  @UseGuards(JwtWebLOAuthGuard)
  addLoanOfficer(@Body() addLoDto: AddLODto, @GetUser() user: Users): GlobalResponseType {
    return this.subscriptionService.addLoanOfficer(user, addLoDto);
  }

  /**
   *
   * @param id id of employee to be removed
   * @param user Lo details
   * @returns id of the removed employee
   */
  // ANCHOR Remove employee for loan officer
  @Delete('/branded-app/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtWebLOAuthGuard)
  @UsePipes(ValidationPipe)
  deleteEmailSignature(@Param('id') id: number, @GetUser() user: Users): GlobalResponseType {
    return this.subscriptionService.deleteLoanOfficer(id, user);
  }

  /**
   *
   * @param brandedAppApplyDto (name,email,company_name,app_name) details for brandedApp request
   * @param user Lo details
   * @returns Success message if requested(applied) for brandedApp
   */
  @Post('/branded-app/apply')
  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  @UseGuards(JwtWebLOAuthGuard)
  brandedAppApply(@Body() brandedAppApplyDto: BrandedAppApplyDto, @GetUser() user: Users): GlobalResponseType {
    return this.subscriptionService.brandedAppApply(user, brandedAppApplyDto);
  }

  /**
   *
   * @param id id of brandedAppUser to check if brandedApp is approved or not
   * @returns Success message if brandedApp is approved
   */
  // ANCHOR Check if Branded app approved or not
  @Get('/branded-app/approved/:id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  @UseGuards(JwtWebLOAuthGuard)
  brandedAppApproved(@Param('id') id: number): GlobalResponseType {
    return this.subscriptionService.brandedAppApproved(id);
  }

  /**
   *
   * @param user Lo details
   * @returns list of details of subscription plans
   */
  //ANCHOR - GET SUBSCRIPTION PLANS List
  @Get('/plan')
  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  @UseGuards(JwtWebLOAuthGuard)
  getSubscriptionPlan(): GlobalResponseType {
    return this.subscriptionService.getSubscriptionPlan();
  }

  /**
   *
   * @param promocodeDto promocode to be added as future code
   * @param user Lo details
   * @returns Success message if future promocode added
   */
  //ANCHOR - Apply future Promo Code
  @Post('/promocode/apply')
  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  @UseGuards(JwtWebLOAuthGuard)
  promocodeApply(@Body() promocodeDto: PromocodeDto, @GetUser() user: Users): GlobalResponseType {
    return this.subscriptionService.promocodeApply(user, promocodeDto);
  }

  /**
   *
   * @param user Lo details
   * @returns canAdd flag if a user can add more future promocodes AND
   * List of all applied futureCodes and their status in->isActive (promocode,discountType,discount,isActive)
   */
  //ANCHOR - GET future Promo Codes and Flag if a user can add more promocodes or not
  @Get('/promocode/apply')
  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  @UseGuards(JwtWebLOAuthGuard)
  getFuturePromocodes(@GetUser() user: Users): GlobalResponseType {
    return this.subscriptionService.getFuturePromocodes(user);
  }

  /**
   *
   * @param user LO details
   * @returns playstore status and brandedApp status of LO's brandedApp
   */
  //ANCHOR - GET PLAYSTORE STATUS and BrandedApp Status FOR BRANDEDAPP
  @Get('/playstore-status')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtWebLOAuthGuard)
  @UsePipes(ValidationPipe)
  getPlaystoreStatus(@GetUser() user: Users): GlobalResponseType {
    return this.subscriptionService.getPlaystoreStatus(user);
  }
}
