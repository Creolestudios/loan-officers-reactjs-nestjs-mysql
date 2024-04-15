import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/web/auth/auth.module';
import { Loan_Officers_Details } from 'src/shared/entity/loan_officers_details.entity';
import { Users } from 'src/shared/entity/users.entity';
import { CalculationController } from './calculation.controller';
import { CalculationService } from './calculation.service';
import { Calculation_Types } from 'src/shared/entity/calculation_types.entity';
import { Calculations } from 'src/shared/entity/calculations.entity';
import { Service_Fees } from 'src/shared/entity/service_fees.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Loan_Officers_Details, Calculation_Types, Calculations, Service_Fees]),
    AuthModule,
  ],
  controllers: [CalculationController],
  providers: [CalculationService],
})
export class CalculationModule {}
