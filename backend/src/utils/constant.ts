import { v4 as uuidv4 } from 'uuid';

export const MOBILE = 'mob';
export const WEB = 'web';
export const PREFIX = '/api/v1';
export const BORROWER = '/borrower';
export const LOANOFFICER = '/loanofficer';
export const ADMIN = '/admin';

export const FHA = 'FHA';
export const CONVENTIONAL = 'Conventional';
export const JUMBO = 'Jumbo';
export const USDA = 'USDA';
export const VA = 'VA';
export const AFFORDABILITY = 'Affordability';
export const SHOULD_REFINANCE = 'Should I Refinance';

export const MAXCALCULATORVAL = {
  FHA: 10000000,
  CONVENTIONAL: 10000000,
  JUMBO: 10000000,
  USDA: 10000000,
  VA: 10000000,
};

export enum ErrorCode {
  DUPLICATE_ENTRY = 502, //Duplicate entry typeorm code
}

export enum SuccessMessage {
  success_coBrand_officer = 'Co-Branding Officer added successfully!!',
  success_coBrand_officer_edit = 'Co-Branding Officer update successfully!!',
  subscription_plan = 'Subscription Plan Added Successfully!!',
  subscritpion_plan_edit = 'Subscription Plan edit Successfully!!',
  subscibe_completed = 'Subscription Successful',
  subscription_cancelled = 'Subscription Cancelled',
  subscription_expired = 'Subscription Expired',
  add_loanOfficer = 'LoanOfficer Added Successfully!!',
  branded_app_request = 'Branded app request generated successfully',
  branded_app_accept = 'BrandedApp Accept Successfully !!',
  branded_app_status_changed = 'Branded App status changed successfully.',
  branded_app_reject = 'BrandedApp Reject Successfully !!',
  branded_app_info = 'Branded App info updated successfully',
  service_fees_removed = 'Fees Removed Successfully',
  check_inbox = 'Check your inbox for verification code',
  account_verification_code_sent = 'Account Verification code sent to your mail',
  password_reset_code_sent = 'Password Reset code sent to your mail',
  receive_verification_code = 'You will receive a verification code on the registered email address',
  password_forgot_code_set = 'Verification code sent to you mail check',
  password_reset = 'Password Reset Success',
  callback_request = 'Your request has been sent',
  lo_updated_in_borrower = 'Loan Officer updated for Borrower',
  no_document_available = 'No document available',
  document_delete = 'Document Deleted Success',
  add_support_guide = 'New Support Guide Added',
  delete_support_guide = 'Support Guide Deleted',
  update_support_guide = 'Support Guide Updated',
  checked_support_guide = 'Support Guide Checked',
  add_support_guide_category = 'New Support Guide Category Added',
  update_support_guide_category = 'Support Guide Category Updated',
  delete_support_guide_category = 'Support Guide Category Deleted',
  borrower_profile_updated = 'Borrower Profile Updated Successfully',
  lo_profile_updated = 'LO Profile Updated Successfully',
  lo_logo_updated = 'LO Logo Updated Successfully',
  password_changed = 'Password changed successfully',
  faqs_saved = 'FAQS save successfully!!',
  faqs_updated = 'FAQS update successfully!!',
  faqs_deleted = 'FAQS delete successfully!!',
  logged_out = 'Logged out',
  restored_default = 'Restored to default',
  profile_updated = 'Profile updated successfully',
  link_updated = 'Links updated successfully',
  save_glossary = 'Glossary Added successfully !!',
  edit_glossary = 'Glossary Updated successfully !!',
  delete_glossary = 'Glossary Deleted successfully !!',
  mail_sent = 'Mail Sent successfully !!',
  share_app = 'App Shared Successfully !!',
  add_promoCode = 'Promocode Added successfully !!',
  edit_promoCode = 'Promocode Updated successfully !!',
  delete_promoCode = 'Promocode Deleted successfully !!',
  add_credits = 'Total Credits added successfully !!',
  edit_credits = 'Total Credits updated successfully !!',
  delete_credits = 'Credits deleted successfully !!',
  add_notes = 'Notes added successfully !!',
  edit_notes = 'Notes updated successfully !!',
  delete_notes = 'Notes deleted successfully !!',
  add_reps = 'Reps added successfully !!',
  disabled_lo = 'Loan Officer Enable/Disabled status changes !!',
  future_promo_code = 'Future Promocode apply successfully!!',
  branded_app_approved = 'BrandedApp Approved successfully',
  deep_link_success = 'Deep link successfully',
  message_deleted = 'Message deleted successfully.',
  custom_link_deleted = 'Custom link deleted successfully.',
  email_updated = 'email_updated',
  playstore_status_change = 'Playstore status changed successfully.!',
  notifications_read = 'Notifications read successfully.',
  mail_title_forgot_password = 'Forgot your Password?',
  calculation_deleted = 'Calculation deleted successfully!',
  message_sent = 'Sent message successfully!',
  web_link_save = 'Your custom web link saved successfully'
}

