import { useHistory } from "react-router";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { useState } from "react";
import { registerInfo } from "../../../services/infoApi";
import { alertMessage, successMessage } from "../../../utils/messages";
import { ContainerBtnStyled } from "../../shared/StyleComponents/style";
import KeyboardBackspaceOutlinedIcon from "@material-ui/icons/KeyboardBackspaceOutlined";
import {
  BtnSubmitStyled,
  ContainerStyled,
  FormStyled,
  PaperContainer,
  TextFieldStyled,
} from "./style";

const RegisterProblemsType = () => {
  const [form, setForm] = useState({
    problemType: "",
  });

  const history = useHistory();

  const [isMessageVisible, setMessageVisible] = useState(false);
  const [isMessageSuccess, setMessageSuccess] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    if (validateForm()) {
      await registerInfo("problems/", form);
      setMessageSuccess(true);

      setTimeout(() => window.location.reload(), 500);
    }
  }

  const validateForm = () => {
    if (form.problemType) {
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
          onClick={() => history.push("/admin")}
        >
          <KeyboardBackspaceOutlinedIcon />
        </BtnSubmitStyled>
      </ContainerBtnStyled>

      <PaperContainer>
        <Typography component="h1" variant="h5">
          Registrar Tipo de Perturbação
        </Typography>

        <FormStyled>
          <TextFieldStyled
            value={form.problemType}
            onChange={(event) => {
              setForm({ ...form, problemType: event.target.value });
            }}
            name="problemType"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Tipo de Perturbação"
            autoComplete="off"
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

export default RegisterProblemsType;
