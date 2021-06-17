import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { useEffect, useState } from "react";
import { getDataApi, registerInfo } from "../../../services/infoApi";
import { alertMessage, successMessage } from "../../../utils/messages";
import { ContainerBtnStyled } from "../../shared/StyleComponents/style";
import { Input, MenuItem } from "@material-ui/core";
import SelectContainer from "../SelectContainer";
import KeyboardBackspaceOutlinedIcon from "@material-ui/icons/KeyboardBackspaceOutlined";
import {
  BtnSubmitStyled,
  ContainerStyled,
  FormStyled,
  PaperContainer,
  TextFieldStyled,
} from "./style";

const RegisterTicketInfo = () => {
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
  const currentUser = JSON.parse(localStorage.getItem("userLogged"));

  useEffect(() => {
    const load = async () => {
      const responseProblems = await getDataApi("problems/");
      setProblems(responseProblems);
    };
    load();
  }, []);

  const userId = currentUser.map((el) => el.id);

  const [isMessageVisible, setMessageVisible] = useState(false);
  const [isMessageSuccess, setMessageSuccess] = useState(false);

  const selectUser = () => {
    return currentUser.map((item) => {
      return (
        <div key={item.id}>
          <TextFieldStyled
            name="user"
            defaultValue={item.name}
            variant="outlined"
            margin="normal"
            required
            disabled
            fullWidth
            label="Nome"
          />
          <TextFieldStyled
            name="numAp"
            defaultValue={item.numAp}
            variant="outlined"
            margin="normal"
            required
            disabled
            fullWidth
            label="Nº Ap."
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

  return (
    <ContainerStyled component="main" maxWidth="md">
      <CssBaseline />
      <ContainerBtnStyled>
        <BtnSubmitStyled
          variant="contained"
          color="primary"
          onClick={() => setTimeout(() => window.location.reload(), 500)}
        >
          <KeyboardBackspaceOutlinedIcon />
        </BtnSubmitStyled>
      </ContainerBtnStyled>

      <PaperContainer>
        <Typography component="h1" variant="h5">
          Registrar Ticket
        </Typography>

        <FormStyled>
          {selectUser()}
          {selectProblem()}
          {selectPriority()}

          <TextFieldStyled
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
            autoComplete="off"
          />

          <TextFieldStyled
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
            type="number"
            autoComplete="off"
          />

          <Input
            type="file"
            name="files"
            accept="image/*, video/*, audio/*"
            onChange={(event) => {
              setForm({ ...form, files: event.target.files[0] });
            }}
            disableUnderline
          />

          <BtnSubmitStyled
            type="submit"
            variant="contained"
            color="primary"
            onClick={onSubmit}
          >
            Cadastrar
          </BtnSubmitStyled>
        </FormStyled>
      </PaperContainer>

      {isMessageVisible && alertMessage()}
      {isMessageSuccess && successMessage()}
    </ContainerStyled>
  );
};

export default RegisterTicketInfo;
