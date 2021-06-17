import { Button, Container, Typography } from "@material-ui/core";
import { withTheme } from "@material-ui/core/styles";
import styled from "styled-components";

export const PaperContainer = withTheme(styled.div`
  && {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 50%;
    position: relative;
    padding: ${(props) => props.theme.spacing(6, 0, 0, 0)};

    @media (max-width: 445px) {
      width: 100%;
    }
    @media (max-width: 350px) {
      padding: ${(props) => props.theme.spacing(1, 0, 0, 0)};
    }
  }
`);

export const BtnStyled = styled(Button)`
  && {
    background-color: #435a7e;
    border: 1px solid white;
    padding: 0.5rem 3.5rem;
    flex-grow: 1;

    &:first-child {
      margin-right: 10px;

      @media (max-width: 771px) {
        margin-right: 0;
      }
      @media (max-width: 565px) {
        margin-bottom: 1rem;
      }
      @media (max-width: 320px) {
        margin-bottom: 0;
      }
    }
    &:last-child {
      margin-left: 10px;
      @media (max-width: 880px) {
        margin-left: 0;
      }
      @media (max-width: 740px) {
        margin-top: 1rem;
      }
    }
    color: white;
    text-transform: none;
    font-size: 16px;
    font-weight: normal;
    @media (max-width: 445px) {
      font-size: 12px;
    }
  }
`;

export const ContainerStyled = styled(Container)`
  && {
    height: 100%;
    color: white;
    width: 100%;

    &.MuiContainer-maxWidthLg {
      @media (min-width: 1280px) {
        max-width: inherit;
      }
    }
    @media (max-width: 386px) {
      padding: 0;
    }
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`;

export const TypographyTitleStyled = styled(Typography)`
  && {
    font-weight: 500;
    @media (max-width: 350px) {
      font-size: 1.2rem;
      text-align: center;
    }
  }
`;

export const ContainerBtnStyled = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  flex-wrap: inherit;
  padding-top: 2rem;
  @media (max-width: 445px) {
    flex-direction: column;
  }
  @media (max-width: 320px) {
    padding-top: 1rem;
  }
`;

export const VideoStyled = styled.video`
  position: absolute;
  height: 95%;
  width: inherit;
`;

export const LoginContainerStyled = styled.div`
  width: 100%;
  height: 100%;
  background-color: #4c6387;
`;

export const TypographyTextStyled = styled(Typography)`
  && {
    position: relative;
    @media (max-width: 450px) {
      font-size: 1.5rem;
    }
    @media (max-width: 310px) {
      font-size: 1.3rem;
      text-align: center;
    }
  }
`;
