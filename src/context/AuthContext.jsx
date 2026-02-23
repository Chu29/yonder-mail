import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AuthContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("yonder_user", null);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!user;
  });

  const login = useCallback(
    async (email) => {
      try {
        // TODO: Replace with actual API call
        const mockUser = {
          id: "1",
          email: email,
          name: email.split("@")[0],
          createdAt: new Date().toISOString(),
        };

        setUser(mockUser);
        setIsAuthenticated(true);

        return { success: true };
      } catch (error) {
        console.error("Login error:", error);
        return { success: false, error: error.message };
      }
    },
    [setUser],
  );

  const signup = useCallback(
    async (email, name) => {
      try {
        // TODO: Replace with actual API call
        const mockUser = {
          id: Date.now().toString(),
          email: email,
          name: name || email.split("@")[0],
          createdAt: new Date().toISOString(),
        };

        setUser(mockUser);
        setIsAuthenticated(true);

        return { success: true };
      } catch (error) {
        console.error("Signup error:", error);
        return { success: false, error: error.message };
      }
    },
    [setUser],
  );

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
  }, [setUser]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      login,
      signup,
      logout,
    }),
    [user, isAuthenticated, login, signup, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
