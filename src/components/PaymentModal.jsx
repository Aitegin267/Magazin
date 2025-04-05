import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Input,
} from "@mui/material";
import QR from "../components/QR.jpg";
import { PiBackspaceFill } from "react-icons/pi";

const PaymentModal = ({ open, onClose, orderPrice, onPay }) => {
  const [cash, setCash] = useState("");
  const [showQrCode, setShowQrCode] = useState(false);
  const [showNestedModal, setShowNestedModal] = useState(false);
  const numericCash = Number(cash);

  const handleCashPayment = () => {
    const calculatedChange = numericCash - orderPrice;

    console.log("Entered cash:", cash);
    console.log("Calculated change:", calculatedChange);
    console.log("Order price:", orderPrice);
    setShowNestedModal(true);
  };

  useEffect(() => {
    let timer;
    if (showQrCode) {
      timer = setTimeout(() => {
        setShowQrCode(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [showQrCode]);

  const handleNestedModalClose = () => {
    setShowNestedModal(false);
    onPay(orderPrice); 
    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Оплата</DialogTitle>
        <DialogContent>
          <Typography>
            Стоимость: <strong>{orderPrice} $</strong>
          </Typography>

          <Input
            type="number"
            placeholder="Введите сумму наличными"
            value={cash}
            onChange={(e) => setCash(e.target.value)}
            sx={{ my: 2 }}
          />

          {showQrCode && (
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <img
                src={QR}
                alt="QR Код"
                style={{ width: "256px", height: "256px" }}
              />
              <Typography variant="body2" style={{ marginTop: "10px" }}>
                Сканируйте этот QR-код для оплаты.
              </Typography>
            </div>
          )}
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => setShowQrCode(true)}
            sx={{ backgroundColor: "#80808044", color: "#939292bc" }}
          >
            Оплата через QR
          </Button>
          <Button
            onClick={handleCashPayment}
            variant="contained"
            disabled={isNaN(numericCash) || numericCash < orderPrice}
          >
            Наличные
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={showNestedModal} onClose={handleNestedModalClose}>
        <DialogTitle>Оплата прошла успешно✅</DialogTitle>
        <DialogContent>
          <Typography>
            Ваша сдача: <strong>{numericCash - orderPrice} $</strong>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              backgroundColor: "white",
              color: "black",
              border: "none",
              boxShadow: "none",
            }}
            onClick={handleNestedModalClose}
            variant="contained"
          >
            <PiBackspaceFill />
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PaymentModal;
