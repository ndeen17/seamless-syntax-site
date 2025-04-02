import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "@/services/authService";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signup: (
    name: string,
    email: string,
    password: string,
    code: string
  ) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  verifyCode: (email: string, code: string) => Promise<any>;
  forgotPassword: (email: string) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { toast } = useToast();

  const handleSessionExpiry = () => {
    toast({
      title: "Session Expired",
      description: "Please log in again.",
      variant: "warning",
    });
    logout();
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        setIsLoading(true);
        const response = await authService.verifyUser();
        if (response.success) {
          setUser(response.user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Auth status check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();

    const tokenExpiryCheck = setInterval(() => {
      const token = localStorage.getItem("authToken");
      if (token && isTokenExpired(token)) {
        handleSessionExpiry();
      }
    }, 60000); // Check every minute

    return () => clearInterval(tokenExpiryCheck);
  }, []);

  const signup = async (
    name: string,
    email: string,
    password: string,
    code: string
  ) => {
    setIsLoading(true);
    try {
      const response = await authService.signup({
        name,
        email,
        password,
        code,
      });
      toast({
        title: "Success",
        description:
          response.message ||
          "Registration successful. Please verify your email.",
      });
      return response;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Registration failed. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("https://aitool.asoroautomotive.com/api/user-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.message !== "Please log in again.") {
        setUser(data.user);                // set user
        setIsAuthenticated(true);          // update authentication state
        localStorage.setItem("authToken", data.token);
        toast({
          title: "Success",
          description: "Logged in successfully",
          variant: "success",
        });
        return data;
      } else {
        toast({
          title: "Error",
          description: data.message,
          variant: "destructive",
        });
        return data;
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Login failed.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
      toast({
        title: "Success",
        description: "You have been logged out",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Logout failed",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const verifyCode = async (email: string, code: string) => {
    setIsLoading(true);
    try {
      const response = await authService.verifyCode({
        email,
        code,
      });
      toast({
        title: "Success",
        description: response.message || "Email verified successfully",
      });
      return response;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Verification failed",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    try {
      const response = await authService.forgotPassword({ email });
      toast({
        title: "Success",
        description: response.message || "Password reset email sent",
      });
      return response;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send reset email",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        signup,
        login,
        logout,
        verifyCode,
        forgotPassword,
      }}
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

const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const expiry = payload.exp;
    return Date.now() >= expiry * 1000;
  } catch (error) {
    console.error("Failed to parse token:", error);
    return true;
  }
};
