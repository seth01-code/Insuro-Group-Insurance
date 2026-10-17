"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { useRouter } from "next/navigation";
import {
  findUser,
  getSessionId,
  logoutUser,
  subscribeAuth,
  type AuthUser,
} from "@/lib/auth";
import AuthModal, { type AuthMode } from "./AuthModal";

interface OpenOptions {
  /** Where to go after signing in. Defaults to /dashboard, null stays put. */
  redirectTo?: string | null;
}

interface AuthContextValue {
  user: AuthUser | null;
  /** false until the session has been read on the client */
  ready: boolean;
  openAuth: (mode?: AuthMode, options?: OpenOptions) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  // undefined on the server / during hydration, then the real session id (or null)
  const sessionId = useSyncExternalStore<string | null | undefined>(
    subscribeAuth,
    getSessionId,
    () => undefined,
  );
  const ready = sessionId !== undefined;
  const user = useMemo(() => findUser(sessionId ?? null), [sessionId]);

  const [auth, setAuth] = useState<{
    mode: AuthMode;
    redirectTo: string | null;
    key: number;
  } | null>(null);

  const openAuth = useCallback(
    (mode: AuthMode = "signup", options?: OpenOptions) => {
      setAuth({
        mode,
        redirectTo:
          options?.redirectTo === undefined ? "/dashboard" : options.redirectTo,
        key: Date.now(),
      });
    },
    [],
  );

  const logout = useCallback(() => {
    logoutUser();
    router.push("/");
  }, [router]);

  const value = useMemo(
    () => ({ user, ready, openAuth, logout }),
    [user, ready, openAuth, logout],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}

      {auth && (
        <AuthModal
          key={auth.key}
          initialMode={auth.mode}
          onClose={() => setAuth(null)}
          onDone={() => {
            const to = auth.redirectTo;
            setAuth(null);
            if (to) router.push(to);
          }}
        />
      )}
    </AuthContext.Provider>
  );
}
