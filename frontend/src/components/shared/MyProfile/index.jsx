import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useEffect, useState } from "react";
import Loading from "../../shared/Loading";
import { colors } from "../../../styles/colors";
import { ContainerBtnStyled } from "../../shared/StyleComponents/style";
import { useUserContext } from "../../../context/ContextUser";
import { getUser, updateProfile } from "../../../services/infoApi";

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
  dateField: {
    marginTop: theme.spacing(1),
    "@media (max-height: 946px)": {
      paddingBottom: ".5rem",
      marginBottom: 0,
    },
  },
}));

const MyProfile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    numAp: 0,
    floor: 0,
    email: "",
    cpf: "",
    phone: "",
  });

  const currentUser = JSON.parse(localStorage.getItem("userLogged"));
  const userID = currentUser.map((el) => el.id);
  const { handleLogout } = useUserContext();

  useEffect(() => {
    (async () => {
      const response = await getUser(`${userID[0]}`);
      setForm({
        name: response.name,
        numAp: response.numAp,
        lastName: response.lastName,
        floor: response.floor,
        email: response.email,
        phone: response.phone,
        cpf: response.cpf,
      });
      setTimeout(() => setIsLoading(false), 1900);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const classes = useStyles();

  const saveChanges = (event) => {
    event.preventDefault();
    (async () => {
      setIsLoading(true);

      await updateProfile(userID[0], {
        name: form.name,
        numAp: form.numAp,
        lastName: form.lastName,
        floor: form.floor,
        email: form.email,
        phone: form.phone,
        cpf: form.cpf,
      });

      setTimeout(() => setIsLoading(false), 700);
    })();
    setTimeout(() => handleLogout(), 700);
  };

  return (
    <Container component="main" maxWidth="md" className={classes.main}>
      <CssBaseline />
      <ContainerBtnStyled></ContainerBtnStyled>
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Perfil
        </Typography>

        {isLoading ? (
          <Loading />
        ) : (
          <form className={classes.form}>
            <TextField
              value={form.name}
              onChange={(event) =>
                setForm({ ...form, name: event.target.value })
              }
              name="name"
              variant="outlined"
              margin="normal"
              fullWidth
              label="Nome"
              className={classes.field}
            />

            <TextField
              value={form.lastName}
              onChange={(event) =>
                setForm({ ...form, lastName: event.target.value })
              }
              name="lastName"
              variant="outlined"
              margin="normal"
              fullWidth
              label="Sobrenome"
              className={classes.field}
            />
            <TextField
              value={form.numAp}
              onChange={(event) =>
                setForm({ ...form, numAp: event.target.value })
              }
              name="numAp"
              variant="outlined"
              margin="normal"
              fullWidth
              label="Nº Ap."
              className={classes.field}
              type="number"
            />
            <TextField
              value={form.floor}
              onChange={(event) =>
                setForm({ ...form, floor: event.target.value })
              }
              name="floor"
              variant="outlined"
              margin="normal"
              fullWidth
              label="Andar"
              className={classes.field}
              type="number"
            />
            <TextField
              value={form.email}
              name="email"
              disabled
              variant="outlined"
              margin="normal"
              fullWidth
              label="Email"
              className={classes.field}
            />

            <TextField
              value={form.phone}
              onChange={(event) =>
                setForm({ ...form, phone: event.target.value })
              }
              name="phone"
              variant="outlined"
              margin="normal"
              fullWidth
              label="Telefone"
              className={classes.field}
            />

            <TextField
              value={form.cpf}
              onChange={(event) =>
                setForm({ ...form, cpf: event.target.value })
              }
              name="cpf"
              variant="outlined"
              margin="normal"
              fullWidth
              label="Cpf"
              className={classes.field}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={saveChanges}
            >
              Salvar Alterações
            </Button>
          </form>
        )}
      </div>
    </Container>
  );
};

export default MyProfile;
