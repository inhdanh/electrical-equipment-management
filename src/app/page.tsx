"use client";

import { getEquipmentList } from "@/api";
import { useCartContext } from "@/contexts/cart";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const query = useQuery({
    queryKey: ["equipments"],
    queryFn: async () => await getEquipmentList(),
  });

  const { carts, setCarts, setOpenDrawer } = useCartContext();

  const addToCarts = (equipment: Equipment) => {
    if (!carts.find((cart) => cart.id === equipment.id)) {
      const cart: Cart = { ...equipment, quantity: 1 };

      setCarts((carts: Cart[]) => [...carts, cart]);
    } else {
      const newCarts = carts.map((cart) => {
        if (cart.id === equipment.id) {
          return { ...cart, quantity: cart.quantity + 1 };
        }
        return cart;
      });

      setCarts(newCarts);
    }

    setOpenDrawer(true);
  };

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
                  <Card>
                    <CardActionArea
                      onClick={() => router.push(`/equipments/${equipment.id}`)}
                    >
                      <CardMedia
                        component="img"
                        height="200"
                        image={equipment.image}
                        alt={equipment.name}
                        sx={{ objectFit: "contain" }}
                      />
                      <CardContent>
                        <Tooltip title={equipment.name} enterDelay={700}>
                          <Typography
                            component="div"
                            variant="h6"
                            gutterBottom
                            noWrap
                            sx={{ textAlign: "center" }}
                          >
                            {equipment.name}
                          </Typography>
                        </Tooltip>
                        <Typography
                          color="text.secondary"
                          sx={{ textAlign: "center" }}
                        >
                          {equipment.price} $
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={() => addToCarts(equipment)}
                      >
                        <AddShoppingCartIcon sx={{ mr: 1 }} />
                        Add to carts
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
        </Grid>
      </Box>
    </Container>
  );
}
