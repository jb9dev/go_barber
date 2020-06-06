import { createContext } from 'react';

interface AuthContextData {
  name: string;
  email: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export default AuthContext;
