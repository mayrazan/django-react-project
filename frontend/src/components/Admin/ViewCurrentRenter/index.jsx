import { useHistory, useParams } from "react-router";
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
import KeyboardBackspaceOutlinedIcon from "@material-ui/icons/KeyboardBackspaceOutlined";

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

const ViewCurrentRenter = () => {
  const { id } = useParams();
  const [currentRenter, setRenter] = useState({});
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

  const history = useHistory();
  const { credentials } = useUserContext();

  useEffect(() => {
    (async () => {
      const renterSelected = await credentials.find(
        (renter) => renter.id.toString() === id.toString()
      );
      renterSelected && setRenter(renterSelected);
      setForm({
        name: currentRenter.name,
        numAp: currentRenter.numAp,
        lastName: currentRenter.lastName,
        floor: currentRenter.floor,
        email: currentRenter.email,
        phone: currentRenter.phone,
        cpf: currentRenter.cpf,
      });
      setTimeout(() => setIsLoading(false), 1900);
    })();
  }, [
    credentials,
    currentRenter.cpf,
    currentRenter.email,
    currentRenter.floor,
    currentRenter.lastName,
    currentRenter.name,
    currentRenter.numAp,
    currentRenter.phone,
    id,
  ]);

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="md" className={classes.main}>
      <CssBaseline />
      <ContainerBtnStyled>
        <Button
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => history.push("/admin/condominos")}
        >
          <KeyboardBackspaceOutlinedIcon />
        </Button>
      </ContainerBtnStyled>
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Condômino
        </Typography>

        {isLoading ? (
          <Loading />
        ) : (
          <form className={classes.form}>
            <TextField
              value={form.name}
              disabled
              name="name"
              variant="outlined"
              margin="normal"
              fullWidth
              label="Nome"
              className={classes.field}
            />

            <TextField
              value={form.lastName}
              disabled
              name="lastName"
              variant="outlined"
              margin="normal"
              fullWidth
              label="Sobrenome"
              className={classes.field}
            />
            <TextField
              value={form.numAp}
              disabled
              name="numAp"
              variant="outlined"
              margin="normal"
              fullWidth
              label="Nº Ap."
              className={classes.field}
            />
            <TextField
              value={form.floor}
              disabled
              name="floor"
              variant="outlined"
              margin="normal"
              fullWidth
              label="Andar"
              className={classes.field}
            />
            <TextField
              value={form.email}
              disabled
              name="email"
              variant="outlined"
              margin="normal"
              fullWidth
              label="Email"
              className={classes.field}
            />

            <TextField
              value={form.phone}
              disabled
              name="phone"
              variant="outlined"
              margin="normal"
              fullWidth
              label="Telefone"
              className={classes.field}
            />

            <TextField
              value={form.cpf}
              disabled
              name="cpf"
              variant="outlined"
              margin="normal"
              fullWidth
              label="Cpf"
              className={classes.field}
            />
          </form>
        )}
      </div>
    </Container>
  );
};

export default ViewCurrentRenter;
