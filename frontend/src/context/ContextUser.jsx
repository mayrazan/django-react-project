import { createContext, useContext } from "react";
import useContextUser from "./useContextUser";

const Context = createContext({});

function UserProvider({ children }) {
  const {
    handleLogout,
    isAuthenticated,
    credentials,
    redirectToHome,
    login,
    onChangeEmail,
    onChangePassword,
    loading,
    isAdmin,
    isMessageVisible,
  } = useContextUser();

  return (
    <Context.Provider
      value={{
        handleLogout,
        isAuthenticated,
        credentials,
        redirectToHome,
        login,
        onChangeEmail,
        onChangePassword,
        loading,
        isAdmin,
        isMessageVisible,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useUserContext = () => useContext(Context);
export { UserProvider };
