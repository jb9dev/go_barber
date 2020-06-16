import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

import { useAuth } from '../hooks/auth';

import { colors } from '../globalVariables';

const Routes: React.FC = () => {
  const { user, loading } = useAuth();

  if(loading) {
    return (
      <View style={{
        backgroundColor: `${colors.secondary}`,
        flex: 1,
        justifyContent: 'center'
      }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return user ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
