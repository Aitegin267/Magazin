import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
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
    try {
      const response = await axios.post(
        "https://f7a8c79a71aab280.mokky.dev/auth",
        { username, password }
      );

      const authToken = response.data.token;
      setToken(authToken);
      setIsAuthenticated(true);
      localStorage.setItem("token", authToken);

      if (callback) callback();
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed! Please check your username and password.");
    }
  };

  const register = async (username, password) => {
    try {
      await axios.post("https://f7a8c79a71aab280.mokky.dev/register", {
        username,
        password,
      });
      alert("Registration successful! You can now log in.");
    } catch (error) {
      console.error("Registration failed", error);
      alert("Registration failed! Please try again.");
    }
  };

  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
