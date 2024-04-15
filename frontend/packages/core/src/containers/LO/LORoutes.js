import React, { lazy, Suspense, useEffect } from 'react';
import {
  Route,
  Redirect,
  Switch,
  useRouteMatch,
  useHistory,
} from 'react-router-dom';

import { PUBLIC_ROUTE } from '@iso/cra/src/route.constants';
import Loader from '@iso/components/utility/loader';

const Dashboard = lazy(() => import('./Dashboard/Dashboard'));

const publicRoutes = [
  {
    path: '/',
    exact: true,
    component: lazy(() => import('@iso/containers/Global/SignIn/SignIn')),
  },
  {
    path: PUBLIC_ROUTE.PAGE_404,
    component: lazy(() => import('@iso/containers/Global/404/404')),
  },
  {
    path: PUBLIC_ROUTE.PAGE_500,
    component: lazy(() => import('@iso/containers/Global/500/500')),
  },
  {
    path: PUBLIC_ROUTE.SIGN_IN,
    component: lazy(() => import('@iso/containers/Global/SignIn/SignIn')),
  },
  {
    path: PUBLIC_ROUTE.SIGN_UP,
    component: lazy(() => import('@iso/containers/Global/SignUp/SignUp')),
  },
  {
    path: PUBLIC_ROUTE.FORGET_PASSWORD,
    component: lazy(() =>
      import('@iso/containers/Global/ForgotPassword/ForgotPassword')
    ),
  },
  {
    path: PUBLIC_ROUTE.RESET_PASSWORD,
    component: lazy(() =>
      import('@iso/containers/Global/ResetPassword/ResetPassword')
    ),
  },
  {
    path: PUBLIC_ROUTE.VERIFICATION,
    component: lazy(() =>
      import('@iso/containers/Global/Verification/Verification')
    ),
  },
  {
    path: '/widgetspage/:id/calculation',
    component: lazy(() =>
      import('@iso/containers/LO/Marketing/Widgets/sourcIfram')
    ),
  },
  {
    path: '/view-calculation/:nameofpdf',
    exact: true,
    component: lazy(() => import('@iso/containers/LO/PdfView')),
  },
  {
    path: '/widgetspages',
    component: lazy(() =>
      import('@iso/containers/LO/Marketing/Widgets/SourcePage')
    ),
  },
];

function PrivateRoute({ children, ...rest }) {
  const isLoggedIn =
    localStorage.getItem('id_token') || sessionStorage.getItem('id_token');

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: `/portal/signin`,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default function LORoutes() {
  const { url } = useRouteMatch();
  const history = useHistory();
  const admin_role = '1';

  useEffect(() => {
    if (localStorage.getItem('type_role') === admin_role) {
      return history.push('/admin/dashboard/billing/primary-lo');
    }
  }, [history]);

  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        {publicRoutes.map((route, index) => (
          <Route key={index} path={`${url}${route.path}`} exact={route.exact}>
            <route.component />
          </Route>
        ))}
        <PrivateRoute path={`/portal/dashboard`}>
          <Dashboard />
        </PrivateRoute>
        <Route
          path="*"
          exact={true}
          component={lazy(() => import('@iso/containers/Global/404/404'))}
        />
      </Switch>
    </Suspense>
  );
}
