import { Route, Redirect } from "react-router-dom";
import { useUserContext } from "../../../context/ContextUser";

const PrivateRoute = ({ auth, ...rest }) => {
  const { isAuthenticated } = useUserContext();

  if (!isAuthenticated && auth) {
    return <Redirect to="/login" />;
  }
  return <Route {...rest} />;
};

export default PrivateRoute;
