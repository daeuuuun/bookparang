import { useContext } from "react";
import { AuthContext, type AuthContextType } from "./AuthContext";

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth는 AuthProvider 내부에서만 사용해야 합니다.");
  return context;
};