export const VALIDATION_MSG = {
  email_invalid: 'Email is not valid',
  verify_email: 'Please verify email',
  invalid_code: 'Invalid Code',
  invalid_user: 'Invalid User',
  code_invalid: 'Code is invalid',
  invalid_credentials: 'Invalid Credentials',
  id_not_exists: 'ID doesnot exist in the resource',
  borrower_not_exists: 'Borrower doesnot exist for this id',
  legal_not_exist: 'Legal doesnot exists',
  guide_not_exist: 'Guide doesnot exists',
  calculate_not_exist: 'Calculate Type doesnot exists',
  calculation_not_exist: 'Calculation doesnot exists',
  calculation_saved_already: 'Calculation is saved before',
  service_fees_not_exist: 'Service Fees doesnot exists',
  service_fees_name_exist: 'Service Fees name already exists',
  sequence_not_exist: 'Sequence doesnot exist in the resource',
  forgot_password: 'A password email has been sent if it exists',
  lo_not_selected: 'Loan Officer is not selected for the borrower',
  lo_not_exist: 'Loan Officer doesnot exist',
  co_brand_not_exist: 'Co-brand Officer doesnot exist',
  account_not_exist: 'Didn"t find an account with that email.',
  fire_id_not_exist: 'Firebase id doesnot exist',
  lo_not_access: 'Loan Officer doesnot have access to this resource',
  checklist_name_exist: 'Checklist name already exist try different one',
  code_expired: 'Code Expired, please check inbox for new code',
  invalid_verification_code: 'Invalid Verification Code',
  same_password: 'The password is same as old one, please use other password',
  user_not_exist: 'No User Exist with following email',
  user_exist_email: 'User already exist with following email',
  user_exist: 'User is already exist in the system.',
  reps_exist: 'Reps already exist',
  data_not_found: 'No Data Found',
  lo_not_found: 'No Loan Officer Found',
  checklist_id: 'Checklist id doesnot exists',
  checklist_items: 'Checklist Items doesnot exists',
  category_not_found: 'No Category Found',
  user_not_exists: 'User Does not exists',
  name_can_not_empty: 'Name cannot be empty string',
  incorrect_password: 'Incorrect current password',
  not_same_password: 'Current password and new password cannot be same',
  role_unauthorized: 'User Role is not authorized for this resource',
  mortgage_guide_array_of_object: 'mortgage_guide should be array of object',
  mortgage_guide_not_empty: 'mortgage_guide should not be empty',
  menu_array_of_object: 'menu should be array of object',
  menu_not_empty: 'menu should not be empty',
  company_menu_required: 'company menu is required for branded LO.',
  company_menu_array_of_object: 'company menu should be array of object',
  company_menu_not_empty: 'company menu should not be empty',
  dashboard_required: 'Dashboard is required',
  link_exits: 'Link already exist, use different one',
  link_not_exits: 'Link doesnot exist',
  no_learning_center_exits: 'No Learning Center Exist for the id',
  no_checklist_exits: 'No Checklist exist for the id.',
  no_checklist_item_exits: 'No Checklist Item exist for the id.',
  no_email_signature_exits: 'No email signature Exist for the id',
  brandedApp_not_found: 'BrandedApp Not Found of this id',
  brandedApp_not_apply: 'BrandedApp Not Applied',
  brandedApp_not_approved: 'BrandedApp Not Approved By admin',
  subscription_exits: 'Subscription exits',
  subscription_plan_exits: 'Subscription Plan already exits',
  subscription_cancelled: 'Subscription already cancelled !!',
  subscription_plan_not_exits: 'Subscription Plan not exits',
  coBrandOfficer_not_found: 'CoBranding Officer Not Found of this id',
  user_address_not_found: 'User Address Not found of this id',
  status_not_found: 'BrandedApp Status not found',
  discount_type_not_found: 'Discount Type not found',
  copies_not_found: 'Copies not found',
  coupons_not_found: 'Coupons not found',
  defaults_not_found: 'Defaults not found',
  types_not_found: 'Types not found',
  signup_subscription_not_exits: 'Standard Subscription Plan does not exits',
  signup_subscription_expired: 'Standard subscription is expired',
  calculation_types_not_found: 'Calculation Types not found',
  legal_types_not_found: 'Legal Types not found',
  already_diabled: 'Loan Officer already Disabled',
  lo_not_access_login: 'Sorry, you are disabled by admin',
  promo_code_not_found: 'PromoCode not found',
  brandedApp_apply_alredy: 'You are already applied branded App.',
  brandedApp_request_pending: 'Your request is pending for branded App.',
  branded_app_expired: 'Your Branded App is expired.',
  promoCode_exit: 'PromoCode already exits, please add other PromoCode',
  promoCode_expired: 'Promocode expired',
  promoCode_cannot_use: 'This promocode cannot be used.',
  future_promo_codes: 'Future PromoCode already applied',
  lo_exist: 'Loan officer already exist in your listing',
  lo_cannot_add: 'Loan officer cannot be added.',
  lo_standard_subscripion_not_found: 'Loan officer with standard subscription not found.',
  reps_disable: 'You are disable for Reps',
  dates_not_empty: 'dates should not be empty',
  enable_disable_status: 'Enable/Disable status should be a 1 or 0.',
  email_phone_empty: 'Email and Phone Number both cannot be empty.',
  email_or_phone_empty: 'Email OR Phone Number cannot be empty.',
  borrower_has_lo: 'Borrower is already associated with LO',
  borrower_has_co_branding_officer: 'Borrower is already associated with CoBranding Officer',
  brandedapp_not_access: 'You have branded app access, Please login into your branded application',
  billingDetails_not_fount: 'Billing Details not found',
  user_already_verified: 'User already Verified',
  employee_lo_cannot_add_link: 'Employee LO cannot add their own custom web link'
};

