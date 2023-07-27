import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Paper,
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
import { ChangeEvent } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer(props: Props) {
  const { carts, setCarts } = useCartContext();

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

  return (
    <Drawer anchor="right" open={props.isOpen} onClose={props.onClose}>
      {carts.length > 0 ? (
        <Box sx={{ p: 2, width: 400 }}>
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
                    <TableCell align="center">
                      {cart.price * cart.quantity}$
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={3}>
                    <Typography sx={{ textAlign: "end", fontWeight: "bold" }}>
                      Total: {getTotalAmount()}$
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Button sx={{ mt: 3 }} fullWidth variant="contained">
            Check out
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            p: 2,
            width: 400,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5">Empty cart</Typography>
          <Button variant="contained" onClick={props.onClose}>
            Continue to shopping
          </Button>
        </Box>
      )}
    </Drawer>
  );
}
