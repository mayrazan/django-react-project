import { ListItem, ListItemIcon } from "@material-ui/core";
import styled from "styled-components";

export const IconColorStyled = styled(ListItemIcon)`
  && {
    color: white;
  }
`;

export const ListItemStyled = styled(ListItem)`
  && {
    &.MuiListItem-root.Mui-selected,
    &:hover {
      background-color: rgb(248 255 238 / 8%);
    }

    .linkMenu {
      text-decoration: none;
      color: white;
    }
  }
`;
