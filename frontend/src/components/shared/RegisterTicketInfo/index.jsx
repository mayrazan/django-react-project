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
import { DropzoneArea } from "material-ui-dropzone";
import {
  AttachFile,
  Description,
  PictureAsPdf,
  Theaters,
} from "@material-ui/icons";
import AudiotrackOutlinedIcon from "@material-ui/icons/AudiotrackOutlined";

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
  const [form, setForm] = useState({
    name: "",
    apNumber: 0,
    description: "",
    apOccurrence: 0,
    problem: "",
    status: "Em aberto",
    priority: "",
    date: new Date().toLocaleString(),
    feedbackManager: "",
    file: [],
  });

  const history = useHistory();
  const classes = useStyles();

  const [isMessageVisible, setMessageVisible] = useState(false);
  const [isMessageSuccess, setMessageSuccess] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    if (validateForm()) {
      await registerInfo("tickets", form);
      setMessageSuccess(true);

      setTimeout(() => window.location.reload(), 500);
    }
  }

  const validateForm = () => {
    if (form.description && form.apOccurrence && form.problem) {
      setMessageVisible(false);
      return true;
    } else {
      setMessageVisible(true);
    }
  };

  const handlePreviewIcon = (fileObject, classes) => {
    const { type } = fileObject.file;
    const iconProps = {
      className: classes.image,
    };

    if (type.startsWith("video/")) return <Theaters {...iconProps} />;
    if (type.startsWith("audio/"))
      return <AudiotrackOutlinedIcon {...iconProps} />;

    switch (type) {
      case "application/msword":
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return <Description {...iconProps} />;
      case "application/pdf":
        return <PictureAsPdf {...iconProps} />;
      default:
        return <AttachFile {...iconProps} />;
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

          <DropzoneArea
            onChange={(files) => {
              setForm({ ...form, file: files });
            }}
            maxFileSize={50000000}
            getPreviewIcon={handlePreviewIcon}
            dropzoneText="Arraste o arquivo aqui ou clique para selecionar"
            filesLimit={5}
            showFileNames
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

export default RegisterTicketInfo;
