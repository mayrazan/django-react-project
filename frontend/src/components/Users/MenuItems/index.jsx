import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { NavLink } from "react-router-dom";
import { menuListInfoUser } from "../../../mocks/menuList";

const useStyles = makeStyles(() => ({
  iconColor: {
    color: "white",
  },
  link: {
    textDecoration: "none",
    color: "white",
  },
}));

function MenuItems() {
  const classes = useStyles();

  return (
    <List>
      {menuListInfoUser.map((el) => {
        return (
          <ListItem button key={el.id}>
            <ListItemIcon className={classes.iconColor}>{el.icon}</ListItemIcon>

            <NavLink to={el.link} className={classes.link}>
              {el.name}
            </NavLink>
          </ListItem>
        );
      })}
    </List>
  );
}

export default MenuItems;
