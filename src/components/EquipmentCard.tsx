import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Tooltip,
  Typography,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useRouter } from "next/navigation";
import { useCartContext } from "@/contexts/cart";

interface PropsType {
  equipment: Equipment;
}

export default function EquipmentCard({ equipment }: PropsType) {
  const router = useRouter();

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
          <Typography color="text.secondary" sx={{ textAlign: "center" }}>
            {equipment.price}$
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
  );
}
