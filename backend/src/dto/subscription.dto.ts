import { IsNotEmpty, IsString, IsNumber, IsOptional, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class SubscriptionDto {
  @IsNotEmpty()
  @IsNumber()
  plan_id: number;

  @IsOptional()
  @IsString()
  name_on_card: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  customer_id: string;

  @IsNotEmpty()
  @Type(() => String)
  @MaxLength(16, {
    message: 'card number should  be greater than 16 digit',
  })
  card_number: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  billing_address: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  zip_code: string;

  @IsNotEmpty()
  exp_month: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  promo_code: string;

  @IsNotEmpty()
  @IsString()
  cvv: string;

  @IsNotEmpty()
  exp_year: number;

  @IsNotEmpty()
  @IsString()
  state: string;
}

export class AddLODto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;
}

export class BrandedAppApplyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  company_name: string;

  @IsNotEmpty()
  @IsString()
  app_name: string;
}

export class BrandedAppAcceptDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  subscription_amount: number;

  @IsNotEmpty()
  @IsNumber()
  taxes: number;

  @IsNotEmpty()
  @IsNumber()
  additional_charges: number;
}

export class BrandedAppRejectDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  reject_reason: string;
}

export class BrandedAppStatusDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  status: number;
}

export class BrandedAppInfoDto {
  @IsNotEmpty()
  @IsString()
  heading: string;

  @IsNotEmpty()
  @IsString()
  body: string;
}

export class SubscriptionAdminDto {

  @IsNotEmpty()
  @IsString()
  plan_name: string;

  @IsNotEmpty()
  @IsNumber()
  subscription_fees: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  plan_details: string;

  @IsNotEmpty()
  @IsNumber()
  duration: number;

}

export class BrandedAppSubscriptionDto {

  @IsOptional()
  @IsString()
  name_on_card: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  customer_id: string;

  @IsNotEmpty()
  @Type(() => String)
  @MaxLength(16, {
    message: 'card number should  be greater than 16 digit',
  })
  card_number: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  billing_address: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  zip_code: string;

  @IsNotEmpty()
  exp_month: number;

  @IsNotEmpty()
  @IsString()
  cvv: string;

  @IsNotEmpty()
  exp_year: number;

  @IsNotEmpty()
  @IsString()
  state: string;
}

export class PromocodeDto {

  @IsNotEmpty()
  @IsString()
  promoCode: string;

}
