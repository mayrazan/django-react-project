import { Button, Container, TextField } from "@material-ui/core";
import { withTheme } from "@material-ui/core/styles";
import styled from "styled-components";
import { colors } from "../../../styles/colors";

export const PaperContainer = withTheme(styled.div`
  && {
    ${(props) => props.theme.breakpoints.down("sm")} {
      margin-top: 0;
    }
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${colors.white};
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

    @media (max-height: 946px) {
      margin: auto;
    }
  }
`);

export const ContainerMainStyled = styled(Container)`
  && {
    background-color: ${colors.white};
    border-radius: 5px;
  }
`;

export const TextFieldStyled = styled(TextField)`
  && {
    @media (max-height: 946px) {
      padding-bottom: 0.5rem;
      margin-bottom: 0;
    }
  }
`;

export const DateFieldStyled = withTheme(styled(TextField)`
  && {
    margin: ${(props) => props.theme.spacing(1, 0, 0, 0)};
    @media (max-height: 946px) {
      padding-bottom: 0.5rem;
      margin-bottom: 0;
    }
  }
`);

export const ContainerInfoStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
