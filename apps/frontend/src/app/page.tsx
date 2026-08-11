import Image from "next/image";
import AuthCard from "./AuthCard";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <div className={styles.navBrand}>
          <Image src="/soccer-ball.svg" alt="" width={28} height={28} />
          NextTouch
        </div>
        <a href="#auth" className={styles.getStarted}>
          Get Started
        </a>
      </nav>

      <section className={styles.hero}>
        <h1>NextTouch</h1>
        <p className={styles.tagline}>Analyze. Improve. Elevate.</p>
        <p className={styles.heroText}>
          Track your training. Track your games. See your progress add up
          over time instead of just hoping you&apos;re getting better.
        </p>
      </section>

      <section className={styles.howItWorks}>
        <div className={styles.step}>
          <div className={styles.stepNumber}>1</div>
          <div className={styles.stepTitle}>Log it</div>
          <div className={styles.stepText}>Training sessions and games</div>
        </div>
        <div className={styles.step}>
          <div className={styles.stepNumber}>2</div>
          <div className={styles.stepTitle}>Track it</div>
          <div className={styles.stepText}>History and progress charts</div>
        </div>
        <div className={styles.step}>
          <div className={styles.stepNumber}>3</div>
          <div className={styles.stepTitle}>Improve</div>
          <div className={styles.stepText}>See real growth over time</div>
        </div>
      </section>

      <section id="auth" className={styles.authSection}>
        <AuthCard />
      </section>

      <footer className={styles.footer}>© 2026 NextTouch</footer>
    </div>
  );
}
