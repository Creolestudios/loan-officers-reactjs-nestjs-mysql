import React, { lazy, Suspense } from 'react';
import { Route, useRouteMatch, Switch, Redirect } from 'react-router-dom';
import Loader from '@iso/components/utility/loader';

const routes = [
  {
    path: 'home',
    component: lazy(() => import('@iso/containers/Admin/Home/Home')),
    exact: true,
  },
  {
    path: 'billing/primary-lo',
    component: lazy(() =>
      import('@iso/containers/Admin/Billing/PrimaryLO/PrimaryLO')
    ),
    exact: true,
  },
  {
    path: 'billing/primary-lo/:user',
    component: lazy(() =>
      import('@iso/containers/Admin/Billing/PrimaryLO/PrimaryLOUserDetail')
    ),
    exact: true,
  },
  {
    path: 'billing/primary-lo/:user/transaction',
    component: lazy(() =>
      import('@iso/containers/Admin/Billing/PrimaryLO/Transactions')
    ),
    exact: true,
  },
  {
    path: 'billing/primary-lo/:user/add-note',
    component: lazy(() =>
      import('@iso/containers/Admin/Billing/PrimaryLO/AddNote')
    ),
    exact: true,
  },
  {
    path: 'billing/employee/:user/add-note',
    component: lazy(() =>
      import('@iso/containers/Admin/Billing/PrimaryLO/AddNote')
    ),
    exact: true,
  },
  {
    path: 'billing/primary-lo/:user/edit-note',
    component: lazy(() =>
      import('@iso/containers/Admin/Billing/PrimaryLO/AddNote')
    ),
    exact: true,
  },
  {
    path: 'billing/employee/:user/edit-note',
    component: lazy(() =>
      import('@iso/containers/Admin/Billing/PrimaryLO/AddNote')
    ),
    exact: true,
  },
  {
    path: 'billing/primary-lo/:user/add-credit',
    component: lazy(() =>
      import('@iso/containers/Admin/Billing/PrimaryLO/AddCredit')
    ),
    exact: true,
  },
  {
    path: 'billing/employee/:user/add-credit',
    component: lazy(() =>
      import('@iso/containers/Admin/Billing/PrimaryLO/AddCredit')
    ),
    exact: true,
  },
  {
    path: 'billing/primary-lo/:user/edit-credit',
    component: lazy(() =>
      import('@iso/containers/Admin/Billing/PrimaryLO/AddCredit')
    ),
    exact: true,
  },
  {
    path: 'billing/employee/:user/edit-credit',
    component: lazy(() =>
      import('@iso/containers/Admin/Billing/PrimaryLO/AddCredit')
    ),
    exact: true,
  },
  {
    path: 'billing/primary-lo/:user/notes',
    component: lazy(() =>
      import('@iso/containers/Admin/Billing/PrimaryLO/Notes')
    ),
    exact: true,
  },
  {
    path: 'billing/employee/:user/notes',
    component: lazy(() =>
      import('@iso/containers/Admin/Billing/PrimaryLO/Notes')
    ),
    exact: true,
  },
  {
    path: 'billing/primary-lo/:user/credits',
    component: lazy(() =>
      import('@iso/containers/Admin/Billing/PrimaryLO/Credits')
    ),
    exact: true,
  },
  {
    path: 'billing/employee/:user/credits',
    component: lazy(() =>
      import('@iso/containers/Admin/Billing/PrimaryLO/Credits')
    ),
    exact: true,
  },
  {
    path: 'billing/employee',
    component: lazy(() =>
      import('@iso/containers/Admin/Billing/Employee/Employee')
    ),
    exact: true,
  },
  {
    path: 'billing/employee/:user',
    component: lazy(() =>
      import('@iso/containers/Admin/Billing/Employee/EmployeeDetail')
    ),
    exact: true,
  },
  {
    path: 'billing/employee/:user/transaction',
    component: lazy(() =>
      import('@iso/containers/Admin/Billing/PrimaryLO/Transactions')
    ),
    exact: true,
  },
  {
    path: 'users/lo',
    component: lazy(() => import('@iso/containers/Admin/Users/LO/LOUsers')),
    exact: true,
  },
  {
    path: 'users/lo/:louser',
    component: lazy(() =>
      import('@iso/containers/Admin/Users/LO/LOUsersDetail')
    ),
    exact: true,
  },
  {
    path: 'users/lo/:louser/default',
    component: lazy(() =>
      import('@iso/containers/Admin/Users/LO/Default/Default')
    ),
    exact: true,
  },
  {
    path: 'users/borrower',
    component: lazy(() =>
      import('@iso/containers/Admin/Users/Borrower/BorrowerUsers')
    ),
    exact: true,
  },
  {
    path: 'users/borrower/:borrowerdetail',
    component: lazy(() =>
      import('@iso/containers/Admin/Users/Borrower/BorrowerUsersDetails')
    ),
    exact: true,
  },
  {
    path: 'users/borrower/:borrowerdetail/view-calculation',
    component: lazy(() =>
      import('@iso/containers/Admin/Users/Borrower/ViewCalculation')
    ),
    exact: true,
  },
  {
    path: 'users/borrower/:borrowerdetail/view-saved-calculation',
    component: lazy(() =>
      import('@iso/containers/Admin/Users/Borrower/ViewSavedCalculation')
    ),
    exact: true,
  },
  {
    path: 'users/borrower/:borrowerdetail/uploaded-documents',
    component: lazy(() =>
      import('@iso/containers/Admin/Users/Borrower/UploadedDocuments')
    ),
    exact: true,
  },
  {
    path: 'branded-apps/clients',
    component: lazy(() =>
      import('@iso/containers/Admin/BrandedApp/BrandAppClients')
    ),
    exact: true,
  },
  {
    path: 'branded-apps/clients/:id',
    component: lazy(() =>
      import('@iso/containers/Admin/BrandedApp/BrandAppEmployee')
    ),
    exact: true,
  },
  {
    path: 'branded-apps/brand-apprequest',
    component: lazy(() =>
      import('@iso/containers/Admin/BrandedApp/BrandedAppRequest')
    ),
    exact: true,
  },
  {
    path: 'branded-apps/brand-apprequest/:id',
    component: lazy(() =>
      import('@iso/containers/Admin/BrandedApp/BrandedAppRequestDetail')
    ),
    exact: true,
  },
  {
    path: 'branded-apps/brand-app-accept-request/:id',
    component: lazy(() =>
      import('@iso/containers/Admin/BrandedApp/BrandedAppAcceptRequest')
    ),
    exact: true,
  },
  {
    path: 'branded-apps/brand-appinfo',
    component: lazy(() =>
      import('@iso/containers/Admin/BrandedApp/BrandedAppInfo')
    ),
    exact: true,
  },

  {
    path: 'app-default/menu',
    component: lazy(() =>
      import('@iso/containers/Admin/AppDefaults/Menus/Menus')
    ),
    exact: true,
  },
  {
    path: 'app-default/glossary',
    component: lazy(() =>
      import('@iso/containers/Admin/AppDefaults/Glossary/Glossary')
    ),
    exact: true,
  },
  {
    path: 'app-default/email-signature',
    component: lazy(() =>
      import('@iso/containers/Admin/AppDefaults/EmailSignature/EmailSignature')
    ),
    exact: true,
  },

  {
    path: 'app-default/email-signature/uploade-photo',
    component: lazy(() =>
      import('@iso/containers/Admin/AppDefaults/EmailSignature/UploadImage')
    ),
    exact: true,
  },

  {
    path: 'app-default/glossary/addnew',
    component: lazy(() =>
      import('@iso/containers/Admin/AppDefaults/Glossary/AddNew')
    ),
    exact: true,
  },
  {
    path: 'app-default/glossary/edit/:id',
    component: lazy(() =>
      import('@iso/containers/Admin/AppDefaults/Glossary/EditGlossary')
    ),
    exact: true,
  },
  {
    path: 'app-default/legal',
    component: lazy(() =>
      import('@iso/containers/Admin/AppDefaults/Legal/Legal')
    ),
    exact: true,
  },
  {
    path: 'app-default/calculators',
    component: lazy(() =>
      import('@iso/containers/Admin/AppDefaults/Calculators/Calculators')
    ),
    exact: true,
  },
  {
    path: 'app-default/checklists',
    component: lazy(() =>
      import('@iso/containers/Admin/AppDefaults/Checklists/Checklists')
    ),
    exact: true,
  },
  {
    path: 'app-default/checklists/edit/:id',
    component: lazy(() =>
      import('@iso/containers/Admin/AppDefaults/Checklists/EditCheckList')
    ),
    exact: true,
  },
  {
    path: 'app-default/checklists/new-checklist',
    component: lazy(() =>
      import('@iso/containers/Admin/AppDefaults/Checklists/AddNew')
    ),
    exact: true,
  },

  {
    path: 'app-default/learning-center',
    component: lazy(() =>
      import('@iso/containers/Admin/AppDefaults/LearningCenter/LearningCenter')
    ),
    exact: true,
  },
  {
    path: 'app-default/learning-center/edit/:id',
    component: lazy(() =>
      import(
        '@iso/containers/Admin/AppDefaults/LearningCenter/EditLearningCenter'
      )
    ),
    exact: true,
  },
  {
    path: 'app-default/learning-center/addnew',
    component: lazy(() =>
      import('@iso/containers/Admin/AppDefaults/LearningCenter/AddNew')
    ),
    exact: true,
  },

  {
    path: 'app-default/loan-programs',
    component: lazy(() =>
      import('@iso/containers/Admin/AppDefaults/LoanProgram/LoanPrograms')
    ),
    exact: true,
  },
  {
    path: 'app-default/loan-programs/edit/:id',
    component: lazy(() =>
      import('@iso/containers/Admin/AppDefaults/LoanProgram/EditLoanProgram')
    ),
    exact: true,
  },
  {
    path: 'app-default/loan-programs/addnew',
    component: lazy(() =>
      import('@iso/containers/Admin/AppDefaults/LoanProgram/AddNew')
    ),
    exact: true,
  },
  {
    path: 'app-default/fees',
    component: lazy(() =>
      import('@iso/containers/Admin/AppDefaults/Fees/Fees')
    ),
    exact: true,
  },
  {
    path: 'discounts',
    component: lazy(() => import('@iso/containers/Admin/Discounts/Discounts')),
    exact: true,
  },
  {
    path: 'discounts/add-new',
    component: lazy(() => import('@iso/containers/Admin/Discounts/AddNewCode')),
    exact: true,
  },
  {
    path: 'discounts/edit/:id',
    component: lazy(() => import('@iso/containers/Admin/Discounts/AddNewCode')),
    exact: true,
  },
  {
    path: 'discounts/:name',
    component: lazy(() =>
      import('@iso/containers/Admin/Discounts/DiscountCode')
    ),
    exact: true,
  },

  {
    path: 'subscription-plans',
    component: lazy(() =>
      import('@iso/containers/Admin/SubscriptionPlans/SubscriptionPlans')
    ),
    exact: true,
  },
  {
    path: 'subscription-plans/add-new',
    component: lazy(() =>
      import('@iso/containers/Admin/SubscriptionPlans/AddNewSubscriptionPlan')
    ),
    exact: true,
  },
  {
    path: 'subscription-plans/edit/:id',
    component: lazy(() =>
      import('@iso/containers/Admin/SubscriptionPlans/EditSubscriptionPlan')
    ),
    exact: true,
  },
  {
    path: 'subscription-plans/view-plan/:id',
    component: lazy(() =>
      import('@iso/containers/Admin/SubscriptionPlans/ViewPlan')
    ),
    exact: true,
  },
  {
    path: 'support/guide',
    component: lazy(() => import('@iso/containers/Admin/Support/Guide/Guide')),
    exact: true,
  },

  {
    path: 'support/faqs',
    component: lazy(() => import('@iso/containers/Admin/Support/FAQs/FAQs')),
    exact: true,
  },
  {
    path: 'support/faqs/add-new',
    component: lazy(() =>
      import('@iso/containers/Admin/Support/FAQs/AddNewFaqs')
    ),
    exact: true,
  },
  {
    path: 'support/faqs/edit/:id',
    component: lazy(() =>
      import('@iso/containers/Admin/Support/FAQs/AddNewFaqs')
    ),
    exact: true,
  },
  {
    path: 'support/faqs/rearrange',
    component: lazy(() =>
      import('@iso/containers/Admin/Support/FAQs/Rearrange')
    ),
    exact: true,
  },
  {
    path: 'support/guide/addnew',
    component: lazy(() =>
      import('@iso/containers/Admin/Support/Guide/AddNewGuide')
    ),
    exact: true,
  },
  {
    path: 'support/guide/edit/:id',
    component: lazy(() =>
      import('@iso/containers/Admin/Support/Guide/EditGuide')
    ),
    exact: true,
  },
  {
    path: 'support/guide/category',
    component: lazy(() =>
      import('@iso/containers/Admin/Support/Guide/Categories')
    ),
    exact: true,
  },
  {
    path: 'support/reps',
    component: lazy(() => import('@iso/containers/Admin/Support/Reps/Reps')),
    exact: true,
  },
  {
    path: 'support/reps/add-new',
    component: lazy(() =>
      import('@iso/containers/Admin/Support/Reps/AddNewReps')
    ),
    exact: true,
  },
  {
    path: 'change-password',
    component: lazy(() =>
      import('@iso/containers/Admin/ChangePassword/ChangePassword')
    ),
    exact: true,
  },
  {
    path: 'my-account',
    component: lazy(() => import('@iso/containers/Admin/MyAccount/MyAccount')),
    exact: true,
  },
  {
    path: 'messages',
    component: lazy(() => import('@iso/containers/Admin/Messages/Messages')),
    exact: true,
  },
  {
    path: 'messages/send-new-message',
    component: lazy(() =>
      import('@iso/containers/Admin/Messages/SendNewMessage')
    ),
    exact: true,
  },
  {
    path: 'messages/edit/:id',
    component: lazy(() => import('@iso/containers/Admin/Messages/EditMessage')),
    exact: true,
  },

  {
    path: 'blank_page',
    component: lazy(() => import('@iso/containers/BlankPage')),
    exact: true,
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
      </Switch>
    </Suspense>
  );
}
