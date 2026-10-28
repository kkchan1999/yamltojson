import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <article className="prose">
      <div className="container measure">
        <h1>This page is not here</h1>
        <p className="lede">
          The address does not match a page on this site. The converter is on the
          homepage.
        </p>
        <p>
          <Link href="/">Back to the YAML to JSON converter</Link>
        </p>
      </div>
    </article>
  );
}
