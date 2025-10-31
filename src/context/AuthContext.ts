import { createContext } from "react";

export interface User {
  userId: string;
  username?: string;
  email?: string;
}

export interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (userData: User) => void;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
