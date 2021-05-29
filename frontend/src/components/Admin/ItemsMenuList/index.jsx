import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { NavLink } from "react-router-dom";
import { menuListInfo } from "../../../mocks/menuList";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles(() => ({
  iconColor: {
    color: "white",
  },
  link: {
    textDecoration: "none",
    color: "white",
  },
  root: {
    "&.MuiListItem-root.Mui-selected, .MuiListItem-root.Mui-selected:hover": {
      backgroundColor: "rgb(248 255 238 / 8%)",
    },
  },
}));

function ItemsMenuList() {
  const classes = useStyles();
  const location = useLocation();

  return (
    <List>
      {menuListInfo.map((el) => {
        return (
          <ListItem
            button
            key={el.id}
            selected={el.link === location.pathname}
            className={classes.root}
          >
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

export default ItemsMenuList;
