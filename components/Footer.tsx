import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-line">
          <p>YAML to JSON, in the tab</p>
          <nav aria-label="Footer">
            <Link href="/how-to">How to</Link>
            <Link href="/about">About</Link>
            <Link href="/privacy">Privacy</Link>
          </nav>
          <p>2026</p>
        </div>
        <p className="credits">
          Pictures:{" "}
          <a href="https://commons.wikimedia.org/wiki/File:Early_lead_type_typesetting_(26435000940).jpg">
            “Early lead type typesetting”
          </a>{" "}
          by Thomas Quine,{" "}
          <a href="https://creativecommons.org/licenses/by/2.0">CC BY 2.0</a>, via
          Wikimedia Commons;{" "}
          <a href="https://commons.wikimedia.org/wiki/File:IBM_card_storage.NARA.jpg">
            “IBM card storage”
          </a>{" "}
          by NARA, public domain, via Wikimedia Commons;{" "}
          <a href="https://commons.wikimedia.org/wiki/File:Blue-punch-card-front-horiz.png">
            “Blue punch card”
          </a>
          , public domain, via Wikimedia Commons;{" "}
          <a href="https://commons.wikimedia.org/wiki/File:Metal_typesetting_(Unsplash).jpg">
            “Metal typesetting”
          </a>{" "}
          by Hannes Wolf,{" "}
          <a href="https://creativecommons.org/publicdomain/zero/1.0/deed.en">
            CC0
          </a>
          , via Wikimedia Commons. Clip:{" "}
          <a href="https://archive.org/details/OnGuard1956">
            “On Guard! The Story of SAGE”
          </a>{" "}
          by IBM Corporation, Military Products Division, public domain, via
          Internet Archive.
        </p>
      </div>
    </footer>
  );
}
