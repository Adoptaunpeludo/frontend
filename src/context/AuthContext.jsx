import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const AuthContextProvider = ({ children, initialIsLoggedIn }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(initialIsLoggedIn);
  const [isLoadingUser, setIsLoadingUser] = useState(false);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, isLoadingUser, setIsLoadingUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === undefined)
    return 'AuthContext was used outside of AuthContextProvider';

  return context;
};

export { AuthContextProvider, useAuthContext };
