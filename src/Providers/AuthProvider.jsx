import React, { createContext } from 'react';
import { ContextValue } from '../Contexts/ContextValue';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const value = ContextValue();

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
