import React, { useEffect, useState } from "react";
import axios from "axios";
import { AuthContext, type User } from "./AuthContext";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("🟡 checkAuth 실행 중...");
        const res = await axios.get("http://localhost:4000/api/auth/check", {
          withCredentials: true,
        });
        console.log("✅ 로그인 확인 성공:", res.data);
        setUser(res.data.user);
      } catch (err) {
        console.warn("❌ 로그인 확인 실패:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await axios.post("http://localhost:4000/api/users/logout", {}, { withCredentials: true });
      setUser(null);
    } catch (err) {
      console.error("❌ 로그아웃 실패:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
