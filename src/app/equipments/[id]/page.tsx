"use client";

import { getEquipmentById } from "@/api";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { useCartContext } from "@/contexts/cart";
import Link from "next/link";

interface Props {
  params: { id: string };
}
export default function EquipmentDetail(props: Props) {
  const [amount, setAmount] = useState<number | "">("");
  const { carts, setCarts, setOpenDrawer } = useCartContext();

  const query = useQuery({
    queryKey: ["equipments", props.params.id],
    queryFn: async ({ queryKey }) => await getEquipmentById(queryKey[1]),
    enabled: !!props.params.id,
  });

  const equipment = query.data?.data as Equipment | undefined;

  const handleChangeAmount = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value ? +event.target.value : "";
    setAmount(value);
  };

  const addToCarts = () => {
    if (amount && amount > 0 && equipment) {
      if (!carts.find((cart) => cart.id === equipment.id)) {
        const cart: Cart = { ...equipment, quantity: amount };

        setCarts((carts: Cart[]) => [...carts, cart]);
      } else {
        const newCarts = carts.map((cart) => {
          if (cart.id === equipment.id) {
            return { ...cart, quantity: cart.quantity + amount };
          }
          return cart;
        });

        setCarts(newCarts);
      }

      setOpenDrawer(true);
    } else {
      alert("Invalid amount or equipment not found!");
    }
  };

  return (
    <Container sx={{ mt: 15 }}>
      {equipment && (
        <Box sx={{ display: "flex" }}>
          <Card sx={{ flex: 1 }}>
            <CardMedia
              component="img"
              image={equipment.image}
              alt={equipment.name}
              height="100%"
              sx={{ objectFit: "contain" }}
            />
          </Card>
          <Box sx={{ flex: 2, py: 2, px: 5 }}>
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              {equipment.name}
            </Typography>

            <TableContainer sx={{ mt: 5 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Vendor</TableCell>
                    <TableCell>In stock</TableCell>
                    <TableCell>Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      {
                        <Link href={`/vendors/${equipment.vendorId}`}>
                          {equipment.vendor.name}
                        </Link>
                      }
                    </TableCell>
                    <TableCell>{equipment.countInStock}</TableCell>
                    <TableCell>{equipment.price}$</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Typography sx={{ mt: 3 }} component="div" variant="body2">
              {equipment.description}
            </Typography>

            {
              <Typography sx={{ mt: 5 }} variant="h5" color="text.secondary">
                Total:{" "}
                {amount && amount > 0 ? `${amount * equipment.price}$` : 0}
              </Typography>
            }

            <Box sx={{ display: "flex", gap: 1, alignItems: "stretch", mt: 5 }}>
              <TextField
                label="Amount"
                sx={{ width: 100 }}
                type="number"
                size="small"
                value={amount}
                onChange={handleChangeAmount}
              />
              <Button
                variant="contained"
                title="Add to carts"
                disabled={!amount || amount <= 0}
                onClick={addToCarts}
              >
                <AddShoppingCartIcon sx={{ mr: 1 }} /> Add to carts
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Container>
  );
}
