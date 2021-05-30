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
import { ContainerBtnStyled } from "../../shared/StyleComponents/style";
import SelectContainer from "../../shared/SelectContainer";
import { MenuItem } from "@material-ui/core";
import { alertMessage, successMessage } from "../../../utils/messages";

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

const RegisterNotifications = () => {
  const [form, setForm] = useState({
    notificationType: "",
    description: "",
    sendTo: [],
  });

  const history = useHistory();
  const classes = useStyles();

  const [isMessageVisible, setMessageVisible] = useState(false);
  const [isMessageSuccess, setMessageSuccess] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    if (validateForm()) {
      await registerInfo("problems", form);
      setMessageSuccess(true);

      setTimeout(() => window.location.reload(), 500);
    }
  }

  const validateForm = () => {
    if (form.notificationType && form.description) {
      setMessageVisible(false);

      return true;
    } else {
      setMessageVisible(true);
    }
  };

  const selectNotification = () => {
    const options = [
      "Manutenção",
      "Reunião",
      "Mudança",
      "Informações Gerais",
      "Outros",
    ];

    return (
      <SelectContainer
        value={form.notificationType}
        onChange={(event) => {
          setForm({ ...form, notificationType: event.target.value });
        }}
        label="Tipo de Avisos"
      >
        {options.map((item, index) => {
          return (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          );
        })}
      </SelectContainer>
    );
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
          Avisos
        </Typography>

        <form className={classes.form}>
          {selectNotification()}

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            multiline
            rows={10}
            name="description"
            id="description"
            label="Descrição do aviso"
            value={form.description}
            onChange={(event) => {
              setForm({ ...form, description: event.target.value });
            }}
            className={classes.field}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSubmit}
          >
            Enviar
          </Button>
        </form>
      </div>
      {isMessageVisible && alertMessage(classes.alerts)}
      {isMessageSuccess && successMessage(classes.alerts)}
    </Container>
  );
};

export default RegisterNotifications;
