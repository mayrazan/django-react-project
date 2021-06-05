import { UserProvider } from "./context/ContextUser";
import Routes from "./routes";
import { GlobalStyle } from "./styles";
import "./styles/fonts.css";

function App() {
  return (
    <UserProvider>
      <GlobalStyle />
      <Routes />
    </UserProvider>
  );
}

export default App;
