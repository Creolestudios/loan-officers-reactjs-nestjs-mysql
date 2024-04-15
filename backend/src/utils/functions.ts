import {
  BrandedApp_Approved_Status,
  EMAIL_SIGNATURE_DEFAULT,
  PaymentFor,
  PhotoResolution,
  VALIDATION_MSG,
} from './constant';
import * as QRCode from 'qrcode';
import * as fs from 'fs';
import * as moment from 'moment';
import * as admin from 'firebase-admin';
import { SuccessResponse, UploadS3DataInterface } from './types';
import { randomInputCode } from './str.util';
import * as Sentry from '@sentry/minimal';
import * as sharp from 'sharp';

import { MailerService } from '@nestjs-modules/mailer';
import { Users } from 'src/shared/entity/users.entity';
import { BadRequestException, HttpService } from '@nestjs/common';
import { uploadPhotoBufferToS3, uploadQrCodeToS3 } from './helper';
import { Billing_Details } from 'src/shared/entity/billing_details.entity';
import { In, IsNull, Not } from 'typeorm';
import { Promo_Codes } from 'src/shared/entity/promo_codes.entity';
import { MessagingPayload } from 'src/dto/activity.dto';
import client from './twilio.util';
import { isEmpty, round, size } from 'lodash';
import {
  FhaCalulateDto,
  ConventionalCalulateDto,
  UsdaCalulateDto,
  VaCalulateDto,
  JumboCalculateDto,
} from 'src/dto/calculation.dto';
import { Calculation_Types } from 'src/shared/entity/calculation_types.entity';
import { Service_Fees } from 'src/shared/entity/service_fees.entity';
import { Branded_App_Users } from 'src/shared/entity/branded_app_users.entity';
import { Refers } from 'src/shared/entity/refers.entity';
import { Oauth_Tokens } from 'src/shared/entity/oauth_tokens.entity';

export const getWhiteIcons = (name: string | null): string | null =>
  name ? `${process.env.S3_URL}icons/menu_icons/white/${name}.png` : null;

export const getGrayIcons = (name: string | null): string | null =>
  name ? `${process.env.S3_URL}icons/menu_icons/gray/${name}.png` : null;

export const getGreenIcons = (name: string | null): string | null =>
  name ? `${process.env.S3_URL}icons/menu_icons/green/${name}.png` : null;

export const getUserProfilePath = (name: string | null): string | null =>
  name ? `${process.env.S3_URL}profile_img/profile_source/${name}` : null;

export const getUserProfileThumbnailPath = (name: string | null): string | null =>
  name ? `${process.env.S3_URL}profile_img/profile_thumbnails/${name}` : null;

export const getMediaPath = (name: string | null, id: number | null): string | null =>
  name ? `${process.env.S3_URL}uploaded_documents/${id}/${name}` : null;

export const getChatDocumentPath = (name: string | null): string | null =>
  name ? `${process.env.S3_URL}chat_document/${name}` : null;

export const getQrcodePath = (name: string | null): string | null =>
  name ? `${process.env.S3_URL}qr_code/${name}` : null;

export const getLoanProgramIconPath = (name: string | null): string | null =>
  name ? `${process.env.S3_URL}icons/loan_program_icons/${name}` : null;

export const getPdfPath = (name: string | null | unknown): string | null =>
  name ? `${process.env.S3_URL}calculation_files/${name}` : null;

export const getPdfViewPath = (name: string | null | unknown): string | null =>
  name ? `${process.env.DEEP_LINK_REDIRECT_URL}/view-calculation/${name}` : null;

export const getGuidePath = (name: string | null): string | null =>
  name ? `${process.env.S3_URL}icons/guide_icons/${name}` : null;

export const getEmailSignaturePath = (name: string | null | unknown): string | null =>
  name ? `${process.env.S3_URL}email_signature/${name}` : null;

export const getUserS3ProfilePath = (name: string | null): string | null =>
  name ? `${process.env.S3_URL}profile_img/profile_source/${name}` : null;

export const getUserS3ProfileThumbnailPath = (name: string | null): string | null =>
  name ? `${process.env.S3_URL}profile_img/profile_thumbnail/${name}` : null;

export const getUserS3LogoPath = (name: string | null): string | null =>
  name ? `${process.env.S3_URL}company_logo/${name}` : null;

export const getEmailSignatureS3Path = (name: string | null): string | null =>
  name ? `${process.env.S3_URL}email_signature/${name}` : null;

export const getDefaultEmailSignatureS3Path = (name: string | null): string | null =>
  name ? `${process.env.S3_URL}default_email_signature/${name}` : null;

export const getMediaS3Path = (name: string | null, id: string): string | null =>
  name ? `${process.env.S3_URL}uploaded_documents/${id}/${name}` : null;

export const getQrcodeS3Path = (name: string | null): string | null =>
  name ? `${process.env.S3_URL}qr_code/${name}` : null;

export const getDashboardHeaderLinkPath = (name: string | null): string | null =>
  name ? `${process.env.S3_URL}dashboard_header_icons/${name}.png` : null;

export const createDefaultLinks = (
  linkType: SuccessResponse,
): Array<{ id: string; type: number; name: string; sequence: number }> => {
  const list = [];
  Object.keys(linkType).map((eachLink, index) => {
    list.push({
      id: eachLink,
      type: 1,
      name: linkType[eachLink],
      icon: {
        white: getWhiteIcons(eachLink.toLowerCase()),
        gray: getGrayIcons(eachLink.toLowerCase()),
        green: getGreenIcons(eachLink.toLowerCase()),
      },
      sequence: index + 1,
    });
  });
  return list;
};

export const createDefaultCompanyLinks = (
  linkType: SuccessResponse,
): Array<{ type: number; name: string; sequence: number; isChangeable: boolean }> => {
  const list = [];
  Object.keys(linkType).map((eachLink, index) => {
    list.push({
      id: eachLink,
      type: 1,
      name: linkType[eachLink],
      icon: {
        white: getWhiteIcons(eachLink.toLowerCase()),
        gray: getGrayIcons(eachLink.toLowerCase()),
        green: getGreenIcons(eachLink.toLowerCase()),
      },
      sequence: index + 1,
      isChangeable: true,
    });
  });
  return list;
};

export const getPublicImageUrl = (
  userId?: number,
): {
  logo: string;
  shape: string;
  hero: string;
  'shape-1'?: string;
  red?: string;
  green?: string;
} => {
  return {
    logo: userId ? `${process.env.S3_URL}images/Encore_Mortgage_Logo.png` : `${process.env.S3_URL}images/logo.png`,
    shape: `${process.env.S3_URL}images/shape.png`,
    hero: `${process.env.S3_URL}images/hero-img.png`,
    red: `${process.env.S3_URL}images/red.png`,
    green: `${process.env.S3_URL}images/green.png`,
    'shape-1': `${process.env.S3_URL}images/shape-1.png`,
  };
};

export const getTimeDifferenceFromCreation = (created_at: Date): string => {
  const hours = moment().diff(created_at, 'hours');
  const days = moment().diff(created_at, 'days');
  let timeElapsed = '';
  if (days === 0) {
    const minutes = moment.utc(moment(moment(), 'HH:mm:ss').diff(moment(created_at, 'HH:mm:ss'))).format('mm');

    if (hours) {
      if (hours === 1) {
        timeElapsed += hours + ' hour';
      } else {
        timeElapsed += hours + ' hours';
      }
    }

    if (minutes) {
      if (minutes === '00') {
        timeElapsed += `00 min ago`;
      } else if (!hours) {
        timeElapsed += `${minutes} ${minutes === '01' ? 'min' : 'mins'} ago`;
      } else {
        timeElapsed += ` ${minutes} ${minutes === '01' ? 'min' : 'mins'} ago`;
      }
    }
  } else {
    timeElapsed += `${days} ${days === 1 ? 'day' : 'days'}`;
  }
  return timeElapsed;
};

