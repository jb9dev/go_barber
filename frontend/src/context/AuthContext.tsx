import React, { createContext, useCallback, useState } from 'react';

import api from '../services/api';

interface AuthData {
  token: string;
  user: object;
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
  user: object,
  signIn(credentials: SignInCredentials): Promise<void>
  signUp(credentials: SignUpCredentials): Promise<void>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState(() => {
    const token = localStorage.getItem('@GoBarber:Token');
    const user = localStorage.getItem('@GoBarber:User');

    if(token && user) {
      return { token, user: JSON.parse(user)}
    }

    return {} as AuthData;
  })

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', { email, password});
    const { token, user } = response.data;

    localStorage.setItem('@GoBarber:Token', token);
    localStorage.setItem('@GoBarber:User', JSON.stringify(user));

    setData({token, user});
  }, []);

  const signUp = useCallback(async ({ name, email, password }) => {
    const response = await api.post('users', { name, email, password});

    console.log('response: ', response);
  }, []);

  return (
    <AuthContext.Provider value={{
      user: data.user,
      signIn,
      signUp,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
