import { withTheme } from "@material-ui/core/styles";
import styled from "styled-components";

export const ContainerStyled = withTheme(styled.div`
  && {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: inherit;
    & > * + * {
      margin-left: ${(props) => props.theme.spacing(2)};
    }
  }
`);
