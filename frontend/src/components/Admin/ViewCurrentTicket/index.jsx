import { useHistory, useParams } from "react-router";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useEffect, useState } from "react";
import { getDataApi, updateTicket } from "../../../services/infoApi";
import Loading from "../../shared/Loading";
import { colors } from "../../../styles/colors";
import { ContainerBtnStyled } from "../../shared/StyleComponents/style";
import SelectContainer from "../../shared/SelectContainer";
import { MenuItem } from "@material-ui/core";

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
  const [currentTicket, setTicket] = useState({});
  const [rows, setRows] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    apNumber: 0,
    description: "",
    apOccurrence: 0,
    problem: "",
    status: "",
    priority: "",
    date: "",
    feedbackManager: "",
    file: [],
  });

  const history = useHistory();

  useEffect(() => {
    (async () => {
      const response = await getDataApi("tickets");
      setRows(response);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const ticketSelected = await rows.find(
        (ticket) => ticket.id.toString() === id.toString()
      );
      ticketSelected && setTicket(ticketSelected);
      setForm({
        name: currentTicket.name,
        apNumber: currentTicket.apNumber,
        description: currentTicket.description,
        apOccurrence: currentTicket.apOccurrence,
        problem: currentTicket.problem,
        status: currentTicket.status,
        priority: currentTicket.priority,
        date: currentTicket.date,
        feedbackManager: currentTicket.feedbackManager,
        file: currentTicket.file,
      });
      setTimeout(() => setIsLoading(false), 1900);
    })();
  }, [
    currentTicket.apNumber,
    currentTicket.apOccurrence,
    currentTicket.date,
    currentTicket.description,
    currentTicket.feedbackManager,
    currentTicket.file,
    currentTicket.name,
    currentTicket.priority,
    currentTicket.problem,
    currentTicket.status,
    id,
    rows,
  ]);

  const classes = useStyles();

  const saveChanges = (event) => {
    event.preventDefault();
    (async () => {
      const result = {
        name: form.name,
        apNumber: form.apNumber,
        apOccurrence: form.apOccurrence,
        date: form.date,
        description: form.description,
        priority: form.priority,
        problem: form.problem,
        status: form.status,
        feedbackManager: form.feedbackManager,
        file: form.file,
      };
      const updatedResults = await updateTicket(id.toString(), result);
      setTicket(updatedResults);
    })();
    setTimeout(() => window.location.reload(), 1900);
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

  // const reader = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const fileReader = new FileReader();
  //     fileReader.onload = () => resolve(fileReader.result);
  //     fileReader.readAsDataURL(file);
  //   });
  // };
  // const readFile = (file) => {
  //   reader(file).then((result) => setForm({ ...form, file: result }));
  // };

  // const downloadFile = () => {
  //   axios({
  //     url: `${form.file[0].path}`, //your url
  //     method: "GET",
  //     responseType: "blob",
  //     // responseType: "arraybuffer",
  //   }).then((response) => {
  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     console.log(url);
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.setAttribute("download", "file.png"); //or any other extension
  //     document.body.appendChild(link);
  //     link.click();
  //   });
  // };

  return (
    <Container component="main" maxWidth="md" className={classes.main}>
      <CssBaseline />
      <ContainerBtnStyled>
        <Button
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => history.push("/admin/chamados")}
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
              name="apNumber"
              value={form.apNumber}
              onChange={(event) => {
                setForm({ ...form, apNumber: event.target.value });
              }}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Nº Apartamento"
              className={classes.field}
            />

            <TextField
              value={form.problem}
              onChange={(event) => {
                setForm({ ...form, problem: event.target.value });
              }}
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
              value={form.description}
              onChange={(event) => {
                setForm({ ...form, description: event.target.value });
              }}
              className={classes.field}
            />

            <TextField
              value={form.apOccurrence}
              onChange={(event) => {
                setForm({ ...form, apOccurrence: event.target.value });
              }}
              name="apOccurrence"
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
              value={form.date}
              name="date"
              variant="outlined"
              margin="normal"
              disabled
              label="Data de abertura"
              className={classes.dateField}
              onChange={(event) => {
                setForm({ ...form, date: event.target.value });
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

export default ViewCurrentTicket;
