import {
  ContainerWelcomeStyled,
  ContainerDisplayStyled,
  ContainerHomeStyled,
  ButtonBaseStyled,
  GridContainerStyled,
  GridItemStyled,
  PaperContainer,
  TypographyStyled,
} from "./style";
import Typography from "@material-ui/core/Typography";
import EqualizerOutlinedIcon from "@material-ui/icons/EqualizerOutlined";
import React from "react";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router";
import { useUserContext } from "../../../context/ContextUser";

const MainHome = () => {
  const history = useHistory();
  const currentUser = JSON.parse(localStorage.getItem("userLogged"));
  const userName = currentUser.map((el) => el.name);
  const { credentials } = useUserContext();
  const countAdmin = credentials.filter((el) => el.isAdmin).length;
  const countUser = credentials.filter((el) => el.isUser).length;

  const redirectTo = (location) => {
    history.push(`/admin/${location}/`);
  };

  return (
    <ContainerHomeStyled>
      <ContainerWelcomeStyled>
        <TypographyStyled variant="h4">
          Seja bem-vindo(a) {userName}!
        </TypographyStyled>
      </ContainerWelcomeStyled>
      <ContainerDisplayStyled>
        <PaperContainer>
          <GridContainerStyled container spacing={2}>
            <GridItemStyled item>
              <ButtonBaseStyled onClick={() => redirectTo("condominos")}>
                <EqualizerOutlinedIcon className="imgIcon" />
              </ButtonBaseStyled>
            </GridItemStyled>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1">
                    {countUser}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Condôminos
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </GridContainerStyled>
        </PaperContainer>

        <PaperContainer>
          <GridContainerStyled container spacing={2}>
            <GridItemStyled item>
              <ButtonBaseStyled onClick={() => redirectTo("sindicos")}>
                <EqualizerOutlinedIcon className="imgIcon" />
              </ButtonBaseStyled>
            </GridItemStyled>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1">
                    {countAdmin}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Síndicos
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </GridContainerStyled>
        </PaperContainer>
      </ContainerDisplayStyled>
    </ContainerHomeStyled>
  );
};

export default MainHome;
