import React, { useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Header from "../Header";
import ItemsMenuList from "../../Admin/ItemsMenuList";
import MenuItems from "../../Users/MenuItems";
import {
  DrawerHeaderStyled,
  DrawerStyled,
  IconButtonBackStyled,
} from "./style";

export default function MenuDrawer({ type }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CssBaseline />

      <Header handleDrawerOpen={handleDrawerOpen} open={open} />
      <DrawerStyled
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: "drawerPaper",
        }}
      >
        <DrawerHeaderStyled>
          <IconButtonBackStyled onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButtonBackStyled>
        </DrawerHeaderStyled>
        <Divider />
        {!type ? <ItemsMenuList /> : <MenuItems />}
      </DrawerStyled>
    </>
  );
}
