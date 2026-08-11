"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getGames, getMe, getSessions, logOut, type Game, type Session, type User } from "../../lib/api";
import styles from "./page.module.css";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    getMe()
      .then(async (u) => {
        setUser(u);
        const [s, g] = await Promise.all([getSessions(), getGames()]);
        setSessions(s);
        setGames(g);
      })
      .catch(() => router.push("/"))
      .finally(() => setChecked(true));
  }, [router]);

  async function handleLogOut() {
    await logOut();
    router.push("/");
  }

  if (!checked || !user) return null;

  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <div className={styles.brand}>NextTouch</div>
        <div className={styles.navRight}>
          <span>{user.email}</span>
          <button className={styles.logout} onClick={handleLogOut}>
            Log Out
          </button>
        </div>
      </nav>

      <div className={styles.actions}>
        <Link href="/training" className={styles.actionButton}>
          Training
        </Link>
        <Link href="/games" className={styles.actionButton}>
          Games
        </Link>
      </div>

      <section className={styles.section}>
        <h2>Recent Training</h2>
        {sessions.length === 0 ? (
          <p className={styles.empty}>No sessions logged yet.</p>
        ) : (
          <ul className={styles.list}>
            {sessions.slice(0, 2).map((s) => (
              <li key={s.id}>
                {new Date(s.date).toLocaleDateString()} · {s.durationMinutes} min
                {s.statValue !== null && ` · ${s.statValue}`}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className={styles.section}>
        <h2>Recent Games</h2>
        {games.length === 0 ? (
          <p className={styles.empty}>No games logged yet.</p>
        ) : (
          <ul className={styles.list}>
            {games.slice(0, 2).map((g) => (
              <li key={g.id}>
                {new Date(g.date).toLocaleDateString()} · vs {g.opponent} ·{" "}
                {g.teamScore}-{g.opponentScore}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
