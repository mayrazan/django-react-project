import { Drawer, IconButton } from "@material-ui/core";
import { withTheme } from "@material-ui/core/styles";
import styled from "styled-components";
import { colors } from "../../../styles/colors";

export const DrawerStyled = styled(Drawer)`
  && {
    width: 240px;
    flex-shrink: 0;

    .drawerPaper {
      width: 240px;
      background-color: ${colors.menu};
      color: ${colors.white};
    }
  }
`;

export const DrawerHeaderStyled = withTheme(styled.div`
  && {
    display: flex;
    align-items: center;
    padding: ${(props) => props.theme.spacing(0, 1)};
    ${(props) => ({ ...props.theme.mixins.toolbar })};
    justify-content: flex-end;
  }
`);

export const IconButtonBackStyled = styled(IconButton)`
  && {
    color: ${colors.white};
  }
`;
