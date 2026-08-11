"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { logIn, signUp } from "../lib/api";
import styles from "./AuthCard.module.css";

type Mode = "signup" | "login";

export default function AuthCard() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (mode === "signup" && password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setLoading(true);
    try {
      if (mode === "signup") {
        await signUp(email, password, name || undefined);
      } else {
        await logIn(email, password);
      }
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.tabs}>
        <button
          type="button"
          className={mode === "signup" ? styles.tabActive : styles.tab}
          onClick={() => setMode("signup")}
        >
          Sign Up
        </button>
        <button
          type="button"
          className={mode === "login" ? styles.tabActive : styles.tab}
          onClick={() => setMode("login")}
        >
          Log In
        </button>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        {mode === "signup" && (
          <label className={styles.field}>
            Name (optional)
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </label>
        )}

        <label className={styles.field}>
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className={styles.field}>
          Password
          <input
            type="password"
            required
            minLength={mode === "signup" ? 8 : undefined}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        {mode === "signup" && (
          <label className={styles.field}>
            Confirm Password
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
        )}

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.submit} disabled={loading}>
          {loading ? "..." : mode === "signup" ? "Sign Up" : "Log In"}
        </button>
      </form>
    </div>
  );
}
