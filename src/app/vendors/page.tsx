"use client";

import { getVendorList } from "@/api";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function VendorPage() {
  const query = useQuery({
    queryKey: ["vendors"],
    queryFn: async () => await getVendorList(),
  });

  return (
    <Container sx={{ mt: 5 }}>
      <Typography sx={{ textAlign: "center" }} variant="h5">
        Vendors
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {query.data?.data.map((vendor: Vendor, index: number) => (
              <TableRow key={vendor.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Link href={`/vendors/${vendor.id}`}>{vendor.name}</Link>
                </TableCell>
                <TableCell>{vendor.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