export const ErrorMessage = {
  parent_user: 'Parent User Not Found',
  email_exist: 'Email already exist try different one',
  refresh_token_expired: 'Refresh token expired',
  account_already_verified: 'Account is already verified',
  code_already_verified: 'Code is already verified',
  no_verification_code_available: 'No Verification code available try again',
  try_again_latter: 'Please do try again latter',
  lo_not_exist_in_borrower: 'Borrower doesnot have any Loan Officer',
  sequence: 'Sequence can be 0',
  lo_not_assign: 'Lo officer is not assigned to this borrower',
  no_guide: 'No guide',
  no_support_guide_found: 'No Support Guide Category Found',
  no_support_guide_category_found: 'No Support Guide Category Found',
  both_required: 'Contact Number & Country Code both Required',
  setting_not_saved: 'Settings Can not be saved',
  user_not_lo: 'User is not Loan Officer',
  invalid_code: 'Incorrect QR Code, This QR Code is not valid for your application.',
  wrong_branded_app_access: 'Sorry, You don\'t have access to this branded app, Please login into your branded application',
  main_app_access: 'Sorry, This is a branded app, You can\'t log in. Please login into your main application'
};

export const Branded_App_Status = {
  1: 'Active',
  2: 'Inactive',
  3: 'Pending',
  4: 'Rejected',
  5: 'Cancelled',
  6: 'Expired',
};

