import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";

export const AlertStyledContainer = withTheme(styled.div`
  && {
    width: 100%;
    & > * + * {
      margin: ${(props) => props.theme.spacing(2, 0, 0)};
    }
  }
`);
