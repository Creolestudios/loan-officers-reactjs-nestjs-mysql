import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsIn,
  ValidateIf,
  ValidateNested,
  IsObject,
  IsBoolean,
  IsUUID,
  IsOptional,
  Min,
  Max,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CalculationTypeConst, MAXCALCULATORVAL } from 'src/utils/constant';

export class ServiceFeesUpdateDto {}

export class CalculationDefaultTypeDto {
  @IsNotEmpty()
  @IsString()
  @IsIn(['fha', 'conventional', 'jumbo', 'usda', 'va', 'affordability', 'should_refinance'])
  type: string;
}

export class CalculationChangeTypeDto extends CalculationDefaultTypeDto {
  @IsNotEmpty()
  @IsBoolean()
  is_enable: boolean;
}
export class CalculationCategoryDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsIn(['purchase', 'refinance'])
  category: string;

  @ValidateIf(value => value.category === 'refinance')
  @IsNotEmpty()
  @IsNumber()
  new_loan_amount: number;

  @ValidateIf(value => value.category === 'purchase')
  @IsNotEmpty()
  @IsNumber()
  downpayment_min: number;
}
export class FiltrationDto extends CalculationCategoryDto {
  @IsNotEmpty()
  @IsString()
  @IsIn(['conventional', 'jumbo'])
  type: string;

  @IsNotEmpty()
  @IsNumber()
  property_price: number;

  @IsNotEmpty()
  @IsNumber()
  @IsIn([10, 15, 20, 30])
  mortgage_term: number;
}
export class FhaCalulateDto extends CalculationCategoryDto {
  @IsNotEmpty()
  @IsNumber()
  property_price: number;

  // @ValidateIf(value => value.category === 'refinance')
  @IsNotEmpty()
  @IsNumber()
  annual_property_tax: number;

  @IsNotEmpty()
  @IsNumber()
  hazard_insurance: number;

  @IsNotEmpty()
  @IsNumber()
  monthly_hoa: number;

  @IsNotEmpty()
  @IsNumber()
  @IsIn([15, 30])
  mortgage_term: number;

  @IsNotEmpty()
  @IsNumber()
  interest_rate: number;
}

export class ConventionalCalulateDto extends CalculationCategoryDto {
  @IsNotEmpty()
  @IsNumber()
  property_price: number;

  @IsNotEmpty()
  @IsNumber()
  annual_property_tax: number;

  @IsNotEmpty()
  @IsNumber()
  hazard_insurance: number;

  @IsNotEmpty()
  @IsString()
  credit_id: string;

  @IsNotEmpty()
  @IsNumber()
  monthly_hoa: number;

  @IsNotEmpty()
  @IsNumber()
  @IsIn([10, 15, 20, 30])
  mortgage_term: number;

  @IsNotEmpty()
  @IsNumber()
  interest_rate: number;
}

export class JumboCalculateDto {
  @IsNotEmpty()
  @IsString()
  @IsIn(['purchase', 'refinance'])
  category: string;

  @IsOptional()
  @ValidateIf(value => value.category === 'refinance')
  @IsNotEmpty()
  @IsNumber()
  new_loan_amount: number;

  @ValidateIf(value => value.category === 'purchase')
  @IsNotEmpty()
  @IsNumber()
  downpayment_min: number;

  @IsNotEmpty()
  @IsNumber()
  property_price: number;

  @IsNotEmpty()
  @IsNumber()
  annual_property_tax: number;

  @IsNotEmpty()
  @IsNumber()
  hazard_insurance: number;

  @IsNotEmpty()
  @IsString()
  credit_id: string;

  @IsNotEmpty()
  @IsNumber()
  monthly_hoa: number;

  @IsNotEmpty()
  @IsNumber()
  @IsIn([10, 15, 20, 30])
  mortgage_term: number;

  @IsNotEmpty()
  @IsNumber()
  interest_rate: number;
}

export class UsdaCalulateDto {
  @IsNotEmpty()
  @IsString()
  @IsIn(['purchase', 'refinance'])
  category: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  credit_id: string;

  @IsOptional()
  @ValidateIf(value => value.category === 'refinance')
  @IsNotEmpty()
  @IsNumber()
  new_loan_amount: number;

  @ValidateIf(value => value.category === 'purchase')
  @IsNotEmpty()
  @IsNumber()
  downpayment_min: number;

  @IsNotEmpty()
  @IsNumber()
  property_price: number;

  @IsNotEmpty()
  @IsNumber()
  annual_property_tax: number;

  @IsNotEmpty()
  @IsNumber()
  hazard_insurance: number;

