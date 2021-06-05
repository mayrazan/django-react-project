import { useHistory } from "react-router";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useEffect, useState } from "react";
import { getDataApi, registerInfo } from "../../../services/infoApi";
import { colors } from "../../../styles/colors";
import { alertMessage, successMessage } from "../../../utils/messages";
import { ContainerBtnStyled } from "../../shared/StyleComponents/style";
import { MenuItem } from "@material-ui/core";
import SelectContainer from "../SelectContainer";
import GooglePicker from "react-google-picker";

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

const RegisterTicketInfo = () => {
  const [rows, setRows] = useState([]);
  const [problems, setProblems] = useState([]);
  const [form, setForm] = useState({
    description: "",
    numApOccurrence: 0,
    problem: "",
    status: "Em aberto",
    priority: "",
    openDate: new Date().toLocaleString(),
    feedbackManager: "",
    files: null,
  });

  useEffect(() => {
    const load = async () => {
      const responseUser = await getDataApi("users/");
      const responseProblems = await getDataApi("problems/");
      const resultsUser = responseUser.filter((el) => el.isUser);

      setRows(resultsUser);
      setProblems(responseProblems);
    };
    load();
  }, []);

  const userId = rows.map((el) => el.id);

  const history = useHistory();
  const classes = useStyles();

  const [isMessageVisible, setMessageVisible] = useState(false);
  const [isMessageSuccess, setMessageSuccess] = useState(false);

  const selectUser = () => {
    return rows.map((item) => {
      return (
        <div key={item.id}>
          <TextField
            name="user"
            defaultValue={item.name}
            variant="outlined"
            margin="normal"
            required
            disabled
            fullWidth
            label="Nome"
            className={classes.field}
          />
          <TextField
            name="numAp"
            defaultValue={item.numAp}
            variant="outlined"
            margin="normal"
            required
            disabled
            fullWidth
            label="Nº Ap."
            className={classes.field}
          />
        </div>
      );
    });
  };

  const selectProblem = () => {
    return (
      <SelectContainer
        value={form.problem}
        onChange={(event) => {
          setForm({ ...form, problem: event.target.value });
        }}
        label="Perturbação"
      >
        {problems.map((item) => {
          return (
            <MenuItem key={item.id} value={item.problemType}>
              {item.problemType}
            </MenuItem>
          );
        })}
      </SelectContainer>
    );
  };

  const selectPriority = () => {
    const options = ["Baixa", "Alta", "Media"];
    return (
      <SelectContainer
        value={form.priority}
        onChange={(event) => {
          setForm({ ...form, priority: event.target.value });
        }}
        label="Prioridade"
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

  const getAllData = () => {
    let form_data = new FormData();
    form_data.append("description", form.description);
    form_data.append("numApOccurrence", form.numApOccurrence);
    form_data.append("problem", form.problem);
    form_data.append("status", form.status);
    form_data.append("priority", form.priority);
    form_data.append("openDate", form.openDate);
    form_data.append("feedbackManager", form.feedbackManager);
    form_data.append("user", userId);
    if (form.files !== null) {
      form_data.append("files", form.files);
    }
    return form_data;
  };

  async function onSubmit(event) {
    event.preventDefault();
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    if (validateForm()) {
      await registerInfo("tickets/", getAllData(), config.headers);
      setMessageSuccess(true);

      setTimeout(() => window.location.reload(), 1500);
    }
  }

  const validateForm = () => {
    if (form.description && form.numApOccurrence && form.problem) {
      setMessageVisible(false);
      return true;
    } else {
      setMessageVisible(true);
    }
  };
  console.log(form.files);

  return (
    <Container component="main" maxWidth="md" className={classes.main}>
      <CssBaseline />
      <ContainerBtnStyled>
        <Button
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => history.push("/")}
        >
          Voltar
        </Button>
      </ContainerBtnStyled>

      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Registrar Ticket
        </Typography>

        <form className={classes.form}>
          {selectUser()}
          {selectProblem()}
          {selectPriority()}

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
            value={form.numApOccurrence}
            onChange={(event) => {
              setForm({ ...form, numApOccurrence: event.target.value });
            }}
            name="numApOccurrence"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Nº Ap. de ocorrência"
            className={classes.field}
          />

          <input
            type="file"
            name="files"
            accept="image/*, video/*, audio/*"
            onChange={(event) => {
              setForm({ ...form, files: event.target.files[0] });
            }}
          />

          <GooglePicker
            clientId={process.env.REACT_APP_GOOGLE_DRIVE_CLIENT_ID}
            developerKey={process.env.REACT_APP_GOOGLE_DRIVE_API_KEY}
            scope={["https://www.googleapis.com/auth/drive.appdata"]}
            onChange={(data) => console.log("on change:", data)}
            onAuthFailed={(data) => console.log("on auth failed:", data)}
            multiselect={true}
            navHidden={true}
            authImmediate={false}
            viewId={"FOLDERS"}
            createPicker={(google, oauthToken) => {
              const googleViewId = google.picker.ViewId.FOLDERS;
              const docsView = new google.picker.DocsView(googleViewId)
                .setIncludeFolders(true)
                .setMimeTypes("application/vnd.google-apps.folder")
                .setSelectFolderEnabled(true);

              const picker = new window.google.picker.PickerBuilder()
                .addView(docsView)
                .setOAuthToken(oauthToken)
                .setDeveloperKey(process.env.REACT_APP_GOOGLE_DRIVE_API_KEY)
                .setCallback(() => {
                  console.log("Custom picker is ready!");
                });

              picker.build().setVisible(true);
            }}
          >
            <span>Click</span>
            <div className="google"></div>
          </GooglePicker>

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

export default RegisterTicketInfo;
