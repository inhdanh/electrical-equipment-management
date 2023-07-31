"use client";

import { getEquipmentList, getVendorById } from "@/api";
import EquipmentCard from "@/components/EquipmentCard";
import { Container, Grid, Skeleton, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

interface Props {
  params: { id: string };
}
export default function VendorDetail(props: Props) {
  const { data } = useQuery({
    queryKey: ["vendors", props.params.id],
    queryFn: async ({ queryKey }) => await getVendorById(queryKey[1]),
    enabled: !!props.params.id,
  });
  const vendor = data?.data as Vendor | undefined;

  const query = useQuery({
    queryKey: ["equipments"],
    queryFn: async () => await getEquipmentList(),
  });

  return (
    vendor && (
      <Container sx={{ mt: 5 }}>
        <Typography variant="h5">{vendor.name}</Typography>
        <Typography sx={{ mt: 2 }}>{vendor.description}</Typography>
        <Typography variant="h6" sx={{ mt: 5 }}>
          Equipments
        </Typography>
        <Grid container spacing={4} sx={{ mt: 1 }}>
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
      </Container>
    )
  );
}
