import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

export const TypographyStyled = withTheme(styled(Typography)`
  && {
    margin: ${(props) => props.theme.spacing(0, 0, 0, 4)};
  }
`);
