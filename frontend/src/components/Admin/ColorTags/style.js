import { Button, Container, TextField } from "@material-ui/core";
import styled from "styled-components";
import { colors } from "../../../styles/colors";

export const PaperContainer = styled.div`
  @media (max-width: 959.95px) {
    margin-top: 0;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colors.white};
`;

export const FormContainer = styled.form`
  width: 100%;
  padding-top: 1rem;
`;

export const BtnSubmitContainer = styled(Button)`
  && {
    margin: 3rem auto 2rem;
    display: flex;
    @media (max-height: 946px) {
      margin: auto;
    }
  }
`;

export const MainContainer = styled(Container)`
  background-color: ${colors.white};
  border-radius: 5px;
`;

export const TextFieldStyled = styled(TextField)`
  @media (max-height: 946px) {
    padding-bottom: 0.5rem !important;
    margin-bottom: 0 !important;
  }
`;
