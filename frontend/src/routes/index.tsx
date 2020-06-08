import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AppProvider from '../hooks';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const Routes: React.FC = () => {
  return (
    <Switch>
      <AppProvider>
        <Route path="/" exact component={SignIn} />
        <Route path="/register" exact component={SignUp} />
      </AppProvider>
    </Switch>
  )
};

export default Routes;
