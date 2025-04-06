import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Container, TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !password) {
      alert("Пожалуйста, заполните все поля");
      return;
    }

    await register(username, password);
    navigate("/login");
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 10,
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "white",
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Register
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleRegister}
          sx={{ mt: 2 }}
        >
          Register
        </Button>
        <br />
        <br />
        <Button
          fullWidth
          variant="outlined"
          onClick={() => navigate("/login")}
        >
          Назад к входу
        </Button>
      </Box>
    </Container>
  );
};

export default Register;
