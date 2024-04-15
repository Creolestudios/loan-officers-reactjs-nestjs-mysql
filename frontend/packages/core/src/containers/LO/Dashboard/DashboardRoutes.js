import React, { lazy, Suspense } from 'react';
import { Route, useRouteMatch, Switch, Redirect } from 'react-router-dom';
import Loader from '@iso/components/utility/loader';

export const routes = [
  {
    path: 'home',
    component: lazy(() => import('@iso/containers/LO/Home/Home')),
    exact: true,
  },
  {
    path: 'recent-activity',
    component: lazy(() => import('@iso/containers/LO/Home/RecentActivity')),
    exact: true,
  },
  {
    path: 'activity/users',
    exact: true,
    component: lazy(() => import('@iso/containers/LO/Activity/Users/Users')),
  },
  {
    path: 'activity/users/:userdetail',
    exact: true,
    component: lazy(() =>
      import('@iso/containers/LO/Activity/Users/UsersDetail')
    ),
  },
  {
    path: 'activity/users/:userdetail/message',
    exact: true,
    component: lazy(() => import('@iso/containers/LO/Activity/Users/Message')),
  },
  {
    path: 'activity/send-push-notification',
    exact: true,
    component: lazy(() =>
      import('@iso/containers/LO/Activity/Users/SendPushNotification')
    ),
  },
  {
    path: 'activity/users/:userdetail/view-calculation',
    exact: true,
    component: lazy(() =>
      import('@iso/containers/LO/Activity/Users/ViewCalculation')
    ),
  },
  {
    path: 'activity/users/:userdetail/view-saved-calculation',
    exact: true,
    component: lazy(() =>
      import('@iso/containers/LO/Activity/Users/ViewSavedCalculation')
    ),
  },
  {
    path: 'activity/users/:userdetail/uploaded-documents',
    exact: true,
    component: lazy(() =>
      import('@iso/containers/LO/Activity/Users/UploadedDocuments')
    ),
  },

  {
    path: 'activity/calculations/:usercalculations',
    exact: true,
    component: lazy(() =>
      import('@iso/containers/LO/Activity/Calculation/UserCalculation')
    ),
  },

  {
    path: 'activity/calculations',
    exact: true,
    component: lazy(() =>
      import('@iso/containers/LO/Activity/Calculation/Calculations')
    ),
  },
  {
    path:
      'activity/calculations/:usercalculations/view-user-calculation/:calculationId',
    exact: true,
    component: lazy(() =>
      import('@iso/containers/LO/Activity/Calculation/ViewUserCalculations')
    ),
  },
  {
    path: 'activity/generate-report',
    exact: true,
    component: lazy(() =>
      import('@iso/containers/LO/Activity/Calculation/GenerateReport')
    ),
  },
  {
    path: 'activity/callback-request',
    exact: true,
    component: lazy(() =>
      import('@iso/containers/LO/Activity/CallbackRequest/CallbackRequest')
    ),
  },
  {
    path: 'activity/documents',
    exact: true,
    component: lazy(() =>
      import('@iso/containers/LO/Activity/Documents/Documents')
    ),
  },
  {
    path: 'app-settings/menus',
    exact: true,
    component: lazy(() => import('@iso/containers/LO/AppSettings/Menus')),
  },
  {
    path: 'app-settings/profile',
    exact: true,
    component: lazy(() => import('@iso/containers/LO/AppSettings/Profile')),
  },
  {
    path: 'app-settings/color-schema',
    exact: true,
    component: lazy(() =>
      import('@iso/containers/LO/AppSettings/ColorScheme/ColorScheme')
    ),
  },
  {
    path: 'content/learning-center',
    exact: true,

    component: lazy(() =>
      import('@iso/containers/LO/Content/LerningCenter/LearningCenter')
    ),
  },

  {
    path: 'content/learning-center/addnew',
    exact: true,
    component: lazy(() =>
      import('@iso/containers/LO/Content/LerningCenter/AddNew')
    ),
  },
  {
    path: 'content/learning-center/edit/:id',
    exact: true,
    component: lazy(() =>
      import('@iso/containers/LO/Content/LerningCenter/EditLearningCenter')
    ),
  },
  {
    path: 'content/loan-programs',
    exact: true,
    component: lazy(() =>
      import('@iso/containers/LO/Content/LoanPrograms/LoanPrograms')
    ),
  },
  {
    path: 'content/loan-programs/addnew',
    exact: true,
    component: lazy(() =>
      import('@iso/containers/LO/Content/LoanPrograms/AddNew')
    ),
  },
  {
    path: 'content/loan-programs/edit/:id',
    exact: true,
    component: lazy(() =>
      import('@iso/containers/LO/Content/LoanPrograms/EditLoanProgram')
    ),
  },
  {
    path: 'content/checklists',
    exact: true,
    component: lazy(() =>
      import('@iso/containers/LO/Content/checklist/Checklists')
    ),
  },
  {
    path: 'content/checklists/edit/:id',
    exact: true,
    component: lazy(() =>
      import('@iso/containers/LO/Content/checklist/EditCheckList')
    ),
  },
  {
    path: 'content/checklists/new-checklist',
    exact: true,
    component: lazy(() =>
      import('@iso/containers/LO/Content/checklist/AddNew')
    ),
  },
  {
    path: 'content/legal',
    exact: true,
    component: lazy(() => import('@iso/containers/LO/Content/Legal/Legal')),
  },
  {
    path: 'support/faqs',
    exact: true,
    component: lazy(() => import('@iso/containers/LO/Support/Faqs')),
  },
  {
    path: 'support/guide',
    exact: true,
    component: lazy(() => import('@iso/containers/LO/Support/Guide')),
  },

  {
    path: 'loan-settings/fees',
    exact: true,
    component: lazy(() => import('@iso/containers/LO/LoanSettings/Fees')),
  },

  {
    path: 'loan-settings/calculators',
    exact: true,
    component: lazy(() =>
      import('@iso/containers/LO/LoanSettings/Calculators/Calculators')
    ),
  },
  {
    path: 'marketing/widgets',
    exact: true,
    component: lazy(() =>
      import('@iso/containers/LO/Marketing/Widgets/Widgets')
    ),
  },
  {
    path: 'marketing/share-app',
    exact: true,
    component: lazy(() =>
      import('@iso/containers/LO/Marketing/ShareApp/ShareApp')
    ),
  },
  {
    path: 'marketing/auto-responder',
    exact: true,
    component: lazy(() =>
      import('@iso/containers/LO/Marketing/AutoResponder/AutoResponder')
    ),
  },
  {
    path: 'marketing/qrcode',
    exact: true,
    component: lazy(() =>
      import('@iso/containers/LO/Marketing/QrCodes/QrCodes')
    ),
  },
  {
    path: 'marketing/email-signature',
    exact: true,
    component: lazy(() =>
      import('@iso/containers/LO/Marketing/EmailSignature/EmailSignature')
    ),
  },
  {
    path: 'marketing/email-signature/upload-image',
    exact: true,
    component: lazy(() =>
      import('@iso/containers/LO/Marketing/EmailSignature/UploadImage')
    ),
  },
  {
    path: 'brand-app',
    exact: true,
    component: lazy(() => import('@iso/containers/LO/BrandedApp/BrandedApp')),
  },
  {
    path: 'brand-app/sub-branded-app',
    exact: true,
    component: lazy(() =>
      import('@iso/containers/LO/BrandedApp/SubBrandedApp')
    ),
  },

  {
    path: 'blank_page',

    component: lazy(() => import('@iso/containers/BlankPage')),
  },
  {
    path: 'my-account',
    exact: true,
    component: lazy(() => import('@iso/containers/LO/MyAccount/MyAccount')),
  },
  {
    path: 'subscription',
    exact: true,
    component: lazy(() =>
      import('@iso/containers/LO/Subscription/Subscription')
    ),
  },
  {
    path: 'subscription/subscribe',
    exact: true,
    component: lazy(() => import('@iso/containers/LO/Subscription/Subscribe')),
  },
  {
    path: 'billing-history',
    exact: true,
    component: lazy(() =>
      import('@iso/containers/LO/BillingHistory/BillingHistory')
    ),
  },
  {
    path: 'setting',
    exact: true,
    component: lazy(() => import('@iso/containers/LO/Settings/Settings')),
  },
  {
    path: 'notification',
    exact: true,
    component: lazy(() =>
      import('@iso/containers/LO/Notification/Notification')
    ),
  },
  // {
  //   path: 'notification/:id',
  //   exact: true,
  //   component: lazy(() =>
  //     import('@iso/containers/LO/Notification/NotificationDetails')
  //   ),
  // },
  {
    path: 'co-brand/',
    exact: true,
    component: lazy(() => import('@iso/containers/LO/Co-Branding/CoBranding')),
  },
  {
    path: 'co-brand/add-co-branding-officer',
    exact: true,
    component: lazy(() =>
      import('@iso/containers/LO/Co-Branding/AddCoBrandingOfficer')
    ),
  },
];

export default function AppRouter() {
  const { url } = useRouteMatch();
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route
          exact={true}
          path={`/dashboard`}
          render={() => <Redirect to={'/dashboard/home'} />}
        />
        {routes.map((route, idx) => (
          <Route exact={route.exact} key={idx} path={`${url}/${route.path}`}>
            <route.component />
          </Route>
        ))}
        <Route
          path="*"
          exact={true}
          component={lazy(() => import('@iso/containers/Global/404/404'))}
        />
      </Switch>
    </Suspense>
  );
}
