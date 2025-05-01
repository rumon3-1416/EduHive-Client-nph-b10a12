import React, { createContext } from 'react';
import { ContextValue } from '../Contexts/ContextValue';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const value = ContextValue();

  const toastTheme = value.darkTheme ? 'dark' : 'light';

  return (
    <AuthContext.Provider value={value}>
      {children}
      <ToastContainer pauseOnFocusLoss={false} theme={toastTheme} />
    </AuthContext.Provider>
  );
};

export default AuthProvider;
