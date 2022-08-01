import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { PrivateRoute } from '../App';
import AppContent from '../shared/layouts/AppContent';
const SkpdComponent = React.lazy(() => import('./skpd'));
const SaldoAwalComponent = React.lazy(() => import('./saldo-awal'));

export default function Master() {
  return (
    <AppContent>
      <Switch>
        <PrivateRoute path="/master/skpd">
          <React.Suspense fallback={false}>
            <SkpdComponent />
          </React.Suspense>
        </PrivateRoute>

        <PrivateRoute path="/master/saldo-awal">
          <React.Suspense fallback={false}>
            <SaldoAwalComponent />
          </React.Suspense>
        </PrivateRoute>

        <Redirect to="/master/skpd" />
      </Switch>
    </AppContent>
  )
}
