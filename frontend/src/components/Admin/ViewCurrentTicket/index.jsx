import { useHistory, useParams } from "react-router";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useEffect, useState } from "react";
import { getDataApi, updateTicketPatch } from "../../../services/infoApi";
import Loading from "../../shared/Loading";
import { colors } from "../../../styles/colors";
import { ContainerBtnStyled } from "../../shared/StyleComponents/style";
import SelectContainer from "../../shared/SelectContainer";
import { MenuItem } from "@material-ui/core";
import { success } from "../../../utils/messages";

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

const ViewCurrentTicket = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isMessageVisible, setMessageVisible] = useState(false);
  const [form, setForm] = useState({
    user: [],
    files: null,
    status: "",
    priority: "",
    numApOccurrence: 0,
    description: "",
    feedbackManager: "",
    problem: "",
    openDate: "",
    name: "",
    numAp: null,
  });

  const history = useHistory();

  useEffect(() => {
    (async () => {
      const response = await getDataApi(`tickets/${id}`);
      setForm({
        user: response.user,
        description: response.description,
        numApOccurrence: response.numApOccurrence,
        problem: response.problem,
        status: response.status,
        priority: response.priority,
        openDate: response.openDate,
        feedbackManager: response.feedbackManager,
        files: response.files,
        name: response.user.name,
        numAp: response.user.numAp,
      });
      setTimeout(() => setIsLoading(false), 1900);
      setMessageVisible(false);
    })();
  }, [id]);

  const classes = useStyles();

  const saveChanges = (event) => {
    event.preventDefault();
    (async () => {
      setIsLoading(true);
      await updateTicketPatch(id, {
        status: form.status,
        priority: form.priority,
        feedbackManager: form.feedbackManager,
      });
      setMessageVisible(true);
      setTimeout(() => setIsLoading(false), 700);
    })();
  };

  const selectStatus = () => {
    const options = ["Em aberto", "Em análise", "Concluído", "Rejeitado"];

    return (
      <SelectContainer
        value={form.status}
        onChange={(event) => {
          setForm({ ...form, status: event.target.value });
        }}
        label="Status"
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

  const selectPriority = () => {
    const optionsPriority = ["Baixa", "Media", "Alta"];
    return (
      <SelectContainer
        value={form.priority}
        onChange={(event) => {
          setForm({ ...form, priority: event.target.value });
        }}
        label="Prioridade"
      >
        {optionsPriority.map((item, index) => {
          return (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          );
        })}
      </SelectContainer>
    );
  };

  const downloadFile = () => {
    const link = document.createElement("a");
    link.href = form.files;
    document.body.appendChild(link);
    link.click();
    // document.body.removeChild(link);
  };

  return (
    <Container component="main" maxWidth="md" className={classes.main}>
      <CssBaseline />
      <ContainerBtnStyled>
        <Button
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => history.push("/admin/chamados/")}
        >
          Voltar
        </Button>
      </ContainerBtnStyled>
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Ticket
        </Typography>

        {isLoading ? (
          <Loading />
        ) : (
          <form className={classes.form}>
            <TextField
              defaultValue={form.name}
              disabled
              name="name"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Nome"
              className={classes.field}
            />

            <TextField
              defaultValue={form.numAp}
              disabled
              name="numAp"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Nº Ap."
              className={classes.field}
            />

            <TextField
              defaultValue={form.problem}
              disabled
              name="problem"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Perturbação"
              className={classes.field}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              multiline
              rows={4}
              name="description"
              id="description"
              label="Descrição do problema"
              defaultValue={form.description}
              disabled
              className={classes.field}
            />

            <TextField
              defaultValue={form.numApOccurrence}
              disabled
              name="numApOccurrence"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Nº Ap. de ocorrência"
              className={classes.field}
            />

            {selectStatus()}
            {selectPriority()}

            <TextField
              value={form.openDate}
              name="openDate"
              variant="outlined"
              margin="normal"
              disabled
              label="Data de abertura"
              className={classes.dateField}
              onChange={(event) => {
                setForm({ ...form, openDate: event.target.value });
              }}
            />

            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              multiline
              rows={4}
              name="feedback"
              id="feedback"
              label="Resposta Síndico"
              value={form.feedbackManager}
              onChange={(event) => {
                setForm({ ...form, feedbackManager: event.target.value });
              }}
              className={classes.field}
              autoComplete="off"
            />
            {form.files && (
              <Button
                onClick={downloadFile}
                variant="contained"
                color="secondary"
                style={{ backgroundColor: "#8015a3" }}
              >
                Download Arquivo
              </Button>
            )}

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
      {isMessageVisible && success(classes.alerts)}
    </Container>
  );
};

export default ViewCurrentTicket;