  @IsNotEmpty()
  @IsNumber()
  monthly_hoa: number;

  @IsNotEmpty()
  @IsNumber()
  @IsIn([10, 15, 20, 30])
  mortgage_term: number;

  @IsNotEmpty()
  @IsNumber()
  interest_rate: number;
}

export class VaCalulateDto extends CalculationCategoryDto {
  @IsNotEmpty()
  @IsNumber()
  property_price: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  credit_id: string;

  @IsNotEmpty()
  @IsNumber()
  interest_rate: number;

  @IsNotEmpty()
  @IsBoolean()
  user_loan_before: boolean;

  @IsNotEmpty()
  @IsNumber()
  @IsIn([1, 2])
  type_service: number;

  @IsNotEmpty()
  @IsNumber()
  hazard_insurance: number;

  @IsNotEmpty()
  @IsNumber()
  monthly_hoa: number;

  @IsNotEmpty()
  @IsNumber()
  @IsIn([10, 15, 20, 30])
  mortgage_term: number;

  @IsNotEmpty()
  @IsNumber()
  annual_property_tax: number;
}

export class AffordabilityCalulateDto {
  @IsNotEmpty()
  @IsNumber()
  annual_gross_income: number;

  @IsNotEmpty()
  @IsNumber()
  monthly_debts: number;

  @IsNotEmpty()
  @IsNumber()
  annual_property_tax: number;

  @IsNotEmpty()
  @IsNumber()
  downpayment_min: number;

  @IsNotEmpty()
  @IsNumber()
  interest_rate: number;

  @IsNotEmpty()
  @IsString()
  credit_id: string;

  @IsNotEmpty()
  @IsNumber()
  hazard_insurance: number;

  @IsNotEmpty()
  @IsNumber()
  monthly_hoa: number;

  @IsNotEmpty()
  @IsNumber()
  @IsIn([10, 15, 20, 30])
  mortgage_term: number;
}

export class ShouldRefinanceCalulateDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(1000000)
  new_loan_amount: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(1000000)
  original_loan_amount: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  original_interest_rate: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  interest_rate: number;

  @IsNotEmpty()
  @IsNumber()
  original_year: number;

  @IsNotEmpty()
  @IsNumber()
  refinance_fees: number;

  @IsNotEmpty()
  @IsNumber()
  @IsIn([10, 15, 20, 30])
  original_mortgage_term: number;

  @IsNotEmpty()
  @IsNumber()
  @IsIn([10, 15, 20, 30])
  mortgage_term: number;
}

export class SaveCalulateDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;
}

export class FhaSaveCalculatorDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(MAXCALCULATORVAL.FHA)
  property_price: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(MAXCALCULATORVAL.FHA)
  new_loan_amount: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(MAXCALCULATORVAL.FHA)
  property_price_min: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(MAXCALCULATORVAL.FHA)
  property_price_max: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  downpayment_min: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  property_tax: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(MAXCALCULATORVAL.FHA)
  hazard_insurance: number;

  @IsNotEmpty()
  @IsNumber()
  mortgage_term: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  fha_upfront_mip: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  min_interest_rate: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  max_interest_rate: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  interest_rate_15: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  interest_rate_30: number;
}

export class FhaLoanFactorCalculatorDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(MAXCALCULATORVAL.FHA)
  loan_min: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(MAXCALCULATORVAL.FHA)
  loan_max: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  ltv_min: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  ltv_max: number;

  @IsNotEmpty()
  @IsNumber()
  fico_min: number;

  @IsNotEmpty()
  @IsNumber()
  fico_max: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  mi: number;
}

export class FhaCalculatorDto {
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @Type(() => FhaSaveCalculatorDto)
  default_values: FhaSaveCalculatorDto;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => FhaLoanFactorCalculatorDto)
  loan_factors: Array<FhaLoanFactorCalculatorDto>;
}

export class ConventionalSaveCalculatorDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(MAXCALCULATORVAL.CONVENTIONAL)
  property_price: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(MAXCALCULATORVAL.CONVENTIONAL)
  new_loan_amount: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(MAXCALCULATORVAL.CONVENTIONAL)
  property_price_min: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(MAXCALCULATORVAL.CONVENTIONAL)
  property_price_max: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  downpayment_min: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  property_tax: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(MAXCALCULATORVAL.CONVENTIONAL)
  hazard_insurance: number;

  @IsNotEmpty()
  @IsNumber()
  mortgage_term: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  min_interest_rate: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  max_interest_rate: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  interest_rate_10: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  interest_rate_15: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  interest_rate_20: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  interest_rate_30: number;
}

export class ConventionalLoanFactorCalculatorDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  ltv_min: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  ltv_max: number;

  @IsNotEmpty()
  @IsNumber()
  fico_min: number;

  @IsNotEmpty()
  @IsNumber()
  fico_max: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  mi: number;
}

export class ConventionalCalculatorDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ConventionalSaveCalculatorDto)
  default_values: ConventionalSaveCalculatorDto;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ConventionalLoanFactorCalculatorDto)
  loan_factors: Array<ConventionalLoanFactorCalculatorDto>;
}

export class JumboLoanFactorCalculatorDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  ltv_min: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  ltv_max: number;

  @IsNotEmpty()
  @IsNumber()
  fico_min: number;

  @IsNotEmpty()
  @IsNumber()
  fico_max: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  mi: number;
}

export class JumboSaveCalculatorDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(MAXCALCULATORVAL.JUMBO)
  property_price: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(MAXCALCULATORVAL.JUMBO)
  new_loan_amount: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(MAXCALCULATORVAL.JUMBO)
  property_price_min: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(MAXCALCULATORVAL.JUMBO)
  property_price_max: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  downpayment_min: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  property_tax: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(MAXCALCULATORVAL.JUMBO)
  hazard_insurance: number;

  @IsNotEmpty()
  @IsNumber()
  mortgage_term: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  min_interest_rate: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  max_interest_rate: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  interest_rate_10: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  interest_rate_15: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  interest_rate_20: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  interest_rate_30: number;
}

export class JumboCalculatorDto {
  @IsOptional()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => JumboSaveCalculatorDto)
  default_values: JumboSaveCalculatorDto;

  @IsOptional()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => JumboLoanFactorCalculatorDto)
  loan_factors: Array<JumboLoanFactorCalculatorDto>;
}

export class UsdaSaveCalculatorDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(MAXCALCULATORVAL.USDA)
  property_price: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(MAXCALCULATORVAL.USDA)
  new_loan_amount: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(MAXCALCULATORVAL.USDA)
  property_price_min: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(MAXCALCULATORVAL.USDA)
  property_price_max: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  downpayment_min: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  property_tax: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  usda_guarantee_fees: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(MAXCALCULATORVAL.USDA)
  hazard_insurance: number;

  @IsNotEmpty()
  @IsNumber()
  mortgage_term: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  min_interest_rate: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  max_interest_rate: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  interest_rate_10: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  interest_rate_15: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  interest_rate_20: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  interest_rate_30: number;
}

export class UsdaLoanFactorCalculatorDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  ltv_min: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  ltv_max: number;

  @IsNotEmpty()
  @IsNumber()
  fico_min: number;

  @IsNotEmpty()
  @IsNumber()
  fico_max: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  mi: number;
}

export class UsdaCalculatorDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UsdaSaveCalculatorDto)
  default_values: UsdaSaveCalculatorDto;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UsdaLoanFactorCalculatorDto)
  loan_factors: Array<UsdaLoanFactorCalculatorDto>;
}

export class VaSaveCalculatorDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(MAXCALCULATORVAL.VA)
  property_price: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(MAXCALCULATORVAL.VA)
  new_loan_amount: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(MAXCALCULATORVAL.VA)
  property_price_min: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(MAXCALCULATORVAL.VA)
  property_price_max: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  downpayment_min: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  property_tax: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  mi: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(MAXCALCULATORVAL.VA)
  hazard_insurance: number;

  @IsNotEmpty()
  @IsNumber()
  mortgage_term: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  min_interest_rate: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  max_interest_rate: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  interest_rate_10: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  interest_rate_15: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  interest_rate_20: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  interest_rate_30: number;
}

class DownPercentVaCalculatorDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  first: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  subsequent: number;
}

export class VaLoanFactorCalculatorDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: number;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => DownPercentVaCalculatorDto)
  down_0: DownPercentVaCalculatorDto;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => DownPercentVaCalculatorDto)
  down_5: DownPercentVaCalculatorDto;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => DownPercentVaCalculatorDto)
  down_10: DownPercentVaCalculatorDto;
}
export class VaCalculatorDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => VaSaveCalculatorDto)
  default_values: VaSaveCalculatorDto;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => VaLoanFactorCalculatorDto)
  loan_factors: Array<VaLoanFactorCalculatorDto>;
}

export class AffordabilitySaveCalculatorDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(MAXCALCULATORVAL.VA)
  property_price: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(MAXCALCULATORVAL.VA)
  new_loan_amount: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(MAXCALCULATORVAL.VA)  
  annual_gross_income: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(MAXCALCULATORVAL.VA)
  annual_gross_income_min: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(MAXCALCULATORVAL.VA)
  annual_gross_income_max: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(MAXCALCULATORVAL.VA)
  monthly_debts: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(MAXCALCULATORVAL.VA)
  monthly_debts_min: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(MAXCALCULATORVAL.VA)
  monthly_debts_max: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(MAXCALCULATORVAL.VA)
  property_price_min: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(MAXCALCULATORVAL.VA)
  property_price_max: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  downpayment_min: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  property_tax: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(MAXCALCULATORVAL.VA)
  hazard_insurance: number;

  @IsNotEmpty()
  @IsNumber()
  mortgage_term: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  mi: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  min_interest_rate: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  max_interest_rate: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  interest_rate_10: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  interest_rate_15: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  interest_rate_20: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  interest_rate_30: number;
}

export class AffordabilityLoanFactorCalculatorDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  ltv_min: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  ltv_max: number;

  @IsNotEmpty()
  @IsNumber()
  fico_min: number;

  @IsNotEmpty()
  @IsNumber()
  fico_max: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  mi: number;
}

export class AffordabilityCalculatorDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AffordabilitySaveCalculatorDto)
  default_values: AffordabilitySaveCalculatorDto;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AffordabilityLoanFactorCalculatorDto)
  loan_factors: Array<AffordabilityLoanFactorCalculatorDto>;
}

export class LoanFactorDeleteDto {
  @IsNotEmpty()
  @IsString()
  @IsIn(['fha', 'conventional', 'jumbo', 'usda', 'affordability'])
  type: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;
}

export class DisclaimerUpdateDto {
  @IsNotEmpty()
  @IsString()
  @IsIn(['fha', 'conventional', 'jumbo', 'usda', 'va', 'affordability'])
  type: string;

  @IsNotEmpty()
  @IsString()
  disclaimer: string;
}

export class ServiceFeesAddDto {
  @IsNotEmpty()
  @IsString()
  service_name: string;

  @IsNotEmpty()
  @IsNumber()
  service_fee: number;
}

export class ServiceFeesDeleteDto {
  @IsNotEmpty()
  @IsInt()
  service_id: number;
}

export class AdminSaveDefaultCalculation {
  @IsNotEmpty()
  @IsString()
  @IsIn([...Object.keys(CalculationTypeConst).filter(element => element !== 'should_refinance')])
  type: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(data => {
    return AdminSaveDefaultCalculation.switchDefautType(data);
  })
  default_values: AdminCalTypesDefault;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(data => {
    return AdminSaveDefaultCalculation.switchLoanType(data);
  })
  loan_factors: AdminCalTypesLoanfactor;

  static switchDefautType(data: Record<string, any>): Function {
    switch (data.newObject.type) {
      case 'fha':
        return FhaSaveCalculatorDto;
      case 'conventional':
        return ConventionalSaveCalculatorDto;
      case 'jumbo':
        return JumboSaveCalculatorDto;
      case 'usda':
        return UsdaSaveCalculatorDto;
      case 'va':
        return VaSaveCalculatorDto;
      case 'affordability':
        return AffordabilitySaveCalculatorDto;

      default:
        return FhaSaveCalculatorDto;
    }
  }

  static switchLoanType(data: Record<string, any>): Function {
    switch (data.newObject.type) {
      case 'fha':
        return FhaLoanFactorCalculatorDto;
      case 'conventional':
        return ConventionalLoanFactorCalculatorDto;
      case 'jumbo':
        return JumboLoanFactorCalculatorDto;
      case 'usda':
        return UsdaLoanFactorCalculatorDto;
      case 'va':
        return VaLoanFactorCalculatorDto;
      case 'affordability':
        return AffordabilityLoanFactorCalculatorDto;

      default:
        return FhaLoanFactorCalculatorDto;
    }
  }
}

type AdminCalTypesDefault =
  | FhaSaveCalculatorDto
  | ConventionalSaveCalculatorDto
  | JumboSaveCalculatorDto
  | UsdaSaveCalculatorDto
  | VaSaveCalculatorDto
  | AffordabilitySaveCalculatorDto;

type AdminCalTypesLoanfactor =
  | Array<FhaLoanFactorCalculatorDto>
  | Array<ConventionalLoanFactorCalculatorDto>
  | Array<JumboLoanFactorCalculatorDto>
  | Array<UsdaLoanFactorCalculatorDto>
  | Array<VaLoanFactorCalculatorDto>
  | Array<AffordabilityLoanFactorCalculatorDto>;