export const createQrCode = async (size: Array<number>, link: string): Promise<Array<string>> => {
  const qrcodeLinks = [];
  let base64Image;

  await Promise.all(
    size.map(async eachSize => {
      const randomNum = randomInputCode(4);
      const bufferImage = await QRCode.toDataURL(link, {
        margin: 1,
        width: eachSize,
        height: eachSize,
      });

      const fileName = `${Date.now().toString()}-qr_code-${eachSize}-${randomNum}.png`;

      qrcodeLinks.push({
        link: fileName,
        size: eachSize,
        default: false,
      });

      base64Image = bufferImage.split(';base64,').pop();
      const base64Data = Buffer.from(base64Image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
      await uploadQrCodeToS3(`${fileName}`, base64Data, process.env.AWS_S3_BUCKET_QRCODE);
    }),
  );

  return [...qrcodeLinks];
};

export const sendFailureMail = (mailService: MailerService, error: Error): void => {
  mailService.sendMail({
    to: ['nirmalsinh@creolestudios.com', process.env.MAIL_TEST_EMAIL],
    from: process.env.SENDGRID_USER_EMAIL,
    subject: 'Email Error Log',
    template: 'error',
    context: {
      error: JSON.stringify(error),
      imageData: getPublicImageUrl(),
    },
  });
  Sentry.captureException(error);
};

export const borrowerLoanOfficerExistCheck = (borrower: Users): void => {
  if (!borrower.parent_id) {
    throw new BadRequestException(VALIDATION_MSG.lo_not_selected);
  }
};

export const borrowerLoanOfficerExistValidation = (borrower: Users): boolean => {
  if (!borrower.parent_id) {
    return false;
  }
  return true;
};

export const convertNumberToUSFormatLocalString = (value: number): string => {
  return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export const removeFileFromServerPublicPath = (path: fs.PathLike): void => {
  return fs.unlink(path, err => {
    if (err) console.log(err, `Deleting from filesystem, path = ${path} `);
  });
};

export const addDeepLinkBranch = async (
  httpService: HttpService,
  userData: Record<string, any>,
): Promise<string | null> => {
  try {
    let android_link_url = '';
    let ios_link_url = '';
    let iosAppStoreId = '';
    if (userData.config_id) {
      // Android : BRANDED APP URL
      android_link_url = `${process.env.DEEP_LINK_REDIRECT_URL_Android}?id=${userData?.config_id}`;

      // iOS : BRANDED APP URL
      ios_link_url = `${process.env.DEEP_LINK_REDIRECT_BRANDEDAPP_URL_IOS}`;

      iosAppStoreId = `${process.env.IOS_APP_STORE_ID_BRANDED_APP}`;
    } else {
      // Android : MAIN APP URL
      android_link_url = `${process.env.DEEP_LINK_REDIRECT_URL_Android}?id=${process.env.DEEP_LINK_ANDROID_PACKAGE}`;

      // iOS : MAIN APP URL
      ios_link_url = `${process.env.DEEP_LINK_REDIRECT_MAINAPP_URL_IOS}`;

      iosAppStoreId = `${process.env.IOS_APP_STORE_ID_MAIN_APP}`;
    }
    const deepLinkRes = await httpService
      .post(
        `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${process.env.FIREBASE_WEB_API_KEY}`,
        {
          dynamicLinkInfo: {
            domainUriPrefix: process.env.DEEP_LINK_URI,
            link: `${process.env.DEEP_LINK_REDIRECT_URL_WEB}?id=${userData?.id}`,
            androidInfo: {
              androidPackageName: userData.config_id ? userData.config_id : process.env.DEEP_LINK_ANDROID_PACKAGE,
              androidFallbackLink: android_link_url,
            },
            iosInfo: {
              iosBundleId: userData.config_id ? userData.config_id : process.env.DEEP_LINK_IOS_PACKAGE,
              // iosFallbackLink: ios_link_url,
              iosAppStoreId: iosAppStoreId,
            },
            navigationInfo: {
              enableForcedRedirect: false,
            },
          },
        },
        {
          headers: {
            'content-type': 'application/json',
          },
        },
      )
      .toPromise();
    console.log('deepLinkRes :::::', deepLinkRes);
    return deepLinkRes?.data?.shortLink || null;
  } catch (error) {
    Sentry.captureException(error);
    return null;
  }
};

export const filePhotoUpload = async (
  file: Express.Multer.File,
  path?: string | undefined,
  usertype?: boolean | undefined,
): Promise<UploadS3DataInterface> => {
  let timeStamp: string = Date.now().toString();
  let key: string = timeStamp + '-' + file.originalname.replace(/ /g, '_');
  if (path === process.env.AWS_S3_BUCKET_EMAIL_SIGNATURE) {
    const image = await sharp(file.buffer)
      .resize({
        fit: sharp.fit.contain,
        withoutEnlargement: true,
        width: 800,
      })
      .toBuffer();

    const thumbnailImage = {
      ...file,
      buffer: image,
    };
    if (usertype === false) {
      // false for uploading email signature for admin panel
      key = EMAIL_SIGNATURE_DEFAULT + timeStamp + '-' + file.originalname.replace(/ /g, '_');
    }
    const email_signature = await uploadPhotoBufferToS3(`${key}`, thumbnailImage, path);
    return email_signature;
  } else if (!path) {
    let thumbnailImageBuffer: Buffer = null;
    if (usertype === true) {
      // for co-branding officers
      thumbnailImageBuffer = await sharp(file.buffer)
        .resize({
          fit: sharp.fit.contain,
          width: 800,
        })
        .toBuffer();
    } else {
      thumbnailImageBuffer = await sharp(file.buffer)
        .resize(PhotoResolution['200'], PhotoResolution['200'])
        .toBuffer();
    }
    const thumbnailImage = {
      ...file,
      buffer: thumbnailImageBuffer,
    };

    let photoUploadDate: UploadS3DataInterface = null;
    if (usertype === true) {
      photoUploadDate = await uploadPhotoBufferToS3(
        `${key}`,
        thumbnailImage,
        process.env.AWS_S3_BUCKET_PROFILEIMAGE + '/profile_source',
      );
    } else {
      photoUploadDate = await uploadPhotoBufferToS3(
        `${key}`,
        file,
        process.env.AWS_S3_BUCKET_PROFILEIMAGE + '/profile_source',
      );
    }
    await uploadPhotoBufferToS3(
      `${key}`,
      thumbnailImage,
      process.env.AWS_S3_BUCKET_PROFILEIMAGE + '/profile_thumbnail',
    );

    return photoUploadDate;
  }
  let photoUploadDate: UploadS3DataInterface = await uploadPhotoBufferToS3(`${key}`, file, path);
  return photoUploadDate;
};

export const momentDateJsConvert = (recurringTerm: number, customDate?: Date | undefined): moment.Moment => {
  const date = moment(customDate ? customDate : undefined);
  switch (recurringTerm) {
    case 1:
      date.add(1, 'months');
      break;
    case 2:
      date.add(3, 'months');
      break;
    case 3:
      date.add(6, 'months');
      break;
    case 4:
      date.add(9, 'months');
      break;
    case 5:
      date.add(1, 'years');
      break;
    default:
      date.add(1, 'months');
      break;
  }
  return date;
};

//Find if a user exceeds the usage of promocode.
export const isValidPromocodeForUser = async (user: Users, promoCodeId: number) => {
  const billingData = await Billing_Details.find({
    select: [`user_id`, `promo_code`, `promo_code_id`],
    where: {
      payment_for: PaymentFor.signUpSubscription,
      user_id: user,
      promo_code: Not(IsNull()),
      promo_code_id: promoCodeId,
    },
  });

  if (!billingData) {
    return true;
  }

  const allUsersTotalUsedPromo = await Billing_Details.count({
    where: {
      promo_code_id: promoCodeId,
      promo_code: Not(IsNull()),
    },
  });

  let promoCodeUsedNumber: number = billingData.length;

  const promoCodeDetails = await Promo_Codes.findOne({
    where: {
      id: promoCodeId,
      deleted_at: IsNull(),
    },
  });

  if (
    promoCodeDetails &&
    moment(promoCodeDetails.end_date).isAfter(moment()) &&
    (promoCodeDetails?.copies === 1 ||
      (promoCodeDetails?.copies === 2 && promoCodeDetails?.user_limit > allUsersTotalUsedPromo)) &&
    ((promoCodeDetails?.coupons === 1 && promoCodeUsedNumber === 0) ||
      (promoCodeDetails?.coupons === 2 && promoCodeDetails?.coupon_reuse > promoCodeUsedNumber))
  ) {
    return true;
  }

  return false;
};

export const sendFirebasePushNotification = (deviceToken: string, messagePayload: MessagingPayload): void => {
  admin
    .messaging()
    .sendToDevice(deviceToken, messagePayload)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log('FIREBASE NOTIFICATION ERROR: ', error);
    });
};

