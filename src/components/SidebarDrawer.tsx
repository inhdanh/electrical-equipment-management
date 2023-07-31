import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { useRouter } from "next/navigation";
import PersonIcon from "@mui/icons-material/Person";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function SidebarDrawer(props: Props) {
  const router = useRouter();

  return (
    <Drawer anchor="left" open={props.isOpen} onClose={props.onClose}>
      <Box>
        <Toolbar />
        <Divider />
        <List>
          <ListItem
            disablePadding
            onClick={() => {
              router.push("/");
              props.onClose();
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <DynamicFormIcon />
              </ListItemIcon>
              <ListItemText primary="Equipments" />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            onClick={() => {
              router.push("/vendors");
              props.onClose();
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Vendors" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
