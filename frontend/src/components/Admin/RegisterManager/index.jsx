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

const RegisterManager = () => {
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    numAp: 0,
    email: "",
    password: "",
    phone: "",
    isUser: false,
    isAdmin: true,
    floor: 0,
    is_active: true,
  });

  const history = useHistory();

  const [isMessageVisible, setMessageVisible] = useState(false);
  const [isMessageSuccess, setMessageSuccess] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    if (validateForm()) {
      await registerInfo("users/", form);
      setMessageSuccess(true);

      setTimeout(() => window.location.reload(), 500);
    }
  }

  const validateForm = () => {
    if (
      form.name &&
      form.lastName &&
      form.email &&
      form.numAp &&
      form.password &&
      form.phone
    ) {
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
          onClick={() => history.push("/admin/sindicos")}
        >
          <KeyboardBackspaceOutlinedIcon />
        </BtnSubmitStyled>
      </ContainerBtnStyled>

      <PaperContainer>
        <Typography component="h1" variant="h5">
          Registrar Síndico
        </Typography>

        <FormStyled>
          <TextFieldStyled
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
            autoComplete="off"
          />
          <TextFieldStyled
            name="lastName"
            value={form.lastName}
            onChange={(event) => {
              setForm({ ...form, lastName: event.target.value });
            }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Sobrenome"
            autoComplete="off"
          />

          <TextFieldStyled
            name="apNumber"
            value={form.numAp}
            onChange={(event) => {
              setForm({ ...form, numAp: event.target.value });
            }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Nº Apartamento"
            autoComplete="off"
            type="number"
          />

          <TextFieldStyled
            value={form.email}
            onChange={(event) => {
              setForm({ ...form, email: event.target.value });
            }}
            name="email"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email"
            autoComplete="off"
          />

          <TextFieldStyled
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            value={form.password}
            onChange={(event) => {
              setForm({ ...form, password: event.target.value });
            }}
            type="password"
            autoComplete="off"
          />

          <TextFieldStyled
            value={form.phone}
            onChange={(event) => {
              setForm({ ...form, phone: event.target.value });
            }}
            name="phone"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Telefone"
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

export default RegisterManager;