export const Playstore_Status = {
  1: 'Paid',
  2: 'Inprogress',
  3: 'Complete',
};

export const User_Status = {
  0: 'Pending',
  1: 'Inactive',
  2: 'Active',
  3: 'Cancelled',
};

export const Add_credits = {
  1: 'Days',
  2: 'Month',
  3: 'Year',
};

export const Calculation_Type = {
  1: 'FHA',
  2: 'Conventional',
  3: 'Jumbo',
  4: 'VA',
  5: 'USDA',
  6: 'Affordability',
};

export const Discount_Type = {
  0: 'Percentage',
  1: 'Amount',
};

export const Copies = {
  1: 'unlimited copies',
  2: 'limited copies',
};

export const Coupons = {
  1: '1 coupon per customer',
  2: 'unlimited coupons',
};

export const Defaults = {
  1: 'Menus',
  2: 'Loan Prpgrams',
  3: 'Calculator',
  4: 'Fees',
  5: 'Checklist',
  6: 'Learing Center',
  7: 'Legal',
};

export const Menus = {
  1: 'Dashboard',
  2: 'App Menu',
  3: 'Mortgage Guide',
};

export const Legal = {
  0: 'Disclaimer',
  1: 'Privacy',
};

export enum Invitation_send {
  yes = 'yes',
  no = 'no',
}

export enum BrandedApp_Approved_Status {
  active = 1,
  in_active = 2,
  pending = 3,
  rejected = 4,
  cancelled = 5,
  expired = 6,
}

export enum PaymentFor {
  brandedAppSubscription = 'BrandedApp',
  signUpSubscription = 'Standard',
}

export enum SubscriptionType {
  brandedAppSubscription = 'BrandedApp',
  standardSubscription = 'Standard',
}

export const Recurring_Term = {
  1: 'Monthly',
  2: 'Three Months',
  3: 'Six Months',
  4: 'Nine Months',
  5: 'Annual',
};

export const Subscription_Duration = {
  1: 'Monthly',
  2: ' Annual',
};

export const Billing_Status = {
  0: 'failed',
  1: 'success',
  2: 'Pending',
};

export const Activity_Category = {
  1: 'has signed up as Branch Manager.',
  2: 'has requested for a Branded App.',
  3: 'added a Co-Branding Officer.',
};

export enum FILE_PATH {
  profile_photo = './public/upload/profile',
  document_media = './public/upload/media',
  profile_small = './public/upload/profile_thumbnails',
  qr_code = './public/upload/qrcode',
  chart_pdf = './public/files',
  signature = './public/signature',
}

export const PhotoResolution = {
  '200': 200,
};
export enum NOTIFICATION_CATEGORY {
  Borrower_Uploads_Doc = 1, //'Document uploaded by borrower.'
  DeepLink_LO = 2, //'Application deep linked with LO'
  Promotions = 3, //'Promotions by the LoanTack'
  Callback_Request = 4, //'Callback request by borrower.'
  Card_ExpiryDate_Nearby = 5, //'Credit/debit card expiration date is near'
  Approved_BrandedApp = 6, //'Branded app request aproved by admin'
  Receives_msg_admin = 7, //Receives message from admin
  Receives_msg_LoanOfficer = 8, //Borrower receives message from LO
}

export const Notification_Category = {
  1: NOTIFICATION_CATEGORY.Borrower_Uploads_Doc,
  2: NOTIFICATION_CATEGORY.DeepLink_LO,
  3: NOTIFICATION_CATEGORY.Promotions,
  4: NOTIFICATION_CATEGORY.Callback_Request,
  5: NOTIFICATION_CATEGORY.Card_ExpiryDate_Nearby,
  6: NOTIFICATION_CATEGORY.Approved_BrandedApp,
};

