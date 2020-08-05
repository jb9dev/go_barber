import React from 'react';
import { Switch } from 'react-router-dom';

import AppProvider from '../hooks';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Dashboard from '../pages/Dashboard';

const Routes: React.FC = () => {

  return (
    <Switch>
      <AppProvider>
        <Route path="/" exact component={SignIn}/>
        <Route path="/register" exact component={SignUp}/>
        <Route path="/forgot-password" exact component={ForgotPassword}/>
        <Route path="/reset-password" exact component={ResetPassword}/>
        <Route
          path="/dashboard" component={Dashboard}  isPrivate={true} />
      </AppProvider>
    </Switch>
  )
};

export default Routes;
