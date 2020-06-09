import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
};

const Route: React.FC<RouteProps> = ({
  component: Component,
  isPrivate = false,
  ...otherProps
}) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...otherProps}
      render={({ location }) => {
        return (
          isPrivate === !!user
            ? (<Component />)
            : (<Redirect to={{
                pathname: isPrivate ? '/' : '/dashboard',
                state: { from: location }
            }} />)
        );
      }}
    />
  );
};

export default Route;
