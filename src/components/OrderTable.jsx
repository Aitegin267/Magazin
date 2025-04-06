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
import { TiTick } from "react-icons/ti";
import { TiTimes } from "react-icons/ti";

function App() {
  const [appState, setAppState] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);

  const getTovary = async () => {
    const apiUrl = "https://f7a8c79a71aab280.mokky.dev/Tovary";
    await axios.get(apiUrl).then((resp) => {
      const updatedData = resp.data.map((item) => ({
        ...item,
        price: Number(item.price),
      }));
      const totalOfCash = updatedData.reduce((prev, next) => {
        if (next.isPaid) {
          return prev + next.price;
        }
        return prev;
      }, 0);
      setTotalAmount(totalOfCash);
      setAppState(updatedData);
    });
  };

  useEffect(() => {
    getTovary();
  }, []);

  const handleBuyClick = (order) => {
    setSelectedPrice(order.price);
    setSelectedOrderId(order.id);
    setIsModalOpen(true);
  };

  const handleCloseClick = () => {
    setIsModalOpen(false);
  };

  const handlePayment = async (amount) => {
    await axios.patch(
      `https://f7a8c79a71aab280.mokky.dev/Tovary/${selectedOrderId}`,
      {
        isPaid: true,
      }
    );
    getTovary();
    setIsModalOpen(false);
  };

  return (
    <StyledContainer>
      <Header user={`Оплачено: ${totalAmount} $`} />
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
              <TableCell>Статус</TableCell>
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
                  {order.isPaid ? (
                    <span style={{ color: "green" }}>
                      <TiTick /> Оплачено
                    </span>
                  ) : (
                    <span style={{ color: "red" }}>
                      <TiTimes /> Не оплачено
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <StyledButton
                    variant="contained"
                    onClick={() => handleBuyClick(order)}
                    disabled={order.isPaid}
                    style={{
                      backgroundColor: order.isPaid
                        ? "green"
                        : "rgb(243, 114, 22)",
                    }}
                  >
                    {order.isPaid ? "Оплачено" : "Купить"}
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

const StyledButton = styled(Button)({
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
