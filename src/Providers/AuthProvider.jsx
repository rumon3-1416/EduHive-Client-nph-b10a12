import React, { createContext } from 'react';
import { ContextValue } from '../Contexts/ContextValue';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const value = ContextValue();

  return (
    <AuthContext.Provider value={value}>
      {children}
      <ToastContainer pauseOnFocusLoss={false} />
    </AuthContext.Provider>
  );
};

export default AuthProvider;
