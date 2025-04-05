import Header from "../components/Header";
import OrderTable from "../components/OrderTable";
import { Box, Container } from "@mui/material";

const Orders = () => {
  return (
    <Box>
      <Header user="John Syleymanovich" />
      <Container sx={{ mt: 4 }}>
        <OrderTable />
      </Container>
    </Box>
  );
};

export default Orders;
