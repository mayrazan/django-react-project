import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { useEffect, useState } from "react";
import Loading from "../../shared/Loading";
import { ContainerBtnStyled } from "../../shared/StyleComponents/style";
import { useUserContext } from "../../../context/ContextUser";
import { getUser, updateProfile } from "../../../services/infoApi";
import {
  BtnSubmitStyled,
  ContainerStyled,
  FormStyled,
  PaperContainer,
  TextFieldStyled,
} from "./style";

const MyProfile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    numAp: 0,
    floor: 0,
    email: "",
    cpf: "",
    phone: "",
  });

  const currentUser = JSON.parse(localStorage.getItem("userLogged"));
  const userID = currentUser.map((el) => el.id);
  const { handleLogout } = useUserContext();

  useEffect(() => {
    (async () => {
      const response = await getUser(`${userID[0]}`);
      setForm({
        name: response.name,
        numAp: response.numAp,
        lastName: response.lastName,
        floor: response.floor,
        email: response.email,
        phone: response.phone,
        cpf: response.cpf,
      });
      setTimeout(() => setIsLoading(false), 1900);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveChanges = (event) => {
    event.preventDefault();
    (async () => {
      setIsLoading(true);

      await updateProfile(userID[0], {
        name: form.name,
        numAp: form.numAp,
        lastName: form.lastName,
        floor: form.floor,
        email: form.email,
        phone: form.phone,
        cpf: form.cpf,
      });

      setTimeout(() => setIsLoading(false), 700);
    })();
    setTimeout(() => handleLogout(), 700);
  };

  return (
    <ContainerStyled component="main" maxWidth="md">
      <CssBaseline />
      <ContainerBtnStyled></ContainerBtnStyled>
      <PaperContainer>
        <Typography component="h1" variant="h5">
          Perfil
        </Typography>

        {isLoading ? (
          <Loading />
        ) : (
          <FormStyled>
            <TextFieldStyled
              value={form.name}
              onChange={(event) =>
                setForm({ ...form, name: event.target.value })
              }
              name="name"
              variant="outlined"
              margin="normal"
              fullWidth
              label="Nome"
            />

            <TextFieldStyled
              value={form.lastName}
              onChange={(event) =>
                setForm({ ...form, lastName: event.target.value })
              }
              name="lastName"
              variant="outlined"
              margin="normal"
              fullWidth
              label="Sobrenome"
            />
            <TextFieldStyled
              value={form.numAp}
              onChange={(event) =>
                setForm({ ...form, numAp: event.target.value })
              }
              name="numAp"
              variant="outlined"
              margin="normal"
              fullWidth
              label="Nº Ap."
              type="number"
            />
            <TextFieldStyled
              value={form.floor}
              onChange={(event) =>
                setForm({ ...form, floor: event.target.value })
              }
              name="floor"
              variant="outlined"
              margin="normal"
              fullWidth
              label="Andar"
              type="number"
            />
            <TextFieldStyled
              value={form.email}
              name="email"
              disabled
              variant="outlined"
              margin="normal"
              fullWidth
              label="Email"
            />

            <TextFieldStyled
              value={form.phone}
              onChange={(event) =>
                setForm({ ...form, phone: event.target.value })
              }
              name="phone"
              variant="outlined"
              margin="normal"
              fullWidth
              label="Telefone"
            />

            <TextFieldStyled
              value={form.cpf}
              onChange={(event) =>
                setForm({ ...form, cpf: event.target.value })
              }
              name="cpf"
              variant="outlined"
              margin="normal"
              fullWidth
              label="Cpf"
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
    </ContainerStyled>
  );
};

export default MyProfile;
