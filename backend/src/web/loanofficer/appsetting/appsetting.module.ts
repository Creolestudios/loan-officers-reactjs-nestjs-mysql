import { Module } from '@nestjs/common';
import { AppsettingController } from './appsetting.controller';
import { AppsettingService } from './appsetting.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/shared/entity/users.entity';
import { Loan_Officers_Details } from 'src/shared/entity/loan_officers_details.entity';
import { User_Address } from 'src/shared/entity/user_address.entity';
import { AuthModule } from 'src/web/auth/auth.module';
import { Branded_App_Users } from 'src/shared/entity/branded_app_users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Loan_Officers_Details, User_Address, Branded_App_Users]), AuthModule],
  controllers: [AppsettingController],
  providers: [AppsettingService],
})
export class AppsettingModule { }
