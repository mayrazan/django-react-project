import { Button, Container, TextField } from "@material-ui/core";
import { withTheme } from "@material-ui/core/styles";
import styled from "styled-components";
import { colors } from "../../../../styles/colors";

export const PaperContainer = withTheme(styled.div`
  && {
    ${(props) => props.theme.breakpoints.down("sm")} {
      margin-top: 0;
    }
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${colors.white};
  }
`);

export const FormStyled = styled.form`
  width: 100%;
  padding-top: 0.5rem;
`;

export const BtnSubmitStyled = withTheme(styled(Button)`
  && {
    margin: ${(props) => props.theme.spacing(3, "auto", 2)};
    display: flex;
    width: 50%;

    @media (max-height: 946px) {
      margin: auto;
    }
  }
`);

export const ContainerStyled = styled(Container)`
  && {
    background-color: #4e6d9c;
    border-radius: 5px;
  }
`;

export const TextFieldStyled = styled(TextField)`
  && {
    @media (max-height: 946px) {
      padding-bottom: 0.5rem;
      margin-bottom: 0;
    }

    & .MuiFormLabel-root {
      color: white !important;
    }
    & .MuiInputBase-root {
      color: white !important;
    }
    & .MuiOutlinedInput-notchedOutline {
      border-color: white !important;
    }
    & .MuiOutlinedInput-notchedOutline,
    & :hover {
      border-color: white !important;
    }
  }
`;

export const ContainerLoginStyled = styled.div`
  width: 100%;
  height: 100%;
  background-color: #4c6387;
  color: ${colors.white};
  padding-top: 2rem;
  @media (max-height: 415px) {
    height: auto;
  }
`;
