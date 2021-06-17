import List from "@material-ui/core/List";
import { NavLink } from "react-router-dom";
import { menuListInfoUser } from "../../../mocks/menuList";
import { useLocation } from "react-router-dom";
import { IconColorStyled, ListItemStyled } from "./style";

function MenuItems() {
  const location = useLocation();

  return (
    <List>
      {menuListInfoUser.map((el) => {
        return (
          <ListItemStyled
            button
            key={el.id}
            selected={el.link === location.pathname}
          >
            <IconColorStyled>{el.icon}</IconColorStyled>

            <NavLink to={el.link} className="link-menu">
              {el.name}
            </NavLink>
          </ListItemStyled>
        );
      })}
    </List>
  );
}

export default MenuItems;