export enum Dual_branding {
  Partner_Only = 0,
  Dual_partner_Me = 1,
  Dual_Me_Partner = 2,
}

export const mortgage_guide_array = [
  {
    id: uuidv4(),
    name: 'Learning Center',
    status: true,
  },
  {
    id: uuidv4(),
    name: 'Loan Programs',
    status: true,
  },
  {
    id: uuidv4(),
    name: 'Glossary',
    status: true,
  },
  {
    id: uuidv4(),
    name: 'Checklist',
    status: true,
  },
];

export const SUCCESS_MSG = {
  verified: 'Verified',
};

export enum UserRole {
  ADMIN = 1,
  LO = 2,
  BORROWER = 3,
  GUEST = 4,
  PARTNERS = 5,
  EMPLOYEES = 6,
}

export enum UserDesignation {
  Primary = 'Primary',
  Employee = 'Employee',
}

export enum CallbackRequestConst {
  ASAP = 1,
  MORNING = 2,
  EVENING = 3,
}

export const ResponseMap = <T>(data: T, message?: string | ''): { data: T; message: string } => {
  return {
    data,
    message: message || '',
  };
};

export enum LinksType {
  DASHBOARD = 'Dashboard',
  CALCULATOR = 'Calculator',
  SCAN = 'Scan',
  GUIDE = 'Guide',
  UPLOADED_DOCUMENTS = 'Documents',
  MESSAGE = 'DM',
  NOTIFICATIONS = 'Notifications',
  SAVED_CALCULATIONS = 'Calculations',
  CHECKLISTS = 'Checklists',
  CALLBACK_REQUEST = 'Callback',
}

export enum LinksNoLOType {
  DASHBOARD = 'Dashboard',
  CALCULATOR = 'Calculator',
  SAVED_CALCULATIONS = 'Calculations',
  SCAN = 'Scan',
  UPLOADED_DOCUMENTS = 'Documents',
}

export const CalculationTypeConst = {
  fha: 'FHA',
  conventional: 'Conventional',
  jumbo: 'Jumbo',
  usda: 'USDA',
  va: 'VA',
  affordability: 'Affordability',
  should_refinance: 'Should I Refinance',
};

export const FHADefaultTypes = {
  new_loan_amount: 0.0,
  property_price_min: 0.0,
  property_price_max: 0.0,
  downpayment_min: 0.0,
  property_tax: 0.0,
  hazard_insurance: 0.0,
  mortgage_term: 15,
  fha_upfront_mip: 0.0,
  min_interest_rate: 0.0,
  max_interest_rate: 0.0,
  interest_rate_15: 0.0,
  interest_rate_30: 0.0,
};

export const FHADefaultLoanFactor = {
  year: 15,
  loan_min: 0.0,
  loan_max: 0.0,
  ltv_min: 0.0,
  ltv_max: 0.0,
  fico_min: 0.0,
  fico_max: 0.0,
  mi: 0.0,
};

export const ServiceFeesDefaults = {
  Administrative: 0.0,
  Application: 0.0,
  Appraisal: 0.0,
  Closing: 0.0,
  Commitment: 0.0,
  Courier: 0.0,
  'Credit Report': 0.0,
  'Document Prep': 0.0,
  Flood: 0.0,
  Inspection: 0.0,
  Notary: 0.0,
  Processing: 0.0,
  Recording: 0.0,
  Survey: 0.0,
  'Tax Service': 0.0,
  Underwriting: 0.0,
  'Wire Transfer': 0.0,
  Other: 0.0,
};

export const ConventionalDefaultTypes = {
  new_loan_amount: 0.0,
  property_price_min: 0.0,
  property_price_max: 0.0,
  downpayment_min: 0.0,
  property_tax: 0.0,
  hazard_insurance: 0.0,
  mortgage_term: 15,
  min_interest_rate: 0.0,
  max_interest_rate: 0.0,
  interest_rate_10: 0.0,
  interest_rate_15: 0.0,
  interest_rate_20: 0.0,
  interest_rate_30: 0.0,
};

