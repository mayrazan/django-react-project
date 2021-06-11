import { useHistory } from "react-router";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useEffect, useState } from "react";
import { getColorsPriority, updateColors } from "../../../services/infoApi";
import { colors } from "../../../styles/colors";
import { ContainerBtnStyled } from "../../shared/StyleComponents/style";
import { successMessage } from "../../../utils/messages";
import Loading from "../../shared/Loading";

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

const ColorTags = () => {
  const history = useHistory();
  const classes = useStyles();

  const [isMessageSuccess, setMessageSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [colors, setColors] = useState({
    low: "",
    medium: "",
    high: "",
  });

  useEffect(() => {
    const load = async () => {
      const response = await getColorsPriority();
      setColors({
        low: response.lowPriority,
        medium: response.mediumPriority,
        high: response.highPriority,
      });
      setTimeout(() => setIsLoading(false), 700);
    };
    load();
  }, []);

  const saveChanges = (event) => {
    event.preventDefault();
    (async () => {
      setIsLoading(true);
      await updateColors(1, {
        highPriority: colors.high,
        mediumPriority: colors.medium,
        lowPriority: colors.low,
      });
      setMessageSuccess(true);
      setTimeout(() => setIsLoading(false), 700);
    })();
  };

  return (
    <Container component="main" maxWidth="md" className={classes.main}>
      <CssBaseline />
      <ContainerBtnStyled>
        <Button
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => history.push("/admin")}
        >
          Voltar
        </Button>
      </ContainerBtnStyled>
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Selecione uma cor para identificar cada prioridade
        </Typography>
        {isLoading ? (
          <Loading />
        ) : (
          <form className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="high"
              label="Prioridade Alta"
              defaultValue="Prioridade Alta"
              className={classes.field}
              autoComplete="off"
              disabled
            />
            <input
              type="color"
              value={colors.high}
              onChange={(event) =>
                setColors({ ...colors, high: event.target.value })
              }
              style={{ width: "50%" }}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="medium"
              label="Prioridade Media"
              defaultValue="Prioridade Media"
              className={classes.field}
              autoComplete="off"
              disabled
            />

            <input
              type="color"
              value={colors.medium}
              onChange={(event) =>
                setColors({ ...colors, medium: event.target.value })
              }
              style={{ width: "50%" }}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="low"
              label="Prioridade Baixa"
              defaultValue="Prioridade Baixa"
              className={classes.field}
              autoComplete="off"
              disabled
            />

            <input
              type="color"
              value={colors.low}
              onChange={(event) =>
                setColors({ ...colors, low: event.target.value })
              }
              style={{ width: "50%" }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={saveChanges}
            >
              Salvar
            </Button>
          </form>
        )}
      </div>
      {isMessageSuccess && successMessage(classes.alerts)}
    </Container>
  );
};

export default ColorTags;
