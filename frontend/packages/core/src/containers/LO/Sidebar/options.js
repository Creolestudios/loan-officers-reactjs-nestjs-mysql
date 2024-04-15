import { ReactComponent as DashboardIcon } from '@iso/assets/images/icon/dashboard-icon.svg';
import { ReactComponent as ActivityIcon } from '@iso/assets/images/icon/activity-icon.svg';
import { ReactComponent as AppsettingIcon } from '@iso/assets/images/icon/appsetting-icon.svg';
import { ReactComponent as BrandappIcon } from '@iso/assets/images/icon/brandapp-icon.svg';
import { ReactComponent as CoBrandIcon } from '@iso/assets/images/icon/co-brand-icon.svg';
import { ReactComponent as ContentIcon } from '@iso/assets/images/icon/content-icon.svg';
import { ReactComponent as LoanSettingIcon } from '@iso/assets/images/icon/loan-setting-icon.svg';
import { ReactComponent as MarketIcon } from '@iso/assets/images/icon/market-icon.svg';
import { ReactComponent as SupportIcon } from '@iso/assets/images/icon/support-icon.svg';

const options = [
  {
    key: 'home',
    label: 'sidebar.dashboard',
    leftIcon: DashboardIcon,
  },
  {
    key: 'activity',
    label: 'sidebar.activity',
    leftIcon: ActivityIcon,
    children: [
      {
        key: 'activity/users',
        label: 'sidebar.activity.users',
      },
      {
        key: 'activity/calculations',
        label: 'sidebar.activity.calculations',
      },
      {
        key: 'activity/callback-request',
        label: 'sidebar.activity.callbackRequest',
      },
      {
        key: 'activity/documents',
        label: 'sidebar.activity.documents',
      },
    ],
  },
  {
    key: 'app-settings',
    label: 'sidebar.appSettings',
    leftIcon: AppsettingIcon,
    children: [
      {
        key: 'app-settings/profile',
        label: 'sidebar.appSettings.profile',
      },
      {
        key: 'app-settings/color-schema',
        label: 'sidebar.appSettings.colorScheme',
      },
      {
        key: 'app-settings/menus',
        label: 'sidebar.appSettings.menus',
      },
    ],
  },
  {
    key: 'loan-settings',
    label: 'sidebar.loanSettings',
    leftIcon: LoanSettingIcon,
    children: [
      {
        key: 'loan-settings/calculators',
        label: 'sidebar.loanSettings.calculators',
      },
      {
        key: 'loan-settings/fees',
        label: 'sidebar.loanSettings.fees',
      },
    ],
  },
  {
    key: 'content',
    label: 'sidebar.content',
    leftIcon: ContentIcon,
    children: [
      {
        key: 'content/learning-center',
        label: 'sidebar.content.learningCenter',
      },
      {
        key: 'content/loan-programs',
        label: 'sidebar.content.loanPrograms',
      },
      {
        key: 'content/checklists',
        label: 'sidebar.content.checklists',
      },
      {
        key: 'content/legal',
        label: 'sidebar.content.legal',
      },
    ],
  },
  {
    key: 'marketing',
    label: 'sidebar.marketing',
    leftIcon: MarketIcon,
    children: [
      {
        key: 'marketing/share-app',
        label: 'sidebar.marketing.shareApp',
      },
      {
        key: 'marketing/qrcode',
        label: 'sidebar.marketing.qRCodes',
      },
      {
        key: 'marketing/email-signature',
        label: 'sidebar.marketing.emailSignature',
      },
      {
        key: 'marketing/auto-responder',
        label: 'sidebar.marketing.autoResponder',
      },
      {
        key: 'marketing/widgets',
        label: 'sidebar.marketing.widgets',
      },
    ],
  },
  {
    key: 'co-brand',
    label: 'sidebar.coBranding',
    leftIcon: CoBrandIcon,
  },
  {
    key: 'brand-app',
    label: 'sidebar.brandedApp',
    leftIcon: BrandappIcon,
  },
  {
    key: 'support',
    label: 'sidebar.support',
    leftIcon: SupportIcon,
    children: [
      {
        key: 'support/guide',
        label: 'sidebar.support.guide',
      },
      {
        key: 'support/faqs',
        label: 'sidebar.support.faqs',
      },
    ],
  },
];
export default options;
