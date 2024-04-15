import { IsNotEmpty, IsString, IsNumber, MaxLength, IsOptional, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { IsCanNull } from 'src/utils/validators';

export class CoBrandingOfficerDto {
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  notify: boolean;

  @IsOptional()
  @IsNumber()
  parent_id: number | null = null;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @Type(() => String)
  @MaxLength(12, {
    message: 'Contact code should not be greater than 12 digit',
  })
  contact_number: number;

  @IsNotEmpty()
  @IsString()
  dual_branding: string;

  @IsNotEmpty()
  @IsString()
  company_name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  street_details: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  state: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  zip_code: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  licence: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  bio: string;

  @IsOptional()
  website_link: string;

  @IsOptional()
  facebook_link: string;

  @IsOptional()
  google_link: string;

  @IsOptional()
  youtube_link: string;

  @IsOptional()
  additional_link: string;

  @IsOptional()
  twitter_link: string;

  @IsOptional()
  linkedin_link: string;

  @IsOptional()
  pinterest_link: string;

  @IsOptional()
  tikTok_link: string;

  @IsOptional()
  instagram_link: string;
}

export class CoBrandinProfileDto {
  @IsOptional()
  photo: string;

  @IsNotEmpty()
  logo: string;
}

export class SocialLinkUpdateDto {
  @IsCanNull('string')
  website_link: string;

  @IsCanNull('string')
  facebook_link: string;

  @IsCanNull('string')
  youtube_link: string;

  @IsCanNull('string')
  additional_link: string;

  @IsCanNull('string')
  twitter_link: string;

  @IsCanNull('string')
  linkedin_link: string;

  @IsCanNull('string')
  tikTok_link: string;

  @IsCanNull('string')
  instagram_link: string;
}
