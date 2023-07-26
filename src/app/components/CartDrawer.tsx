import {
  Box,
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
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer(props: Props) {
  return (
    <Drawer anchor="right" open={props.isOpen} onClose={props.onClose}>
      <Box sx={{ p: 2 }}>
        {/* <Toolbar /> */}
        <Typography sx={{ textAlign: "center", my: 5 }} variant="h6">
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
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">Transformers</TableCell>
                <TableCell align="center">
                  <TextField
                    size="small"
                    type="number"
                    sx={{ width: "75px" }}
                  />
                </TableCell>
                <TableCell align="center">15.0 $</TableCell>
                <TableCell align="center">
                  <IconButton>
                    <CloseIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Drawer>
  );
}
