import { FormControl } from "@material-ui/core";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";

export const FormControlStyled = withTheme(styled(FormControl)`
  && {
    margin: ${(props) => props.theme.spacing(1, 2, 1, 2)};
    min-width: 200px;
  }
`);