export const ConventionalDefaultLoanFactor = {
  year: 15,
  ltv_min: 0.0,
  ltv_max: 0.0,
  fico_min: 0.0,
  fico_max: 0.0,
  mi: 0.0,
};

export const ColorSchemaArrayDefault = [
  // Green
  {
    theme: 'green',
    dark_color: '#4FB263',
    light_color: '#DEFFE5',
    font_color: '#FFFFFF',
    text_color: '#1F2428',
    secondary_color: '#1F2428',
    secondary_color_font: '#FFFFFF',
    default: true,
  },
  // Red
  {
    theme: 'red',
    dark_color: '#E52424',
    light_color: '#FFE7E7',
    font_color: '#FFFFFF',
    text_color: '#1F2428',
    secondary_color: '#090C0F',
    secondary_color_font: '#FFFFFF',
    default: false,
  },
  // Purple
  {
    theme: 'purple',
    dark_color: '#43197E',
    light_color: '#E8D8FF',
    font_color: '#FFFFFF',
    text_color: '#1F2428',
    secondary_color: '#A8ABAE',
    secondary_color_font: '#1F2428',
    default: false,
  },
  // Blue
  {
    theme: 'blue',
    dark_color: '#0653AF',
    light_color: '#D3E7FF',
    font_color: '#FFFFFF',
    text_color: '#1F2428',
    secondary_color: '#090C0F',
    secondary_color_font: '#FFFFFF',
    default: false,
  },
  // Yellow
  {
    theme: 'yellow',
    dark_color: '#EFBE05',
    light_color: '#FFF7D7',
    font_color: '#FFFFFF',
    text_color: '#1F2428',
    secondary_color: '#40515B',
    secondary_color_font: '#FFFFFF',
    default: false,
  },
  // Orange
  {
    theme: 'orange',
    dark_color: '#EB6B17',
    light_color: '#FFEBDD',
    font_color: '#FFFFFF',
    text_color: '#1F2428',
    secondary_color: '#1F2428',
    secondary_color_font: '#FFFFFF',
    default: false,
  },
  // Brown
  {
    theme: 'brown',
    dark_color: '#80300E',
    light_color: '#FFE8DF',
    font_color: '#FFFFFF',
    text_color: '#1F2428',
    secondary_color: '#B3B0B0',
    secondary_color_font: '#1F2428',
    default: false,
  },
  // Black
  {
    theme: 'black',
    dark_color: '#000000',
    light_color: '#E2E2E2',
    font_color: '#FFFFFF',
    text_color: '#1F2428',
    secondary_color: '#A8ABAE',
    secondary_color_font: '#000000',
    default: false,
  },
  // Magenta
  {
    theme: 'magenta',
    dark_color: '#952483',
    light_color: '#FFE1FA',
    font_color: '#FFFFFF',
    text_color: '#1F2428',
    secondary_color: '#C9CBCC',
    secondary_color_font: '#4B4B4B',
    default: false,
  },
];

export const ShouldRefinanceDisclaimer = `LoanTack helps you determine your monthly mortgage payment by estimating your total loan amount, mortgage term length, and interest rate. Accurate estimates rely on the user entering accurate FICO score, property taxes and applicable HOA fees. Any calculation results are estimates, not final loan amounts, and are not guaranteed. `;

export const AppDefaultMenuTypeParams = ['dashboard', 'app'];

export const htmlBoilerplate = (data: string): string => `<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
    img {
      width: 100%;
    }
    </style>
  </head>

  <body>
    ${data}
  </body>
</html>
`;

export const BranchUriVer = 'v1';

export const CurrentCountryData = {
  code: 'US',
  currency: 'USD',
};

