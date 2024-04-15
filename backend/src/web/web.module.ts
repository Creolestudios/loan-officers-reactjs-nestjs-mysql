import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SupportModule } from './support/support.module';
import { UserModule } from './user/user.module';
import { LoanofficerModule } from './loanofficer/loanofficer.module';
import { AdminModule } from './admin/admin.module';
import { SubscriptionModule } from './subscription/subscription.module';

@Module({
  imports: [AuthModule, SupportModule, UserModule, LoanofficerModule, AdminModule, SubscriptionModule],
})
export class WebModule {}
