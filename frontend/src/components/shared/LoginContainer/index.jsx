import CssBaseline from "@material-ui/core/CssBaseline";
import { useHistory } from "react-router-dom";
import video from "../../../assets/videos/backgroundLogin.mp4";
import {
  BtnStyled,
  ContainerBtnStyled,
  ContainerStyled,
  LoginContainerStyled,
  PaperContainer,
  TypographyTextStyled,
  TypographyTitleStyled,
  VideoStyled,
} from "./style";

const LoginContainer = () => {
  const history = useHistory();

  return (
    <LoginContainerStyled>
      <ContainerStyled component="main">
        <CssBaseline />
        <VideoStyled autoPlay loop muted>
          <source src={video} type="video/mp4" />
        </VideoStyled>
        <TypographyTextStyled component="h2" variant="h4" align="center">
          Condomínio Quintas das Flores
        </TypographyTextStyled>

        <PaperContainer>
          <div>
            <TypographyTitleStyled component="h3" variant="h5">
              Login
            </TypographyTitleStyled>
          </div>

          <ContainerBtnStyled>
            <BtnStyled
              variant="outlined"
              onClick={() => history.push("/login")}
            >
              Login
            </BtnStyled>

            <BtnStyled
              variant="outlined"
              onClick={() => history.push("/cadastro")}
            >
              Registre-se
            </BtnStyled>
          </ContainerBtnStyled>
        </PaperContainer>
      </ContainerStyled>
    </LoginContainerStyled>
  );
};

export default LoginContainer;
