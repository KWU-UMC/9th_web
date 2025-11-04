// src/auth/AuthContext.tsx
import { createContext, useContext, useMemo, useState } from "react";

type AuthCtx = {
  isAuthed: boolean;
  login: (token: string) => void;
  logout: () => void;
};

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));

  const api = useMemo<AuthCtx>(() => ({
    isAuthed: !!token,
    login: (t: string) => { localStorage.setItem("token", t); setToken(t); },
    logout: () => { localStorage.removeItem("token"); setToken(null); },
  }), [token]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth must be used within <AuthProvider>");
  return v;
}
