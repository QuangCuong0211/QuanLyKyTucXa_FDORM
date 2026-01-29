import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { api, clearToken, getToken, setToken } from "../api/client";
import type { User } from "../api/client";

interface AuthState {
  user: User | null;
  loading: boolean;
  checked: boolean;
}

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: false,
    checked: false,
  });

  const loadUser = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setState((s) => ({ ...s, user: null, checked: true }));
      return;
    }
    try {
      const { user } = await api.auth.me();
      setState((s) => ({ ...s, user, checked: true }));
    } catch {
      clearToken();
      setState((s) => ({ ...s, user: null, checked: true }));
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = useCallback(async (email: string, password: string) => {
    setState((s) => ({ ...s, loading: true }));
    try {
      const { token, user } = await api.auth.login(email, password);
      setToken(token);
      setState((s) => ({ ...s, user, loading: false }));
    } catch (e) {
      setState((s) => ({ ...s, loading: false }));
      throw e;
    }
  }, []);

  const register = useCallback(async (email: string, password: string, fullName: string) => {
    setState((s) => ({ ...s, loading: true }));
    try {
      const { token, user } = await api.auth.register(email, password, fullName);
      setToken(token);
      setState((s) => ({ ...s, user, loading: false }));
    } catch (e) {
      setState((s) => ({ ...s, loading: false }));
      throw e;
    }
  }, []);

  const logout = useCallback(() => {
    clearToken();
    setState((s) => ({ ...s, user: null }));
  }, []);

  const value: AuthContextValue = {
    ...state,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
