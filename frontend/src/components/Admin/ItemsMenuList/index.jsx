import List from "@material-ui/core/List";
import { NavLink } from "react-router-dom";
import { menuListInfo } from "../../../mocks/menuList";
import { useLocation } from "react-router-dom";
import { IconColorStyled, ListItemStyled } from "./style";

function ItemsMenuList() {
  const location = useLocation();

  return (
    <List>
      {menuListInfo.map((el) => {
        return (
          <ListItemStyled
            button
            key={el.id}
            selected={el.link === location.pathname}
          >
            <IconColorStyled>{el.icon}</IconColorStyled>

            <NavLink to={el.link} className="linkMenu">
              {el.name}
            </NavLink>
          </ListItemStyled>
        );
      })}
    </List>
  );
}

export default ItemsMenuList;
