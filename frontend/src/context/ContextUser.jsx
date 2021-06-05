import { createContext, useContext } from "react";
import useContextUser from "./useContextUser";

const Context = createContext({});

function UserProvider({ children }) {
  const {
    handleLogin,
    handleLogout,
    isAuthenticated,
    isUser,
    isAdmin,
    credentials,
    token,
    onChangeEmail,
    onChangePassword,
    isMessageVisible,
    redirectToHome,
    login,
    userId,
  } = useContextUser();

  return (
    <Context.Provider
      value={{
        handleLogin,
        handleLogout,
        isAuthenticated,
        isUser,
        isAdmin,
        credentials,
        token,
        onChangeEmail,
        onChangePassword,
        isMessageVisible,
        redirectToHome,
        login,
        userId,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useUserContext = () => useContext(Context);
export { UserProvider };
