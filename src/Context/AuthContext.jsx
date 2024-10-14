import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { showToast } from "../Components/Toast";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    showToast("Logged out successfully", "success");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};



export const PrivateRoute = ({ element: Element, requiredRole }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      showToast("Please log in to access this page", "error");
      navigate("/"); // Redirect to login if user is not logged in
    } else if (requiredRole && user.role !== requiredRole) {
      showToast("You don't have permission to access this page", "error");
      navigate("/unauthorized"); // Redirect if user does not have the required role
    }
  }, [user, requiredRole, navigate]);

  return user && (!requiredRole || user.role === requiredRole) ? (
    <Element />
  ) : null;
};
