import Link from "next/link";

export default function Training() {
  return (
    <div style={{ maxWidth: 600, margin: "80px auto", padding: "0 24px" }}>
      <p>
        <Link href="/dashboard">← Back to Dashboard</Link>
      </p>
      <h1>Training</h1>
      <p>Logging and history coming soon.</p>
    </div>
  );
}
