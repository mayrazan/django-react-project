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
import ProfileImage from "../../shared/ProfileImage";

const useStyles = makeStyles((theme) => ({
  paper: {
    [theme.breakpoints.down("sm")]: {
      marginTop: 0,
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "white",
    // backgroundColor: colors.white,
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
    height: "auto",
    backgroundColor: "#162e54",
    color: colors.white,
    paddingTop: "2rem",
    "@media (min-height: 915px)": {
      height: "100%",
    },
  },
}));

const RegisterRenter = () => {
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    numAp: 0,
    phone: "",
    avatar: "",
    floor: "",
    cpf: "",
  });

  const history = useHistory();
  const classes = useStyles();

  const [isMessageVisible, setMessageVisible] = useState(false);
  const [isMessageSuccess, setMessageSuccess] = useState(false);
  const [preview, setPreview] = useState({ prev: null, src: "" });

  async function onSubmit(event) {
    event.preventDefault();
    setForm({ ...form, avatar: preview.src });
    if (validateForm()) {
      await registerInfo("users", form);
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
      form.phone &&
      form.numAp &&
      form.floor
    ) {
      setMessageVisible(false);

      return true;
    } else {
      setMessageVisible(true);
    }
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
            onClick={() => history.push("/login")}
          >
            Voltar
          </Button>
        </ContainerBtnStyled>

        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Registrar Condômino
          </Typography>

          <form className={classes.form}>
            <ProfileImage setPreview={setPreview} />
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
            />

            <TextField
              name="numAp"
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
            />

            <TextField
              value={form.cpf}
              onChange={(event) => {
                setForm({ ...form, cpf: event.target.value });
              }}
              name="cpf"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Cpf"
              className={classes.field}
            />

            <TextField
              value={form.floor}
              onChange={(event) => {
                setForm({ ...form, floor: event.target.value });
              }}
              name="floor"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Andar"
              className={classes.field}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onSubmit}
            >
              Registrar
            </Button>
          </form>
        </div>

        {isMessageVisible && alertMessage(classes.alerts)}
        {isMessageSuccess && successMessage(classes.alerts)}
      </Container>
    </div>
  );
};

export default RegisterRenter;