export const sendTextSMS = async (phoneNumber: string, textBody: string): Promise<void> => {
  try {
    const sms_response = await client.messages.create({
      body: textBody,
      to: phoneNumber,
      from: process.env.SEND_SMS_FROM_PHONE,
    });
  } catch (e) {
    console.log(`-> Error occured on sending text to ${phoneNumber}.`);
    console.log('-> ', e.message);
  }
  // console.log(sms_response);
};

export const calculateFha = (
  fhaCalculateDto: FhaCalulateDto,
  fhaCalculateType: Calculation_Types,
  serviceFees: Service_Fees[],
): any => {
  let fees = 0;
  serviceFees.map(element => {
    fees += element.service_fee;
  });

  const fhaDefaultValues = JSON.parse(fhaCalculateType.calculation_default_values);

  const fhaLoanFactors = JSON.parse(fhaCalculateType.calculation_loan_factors);

  const { downpaymentAmount, downPaymentPercent, newLoanAmount } = calculationCateoryCheck(fhaCalculateDto);

  const fhaNewUpfrontAmount = round(newLoanAmount * (fhaDefaultValues.fha_upfront_mip / 100), 2);

  const totalLoanAmount = fhaNewUpfrontAmount + newLoanAmount;

  const interestRateMonthly = fhaCalculateDto.interest_rate / 100 / 12;

  const termMonthly = fhaCalculateDto.mortgage_term * 12;

  const annualInsuranceMonthly = round(fhaCalculateDto.hazard_insurance / 12, 2);

  const annualTaxYearly = (fhaCalculateDto.annual_property_tax / 100) * fhaCalculateDto.property_price;

  const annualTaxMonthly = annualTaxYearly / 12;

  // LTV
  const loanToValue = (newLoanAmount / fhaCalculateDto.property_price) * 100;

  let mortgageInsurance = 0;

  const mortgageInsuranceFiltered = fhaLoanFactors.filter(element => {
    if (
      element.year === fhaCalculateDto.mortgage_term &&
      element.loan_min <= newLoanAmount &&
      element.loan_max >= newLoanAmount &&
      element.ltv_min <= loanToValue &&
      element.ltv_max >= loanToValue
    ) {
      return true;
    }
    return false;
  });

  if (!isEmpty(mortgageInsuranceFiltered)) {
    mortgageInsurance = mortgageInsuranceFiltered[0].mi;
  }

  // PMI
  const privateMortgageInsurance = round(downPaymentPercent < 20 ? (mortgageInsurance / 100) * newLoanAmount : 0, 2);

  const privateMortgageInsuranceMonthly = round(privateMortgageInsurance / 12, 2);

  const denominatorPayment =
    (Math.pow(1 + interestRateMonthly, termMonthly) - 1) /
    (interestRateMonthly * Math.pow(1 + interestRateMonthly, termMonthly));

  // Monthly payment
  const monthlyPayment = round(totalLoanAmount / denominatorPayment, 2);

  // apr
  let apr = round(
    +calculateAPR(newLoanAmount, termMonthly, fhaCalculateDto.interest_rate / 100, fhaNewUpfrontAmount + fees),
    4,
  );

  apr = apr * 100;

  const taxesAndHoa = round(annualTaxMonthly + fhaCalculateDto.monthly_hoa, 2);

  // Total Monthly Payment
  const totalMonthlyPayment = round(
    monthlyPayment + taxesAndHoa + annualInsuranceMonthly + privateMortgageInsuranceMonthly,
    2,
  );

  // Tax, Ins, MI
  const taxInsMiAmount = round(taxesAndHoa + annualInsuranceMonthly + privateMortgageInsuranceMonthly, 2);

  // Amortization
  const amortization = [];
  for (let index = 0; index < termMonthly; index++) {
    const interest = round(((fhaCalculateDto.interest_rate / 100) * newLoanAmount) / 12, 2);
    if (index === 0) {
      amortization.push({
        tax_ins_mi_amount: taxInsMiAmount,
        interest,
        total_interest: interest,
        principal: round(monthlyPayment - interest, 2),
        total_principal: round(monthlyPayment - interest, 2),
        balance: newLoanAmount - (monthlyPayment - interest),
        ltv: (newLoanAmount - (monthlyPayment - interest)) / fhaCalculateDto.property_price,
      });
    } else {
      const principal = round(
        monthlyPayment - ((fhaCalculateDto.interest_rate / 100) * amortization[index - 1].balance) / 12 <
          amortization[index - 1].balance
          ? monthlyPayment - ((fhaCalculateDto.interest_rate / 100) * amortization[index - 1].balance) / 12
          : amortization[index - 1].balance,
        2,
      );

      const interest = round(((fhaCalculateDto.interest_rate / 100) * amortization[index - 1].balance) / 12, 2);

      amortization.push({
        tax_ins_mi_amount:
          amortization[index - 1].ltv > 0.8
            ? amortization[index - 1].tax_ins_mi_amount
            : taxesAndHoa + annualInsuranceMonthly,
        interest,
        total_interest: round(interest + amortization[index - 1].total_interest, 2),
        principal,
        total_principal: round(principal + amortization[index - 1].total_principal, 2),
        balance: round(amortization[index - 1].balance - principal, 2),
        ltv: round((amortization[index - 1].balance - principal) / fhaCalculateDto.property_price, 8),
      });
    }
  }

  const chartData = {
    breakdown: {
      principal: monthlyPayment,
      taxes: taxesAndHoa,
      hazard_insurance: annualInsuranceMonthly,
      mortgage_insurance: privateMortgageInsuranceMonthly,
      total_monthly_payment: totalMonthlyPayment,
    },
    details: [
      {
        name: 'Property Value',
        field_name: 'property_price',
        value: '$' + convertNumberToUSFormatLocalString(fhaCalculateDto.property_price),
      },
      {
        name: 'Down Payment',
        field_name: 'downpayment',
        value: '$' + convertNumberToUSFormatLocalString(downpaymentAmount),
      },
      {
        name: 'Base Loan Amount',
        field_name: 'base_loan_amount',
        value: '$' + convertNumberToUSFormatLocalString(newLoanAmount),
      },
      {
        name: 'Intererst Rate',
        field_name: 'interest_rate',
        value: convertNumberToUSFormatLocalString(fhaCalculateDto.interest_rate) + '%',
      },
      {
        name: 'APR',
        field_name: 'apr',
        value: convertNumberToUSFormatLocalString(apr) + '%',
      },
      {
        name: 'FHA Upfront MIP',
        field_name: 'fha_upfornt_mip',
        value: '$' + convertNumberToUSFormatLocalString(fhaNewUpfrontAmount),
      },
      {
        name: 'Total Loan Amount',
        field_name: 'total_loan_amount',
        value: '$' + convertNumberToUSFormatLocalString(totalLoanAmount),
      },
      {
        name: 'Principal & Interest',
        field_name: 'principal',
        value: '$' + convertNumberToUSFormatLocalString(monthlyPayment),
      },
      {
        name: 'Taxes & HOA',
        field_name: 'taxes',
        value: '$' + convertNumberToUSFormatLocalString(taxesAndHoa),
      },
      {
        name: 'Hazard Insurance',
        field_name: 'hazard_insurance',
        value: '$' + convertNumberToUSFormatLocalString(annualInsuranceMonthly),
      },
      {
        name: 'Mortgage Insurance',
        field_name: 'mortgage_insurance',
        value: '$' + convertNumberToUSFormatLocalString(privateMortgageInsuranceMonthly),
      },
      {
        name: 'Total Payment Amount',
        field_name: 'total_monthly_payment',
        value: '$' + convertNumberToUSFormatLocalString(totalMonthlyPayment),
      },
    ],
  };

  const result: Record<string, unknown> = {
    ...chartData,
    amortization,
    disclaimer: fhaCalculateType.calculator_disclaimer,
  };

  const data = {
    result,
    chartData,
  };
  return data;
};

