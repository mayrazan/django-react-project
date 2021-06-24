import List from "@material-ui/core/List";
import { NavLink, useHistory } from "react-router-dom";
import { menuListInfo } from "../../../mocks/menuList";
import { useLocation } from "react-router-dom";
import { IconColorStyled, ListItemStyled } from "./style";

function ItemsMenuList() {
  const location = useLocation();
  const history = useHistory();

  return (
    <List>
      {menuListInfo.map((el) => {
        return (
          <ListItemStyled
            button
            key={el.id}
            selected={el.link === location.pathname}
            onClick={() => history.push(el.link)}
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
