import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import clsx from "clsx";
import { ContainerProfileStyled, TextStyled, TitleStyled } from "./style";
import { useUserContext } from "../../../context/ContextUser";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
    marginLeft: 0,
  },

  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: "none",
  },
}));

export default function Header({ handleDrawerOpen, open }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openEl = Boolean(anchorEl);
  const { handleLogout } = useUserContext();
  const history = useHistory();
  const currentUser = JSON.parse(localStorage.getItem("userLogged"));
  const userName = currentUser.map((el) => el.name + " " + el.lastName);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const rediretToLogin = () => {
    handleLogout();
    history.push("/login");
  };

  const rediretToProfile = () => {
    history.push("/meu-perfil");
  };

  return (
    <>
      <AppBar
        position="relative"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        color="transparent"
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            Condomínio Quinta
          </Typography>

          <IconButton
            color="default"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>

          <TitleStyled variant="h6"></TitleStyled>

          <ContainerProfileStyled>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <TextStyled variant="h6" noWrap>
              {userName.toString()}
            </TextStyled>

            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={openEl}
              onClose={handleClose}
            >
              <MenuItem onClick={rediretToProfile}>Minha Conta</MenuItem>
              <MenuItem onClick={rediretToLogin}>Sair</MenuItem>
            </Menu>
          </ContainerProfileStyled>
        </Toolbar>
      </AppBar>
    </>
  );
}
