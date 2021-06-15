import { ButtonBase, Grid, Paper, Typography } from "@material-ui/core";
import { withTheme } from "@material-ui/core/styles";
import styled from "styled-components";
import { colors } from "../../../styles/colors";
import { device } from "../../../styles/medias";

export const ContainerHomeStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

export const ContainerWelcomeStyled = styled.div`
  width: 100%;
  height: 25%;
  background-color: ${colors.white};
  display: flex;
  align-items: center;
`;

export const ContainerUsersStyled = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${colors.white};
  display: flex;
  align-items: center;
  margin-right: 1.9rem;
`;

export const ContainerDisplayStyled = styled.div`
  // height: 20%;
  // width: 50%;
  display: flex;
  padding-top: 2.5rem;
  box-sizing: border-box;
  justify-content: space-between;

  @media ${device.maxXs} {
    width: 100%;
  }

  @media ${device.maxSm} {
    flex-direction: column;
  }
`;

export const TypographyStyled = styled(Typography)`
  && {
    margin-left: 2rem;
  }
`;

export const PaperContainer = withTheme(styled(Paper)`
  && {
    width: 48%;
    ${(props) => props.theme.breakpoints.between(0, 767)} {
      width: 100%;
    }
  }
`);

export const ButtonBaseStyled = styled(ButtonBase)`
  && {
    color: white;
    max-width: 128px;

    .imgIcon {
      width: 100%;
      height: 100%;
    }
  }
`;

export const GridContainerStyled = styled(Grid)`
  && {
    margin: 0;
    flex-wrap: nowrap;
  }
`;

export const GridItemStyled = styled(Grid)`
  && {
    background-color: #3d4b8a;
    width: 80%;
    max-width: fit-content;
  }
`;
