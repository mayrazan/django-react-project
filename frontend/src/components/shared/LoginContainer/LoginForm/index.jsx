import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import { ContainerBtnStyled } from "../../StyleComponents/style";
import { useUserContext } from "../../../../context/ContextUser";
import { alertMessage } from "../../../../utils/messages";
import KeyboardBackspaceOutlinedIcon from "@material-ui/icons/KeyboardBackspaceOutlined";
import {
  BtnSubmitStyled,
  ContainerLoginStyled,
  ContainerStyled,
  FormStyled,
  PaperContainer,
  TextFieldStyled,
} from "./style";

const LoginForm = () => {
  const history = useHistory();
  const {
    onChangeEmail,
    onChangePassword,
    redirectToHome,
    login,
    isMessageVisible,
  } = useUserContext();

  const onSubmit = (event) => {
    event.preventDefault();
    redirectToHome();
  };

  return (
    <ContainerLoginStyled>
      <Typography
        component="h2"
        variant="h4"
        align="center"
        style={{ paddingBottom: "2rem" }}
      >
        Condomínio Quintas das Flores
      </Typography>
      <ContainerStyled component="main" maxWidth="md">
        <CssBaseline />
        <ContainerBtnStyled>
          <BtnSubmitStyled
            variant="contained"
            color="primary"
            onClick={() => {
              history.push("/login");
              window.location.reload();
            }}
          >
            <KeyboardBackspaceOutlinedIcon />
          </BtnSubmitStyled>
        </ContainerBtnStyled>
        <PaperContainer>
          <Typography component="h1" variant="h5">
            Login
          </Typography>

          <FormStyled>
            <TextFieldStyled
              label="Email"
              name="email"
              autoFocus
              value={login.email}
              onChange={onChangeEmail}
              required
              fullWidth
              variant="outlined"
              margin="normal"
              type="text"
              autoComplete="off"
            />

            <TextFieldStyled
              name="password"
              label="Senha"
              type="password"
              value={login.password}
              onChange={onChangePassword}
              required
              fullWidth
              variant="outlined"
              margin="normal"
              autoComplete="off"
            />

            <BtnSubmitStyled
              type="submit"
              variant="contained"
              color="primary"
              onClick={onSubmit}
            >
              Entrar
            </BtnSubmitStyled>
          </FormStyled>
        </PaperContainer>

        {isMessageVisible && alertMessage()}
      </ContainerStyled>
    </ContainerLoginStyled>
  );
};

export default LoginForm;
