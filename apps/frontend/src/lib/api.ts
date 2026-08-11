const API_URL = "http://localhost:4000";

export type User = {
  id: string;
  email: string;
  name: string | null;
  createdAt: string;
};

export type ApiError = {
  error: unknown;
};

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: { "Content-Type": "application/json", ...options?.headers },
  });

  const data = await res.json();
  if (!res.ok) {
    const message =
      typeof data.error === "string" ? data.error : "Something went wrong. Please try again.";
    throw new Error(message);
  }
  return data as T;
}

export function signUp(email: string, password: string, name?: string): Promise<User> {
  return apiFetch<User>("/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password, name }),
  });
}

export function logIn(email: string, password: string): Promise<User> {
  return apiFetch<User>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function logOut(): Promise<{ ok: true }> {
  return apiFetch<{ ok: true }>("/auth/logout", { method: "POST" });
}

export function getMe(): Promise<User> {
  return apiFetch<User>("/auth/me");
}

export type Session = {
  id: string;
  date: string;
  durationMinutes: number;
  statValue: number | null;
  notes: string | null;
};

export type Game = {
  id: string;
  date: string;
  opponent: string;
  teamScore: number;
  opponentScore: number;
  goals: number | null;
  assists: number | null;
  minutesPlayed: number | null;
};

export function getSessions(): Promise<Session[]> {
  return apiFetch<Session[]>("/sessions");
}

export function getGames(): Promise<Game[]> {
  return apiFetch<Game[]>("/games");
}
