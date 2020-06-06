import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { AuthProvider } from '../context/AuthContext'

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const Routes: React.FC = () => {
  return (
    <Switch>
      <AuthProvider>
        <Route path="/" exact component={SignIn} />
        <Route path="/register" exact component={SignUp} />
      </AuthProvider>
    </Switch>
  )
};

export default Routes;
