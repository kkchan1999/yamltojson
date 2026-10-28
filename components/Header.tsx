"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/how-to", label: "How to" },
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <a className="skip" href="#content">
        Skip to content
      </a>
      <div className="wrap header-inner">
        <Link href="/" className="wordmark">
          yamltojson
        </Link>
        <nav aria-label="Primary">
          <ul>
            {links.map((link) => {
              const current = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={current ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
