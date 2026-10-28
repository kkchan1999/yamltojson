import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>Free YAML to JSON converter. Runs in your browser.</p>
        <nav aria-label="Footer">
          <Link href="/how-to">How to</Link>
          <Link href="/about">About</Link>
          <Link href="/privacy">Privacy</Link>
        </nav>
      </div>
    </footer>
  );
}
