import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useCartContext } from "@/contexts/cart";
import { ChangeEvent, useState } from "react";
import { useUserContext } from "@/contexts/user";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder } from "@/api";

export default function CartDrawer() {
  const { carts, setCarts, openDrawer, setOpenDrawer } = useCartContext();
  const router = useRouter();
  const { user } = useUserContext();
  const [openAlert, setOpenAlert] = useState(false);

  const mutation = useMutation({
    mutationFn: (newOrder: any) => createOrder(newOrder),
    onSuccess: (data) => {
      setOpenDrawer(false);
      setOpenAlert(true);
      router.push("/orders");
    },
  });

  const handleChangeQuantity = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    cart: Cart
  ) => {
    setCarts((prevCarts) => {
      const clonedCarts = [...prevCarts];
      const cartIdx = carts.findIndex((c) => c.id === cart.id);
      const inputQuantity = +event.target.value;

      if (inputQuantity === 0) {
        clonedCarts.splice(cartIdx, 1);
      } else {
        clonedCarts[cartIdx] = {
          ...clonedCarts[cartIdx],
          quantity: inputQuantity,
        };
      }

      return clonedCarts;
    });
  };

  const getTotalAmount = () => {
    return carts.reduce((total, current) => {
      return total + current.quantity * current.price;
    }, 0);
  };

  const checkout = () => {
    if (!user) {
      router.push("/login");
      setOpenDrawer(false);
      return;
    }

    const payload = {
      userId: user?.id,
      address: user.address,
      status: "pending",
      totalPrice: carts
        .reduce((total, current) => {
          return (total += current.quantity * current.price);
        }, 0)
        .toString(),
      orderItems: carts.map((cart) => ({
        equipmentId: cart.id,
        quantity: cart.quantity,
      })),
    };

    mutation.mutate(payload);
  };

  return (
    <Drawer
      anchor="right"
      open={openDrawer}
      onClose={() => setOpenDrawer(false)}
    >
      {carts.length > 0 ? (
        <Box sx={{ p: 2, width: 550 }}>
          <Typography sx={{ textAlign: "center", my: 5 }} variant="h5">
            Cart
          </Typography>
          <Divider />
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Equipment</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Unit Cost</TableCell>
                  <TableCell>Total Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {carts.map((cart) => (
                  <TableRow key={cart.id}>
                    <TableCell align="center">
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 3 }}
                      >
                        <Avatar
                          alt={cart.name}
                          src={cart.image}
                          variant="rounded"
                        />
                        <Typography>{cart.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        type="number"
                        value={cart.quantity}
                        onChange={(event) => handleChangeQuantity(event, cart)}
                        sx={{ width: "75px" }}
                      />
                    </TableCell>
                    <TableCell>{cart.price}</TableCell>
                    <TableCell align="center">
                      {cart.price * cart.quantity}$
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={4}>
                    <Typography sx={{ textAlign: "end", fontWeight: "bold" }}>
                      Total: {getTotalAmount()}$
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Button
            sx={{ mt: 3 }}
            fullWidth
            variant="contained"
            onClick={checkout}
          >
            Check out
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            p: 2,
            width: 550,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5">Empty cart</Typography>
          <Button variant="contained" onClick={() => setOpenDrawer(false)}>
            Continue to shopping
          </Button>
        </Box>
      )}
      <Snackbar
        open={openAlert}
        autoHideDuration={5000}
        onClose={() => setOpenAlert(false)}
        message="Create order success!"
      />
    </Drawer>
  );
}
