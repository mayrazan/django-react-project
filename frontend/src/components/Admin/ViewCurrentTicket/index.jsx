import { useHistory, useParams } from "react-router";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { useEffect, useState } from "react";
import { getDataApi, updateTicketPatch } from "../../../services/infoApi";
import Loading from "../../shared/Loading";
import { ContainerBtnStyled } from "../../shared/StyleComponents/style";
import SelectContainer from "../../shared/SelectContainer";
import { MenuItem } from "@material-ui/core";
import { success } from "../../../utils/messages";
import KeyboardBackspaceOutlinedIcon from "@material-ui/icons/KeyboardBackspaceOutlined";
import {
  BtnSubmitStyled,
  ContainerMainStyled,
  DateFieldStyled,
  FormStyled,
  PaperContainer,
  TextFieldStyled,
} from "./style";

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
    <ContainerMainStyled component="main" maxWidth="md">
      <CssBaseline />
      <ContainerBtnStyled>
        <BtnSubmitStyled
          variant="contained"
          color="primary"
          onClick={() => history.push("/admin/chamados/")}
        >
          <KeyboardBackspaceOutlinedIcon />
        </BtnSubmitStyled>
      </ContainerBtnStyled>
      <PaperContainer>
        <Typography component="h1" variant="h5">
          Ticket
        </Typography>

        {isLoading ? (
          <Loading />
        ) : (
          <FormStyled>
            <TextFieldStyled
              defaultValue={form.name}
              disabled
              name="name"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Nome"
            />

            <TextFieldStyled
              defaultValue={form.numAp}
              disabled
              name="numAp"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Nº Ap."
            />

            <TextFieldStyled
              defaultValue={form.problem}
              disabled
              name="problem"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Perturbação"
            />

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
              defaultValue={form.description}
              disabled
            />

            <TextFieldStyled
              defaultValue={form.numApOccurrence}
              disabled
              name="numApOccurrence"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Nº Ap. de ocorrência"
            />

            {selectStatus()}
            {selectPriority()}

            <DateFieldStyled
              value={form.openDate}
              name="openDate"
              variant="outlined"
              margin="normal"
              disabled
              label="Data de abertura"
              onChange={(event) => {
                setForm({ ...form, openDate: event.target.value });
              }}
            />

            <TextFieldStyled
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

            <BtnSubmitStyled
              type="submit"
              variant="contained"
              color="primary"
              onClick={saveChanges}
            >
              Salvar Alterações
            </BtnSubmitStyled>
          </FormStyled>
        )}
      </PaperContainer>
      {isMessageVisible && success()}
    </ContainerMainStyled>
  );
};

export default ViewCurrentTicket;