export const calculateConventional = (
  conventionalCalculateDto: ConventionalCalulateDto,
  conventionalCalculateType: Calculation_Types,
  serviceFees: Service_Fees[],
): any => {
  let fees = 0;
  serviceFees.map(element => {
    fees += element.service_fee;
  });

  const conventionalLoanFactors = JSON.parse(conventionalCalculateType.calculation_loan_factors);

  const { downpaymentAmount, downPaymentPercent, newLoanAmount } = calculationCateoryCheck(conventionalCalculateDto);

  const totalLoanAmount = newLoanAmount;

  const interestRateMonthly = conventionalCalculateDto.interest_rate / 100 / 12;

  const termMonthly = conventionalCalculateDto.mortgage_term * 12;

  const annualInsuranceMonthly = round(conventionalCalculateDto.hazard_insurance / 12, 2);

  const annualTaxYearly =
    (conventionalCalculateDto.annual_property_tax / 100) * conventionalCalculateDto.property_price;

  const annualTaxMonthly = annualTaxYearly / 12;

  // LTV
  const loanToValue = (newLoanAmount / conventionalCalculateDto.property_price) * 100;

  let mortgageInsurance = 0;

  const selectedConventionalLoanFactor = conventionalLoanFactors.find(
    element => element.id === conventionalCalculateDto.credit_id,
  );

  const mortgageInsuranceFiltered = conventionalLoanFactors.filter(element => {
    if (
      element.year === conventionalCalculateDto.mortgage_term &&
      element.fico_min === selectedConventionalLoanFactor?.fico_min &&
      element.fico_max === selectedConventionalLoanFactor?.fico_max &&
      element.ltv_min <= loanToValue &&
      element.ltv_max >= loanToValue
    ) {
      return true;
    }
    return false;
  });

  if (!isEmpty(mortgageInsuranceFiltered)) {
    mortgageInsurance = mortgageInsuranceFiltered[0].mi;
  }

  // PMI
  const privateMortgageInsurance = round(downPaymentPercent < 20 ? (mortgageInsurance / 100) * newLoanAmount : 0, 2);

  const privateMortgageInsuranceMonthly = round(privateMortgageInsurance / 12, 2);

  const denominatorPayment =
    (Math.pow(1 + interestRateMonthly, termMonthly) - 1) /
    (interestRateMonthly * Math.pow(1 + interestRateMonthly, termMonthly));

  // Monthly payment
  const monthlyPayment = round(totalLoanAmount / denominatorPayment, 2);

  // apr
  let apr = round(+calculateAPR(newLoanAmount, termMonthly, conventionalCalculateDto.interest_rate / 100, fees), 4);
  apr = apr * 100;

  const taxesAndHoa = round(annualTaxMonthly + conventionalCalculateDto.monthly_hoa, 2);

  // Total Monthly Payment
  const totalMonthlyPayment = round(
    monthlyPayment + taxesAndHoa + annualInsuranceMonthly + privateMortgageInsuranceMonthly,
    2,
  );

  // Tax, Ins, MI
  const taxInsMiAmount = round(taxesAndHoa + annualInsuranceMonthly + privateMortgageInsuranceMonthly, 2);

  // Amortization
  const amortization = [];
  for (let index = 0; index < termMonthly; index++) {
    const interest = round(((conventionalCalculateDto.interest_rate / 100) * newLoanAmount) / 12, 2);
    if (index === 0) {
      amortization.push({
        tax_ins_mi_amount: taxInsMiAmount,
        interest,
        total_interest: interest,
        principal: round(monthlyPayment - interest, 2),
        total_principal: round(monthlyPayment - interest, 2),
        balance: newLoanAmount - (monthlyPayment - interest),
        ltv: (newLoanAmount - (monthlyPayment - interest)) / conventionalCalculateDto.property_price,
      });
    } else {
      const principal = round(
        monthlyPayment - ((conventionalCalculateDto.interest_rate / 100) * amortization[index - 1].balance) / 12 <
          amortization[index - 1].balance
          ? monthlyPayment - ((conventionalCalculateDto.interest_rate / 100) * amortization[index - 1].balance) / 12
          : amortization[index - 1].balance,
        2,
      );

      const interest = round(
        ((conventionalCalculateDto.interest_rate / 100) * amortization[index - 1].balance) / 12,
        2,
      );

      amortization.push({
        tax_ins_mi_amount:
          amortization[index - 1].ltv > 0.8
            ? amortization[index - 1].tax_ins_mi_amount
            : taxesAndHoa + annualInsuranceMonthly,
        interest,
        total_interest: round(interest + amortization[index - 1].total_interest, 2),
        principal,
        total_principal: round(principal + amortization[index - 1].total_principal, 2),
        balance: round(amortization[index - 1].balance - principal, 2),
        ltv: round((amortization[index - 1].balance - principal) / conventionalCalculateDto.property_price, 8),
      });
    }
  }

  const chartData = {
    breakdown: {
      principal: monthlyPayment,
      taxes: taxesAndHoa,
      hazard_insurance: annualInsuranceMonthly,
      mortgage_insurance: privateMortgageInsuranceMonthly,
      total_monthly_payment: totalMonthlyPayment,
    },
    details: [
      {
        name: 'Property Value',
        field_name: 'property_price',
        value: '$' + convertNumberToUSFormatLocalString(conventionalCalculateDto.property_price),
      },
      {
        name: 'Down Payment',
        field_name: 'downpayment',
        value: '$' + convertNumberToUSFormatLocalString(downpaymentAmount),
      },
      {
        name: 'Base Loan Amount',
        field_name: 'base_loan_amount',
        value: '$' + convertNumberToUSFormatLocalString(newLoanAmount),
      },
      {
        name: 'Intererst Rate',
        field_name: 'interest_rate',
        value: convertNumberToUSFormatLocalString(conventionalCalculateDto.interest_rate) + '%',
      },
      {
        name: 'Credit',
        field_name: 'interest_rate',
        value: selectedConventionalLoanFactor
          ? `${selectedConventionalLoanFactor.fico_min}-${selectedConventionalLoanFactor.fico_max}`
          : 0.0,
      },
      {
        name: 'APR',
        field_name: 'apr',
        value: convertNumberToUSFormatLocalString(apr) + '%',
      },
      {
        name: 'Total Loan Amount',
        field_name: 'total_loan_amount',
        value: '$' + convertNumberToUSFormatLocalString(totalLoanAmount),
      },
      {
        name: 'Principal & Interest',
        field_name: 'principal',
        value: '$' + convertNumberToUSFormatLocalString(monthlyPayment),
      },
      {
        name: 'Taxes & HOA',
        field_name: 'taxes',
        value: '$' + convertNumberToUSFormatLocalString(taxesAndHoa),
      },
      {
        name: 'Hazard Insurance',
        field_name: 'hazard_insurance',
        value: '$' + convertNumberToUSFormatLocalString(annualInsuranceMonthly),
      },
      {
        name: 'Mortgage Insurance',
        field_name: 'mortgage_insurance',
        value: '$' + convertNumberToUSFormatLocalString(privateMortgageInsuranceMonthly),
      },
      {
        name: 'Total Payment Amount',
        field_name: 'total_monthly_payment',
        value: '$' + convertNumberToUSFormatLocalString(totalMonthlyPayment),
      },
    ],
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const result: Record<string, unknown> = {
    ...chartData,
    amortization,
    disclaimer: conventionalCalculateType.calculator_disclaimer,
  };

  const data = {
    result,
    chartData,
  };
  return data;
};

export const calculateJumbo = (
  jumboCalculateDto: JumboCalculateDto,
  jumboCalculateType: Calculation_Types,
  serviceFees: Service_Fees[],
): any => {
  let fees = 0;
  serviceFees.map(element => {
    fees += element.service_fee;
  });

  const jumboLoanFactors = JSON.parse(jumboCalculateType.calculation_loan_factors);

  const { downpaymentAmount, downPaymentPercent, newLoanAmount } = calculationCateoryCheck(jumboCalculateDto);

  const totalLoanAmount = newLoanAmount;

  const interestRateMonthly = jumboCalculateDto.interest_rate / 100 / 12;

  const termMonthly = jumboCalculateDto.mortgage_term * 12;

  const annualInsuranceMonthly = round(jumboCalculateDto.hazard_insurance / 12, 2);

  const annualTaxYearly = (jumboCalculateDto.annual_property_tax / 100) * jumboCalculateDto.property_price;

  const annualTaxMonthly = annualTaxYearly / 12;

  // LTV
  const loanToValue = (newLoanAmount / jumboCalculateDto.property_price) * 100;

  let mortgageInsurance = 0;

  const selectedConventionalLoanFactor = jumboLoanFactors.find(element => element.id === jumboCalculateDto.credit_id);

  const mortgageInsuranceFiltered = jumboLoanFactors.filter(element => {
    if (
      element.year === jumboCalculateDto.mortgage_term &&
      element.fico_min === selectedConventionalLoanFactor?.fico_min &&
      element.fico_max === selectedConventionalLoanFactor?.fico_max &&
      element.ltv_min <= loanToValue &&
      element.ltv_max >= loanToValue
    ) {
      return true;
    }
    return false;
  });

  if (!isEmpty(mortgageInsuranceFiltered)) {
    mortgageInsurance = mortgageInsuranceFiltered[0].mi;
  }

  // PMI
  const privateMortgageInsurance = round(downPaymentPercent < 20 ? (mortgageInsurance / 100) * newLoanAmount : 0, 2);

  const privateMortgageInsuranceMonthly = round(privateMortgageInsurance / 12, 2);

  const denominatorPayment =
    (Math.pow(1 + interestRateMonthly, termMonthly) - 1) /
    (interestRateMonthly * Math.pow(1 + interestRateMonthly, termMonthly));

  // Monthly payment
  const monthlyPayment = round(totalLoanAmount / denominatorPayment, 2);

  // apr
  let apr = round(+calculateAPR(newLoanAmount, termMonthly, jumboCalculateDto.interest_rate / 100, fees), 4);
  apr = apr * 100;

  const taxesAndHoa = round(annualTaxMonthly + jumboCalculateDto.monthly_hoa, 2);

  // Total Monthly Payment
  const totalMonthlyPayment = round(
    monthlyPayment + taxesAndHoa + annualInsuranceMonthly + privateMortgageInsuranceMonthly,
    2,
  );

  // Tax, Ins, MI
  const taxInsMiAmount = round(taxesAndHoa + annualInsuranceMonthly + privateMortgageInsuranceMonthly, 2);

  // Amortization
  const amortization = [];
  for (let index = 0; index < termMonthly; index++) {
    const interest = round(((jumboCalculateDto.interest_rate / 100) * newLoanAmount) / 12, 2);
    if (index === 0) {
      amortization.push({
        tax_ins_mi_amount: taxInsMiAmount,
        interest,
        total_interest: interest,
        principal: round(monthlyPayment - interest, 2),
        total_principal: round(monthlyPayment - interest, 2),
        balance: newLoanAmount - (monthlyPayment - interest),
        ltv: (newLoanAmount - (monthlyPayment - interest)) / jumboCalculateDto.property_price,
      });
    } else {
      const principal = round(
        monthlyPayment - ((jumboCalculateDto.interest_rate / 100) * amortization[index - 1].balance) / 12 <
          amortization[index - 1].balance
          ? monthlyPayment - ((jumboCalculateDto.interest_rate / 100) * amortization[index - 1].balance) / 12
          : amortization[index - 1].balance,
        2,
      );

      const interest = round(((jumboCalculateDto.interest_rate / 100) * amortization[index - 1].balance) / 12, 2);

      amortization.push({
        tax_ins_mi_amount:
          amortization[index - 1].ltv > 0.8
            ? amortization[index - 1].tax_ins_mi_amount
            : taxesAndHoa + annualInsuranceMonthly,
        interest,
        total_interest: round(interest + amortization[index - 1].total_interest, 2),
        principal,
        total_principal: round(principal + amortization[index - 1].total_principal, 2),
        balance: round(amortization[index - 1].balance - principal, 2),
        ltv: round((amortization[index - 1].balance - principal) / jumboCalculateDto.property_price, 8),
      });
    }
  }

  const chartData = {
    breakdown: {
      principal: monthlyPayment,
      taxes: taxesAndHoa,
      hazard_insurance: annualInsuranceMonthly,
      mortgage_insurance: privateMortgageInsuranceMonthly,
      total_monthly_payment: totalMonthlyPayment,
    },
    details: [
      {
        name: 'Property Value',
        field_name: 'property_price',
        value: '$' + convertNumberToUSFormatLocalString(jumboCalculateDto.property_price),
      },
      {
        name: 'Down Payment',
        field_name: 'downpayment',
        value: '$' + convertNumberToUSFormatLocalString(downpaymentAmount),
      },
      {
        name: 'Base Loan Amount',
        field_name: 'base_loan_amount',
        value: '$' + convertNumberToUSFormatLocalString(newLoanAmount),
      },
      {
        name: 'Intererst Rate',
        field_name: 'interest_rate',
        value: convertNumberToUSFormatLocalString(jumboCalculateDto.interest_rate) + '%',
      },
      {
        name: 'Credit',
        field_name: 'interest_rate',
        value: selectedConventionalLoanFactor
          ? `${selectedConventionalLoanFactor.fico_min}-${selectedConventionalLoanFactor.fico_max}`
          : 0.0,
      },
      {
        name: 'APR',
        field_name: 'apr',
        value: convertNumberToUSFormatLocalString(apr) + '%',
      },
      {
        name: 'Total Loan Amount',
        field_name: 'total_loan_amount',
        value: '$' + convertNumberToUSFormatLocalString(totalLoanAmount),
      },
      {
        name: 'Principal & Interest',
        field_name: 'principal',
        value: '$' + convertNumberToUSFormatLocalString(monthlyPayment),
      },
      {
        name: 'Taxes & HOA',
        field_name: 'taxes',
        value: '$' + convertNumberToUSFormatLocalString(taxesAndHoa),
      },
      {
        name: 'Hazard Insurance',
        field_name: 'hazard_insurance',
        value: '$' + convertNumberToUSFormatLocalString(annualInsuranceMonthly),
      },
      {
        name: 'Mortgage Insurance',
        field_name: 'mortgage_insurance',
        value: '$' + convertNumberToUSFormatLocalString(privateMortgageInsuranceMonthly),
      },
      {
        name: 'Total Payment Amount',
        field_name: 'total_monthly_payment',
        value: '$' + convertNumberToUSFormatLocalString(totalMonthlyPayment),
      },
    ],
  };

  const result: Record<string, unknown> = {
    ...chartData,
    amortization,
    disclaimer: jumboCalculateType.calculator_disclaimer,
  };

  const data = {
    result,
    chartData,
  };
  return data;
};

export const calculateUsda = (
  usdaCalculateDto: UsdaCalulateDto,
  usdaCalculateType: Calculation_Types,
  serviceFees: Service_Fees[],
): any => {
  let fees = 0;
  serviceFees.map(element => {
    fees += element.service_fee;
  });

  const usdaDefaultFactors = JSON.parse(usdaCalculateType.calculation_default_values);

  const usdaLoanFactors = JSON.parse(usdaCalculateType.calculation_loan_factors);

  const { downpaymentAmount, downPaymentPercent, newLoanAmount } = calculationCateoryCheck(usdaCalculateDto, true);

  const totalLoanAmount = (usdaDefaultFactors.usda_guarantee_fees / 100) * newLoanAmount + newLoanAmount;

  const interestRateMonthly = usdaCalculateDto.interest_rate / 100 / 12;

  const termMonthly = usdaCalculateDto.mortgage_term * 12;

  const annualInsuranceMonthly = round(usdaCalculateDto.hazard_insurance / 12, 2);

  const annualTaxYearly = (usdaCalculateDto.annual_property_tax / 100) * usdaCalculateDto.property_price;

  const annualTaxMonthly = annualTaxYearly / 12;

  // LTV
  const loanToValue = (newLoanAmount / usdaCalculateDto.property_price) * 100;

  let mortgageInsurance = 0;

  const mortgageInsuranceFiltered = usdaLoanFactors.filter(element => {
    if (element.ltv_min <= loanToValue && element.ltv_max >= loanToValue) {
      return true;
    }
    return false;
  });

  if (!isEmpty(mortgageInsuranceFiltered)) {
    mortgageInsurance = mortgageInsuranceFiltered[0].mi;
  }

  // PMI
  const privateMortgageInsurance = round(downPaymentPercent < 20 ? (mortgageInsurance / 100) * newLoanAmount : 0, 2);

  const privateMortgageInsuranceMonthly = round(privateMortgageInsurance / 12, 2);

  const denominatorPayment =
    (Math.pow(1 + interestRateMonthly, termMonthly) - 1) /
    (interestRateMonthly * Math.pow(1 + interestRateMonthly, termMonthly));

  // Monthly payment
  const monthlyPayment = round(totalLoanAmount / denominatorPayment, 2);

  // apr
  let apr = round(+calculateAPR(newLoanAmount, termMonthly, usdaCalculateDto.interest_rate / 100, fees), 4);
  apr = apr * 100;

  const taxesAndHoa = round(annualTaxMonthly + usdaCalculateDto.monthly_hoa, 2);

  // Total Monthly Payment
  const totalMonthlyPayment = round(
    monthlyPayment + taxesAndHoa + annualInsuranceMonthly + privateMortgageInsuranceMonthly,
    2,
  );

  // Tax, Ins, MI
  const taxInsMiAmount = round(taxesAndHoa + annualInsuranceMonthly + privateMortgageInsuranceMonthly, 2);

  // Amortization
  const amortization = [];
  for (let index = 0; index < termMonthly; index++) {
    const interest = round(((usdaCalculateDto.interest_rate / 100) * newLoanAmount) / 12, 2);
    if (index === 0) {
      amortization.push({
        tax_ins_mi_amount: taxInsMiAmount,
        interest,
        total_interest: interest,
        principal: round(monthlyPayment - interest, 2),
        total_principal: round(monthlyPayment - interest, 2),
        balance: newLoanAmount - (monthlyPayment - interest),
        ltv: (newLoanAmount - (monthlyPayment - interest)) / usdaCalculateDto.property_price,
      });
    } else {
      const principal = round(
        monthlyPayment - ((usdaCalculateDto.interest_rate / 100) * amortization[index - 1].balance) / 12 <
          amortization[index - 1].balance
          ? monthlyPayment - ((usdaCalculateDto.interest_rate / 100) * amortization[index - 1].balance) / 12
          : amortization[index - 1].balance,
        2,
      );

      const interest = round(((usdaCalculateDto.interest_rate / 100) * amortization[index - 1].balance) / 12, 2);

      amortization.push({
        tax_ins_mi_amount:
          amortization[index - 1].ltv > 0.8
            ? amortization[index - 1].tax_ins_mi_amount
            : taxesAndHoa + annualInsuranceMonthly,
        interest,
        total_interest: round(interest + amortization[index - 1].total_interest, 2),
        principal,
        total_principal: round(principal + amortization[index - 1].total_principal, 2),
        balance: round(amortization[index - 1].balance - principal, 2),
        ltv: round((amortization[index - 1].balance - principal) / usdaCalculateDto.property_price, 8),
      });
    }
  }
  const chartData = {
    breakdown: {
      principal: monthlyPayment,
      taxes: taxesAndHoa,
      hazard_insurance: annualInsuranceMonthly,
      mortgage_insurance: privateMortgageInsuranceMonthly,
      total_monthly_payment: totalMonthlyPayment,
    },
    details: [
      {
        name: 'Property Value',
        field_name: 'property_price',
        value: '$' + convertNumberToUSFormatLocalString(usdaCalculateDto.property_price),
      },
      {
        name: 'Down Payment',
        field_name: 'downpayment',
        value: '$' + convertNumberToUSFormatLocalString(downpaymentAmount),
      },
      {
        name: 'Base Loan Amount',
        field_name: 'base_loan_amount',
        value: '$' + convertNumberToUSFormatLocalString(newLoanAmount),
      },
      {
        name: 'Intererst Rate',
        field_name: 'interest_rate',
        value: convertNumberToUSFormatLocalString(usdaCalculateDto.interest_rate) + '%',
      },
      {
        name: 'USDA Guarantee Fee',
        field_name: 'usda_guarantee_fees',
        value: convertNumberToUSFormatLocalString(usdaDefaultFactors.usda_guarantee_fees) + '%',
      },
      {
        name: 'APR',
        field_name: 'apr',
        value: convertNumberToUSFormatLocalString(apr) + '%',
      },
      {
        name: 'Total Loan Amount',
        field_name: 'total_loan_amount',
        value: '$' + convertNumberToUSFormatLocalString(totalLoanAmount),
      },
      {
        name: 'Principal & Interest',
        field_name: 'principal',
        value: '$' + convertNumberToUSFormatLocalString(monthlyPayment),
      },
      {
        name: 'Taxes & HOA',
        field_name: 'taxes',
        value: '$' + convertNumberToUSFormatLocalString(taxesAndHoa),
      },
      {
        name: 'Hazard Insurance',
        field_name: 'hazard_insurance',
        value: '$' + convertNumberToUSFormatLocalString(annualInsuranceMonthly),
      },
      {
        name: 'Mortgage Insurance',
        field_name: 'mortgage_insurance',
        value: '$' + convertNumberToUSFormatLocalString(privateMortgageInsuranceMonthly),
      },
      {
        name: 'Total Payment Amount',
        field_name: 'total_monthly_payment',
        value: '$' + convertNumberToUSFormatLocalString(totalMonthlyPayment),
      },
    ],
  };

  const result: Record<string, unknown> = {
    ...chartData,
    amortization,
    disclaimer: usdaCalculateType.calculator_disclaimer,
  };

  const data = {
    result,
    chartData,
  };
  return data;
};

export const calculateVa = (
  vaCalculateDto: VaCalulateDto,
  vaCalculateType: Calculation_Types,
  serviceFees: Service_Fees[],
): any => {
  let fees = 0;
  serviceFees.map(element => {
    fees += element.service_fee;
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const vaDefaultFactors = JSON.parse(vaCalculateType.calculation_default_values);

  const vaLoanFactors = JSON.parse(vaCalculateType.calculation_loan_factors);

  const { downpaymentAmount, downPaymentPercent, newLoanAmount } = calculationCateoryCheck(vaCalculateDto);

  const vaSelectedTypeService = vaLoanFactors.find(element => element.id === vaCalculateDto.type_service);

  const defaultSelectedDownAmount = vaCalculateDto.user_loan_before ? 'subsequent' : 'first';

  const vaFundingFees =
    vaCalculateDto.annual_property_tax >= 0 && vaCalculateDto.annual_property_tax <= 5
      ? vaSelectedTypeService.down_0[defaultSelectedDownAmount]
      : vaCalculateDto.annual_property_tax >= 5 && vaCalculateDto.annual_property_tax <= 10
      ? vaSelectedTypeService.down_5[defaultSelectedDownAmount]
      : vaCalculateDto.annual_property_tax >= 10
      ? vaSelectedTypeService.down_5[defaultSelectedDownAmount]
      : 0;

  const vaFundingFeeAmount = (vaFundingFees / 100) * newLoanAmount;

  const totalLoanAmount = vaFundingFeeAmount + newLoanAmount;

  const interestRateMonthly = vaCalculateDto.interest_rate / 100 / 12;

  const termMonthly = vaCalculateDto.mortgage_term * 12;

  const annualInsuranceMonthly = round(vaCalculateDto.hazard_insurance / 12, 2);

  const annualTaxYearly = (vaCalculateDto.annual_property_tax / 100) * vaCalculateDto.property_price;

  const annualTaxMonthly = annualTaxYearly / 12;

  // LTV
  const loanToValue = (newLoanAmount / vaCalculateDto.property_price) * 100;

  let mortgageInsurance = 0;

  const mortgageInsuranceFiltered = vaLoanFactors.filter(element => {
    if (element.ltv_min <= loanToValue && element.ltv_max >= loanToValue) {
      return true;
    }
    return false;
  });

  if (!isEmpty(mortgageInsuranceFiltered)) {
    mortgageInsurance = mortgageInsuranceFiltered[0].mi;
  }

  // PMI
  const privateMortgageInsurance = round(downPaymentPercent < 20 ? (mortgageInsurance / 100) * newLoanAmount : 0, 2);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const privateMortgageInsuranceMonthly = round(privateMortgageInsurance / 12, 2);

  const denominatorPayment =
    (Math.pow(1 + interestRateMonthly, termMonthly) - 1) /
    (interestRateMonthly * Math.pow(1 + interestRateMonthly, termMonthly));

  // Monthly payment
  const monthlyPayment = round(newLoanAmount / denominatorPayment, 2);

  // apr
  let apr = round(
    +calculateAPR(newLoanAmount, termMonthly, vaCalculateDto.interest_rate / 100, fees + vaFundingFeeAmount),
    4,
  );
  apr = apr * 100;

  const taxesAndHoa = round(annualTaxMonthly + vaCalculateDto.monthly_hoa, 2);

  // Total Monthly Payment
  const totalMonthlyPayment = round(monthlyPayment + taxesAndHoa + annualInsuranceMonthly + 0, 2);

  // Tax, Ins, MI
  const taxInsMiAmount = round(taxesAndHoa + annualInsuranceMonthly + 0, 2);

  // Amortization
  const amortization = [];
  for (let index = 0; index < termMonthly; index++) {
    const interest = round(((vaCalculateDto.interest_rate / 100) * newLoanAmount) / 12, 2);
    if (index === 0) {
      amortization.push({
        tax_ins_mi_amount: taxInsMiAmount,
        interest,
        total_interest: interest,
        principal: round(monthlyPayment - interest, 2),
        total_principal: round(monthlyPayment - interest, 2),
        balance: newLoanAmount - (monthlyPayment - interest),
        ltv: (newLoanAmount - (monthlyPayment - interest)) / vaCalculateDto.property_price,
      });
    } else {
      const principal = round(
        monthlyPayment - ((vaCalculateDto.interest_rate / 100) * amortization[index - 1].balance) / 12 <
          amortization[index - 1].balance
          ? monthlyPayment - ((vaCalculateDto.interest_rate / 100) * amortization[index - 1].balance) / 12
          : amortization[index - 1].balance,
        2,
      );

      const interest = round(((vaCalculateDto.interest_rate / 100) * amortization[index - 1].balance) / 12, 2);

      amortization.push({
        tax_ins_mi_amount:
          amortization[index - 1].ltv > 0.8
            ? amortization[index - 1].tax_ins_mi_amount
            : taxesAndHoa + annualInsuranceMonthly,
        interest,
        total_interest: round(interest + amortization[index - 1].total_interest, 2),
        principal,
        total_principal: round(principal + amortization[index - 1].total_principal, 2),
        balance: round(amortization[index - 1].balance - principal, 2),
        ltv: round((amortization[index - 1].balance - principal) / vaCalculateDto.property_price, 8),
      });
    }
  }

  const chartData = {
    breakdown: {
      principal: monthlyPayment,
      taxes: taxesAndHoa,
      hazard_insurance: annualInsuranceMonthly,
      mortgage_insurance: 0,
      total_monthly_payment: totalMonthlyPayment,
    },
    details: [
      {
        name: 'Property Value',
        field_name: 'property_price',
        value: '$' + convertNumberToUSFormatLocalString(vaCalculateDto.property_price),
      },
      {
        name: 'Down Payment',
        field_name: 'downpayment',
        value: '$' + convertNumberToUSFormatLocalString(downpaymentAmount),
      },
      {
        name: 'Base Loan Amount',
        field_name: 'base_loan_amount',
        value: '$' + convertNumberToUSFormatLocalString(newLoanAmount),
      },
      {
        name: 'Intererst Rate',
        field_name: 'interest_rate',
        value: convertNumberToUSFormatLocalString(vaCalculateDto.interest_rate) + '%',
      },
      {
        name: 'APR',
        field_name: 'apr',
        value: convertNumberToUSFormatLocalString(apr) + '%',
      },
      {
        name: 'Taxes, Insurance, MI, HOA',
        field_name: 'tax_ins_mi_amount',
        value: '$' + convertNumberToUSFormatLocalString(taxInsMiAmount),
      },
      {
        name: 'VA Funding Fees',
        field_name: 'va_funding_fees',
        value: '$' + convertNumberToUSFormatLocalString(vaFundingFeeAmount),
      },
      {
        name: 'Total Loan Amount',
        field_name: 'total_loan_amount',
        value: '$' + convertNumberToUSFormatLocalString(totalLoanAmount),
      },
      {
        name: 'Principal & Interest',
        field_name: 'principal',
        value: '$' + convertNumberToUSFormatLocalString(monthlyPayment),
      },
      {
        name: 'Taxes & HOA',
        field_name: 'taxes',
        value: '$' + convertNumberToUSFormatLocalString(taxesAndHoa),
      },
      {
        name: 'Hazard Insurance',
        field_name: 'hazard_insurance',
        value: '$' + convertNumberToUSFormatLocalString(annualInsuranceMonthly),
      },
      {
        name: 'Mortgage Insurance',
        field_name: 'mortgage_insurance',
        value: '$' + 0,
      },
      {
        name: 'Total Payment Amount',
        field_name: 'total_monthly_payment',
        value: '$' + convertNumberToUSFormatLocalString(totalMonthlyPayment),
      },
    ],
  };

  const result: Record<string, unknown> = {
    ...chartData,
    amortization,
    disclaimer: vaCalculateType.calculator_disclaimer,
  };

  const data = {
    result,
    chartData,
  };
  return data;
};
export const calculationCateoryCheck = (
  calculationValues: FhaCalulateDto | ConventionalCalulateDto | UsdaCalulateDto | VaCalulateDto | JumboCalculateDto,
  isDownZero?: boolean | null,
): {
  downpaymentAmount: number;
  downPaymentPercent: number;
  newLoanAmount: number;
} => {
  let downpaymentAmount = 0;
  let newLoanAmount = 0;
  let downPaymentPercent = 0;
  switch (calculationValues.category) {
    case 'purchase':
      downpaymentAmount = round((calculationValues.downpayment_min / 100) * calculationValues.property_price, 2);
      newLoanAmount = calculationValues.property_price - downpaymentAmount;
      downPaymentPercent = calculationValues.downpayment_min;
      break;

    case 'refinance':
      if (!isDownZero) {
        newLoanAmount = calculationValues.new_loan_amount;
        downpaymentAmount = calculationValues.property_price - newLoanAmount;
        downPaymentPercent = round((downpaymentAmount / calculationValues.property_price) * 100, 2);
      } else {
        newLoanAmount = calculationValues.property_price;
      }
      break;

    default:
      downpaymentAmount = round((calculationValues.downpayment_min / 100) * calculationValues.property_price, 2);

      newLoanAmount = calculationValues.property_price - downpaymentAmount;
      break;
  }

  return { downpaymentAmount, downPaymentPercent, newLoanAmount };
};

export const calculateAPR = (
  loanamount: number,
  numpayments: number,
  baseannualrate: number,
  costs: number,
): string => {
  const rate = baseannualrate / 12;
  const totalmonthlypayment =
    ((loanamount + costs) * rate * Math.pow(1 + rate, numpayments)) / (Math.pow(1 + rate, numpayments) - 1);
  let testrate = rate;
  let iteration = 1;
  let testresult = 0;
  //iterate until result = 0
  let testdiff = testrate;

  testresult =
    (testrate * Math.pow(1 + testrate, numpayments)) / (Math.pow(1 + testrate, numpayments) - 1) -
    totalmonthlypayment / loanamount;
  while (Math.abs(testresult) > 0.0000001) {
    testdiff = testdiff / 2;
    if (testresult < 0) testrate += testdiff;
    else testrate -= testdiff;

    testresult =
      (testrate * Math.pow(1 + testrate, numpayments)) / (Math.pow(1 + testrate, numpayments) - 1) -
      totalmonthlypayment / loanamount;
    if (iteration > 1000) break;

    iteration++;
  }
  testrate = testrate * 12;

  return testrate.toFixed(6);
};

// to send email of assign lo logs to dubbing app issue
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// export const sendLOErrorMail = async (mailService: MailerService, error: any): Promise<void> => {
//   mailService
//     .sendMail({
//       to: ['vr@yopmail.com', 'neha@creolestudios.com', 'harshil.patel@creolestudios.com'],
//       from: process.env.SENDGRID_USER_EMAIL,
//       subject: 'Logs regarding Assign Lo',
//       template: 'error',
//       context: {
//         error: error,
//         imageData: getPublicImageUrl(),
//       },
//     })
//     .catch(mailError => {
//       sendFailureMail(mailService, mailError);
//     });
// };

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const filterSocialLink = (socialLinks: any) => {
  let links = JSON.parse(socialLinks);
  if (size(links)) {
    delete links.google_link;
    delete links.pinterest_link;
    // The below two condition would be removed if all the
    // existing user have following keys in DB.
    if (!links?.tikTok_link) {
      links.tikTok_link = null;
    }

    if (!links?.instagram_link) {
      links.instagram_link = null;
    }
  }

  return links;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const filterHeaderLink = (headerLinks: any) => {
  const finalResult = {};
  Object.keys(headerLinks).map(key => {
    if (headerLinks[key]?.status === true) {
      finalResult[key] = headerLinks[key];
    }
  });

  return finalResult;
};

export const profileLinks = (user: Users, icon: string): string => {
  let links = {
    bio: {
      status: true,
    },
    call: {
      status: true,
      input: user.contact_number,
    },
    text: {
      status: true,
      input: user.contact_number,
    },
    email: {
      status: true,
      input: user.email,
    },
    appointment: {
      status: false,
      icon: icon,
      input: '',
    },
    dm: {
      status: false,
    },
  };
  return JSON.stringify(links);
};

// If an LO becomes deleted/inactive, then the borrower should get linked back to
// the owner of the branded app, the main LO account
export const SwitchParent = async (user: Users): Promise<any> => {
  // for employee LO disable
  const brandedAppDetails = await Branded_App_Users.findOne({
    where: {
      loan_officer_id: user?.parent_id,
      status: BrandedApp_Approved_Status.active,
      deleted_at: null,
    },
    order: {
      id: 'DESC',
    },
  });

  const users = await Users.find({
    where: {
      parent_id: user,
      role: In([3]),
      deleted_at: IsNull(),
    },
  });

  if (brandedAppDetails) {
    users?.map(async element => {
      element.parent_id = user.parent_id;
      await element.save();
    });

    //TODO add default pending
  }
  // main app LO
  else {
    users?.map(async element => {
      element.parent_id = null;
      await element.save();
    });
  }
  // Refers remove for lo
  const refers = await Refers.find({
    where: {
      deleted_at: IsNull(),
      referred_by: user.id,
    },
  });

  refers?.map(async refer => {
    refer.deleted_at = new Date();
    await refer.save();
  });
};

// Revoke access-token when Employee switched Main App to Branded App or vice versa
export const RevokeAccess = async (id: number): Promise<any> => {
  const employeeDetail = await Users.findOne({
    where: {
      id: id,
      deleted_at: IsNull(),
    },
  });

  if (!employeeDetail) {
    throw new BadRequestException(VALIDATION_MSG.lo_not_exist);
  }

  const tokenCheck = await Oauth_Tokens.find({
    where: {
      user_id: id,
      is_revoked: false,
    },
  });

  tokenCheck.forEach(async token => {
    token.is_revoked = true;
    await token.save();
  });

  // employeeLo borrowers (not include signed branded app BO)
  const borrowers = await Users.find({
    where: {
      parent_id: id,
      role: 3,
      signed_brand_id: IsNull(),
      deleted_at: IsNull(),
    },
  });

  borrowers?.forEach(async borrower => {
    const tokenCheck = await Oauth_Tokens.find({
      where: {
        user_id: borrower.id,
        is_revoked: false,
      },
    });

    tokenCheck.forEach(async token => {
      token.is_revoked = true;
      await token.save();
    });
  });
};
