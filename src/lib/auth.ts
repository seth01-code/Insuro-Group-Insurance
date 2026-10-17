// MOCK auth. Accounts live in localStorage so the flow works end to end.
// Replace registerUser / loginUser / logoutUser with calls to your backend.
// A real backend should hash passwords server-side (bcrypt / argon2) and
// keep the session in an httpOnly cookie, never in localStorage.

export interface AuthUser {
  id: string;
  company: string;
  name: string;
  email: string;
  size: string;
}

interface StoredUser extends AuthUser {
  passwordHash: string;
}

export type AuthResult =
  | { ok: true; user: AuthUser }
  | { ok: false; error: string; field?: "email" | "password" };

const USERS_KEY = "insuro-users";
const SESSION_KEY = "insuro-session";
const EVENT = "auth-change";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function initialsFor(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

async function hashPassword(pw: string): Promise<string> {
  try {
    const buf = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(pw),
    );
    return Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  } catch {
    // crypto.subtle needs a secure context (https or localhost)
    return Array.from(pw)
      .map((c) => c.charCodeAt(0).toString(16))
      .join("");
  }
}

function readUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeUsers(users: StoredUser[]) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {
    /* storage blocked */
  }
}

function publicUser(u: StoredUser): AuthUser {
  return {
    id: u.id,
    company: u.company,
    name: u.name,
    email: u.email,
    size: u.size,
  };
}

/* ───────── Session (external store, used with useSyncExternalStore) ───────── */

export function getSessionId(): string | null {
  try {
    return localStorage.getItem(SESSION_KEY);
  } catch {
    return null;
  }
}

function setSession(id: string | null) {
  try {
    if (id) localStorage.setItem(SESSION_KEY, id);
    else localStorage.removeItem(SESSION_KEY);
  } catch {
    /* storage blocked */
  }
  window.dispatchEvent(new Event(EVENT));
}

export function subscribeAuth(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

export function findUser(id: string | null): AuthUser | null {
  if (!id) return null;
  const u = readUsers().find((x) => x.id === id);
  return u ? publicUser(u) : null;
}

/* ───────── Mock API ───────── */

export async function registerUser(input: {
  company: string;
  name: string;
  email: string;
  size: string;
  password: string;
}): Promise<AuthResult> {
  // Mock: replace with POST /api/auth/register
  await sleep(700);

  const email = input.email.trim().toLowerCase();
  const users = readUsers();
  if (users.some((u) => u.email === email)) {
    return {
      ok: false,
      error: "An account with this email already exists.",
      field: "email",
    };
  }

  const user: StoredUser = {
    id: `usr-${Date.now()}`,
    company: input.company.trim(),
    name: input.name.trim(),
    email,
    size: input.size,
    passwordHash: await hashPassword(input.password),
  };
  writeUsers([...users, user]);
  setSession(user.id);
  return { ok: true, user: publicUser(user) };
}

export async function loginUser(
  emailRaw: string,
  password: string,
): Promise<AuthResult> {
  // Mock: replace with POST /api/auth/login
  await sleep(700);

  const email = emailRaw.trim().toLowerCase();
  const user = readUsers().find((u) => u.email === email);
  if (!user) {
    return {
      ok: false,
      error: "We couldn't find an account with that email.",
      field: "email",
    };
  }
  if (user.passwordHash !== (await hashPassword(password))) {
    return {
      ok: false,
      error: "That password isn't right.",
      field: "password",
    };
  }
  setSession(user.id);
  return { ok: true, user: publicUser(user) };
}

export function logoutUser() {
  // Mock: replace with POST /api/auth/logout
  setSession(null);
}