export const help_messages = {
  dashboard_info: 'The Dashboard has information about your loan officer and frequently used shortcuts.',
  calculator_info: 'A variety of calculators for purchase, refinance and other tools.',
  calculator_purchase_info:
    'Calculate how much your monthly payment will be, select the type of loan you are interested in.',
  calculator_purchase_details: 'Enter the details of your loan to calculate your monthly payment.',
  calculator_purchase_result:
    'See your payment breakdown, as well as share, download and save options. View amortization schedule and loan details.',
  calculator_refinance_info:
    'Calculate how much your monthly payment will be, select the type of loan you are interested in.',
  calculator_refinance_details: 'Enter the details of your loan to calculate your monthly payment.',
  calculator_refinance_result:
    'See your payment breakdown, as well as share, download and save options. View amortization schedule and loan details.',
  calculator_affordability_details: 'Enter your financial details to see how much you can afford.',
  calculator_affordability_result: 'Shows how much payment you can afford based on your comfort level.',
  should_refinance: 'Enter the details of your current loan and your new loan to see the potential savings',
  should_refinance_result: 'Shows the amount you can save by refinancing.',
  saved_calculations: 'Shows your previously saved calculations from all calculators.',
  scan_info: 'Upload files using your camera or saved media.',
  uploaded_documents: 'Shows the documents you’ve uploaded, swipe items to delete.',
  guide_info: 'Get more information on terms, loan programs and more.',
  learning_center: 'Helpful resources from the mortgage industry.',
  loan_programs_info: 'General information about loan programs.',
  glossary_list_info: 'Definitions to commonly used mortgage terms.',
  checklist_info: 'Helpful checklists provided by your loan officer',
  callback_request: 'Submit your contact information to request a callback.',
};

export const DEPLOY_VERSION = '1.0';
export const QRCODE_DEFULT_SIZES = [50, 75, 100, 200];
export const EMAIL_SIGNATURE_DEFAULT = 'defaults-'; // identifier for admin email signature
export const BRANDED_APP_CONFIG_ID_ARRAY = ['com.enfuse.loantack', 'com.loantack'];
export const expired = 14400;

export const DEFAULT_FHA_LOAN_PROGRAM_DESCRIPTION =
  '<p>An FHA loan is a government-backed mortgage insured by the Federal Housing Administration. FHA home loans require lower minimum credit scores and down payments than many conventional loans, which makes them especially popular with first-time homebuyers. In fact, according to FHA’s 2020 Annual Report, more than 83 percent of all FHA loan originations were for borrowers purchasing their first homes.</p><p><br></p><p> </p><p><br></p><p>While the government insures these loans, they are actually offered by mortgage lenders that have received the FHA’s stamp of approval.</p>';
