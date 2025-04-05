import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Container,
} from "@mui/material";
import { styled } from "@mui/material";
import Header from "./Header";
import PaymentModal from "./PaymentModal";

function App() {
  const [appState, setAppState] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalPaid, setTotalPaid] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState(null);

  useEffect(() => {
    const apiUrl = "https://f7a8c79a71aab280.mokky.dev/Tovary";
    axios.get(apiUrl).then((resp) => {
      const updatedData = resp.data.map((item) => ({
        ...item,
        price: Number(item.price),
      }));
      setAppState(updatedData);
    });
  }, []);

  const handleBuyClick = (price) => {
    setSelectedPrice(price);
    setIsModalOpen(true);
  };

  const handleCloseClick = () => {
    setIsModalOpen(false);
  };

  const handlePayment = (amount) => {
    setTotalPaid((prev) => prev + amount);
    setIsModalOpen(false);
  };

  return (
    <StyledContainer>
      <Header user={`Оплачено: ${totalPaid} $`} />
      {isModalOpen && (
        <PaymentModal
          open={isModalOpen}
          onClose={handleCloseClick}
          orderPrice={selectedPrice}
          onPay={handlePayment}
        />
      )}
      <TableWrapper>
        <Table sx={{ minWidth: 1080 }}>
          <TableHead>
            <TableRow>
              <TableCell>Название</TableCell>
              <TableCell>КГ</TableCell>
              <TableCell>Цена</TableCell>
              <TableCell>Действие</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appState.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.name}</TableCell>
                <TableCell>{order.kg}</TableCell>
                <TableCell>{order.price}</TableCell>
                <TableCell>
                  <StyledButton variant="contained" onClick={() => handleBuyClick(order.price)}>
                    Купить
                  </StyledButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableWrapper>
    </StyledContainer>
  );
}

export default App;

const StyledButton = styled(Button)( {
  backgroundColor: "rgb(243, 114, 22)",
  color: "white",
  fontSize: "15px",
  borderRadius: "50px",
  width: "100%",
  maxWidth: "192px",
  padding: "8px 16px",
  "&:hover": {
    backgroundColor: "rgb(210, 95, 15)",
  },
});

const TableWrapper = styled("div")({
  width: "100%",
  overflowX: "auto",
  margin: "16px 0",
});

const StyledContainer = styled(Container)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  marginTop: "300px", 
  padding: "20px",
  width: "100%",
  maxWidth: "100%",
  boxSizing: "border-box",
  backgroundColor: "white",
  borderRadius: "30px",
  border: "solid 4px black",
});  
