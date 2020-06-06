import React, { createContext, useCallback } from 'react';

import api from '../services/api';

interface SignInCredentials {
  email: string;
  password: string;
}

interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
}

interface AuthContextData {
  name: string;
  email: string;
  signIn(credentials: SignInCredentials): Promise<void>
  signUp(credentials: SignUpCredentials): Promise<void>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', { email, password});

    console.log('response: ', response);
  }, []);

  const signUp = useCallback(async ({ name, email, password }) => {
    const response = await api.post('users', { name, email, password});

    console.log('response: ', response);
  }, []);

  return (
    <AuthContext.Provider value={{
      name: 'Jean',
      email: 'jean@gmail.com',
      signIn,
      signUp,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
