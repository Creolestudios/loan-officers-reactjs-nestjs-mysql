const options = [
  {
    key: 'home',
    label: 'sidebar.dashboard',
    leftIcon: 'dashboard-icon',
  },
  {
    key: 'billing',
    label: 'sidebar.billing',
    leftIcon: 'billing-icon',
    children: [
      {
        key: 'billing/primary-lo',
        label: 'sidebar.billing.primaryLO',
      },
      {
        key: 'billing/employee',
        label: 'sidebar.billing.employee',
      },
    ],
  },
  {
    key: 'users',
    label: 'sidebar.users',
    leftIcon: 'user-icon',
    children: [
      {
        key: 'users/lo',
        label: 'sidebar.users.LO',
      },
      {
        key: 'users/borrower',
        label: 'sidebar.users.borrower',
      },
    ],
  },
  {
    key: 'branded-apps',
    label: 'sidebar.brandedApp',
    leftIcon: 'brandapp-icon',
    children: [
      {
        key: 'branded-apps/clients',
        label: 'sidebar.brandedApp.clients',
      },
      {
        key: 'branded-apps/brand-apprequest',
        label: 'sidebar.brandedApp.brandedAppRequest',
      },
      {
        key: 'branded-apps/brand-appinfo',
        label: 'sidebar.brandedApp.brandedAppInfo',
      },
    ],
  },
  {
    key: 'messages',
    label: 'sidebar.messages',
    leftIcon: 'messages-icon',
  },
  {
    key: 'discounts',
    label: 'sidebar.discounts',
    leftIcon: 'discount-icon',
  },
  {
    key: 'subscription-plans',
    label: 'sidebar.subscriptionPlans',
    leftIcon: 'subscription-plans-icon',
  },
  {
    key: 'app-default',
    label: 'sidebar.appDefaults',
    leftIcon: 'appdefault-icon ',
    children: [
      {
        key: 'app-default/menu',
        label: 'sidebar.appDefaults.menus',
      },
      {
        key: 'app-default/email-signature',
        label: 'sidebar.appDefaults.emailSignature',
      },
      {
        key: 'app-default/loan-programs',
        label: 'sidebar.appDefaults.loanPrograms',
      },
      {
        key: 'app-default/calculators',
        label: 'sidebar.appDefaults.calculators',
      },
      {
        key: 'app-default/fees',
        label: 'sidebar.appDefaults.fees',
      },
      {
        key: 'app-default/checklists',
        label: 'sidebar.appDefaults.checklists',
      },
      {
        key: 'app-default/learning-center',
        label: 'sidebar.appDefaults.learningCenter',
      },
      {
        key: 'app-default/glossary',
        label: 'sidebar.appDefaults.glossary',
      },
      {
        key: 'app-default/legal',
        label: 'sidebar.appDefaults.legal',
      },
    ],
  },
  {
    key: 'support',
    label: 'sidebar.support',
    leftIcon: 'support-icon',
    children: [
      {
        key: 'support/guide',
        label: 'sidebar.support.guide',
      },
      {
        key: 'support/faqs',
        label: 'sidebar.support.faqs',
      },
      {
        key: 'support/reps',
        label: 'sidebar.support.reps',
      },
    ],
  },
];
export default options;
