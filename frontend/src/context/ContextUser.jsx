import { createContext, useContext } from "react";
import useContextUser from "./useContextUser";

const Context = createContext({});

function UserProvider({ children }) {
  const {
    handleLogin,
    handleLogout,
    isAuthenticated,
    credentials,
    redirectToHome,
    login,
    onChangeEmail,
    onChangePassword,
    currentUser,
    loading,
  } = useContextUser();

  return (
    <Context.Provider
      value={{
        handleLogin,
        handleLogout,
        isAuthenticated,
        credentials,
        redirectToHome,
        login,
        onChangeEmail,
        onChangePassword,
        currentUser,
        loading,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useUserContext = () => useContext(Context);
export { UserProvider };
