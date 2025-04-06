import { Routes, Route, Navigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Orders from "./Pages/Orders";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
