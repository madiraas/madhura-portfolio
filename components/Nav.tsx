"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
  { id: "about", label: "About" },
  { id: "capabilities", label: "Help" },
  { id: "experience", label: "Experience" },
  { id: "freelance", label: "Freelance" },
  { id: "work", label: "Work" },
  { id: "how", label: "Process" },
  { id: "contact", label: "Contact" },
];

export default function Nav({ name = "Madhura Padman" }: { name?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function goToSection(id: string) {
    setOpen(false);
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/#${id}`);
    }
  }

  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}`}>
      <div className="nav-inner">
        <Link href="/" className="nav-name" style={{ textDecoration: "none" }}>
          {name}
        </Link>
        <ul className={`nav-links${open ? " open" : ""}`}>
          {LINKS.map((l) => (
            <li key={l.id}>
              <a onClick={() => goToSection(l.id)}>{l.label}</a>
            </li>
          ))}
        </ul>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Link href="/resume" className="nav-cta">
            Resume
          </Link>
          <button
            className="nav-mobile-toggle"
            onClick={() => setOpen((o) => !o)}
          >
            Menu
          </button>
        </div>
      </div>
    </nav>
  );
}
