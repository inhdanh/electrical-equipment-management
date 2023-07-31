"use client";

import { getMyOrderList, getOrderItemList } from "@/api";
import {
  Avatar,
  Box,
  Container,
  Dialog,
  DialogTitle,
  IconButton,
  Link,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [selectedOrder, setSelectedOrder] = useState<OrderDetail | null>(null);
  const router = useRouter();

  const query = useQuery({
    queryKey: ["myOrders"],
    queryFn: async () => await getMyOrderList(),
  });

  const queryItems = useQuery({
    queryKey: ["orderItemsDetail", selectedOrder?.id],
    // queryFn: async ({ queryKey }) =>
    //   await getOrderItemList({ orderId: queryKey[1] }),
    queryFn: async ({ queryKey }) => await getOrderItemList(),
    enabled: !!selectedOrder?.id,
  });

  return (
    <Container sx={{ mt: 3 }}>
      <Typography sx={{ textAlign: "center" }} variant="h5">
        Order list
      </Typography>
      <TableContainer sx={{ mt: 3 }} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {query.data?.data.map((orderDetail: OrderDetail, index: number) => (
              <TableRow key={orderDetail.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Link
                    component="button"
                    onClick={() => setSelectedOrder(orderDetail)}
                  >
                    {orderDetail.code}
                  </Link>
                </TableCell>
                <TableCell>{orderDetail.address}</TableCell>
                <TableCell>{orderDetail.totalPrice}</TableCell>
                <TableCell>{orderDetail.status}</TableCell>
                <TableCell>
                  {moment(orderDetail.createdAt).format("YYYY-MM-DD hh:mm")}
                </TableCell>
                <TableCell>
                  {moment(orderDetail.updatedAt).format("YYYY-MM-DD hh:mm")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={!!selectedOrder} onClose={() => setSelectedOrder(null)}>
        <DialogTitle>
          Order {selectedOrder?.code}
          <IconButton
            sx={{ position: "absolute", top: 0, right: 0 }}
            onClick={() => setSelectedOrder(null)}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Container sx={{ px: 10, py: 5 }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Equipment</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Unit Cost</TableCell>
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {queryItems.data?.data.map(
                  (orderItem: OrderItem, index: number) => (
                    <TableRow key={orderItem.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 3 }}
                        >
                          <Avatar
                            alt={orderItem.equipment.name}
                            src={orderItem.equipment.image}
                            variant="rounded"
                          />
                          <Link
                            component="button"
                            onClick={() =>
                              router.push(
                                `/equipments/${orderItem.equipment.id}`
                              )
                            }
                          >
                            <Typography>{orderItem.equipment.name}</Typography>
                          </Link>
                        </Box>
                      </TableCell>
                      <TableCell align="center">{orderItem.quantity}</TableCell>
                      <TableCell align="center">
                        {orderItem.equipment.price}$
                      </TableCell>
                      <TableCell align="center">
                        {orderItem.quantity * orderItem.equipment.price}$
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Dialog>
    </Container>
  );
}
