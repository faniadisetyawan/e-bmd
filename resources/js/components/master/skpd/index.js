import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { PrivateRoute } from '../../App';
import AppPageTitle from '../../shared/AppPageTitle';
import DataTable from './DataTable';
import Detail from './Detail';
import FormBuilder from './FormBuilder';

const pageTitle = "Data Organisasi (SKPD)";

export default function Skpd() {
  return (
    <React.Fragment>
      <div className="mb-5">
        <AppPageTitle title={pageTitle} />
      </div>

      <Switch>
        <PrivateRoute exact path="/master/skpd">
          <DataTable />
        </PrivateRoute>

        <Redirect to="/master/skpd" />
      </Switch>
    </React.Fragment>
  )
}
