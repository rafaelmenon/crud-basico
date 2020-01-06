import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Login from '../pages/login';
import Dashboard from '../pages/dashboard';

const Routes = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" exact={true} component={Dashboard} isProtected />
    </Switch>
  );
};

export default Routes;
