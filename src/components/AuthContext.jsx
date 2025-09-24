import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) setUser(savedUser);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/logout`, {}, { withCredentials: true });
      setUser(null);
      localStorage.removeItem("user");
      alert("✅ Logout successful");
    } catch (err) {
      console.error("Logout failed:", err);
      alert("❌ Logout failed, try again.");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
