import React, { lazy, Suspense } from 'react';
import { Route, Router, Switch, Redirect } from 'react-router-dom';
import { history } from '@iso/lib/helpers/history';
import ErrorBoundary from './ErrorBoundary';
import { GLOBAL_ROUTE, PUBLIC_ROUTE } from './route.constants';
import Loader from '@iso/components/utility/loader';

const globalRoutes = [
  {
    path: GLOBAL_ROUTE.LO,
    component: lazy(() => import('./containers/LO/LO')),
  },
  {
    path: GLOBAL_ROUTE.ADMIN,
    component: lazy(() => import('./containers/Admin/Admin')),
  },
];

export default function Routes() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>
        <Router history={history}>
          <Switch>
            {/* Global route Swticher for admin and lo panel */}
            <Route
              path={`${PUBLIC_ROUTE.LANDING}`}
              exact
              render={(props) => (
                <Redirect {...props} to={`${GLOBAL_ROUTE.LO}`} />
              )}
            />
            {globalRoutes.map((route, index) => (
              <Route key={index} path={`${route.path}`} exact={route.exact}>
                <route.component />
              </Route>
            ))}
            <Route
              path="*"
              exact={true}
              component={lazy(() => import('@iso/containers/Global/404/404'))}
            />
          </Switch>
        </Router>
      </Suspense>
    </ErrorBoundary>
  );
}
