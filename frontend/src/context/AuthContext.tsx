import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiClient, AuthResponse, LoginRequest, RegisterRequest } from '../services/api';

interface AuthContextType {
  user: AuthResponse | null;
  loading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (token exists)
    const token = localStorage.getItem('authToken');
    if (token && apiClient.isAuthenticated()) {
      // Token exists, but we don't have user info
      // In a real app, you might want to validate the token or fetch user info
      // For now, we'll just set a basic user state
      const userData = localStorage.getItem('userData');
      if (userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (e) {
          console.error('Failed to parse user data', e);
          apiClient.logout();
        }
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials: LoginRequest) => {
    try {
      const response = await apiClient.login(credentials);
      apiClient.setToken(response.token);
      localStorage.setItem('userData', JSON.stringify(response));
      setUser(response);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (userData: RegisterRequest) => {
    try {
      const response = await apiClient.register(userData);
      apiClient.setToken(response.token);
      localStorage.setItem('userData', JSON.stringify(response));
      setUser(response);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = () => {
    apiClient.logout();
    localStorage.removeItem('userData');
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
