import {
  ContainerWelcomeStyled,
  ContainerHomeStyled,
} from "../../shared/StyleComponents/style";

import { TypographyStyled } from "./style";

const MainHome = () => {
  const currentUser = JSON.parse(localStorage.getItem("userLogged"));
  const userName = currentUser.map((el) => el.name);

  return (
    <ContainerHomeStyled>
      <ContainerWelcomeStyled>
        <TypographyStyled variant="h4">
          Seja bem-vindo(a) {userName}!
        </TypographyStyled>
      </ContainerWelcomeStyled>
    </ContainerHomeStyled>
  );
};

export default MainHome;
