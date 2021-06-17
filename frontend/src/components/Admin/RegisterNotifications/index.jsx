import { useHistory } from "react-router";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { useState } from "react";
import { registerInfo } from "../../../services/infoApi";
import { ContainerBtnStyled } from "../../shared/StyleComponents/style";
import SelectContainer from "../../shared/SelectContainer";
import { MenuItem } from "@material-ui/core";
import { alertMessage, successMessage } from "../../../utils/messages";
import KeyboardBackspaceOutlinedIcon from "@material-ui/icons/KeyboardBackspaceOutlined";
import {
  BtnSubmitStyled,
  ContainerStyled,
  FormStyled,
  PaperContainer,
  TextFieldStyled,
} from "./style";

const RegisterNotifications = () => {
  const [form, setForm] = useState({
    notificationType: "",
    description: "",
  });

  const history = useHistory();

  const [isMessageVisible, setMessageVisible] = useState(false);
  const [isMessageSuccess, setMessageSuccess] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    if (validateForm()) {
      const success = await registerInfo("notifications/", form);
      setMessageSuccess(true);
      if (!success) {
        alert("Envio falhou");
      }
      setTimeout(() => window.location.reload(), 500);
    }
  }

  const validateForm = () => {
    if (form.notificationType && form.description) {
      setMessageVisible(false);

      return true;
    } else {
      setMessageVisible(true);
    }
  };

  const selectNotification = () => {
    const options = [
      "Manutenção",
      "Reunião",
      "Mudança",
      "Informações Gerais",
      "Outros",
    ];

    return (
      <SelectContainer
        value={form.notificationType}
        onChange={(event) => {
          setForm({ ...form, notificationType: event.target.value });
        }}
        label="Tipo de Avisos"
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
          Avisos
        </Typography>

        <FormStyled>
          {selectNotification()}

          <TextFieldStyled
            variant="outlined"
            margin="normal"
            required
            fullWidth
            multiline
            rows={10}
            name="description"
            id="description"
            label="Descrição do aviso"
            value={form.description}
            onChange={(event) => {
              setForm({ ...form, description: event.target.value });
            }}
            autoComplete="off"
          />

          <BtnSubmitStyled
            type="submit"
            variant="contained"
            color="primary"
            onClick={onSubmit}
          >
            Enviar
          </BtnSubmitStyled>
        </FormStyled>
      </PaperContainer>
      {isMessageVisible && alertMessage()}
      {isMessageSuccess && successMessage()}
    </ContainerStyled>
  );
};

export default RegisterNotifications;
