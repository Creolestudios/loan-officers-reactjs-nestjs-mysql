import { HttpModule, Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription_Plans } from 'src/shared/entity/subscription_plans.entity';
import { Billing_Details } from 'src/shared/entity/billing_details.entity';
import { Loan_Officers_Details } from 'src/shared/entity/loan_officers_details.entity';
import { Users } from 'src/shared/entity/users.entity';
import { AuthModule } from 'src/web/auth/auth.module';
import { Branded_App_Users } from 'src/shared/entity/branded_app_users.entity';
import { Branded_App_Info } from 'src/shared/entity/branded_app_info.entity';
import { Promo_Codes } from 'src/shared/entity/promo_codes.entity';
import { Future_Promo_Codes } from 'src/shared/entity/future_promo_codes.entity';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Subscription_Plans, Future_Promo_Codes, Promo_Codes, Branded_App_Info, Loan_Officers_Details, Billing_Details, Users, Branded_App_Users]),
    AuthModule,
  ],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
})
export class SubscriptionModule { }
