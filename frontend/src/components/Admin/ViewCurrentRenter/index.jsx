import { useHistory, useParams } from "react-router";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { useEffect, useState } from "react";
import Loading from "../../shared/Loading";
import { ContainerBtnStyled } from "../../shared/StyleComponents/style";
import { useUserContext } from "../../../context/ContextUser";
import KeyboardBackspaceOutlinedIcon from "@material-ui/icons/KeyboardBackspaceOutlined";
import {
  BtnSubmitStyled,
  ContainerMainStyled,
  FormStyled,
  PaperContainer,
  TextFieldStyled,
} from "./style";

const ViewCurrentRenter = () => {
  const { id } = useParams();
  const [currentRenter, setRenter] = useState({});
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

  const history = useHistory();
  const { credentials } = useUserContext();

  useEffect(() => {
    (async () => {
      const renterSelected = await credentials.find(
        (renter) => renter.id.toString() === id.toString()
      );
      renterSelected && setRenter(renterSelected);
      setForm({
        name: currentRenter.name,
        numAp: currentRenter.numAp,
        lastName: currentRenter.lastName,
        floor: currentRenter.floor,
        email: currentRenter.email,
        phone: currentRenter.phone,
        cpf: currentRenter.cpf,
      });
      setTimeout(() => setIsLoading(false), 1900);
    })();
  }, [
    credentials,
    currentRenter.cpf,
    currentRenter.email,
    currentRenter.floor,
    currentRenter.lastName,
    currentRenter.name,
    currentRenter.numAp,
    currentRenter.phone,
    id,
  ]);

  return (
    <ContainerMainStyled component="main" maxWidth="md">
      <CssBaseline />
      <ContainerBtnStyled>
        <BtnSubmitStyled
          variant="contained"
          color="primary"
          onClick={() => history.push("/admin/condominos")}
        >
          <KeyboardBackspaceOutlinedIcon />
        </BtnSubmitStyled>
      </ContainerBtnStyled>
      <PaperContainer>
        <Typography component="h1" variant="h5">
          Condômino
        </Typography>

        {isLoading ? (
          <Loading />
        ) : (
          <FormStyled>
            <TextFieldStyled
              value={form.name}
              disabled
              name="name"
              variant="outlined"
              margin="normal"
              fullWidth
              label="Nome"
            />

            <TextFieldStyled
              value={form.lastName}
              disabled
              name="lastName"
              variant="outlined"
              margin="normal"
              fullWidth
              label="Sobrenome"
            />
            <TextFieldStyled
              value={form.numAp}
              disabled
              name="numAp"
              variant="outlined"
              margin="normal"
              fullWidth
              label="Nº Ap."
            />
            <TextFieldStyled
              value={form.floor}
              disabled
              name="floor"
              variant="outlined"
              margin="normal"
              fullWidth
              label="Andar"
            />
            <TextFieldStyled
              value={form.email}
              disabled
              name="email"
              variant="outlined"
              margin="normal"
              fullWidth
              label="Email"
            />

            <TextFieldStyled
              value={form.phone}
              disabled
              name="phone"
              variant="outlined"
              margin="normal"
              fullWidth
              label="Telefone"
            />

            <TextFieldStyled
              value={form.cpf}
              disabled
              name="cpf"
              variant="outlined"
              margin="normal"
              fullWidth
              label="Cpf"
            />
          </FormStyled>
        )}
      </PaperContainer>
    </ContainerMainStyled>
  );
};

export default ViewCurrentRenter;
