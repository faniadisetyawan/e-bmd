import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { PrivateRoute } from '../../App';
import AppPageTitle from '../../shared/AppPageTitle';
const PersediaanComponent = React.lazy(() => import('./persediaan'));
const TanahComponent = React.lazy(() => import('./tanah'));
const PeralatanMesinComponent = React.lazy(() => import('./peralatan-mesin'));

export default function SaldoAwal() {
  return (
    <React.Fragment>
      <div className="mb-3">
        <AppPageTitle title="Saldo Awal" />
      </div>

      <Switch>
        <PrivateRoute path="/master/saldo-awal/persediaan">
          <React.Suspense fallback={false}>
            <PersediaanComponent />
          </React.Suspense>
        </PrivateRoute>

        <PrivateRoute path="/master/saldo-awal/tanah">
          <React.Suspense fallback={false}>
            <TanahComponent />
          </React.Suspense>
        </PrivateRoute>

        <PrivateRoute path="/master/saldo-awal/peralatan-mesin">
          <React.Suspense fallback={false}>
            <PeralatanMesinComponent />
          </React.Suspense>
        </PrivateRoute>

        <Redirect to="/master/saldo-awal/persediaan" />
      </Switch>
    </React.Fragment>
  )
}