export const DEFAULT_PRIVACY_POLICY_DESCRIPTION =
  '<div class="entry-content"> <p>At LoanTack we recognize the importance of maintaining your privacy. We value your privacy and appreciate your trust in us. This Policy describes how we treat user information we collect on www.loantack.com, our mobile application, as well as our client-branded mobile applications, and other offline sources. This Privacy Policy applies to current and former visitors to our website and to our online customers. By visiting and/or using our website, you agree to this Privacy Policy.</p> <p>This website is a property of Enfuse, Inc., a California corporation having its offices at 1640 Second St., Ste 201 Norco, CA 92860.</p> <h2>Information We Collect</h2> <h3>Comments</h3> <p>When visitors leave comments on the site we collect the data shown in the comments form, and also the visitor’s IP address and browser user agent string to help spam detection.</p> <p>An anonymized string created from your email address (also called a hash) may be provided to the Gravatar service to see if you are using it. The Gravatar service privacy policy is available here: https://automattic.com/privacy/. After approval of your comment, your profile picture is visible to the public in the context of your comment.</p> <h3>Media</h3> <p>If you upload images to the website, you should avoid uploading images with embedded location data (EXIF GPS) included. Visitors to the website can download and extract any location data from images on the website.</p> <h3>Contact forms</h3> <p>If you fill out a form within our website, we collect the data shown in the form, and also the visitor’s IP address and browser user agent string to help spam detection.</p> <h3>Cookies</h3> <p>If you leave a comment on our site you may opt-in to saving your name, email address and website in cookies. These are for your convenience so that you do not have to fill in your details again when you leave another comment. These cookies will last for one year.</p> <p>If you have an account and you log in to this site, we will set a temporary cookie to determine if your browser accepts cookies. This cookie contains no personal data and is discarded when you close your browser.</p> <p>When you log in, we will also set up several cookies to save your login information and your screen display choices. Login cookies last for two days, and screen options cookies last for a year. If you select "Remember Me", your login will persist for two weeks. If you log out of your account, the login cookies will be removed.</p> <p>If you edit or publish an article, an additional cookie will be saved in your browser. This cookie includes no personal data and simply indicates the post ID of the article you just edited. It expires after 1 day.</p> <h3>Embedded content from other websites</h3> <p>Articles on this site may include embedded content (e.g. videos, images, articles, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website.</p> <p>These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content, including tracing your interaction with the embedded content if you have an account and are logged in to that website.</p> <h3>Analytics</h3> <p>We use tracking tools like Google Analytics, Google Webmaster, browser cookies and web beacons for collecting information about your usage of our website. If you’d prefer, you can <a href="javascript:gaOptout()">opt-out of Google Analytics</a>.</p> <h2>Who we share your data with</h2> <p>We may share your identifying information with other parties in appropriate situations, including as necessary to respond to your requests and provide our services. For example, we may share identifying information:</p> <ul> <li>With our service providers that assist us by performing operations on our behalf, such as delivering email;</li> <li>When reasonably requested or required by law enforcement authorities or other government officials;</li> <li>When required by law or in response to legal process;</li> <li>When we believe disclosure is appropriate to prevent physical harm or financial loss;</li> <li>When reasonably necessary to an investigation of suspected or actual illegal activity;</li> <li>As needed to protect the vital interests of an individual; and</li> <li>In the event we sell or transfer all or a portion of our business or assets.</li> </ul> <h2>How long we retain your data</h2> <p>If you leave a comment, the comment and its metadata are retained indefinitely. This is so we can recognize and approve any follow-up comments automatically instead of holding them in a moderation queue.</p> <p>For users that register on our website (if any), we also store the personal information they provide in their user profile. All users can see, edit, or delete their personal information at any time (except they cannot change their username). Website administrators can also see and edit that information.</p> <h2>What rights you have over your data</h2> <p>If you have an account on this site, or have left comments, you can request to receive an exported file of the personal data we hold about you, including any data you have provided to us. You can also request that we erase any personal data we hold about you. This does not include any data we are obliged to keep for administrative, legal, or security purposes.</p> <h2>Where we send your data</h2> <p>Visitor comments may be checked through an automated spam detection service.</p> <h2>How to contact us</h2> <p>If you have any questions or comments about this Notice, please feel free to contact us at 800-542-4783</p> <h2>Additional information</h2> <h3>How we protect your data</h3> <p>We maintain administrative, physical, and technical safeguards intended to protect identifying information we collect when you use our websites, such as secure sockets layer encryption technology on pages where payment information is collected.</p> <h3>What data breach procedures we have in place</h3> <p>Upon learning of a suspected or actual breach we have procedures in place for an incident response from an Enterprise Security company who is equipped to analyze and remediate the situation.</p> <h3>What third parties we receive data from</h3> <p>We may receive data about organizations, industries, Website visitors, marketing campaigns and other matters related to our business from parent corporation(s), affiliates and subsidiaries, our partners or others that we use to make our own information better or more useful. This data may be combined with Other Information we collect and might include aggregate level data.</p> <h3>Automated decision-making and/or profiling</h3> <p>At LoanTack, no such functionality exists in our standard Services and we do not exercise any automated decision-making for our business or other processes. If any of our Customers exercises such decision-making to process the individual´s personal data, such individual should contact the Customer with such requests.</p> <h3>Industry regulatory disclosure requirements</h3> <p>If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us at:</p> <p>Enfuse, Inc.<br> 7056 Archibald Ave., Ste 102-216<br> Eastvale, CA 92880<br> 951-824-2626</p> </div>';
export const DEFAULT_PROFILE_IMAGE = `${process.env.S3_URL}images/default_profile_picture.png`;
