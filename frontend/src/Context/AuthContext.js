import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("access_token");
      if (token) {
        try {
          api.defaults.headers.common["Authorization"] = `JWT ${token}`;
          const response = await api.get("/auth/users/me/");
          setUser(response.data);
          setIsAuthenticated(true);
        } catch (err) {
          console.error("Token validation failed", err);
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          api.defaults.headers.common["Authorization"] = "";
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }

      setLoading(false);
    };

    checkToken();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post("auth/jwt/create/", { email, password });
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      api.defaults.headers.common[
        "Authorization"
      ] = `JWT ${response.data.access}`;
      const userResponse = await api.get("/auth/users/me/"); 
      setUser(userResponse.data);
      setIsAuthenticated(true);
      navigate("/");
    } catch (error) {
      console.error("Login error", error);
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      api.defaults.headers.common["Authorization"] = "";
      setIsAuthenticated(false);
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
