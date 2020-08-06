import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';

interface User {
  id: string;
  name: string;
  avatar_url: string;
}

interface AuthState {
  token: string;
  user: User;
}

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
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signUp(credentials: SignUpCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState(() => {
    const token = localStorage.getItem('@GoBarber:Token');
    const user = localStorage.getItem('@GoBarber:User');

    if(token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user)}
    }

    return {} as AuthState;
  })

  const signUp = useCallback(async ({ name, email, password }) => {
    await api.post('users', { name, email, password});
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', { email, password});
    const { token, user } = response.data;

    localStorage.setItem('@GoBarber:Token', token);
    localStorage.setItem('@GoBarber:User', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({token, user});
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:Token');
    localStorage.removeItem('@GoBarber:User');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{
      user: data.user,
      signIn,
      signUp,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if(!context) {
    throw new Error('useAuth must be used within as AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
