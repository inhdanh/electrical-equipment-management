"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Avatar, Badge, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import SidebarDrawer from "./SidebarDrawer";
import CartDrawer from "./CartDrawer";

export default function PrimaryAppBar() {
  const [isOpenSidebar, setIsOpenSidebar] = React.useState(false);
  const [isOpenCart, setIsOpenCart] = React.useState(false);
  const router = useRouter();

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="sticky">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setIsOpenSidebar(true)}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              onClick={() => router.push("/")}
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, cursor: "pointer" }}
            >
              Electrical Equipment Management System
            </Typography>

            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => router.push("/orders")}
            >
              <ShoppingBagIcon />
            </IconButton>

            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setIsOpenCart(true)}
            >
              <Badge badgeContent={4} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => {}}
            >
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <Avatar>U</Avatar>

            <Button color="inherit" onClick={() => router.push("/login")}>
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <SidebarDrawer
        isOpen={isOpenSidebar}
        onClose={() => setIsOpenSidebar(false)}
      />
      <CartDrawer isOpen={isOpenCart} onClose={() => setIsOpenCart(false)} />
    </>
  );
}
