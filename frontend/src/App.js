import { UserProvider } from "./context/ContextUser";
import Routes from "./routes";
import { GlobalStyle } from "./styles";
import "./styles/fonts.css";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

function App() {
  return (
    <UserProvider>
      <GlobalStyle />
      <Router history={history}>
        <Routes />
      </Router>
    </UserProvider>
  );
}

export default App;
