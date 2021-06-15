import { useHistory } from "react-router";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { useEffect, useState } from "react";
import { getColorsPriority, updateColors } from "../../../services/infoApi";
import { ContainerBtnStyled } from "../../shared/StyleComponents/style";
import { successMessage } from "../../../utils/messages";
import Loading from "../../shared/Loading";
import KeyboardBackspaceOutlinedIcon from "@material-ui/icons/KeyboardBackspaceOutlined";
import {
  BtnSubmitContainer,
  FormContainer,
  MainContainer,
  PaperContainer,
  TextFieldStyled,
} from "./style";

const ColorTags = () => {
  const history = useHistory();

  const [isMessageSuccess, setMessageSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [colors, setColors] = useState({
    low: "",
    medium: "",
    high: "",
  });

  useEffect(() => {
    const load = async () => {
      const response = await getColorsPriority();
      setColors({
        low: response.lowPriority,
        medium: response.mediumPriority,
        high: response.highPriority,
      });
      setTimeout(() => setIsLoading(false), 700);
    };
    load();
  }, []);

  const saveChanges = (event) => {
    event.preventDefault();
    (async () => {
      setIsLoading(true);
      await updateColors(1, {
        highPriority: colors.high,
        mediumPriority: colors.medium,
        lowPriority: colors.low,
      });
      setMessageSuccess(true);
      setTimeout(() => setIsLoading(false), 700);
    })();
  };

  return (
    <MainContainer component="main" maxWidth="md">
      <CssBaseline />
      <ContainerBtnStyled>
        <BtnSubmitContainer
          variant="contained"
          color="primary"
          onClick={() => history.push("/admin")}
        >
          <KeyboardBackspaceOutlinedIcon />
        </BtnSubmitContainer>
      </ContainerBtnStyled>
      <PaperContainer>
        <Typography component="h1" variant="h5">
          Selecione uma cor para identificar cada prioridade
        </Typography>
        {isLoading ? (
          <Loading />
        ) : (
          <FormContainer>
            <TextFieldStyled
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="high"
              label="Prioridade Alta"
              defaultValue="Prioridade Alta"
              autoComplete="off"
              disabled
            />
            <input
              type="color"
              value={colors.high}
              onChange={(event) =>
                setColors({ ...colors, high: event.target.value })
              }
              style={{ width: "50%" }}
            />

            <TextFieldStyled
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="medium"
              label="Prioridade Media"
              defaultValue="Prioridade Media"
              autoComplete="off"
              disabled
            />

            <input
              type="color"
              value={colors.medium}
              onChange={(event) =>
                setColors({ ...colors, medium: event.target.value })
              }
              style={{ width: "50%" }}
            />

            <TextFieldStyled
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="low"
              label="Prioridade Baixa"
              defaultValue="Prioridade Baixa"
              autoComplete="off"
              disabled
            />

            <input
              type="color"
              value={colors.low}
              onChange={(event) =>
                setColors({ ...colors, low: event.target.value })
              }
              style={{ width: "50%" }}
            />
            <BtnSubmitContainer
              type="submit"
              variant="contained"
              color="primary"
              onClick={saveChanges}
            >
              Salvar
            </BtnSubmitContainer>
          </FormContainer>
        )}
      </PaperContainer>
      {isMessageSuccess && successMessage()}
    </MainContainer>
  );
};

export default ColorTags;
