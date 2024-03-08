import { createContext, useContext, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAuthStatus } from "./authService";

const AuthContext = createContext();
const AuthContextHandlers = createContext();

export const useIsLogged = () => useContext(AuthContext);
export const useAuthHandlers = () => useContext(AuthContextHandlers);

export const AuthContextProvider = ({ children }) => {
  const {
    data: userData,
    //isLoading,
    //isError,
  } = useQuery({
    queryKey: ["authStatus"],
    queryFn: fetchAuthStatus,
  });

  const isLogged = userData;
  console.log({ isLogged });

  const authHandlers = useMemo(
    () => ({
      onLogin: () => {
        // Opción 1: Utiliza una mutación o actualización manual para cambiar el estado de React Query
        // Opción 2: Configura tu cache de React Query para actualizar el estado aquí
      },
      onLogout: () => {
        // Opción 1: Utiliza una mutación o actualización manual para cambiar el estado de React Query
        // Opción 2: Configura tu cache de React Query para actualizar el estado aquí
      },
    }),
    []
  );

  return (
    <AuthContextHandlers.Provider value={authHandlers}>
      <AuthContext.Provider value={isLogged}>{children}</AuthContext.Provider>
    </AuthContextHandlers.Provider>
  );
};
