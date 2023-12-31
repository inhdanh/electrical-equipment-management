"use client";

import { getEquipmentList } from "@/api";
import EquipmentCard from "@/components/EquipmentCard";
import { useCartContext } from "@/contexts/cart";
import { Box, Container, Grid, Skeleton, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const query = useQuery({
    queryKey: ["equipments"],
    queryFn: async () => await getEquipmentList(),
  });

  return (
    <Container>
      <Box>
        <Typography
          color="text.primary"
          sx={{ my: 5, textAlign: "center" }}
          variant="h6"
        >
          Equipments
        </Typography>
        <Grid container spacing={4}>
          {query.isLoading
            ? Array.from(new Array(4)).map((_item, index) => (
                <Grid key={index} item xs={3}>
                  <Skeleton variant="rectangular" width={264} height={347} />
                </Grid>
              ))
            : query.data?.data.map((equipment: Equipment) => (
                <Grid key={equipment.id} item xs={3}>
                  <EquipmentCard equipment={equipment} />
                </Grid>
              ))}
        </Grid>
      </Box>
    </Container>
  );
}
