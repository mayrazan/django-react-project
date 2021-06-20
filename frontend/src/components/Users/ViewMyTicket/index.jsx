import { useHistory, useParams } from "react-router";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { useEffect, useState } from "react";
import { getDataApi, updateTicketPatch } from "../../../services/infoApi";
import Loading from "../../shared/Loading";
import { ContainerBtnStyled } from "../../shared/StyleComponents/style";
import { success } from "../../../utils/messages";
import KeyboardBackspaceOutlinedIcon from "@material-ui/icons/KeyboardBackspaceOutlined";
import {
  BtnSubmitStyled,
  ContainerMainStyled,
  DateFieldStyled,
  FormStyled,
  PaperContainer,
  TextFieldStyled,
  ContainerInfoStyled,
} from "./style";

const ViewMyTicket = () => {
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
    userResponse: "",
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
        userResponse: response.userResponse,
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
        userResponse: form.userResponse,
      });
      setMessageVisible(true);
      setTimeout(() => setIsLoading(false), 700);
    })();
  };

  return (
    <ContainerMainStyled component="main" maxWidth="md">
      <CssBaseline />
      <ContainerBtnStyled>
        <BtnSubmitStyled
          variant="contained"
          color="primary"
          onClick={() => history.push("/chamados/")}
        >
          <KeyboardBackspaceOutlinedIcon />
        </BtnSubmitStyled>
      </ContainerBtnStyled>
      <PaperContainer>
        <Typography component="h1" variant="h5">
          Ticket #{id}
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

            <ContainerInfoStyled>
              <TextFieldStyled
                defaultValue={form.status}
                disabled
                name="status"
                variant="outlined"
                margin="normal"
                label="Status"
              />
              <TextFieldStyled
                defaultValue={form.priority}
                disabled
                name="priority"
                variant="outlined"
                margin="normal"
                label="Prioridade"
              />

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
            </ContainerInfoStyled>

            <TextFieldStyled
              variant="outlined"
              margin="normal"
              fullWidth
              multiline
              rows={4}
              name="feedback"
              id="feedback"
              label="Resposta Síndico"
              defaultValue={form.feedbackManager}
              disabled
              autoComplete="off"
            />

            <TextFieldStyled
              variant="outlined"
              margin="normal"
              fullWidth
              multiline
              rows={4}
              name="userResponse"
              id="userResponse"
              label="Resposta Condômino"
              value={form.userResponse}
              onChange={(event) => {
                setForm({ ...form, userResponse: event.target.value });
              }}
              autoComplete="off"
            />

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

export default ViewMyTicket;
