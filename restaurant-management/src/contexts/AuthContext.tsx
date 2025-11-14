import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import apiClient from "../services/api";

export type UserRole = "user" | "staff" | "admin";

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: UserRole | null;
  login: () => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUserInfo = async () => {
    try {
      const response = await apiClient.get("/api/users/me");
      setUserRole(response.data.role);
      setIsAuthenticated(true);
      console.log("User info fetched:", response.data);
    } catch (error) {
      console.error("Failed to fetch user info", error);
      setIsAuthenticated(false);
      setUserRole(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async () => {
    await fetchUserInfo();
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userRole, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
