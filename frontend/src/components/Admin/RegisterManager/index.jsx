import { useHistory } from "react-router";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useState } from "react";
import { registerInfo } from "../../../services/infoApi";
import { colors } from "../../../styles/colors";
import { alertMessage, successMessage } from "../../../utils/messages";
import { ContainerBtnStyled } from "../../shared/StyleComponents/style";
// import ProfileImage from "../../shared/ProfileImage";

const useStyles = makeStyles((theme) => ({
  paper: {
    [theme.breakpoints.down("sm")]: {
      marginTop: 0,
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  form: {
    width: "100%",
    paddingTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, "auto", 2),
    display: "flex",
    "@media (max-height: 946px)": {
      margin: "auto",
    },
  },
  alerts: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  main: {
    backgroundColor: colors.white,
    borderRadius: "5px",
  },
  field: {
    "@media (max-height: 946px)": {
      paddingBottom: ".5rem",
      marginBottom: 0,
    },
  },
}));

const RegisterManager = () => {
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    numAp: 0,
    email: "",
    password: "",
    phone: "",
    isUser: false,
    isAdmin: true,
    floor: 0,
    is_active: true,
  });

  const history = useHistory();
  const classes = useStyles();

  const [isMessageVisible, setMessageVisible] = useState(false);
  const [isMessageSuccess, setMessageSuccess] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    if (validateForm()) {
      await registerInfo("users/", form);
      setMessageSuccess(true);

      setTimeout(() => window.location.reload(), 500);
    }
  }

  const validateForm = () => {
    if (
      form.name &&
      form.lastName &&
      form.email &&
      form.numAp &&
      form.password &&
      form.phone
    ) {
      setMessageVisible(false);

      return true;
    } else {
      setMessageVisible(true);
    }
  };

  return (
    <Container component="main" maxWidth="md" className={classes.main}>
      <CssBaseline />
      <ContainerBtnStyled>
        <Button
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => history.push("/admin/sindicos")}
        >
          Voltar
        </Button>
      </ContainerBtnStyled>

      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Registrar Síndico
        </Typography>

        <form className={classes.form}>
          {/* <ProfileImage setPreview={setPreview} /> */}
          <TextField
            value={form.name}
            onChange={(event) => {
              setForm({ ...form, name: event.target.value });
            }}
            name="name"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Nome"
            className={classes.field}
            autoComplete="off"
          />
          <TextField
            name="lastName"
            value={form.lastName}
            onChange={(event) => {
              setForm({ ...form, lastName: event.target.value });
            }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Sobrenome"
            className={classes.field}
            autoComplete="off"
          />

          <TextField
            name="apNumber"
            value={form.numAp}
            onChange={(event) => {
              setForm({ ...form, numAp: event.target.value });
            }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Nº Apartamento"
            className={classes.field}
            autoComplete="off"
          />

          <TextField
            value={form.email}
            onChange={(event) => {
              setForm({ ...form, email: event.target.value });
            }}
            name="email"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email"
            className={classes.field}
            autoComplete="off"
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            value={form.password}
            onChange={(event) => {
              setForm({ ...form, password: event.target.value });
            }}
            className={classes.field}
            type="password"
            autoComplete="off"
          />

          <TextField
            value={form.phone}
            onChange={(event) => {
              setForm({ ...form, phone: event.target.value });
            }}
            name="phone"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Telefone"
            className={classes.field}
            autoComplete="off"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSubmit}
          >
            Cadastrar
          </Button>
        </form>
      </div>

      {isMessageVisible && alertMessage(classes.alerts)}
      {isMessageSuccess && successMessage(classes.alerts)}
    </Container>
  );
};

export default RegisterManager;
