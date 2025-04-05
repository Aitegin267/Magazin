import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  const login = async (username, password, callback) => {
    if (username === "admin" && password === "1") {
      setIsAuthenticated(true);
      callback();
    } else {
      alert("Invalid credentials");
    }
    try {
      const response = await axios.post("https://f7a8c79a71aab280.mokky.dev/Tovary", {
        username,
        password,
      });

      const authToken = response.data.token;
      setToken(authToken);
      setIsAuthenticated(true);
      localStorage.setItem("token", authToken);

      if (callback) callback();
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
