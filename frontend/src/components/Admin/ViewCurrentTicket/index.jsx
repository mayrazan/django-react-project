import { useHistory, useParams } from "react-router";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useEffect, useState } from "react";
import { getDataApi } from "../../../services/infoApi";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alerts: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const ViewCurrentTicket = () => {
  const { id } = useParams();
  const [currentTicket, setTicket] = useState({});
  const [rows, setRows] = useState([]);

  const history = useHistory();

  useEffect(() => {
    (async () => {
      const response = await getDataApi("tickets");
      setRows(response);
    })();
  }, []);

  useEffect(() => {
    const ticketSelected = rows.find(
      (ticket) => ticket.id.toString() === id.toString()
    );
    ticketSelected && setTicket(ticketSelected);
  }, [rows, id]);

  const {
    name,
    apNumber,
    // apOccurrence,
    problem,
    status,
    // file,
    // priority,
    // date,
    description,
  } = currentTicket;

  const classes = useStyles();
  const [form, setForm] = useState({
    name: "",
    apNumber: "",
    textField: "",
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Ticket
        </Typography>

        <form className={classes.form}>
          <TextField
            value={name}
            onChange={(event) => {
              setForm({ ...form, name: event.target.value });
            }}
            name="name"
            variant="outlined"
            margin="normal"
            required
            fullWidth
          />
          <TextField
            name="apNumber"
            value={apNumber}
            onChange={(event) => {
              setForm({ ...form, apNumber: event.target.value });
            }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
          />

          <TextField
            value={problem}
            onChange={(event) => {
              setForm({ ...form, name: event.target.value });
            }}
            name="name"
            variant="outlined"
            margin="normal"
            required
            fullWidth
          />
          <TextField
            value={status}
            onChange={(event) => {
              setForm({ ...form, name: event.target.value });
            }}
            name="name"
            variant="outlined"
            margin="normal"
            required
            fullWidth
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            multiline
            rows={4}
            name="textField"
            label="Campo de texto"
            id="textField"
            value={description}
            onChange={(event) => {
              setForm({ ...form, textField: event.target.value });
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => history.push("/admin/chamados")}
          >
            Salvar Alterações
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default ViewCurrentTicket;
