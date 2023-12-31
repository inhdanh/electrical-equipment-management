"use client";

import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import HomeIcon from "@mui/icons-material/Home";
import { Badge, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import SidebarDrawer from "./SidebarDrawer";
import CartDrawer from "./CartDrawer";
import { useCartContext } from "@/contexts/cart";
import UserMenu from "./UserMenu";
import { useUserContext } from "@/contexts/user";
import { useQuery } from "@tanstack/react-query";
import { getMyOrderList } from "@/api";

export default function PrimaryAppBar() {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const { carts, setOpenDrawer } = useCartContext();
  const { user } = useUserContext();
  const [cartsQuantity, setCartsQuantity] = useState(0);
  const router = useRouter();

  const query = useQuery({
    queryKey: ["myOrders", user?.id],
    queryFn: async ({ queryKey }) =>
      await getMyOrderList(queryKey[1] as string),
    enabled: !!user?.id,
  });

  useEffect(() => {
    const quantity = carts.reduce((total, current) => {
      return total + current.quantity;
    }, 0);

    setCartsQuantity(quantity);
  }, [carts]);

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

            <IconButton
              sx={{ color: "white" }}
              onClick={() => router.push("/")}
            >
              <HomeIcon />
            </IconButton>

            <Typography
              component="div"
              sx={{
                flexGrow: 1,
              }}
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
              title="Orders"
            >
              <Badge badgeContent={query.data?.data.length} color="secondary">
                <ShoppingBagIcon />
              </Badge>
            </IconButton>

            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setOpenDrawer(true)}
              title="Carts"
            >
              <Badge badgeContent={cartsQuantity} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {/* <IconButton
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
            </IconButton> */}

            {user ? (
              <UserMenu />
            ) : (
              <Button color="inherit" onClick={() => router.push("/login")}>
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <SidebarDrawer
        isOpen={isOpenSidebar}
        onClose={() => setIsOpenSidebar(false)}
      />
      <CartDrawer />
    </>
  );
}
