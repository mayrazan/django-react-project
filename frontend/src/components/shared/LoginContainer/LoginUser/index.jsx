import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import { colors } from "../../../../styles/colors";
import { TextField } from "@material-ui/core";
import { ContainerBtnStyled } from "../../StyleComponents/style";
import { useUserContext } from "../../../../context/ContextUser";
import { useState } from "react";
import { alertMessage } from "../../../../utils/messages";

const useStyles = makeStyles((theme) => ({
  paper: {
    [theme.breakpoints.down("sm")]: {
      marginTop: 0,
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: colors.white,
  },
  form: {
    width: "100%",
    paddingTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, "auto", 2),
    display: "flex",
  },
  alerts: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  main: {
    backgroundColor: "#274b82",
    borderRadius: "5px",
  },
  field: {
    "@media (max-height: 946px)": {
      paddingBottom: ".5rem",
      marginBottom: 0,
    },
    "& .MuiFormLabel-root": {
      color: colors.white,
    },
    "& .MuiInputBase-root": {
      color: colors.white,
    },
    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: colors.white,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: colors.white,
    },
  },
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#162e54",
    color: colors.white,
    paddingTop: "2rem",
    "@media (max-height: 415px)": {
      height: "auto",
    },
  },
}));

const LoginUser = () => {
  const classes = useStyles();
  const history = useHistory();
  const {
    onChangeEmail,
    onChangePassword,
    handleLogin,
    redirectToHome,
    login,
  } = useUserContext();
  const [isMessageVisible, setMessageVisible] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    redirectToHome();
    const user = JSON.parse(localStorage.getItem("userLogged"));
    const isUser = user !== null && user !== undefined ? user[0].isUser : false;

    if (window.location.pathname === "/login-usuario" && isUser) {
      handleLogin();
      history.push("/");
    } else {
      setMessageVisible(true);
      alert("Login invalido");
      localStorage.removeItem("userLogged");
    }
    setTimeout(() => window.location.reload(), 700);
  };

  return (
    <div className={classes.container}>
      <Typography
        component="h2"
        variant="h4"
        align="center"
        style={{ paddingBottom: "2rem" }}
      >
        Condomínio Quintas das Flores
      </Typography>
      <Container component="main" maxWidth="md" className={classes.main}>
        <CssBaseline />
        <ContainerBtnStyled>
          <Button
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => {
              history.push("/login");
              window.location.reload();
            }}
          >
            Voltar
          </Button>
        </ContainerBtnStyled>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Login Morador
          </Typography>

          <form className={classes.form}>
            <TextField
              label="Email"
              name="email"
              autoFocus
              value={login.email}
              onChange={onChangeEmail}
              className={classes.field}
              required
              fullWidth
              variant="outlined"
              margin="normal"
              autoComplete="off"
            />

            <TextField
              name="password"
              label="Senha"
              type="password"
              value={login.password}
              onChange={onChangePassword}
              className={classes.field}
              required
              fullWidth
              variant="outlined"
              margin="normal"
              autoComplete="off"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onSubmit}
            >
              Entrar
            </Button>
          </form>
        </div>

        {isMessageVisible && alertMessage(classes.alerts)}
      </Container>
    </div>
  );
};

export default LoginUser;
