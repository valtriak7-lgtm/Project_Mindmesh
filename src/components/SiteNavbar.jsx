
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const links = [
  { label: "Home", href: "/" },
  { label: "Marketplace", href: "/marketplace" },
  { label: "Craft Studio", href: "/studio" },
  { label: "Chat Hub", href: "/chat" },
  { label: "My Orders", href: "/orders" },
  { label: "Collaboration", href: "/collaboration" },
];

export default function SiteNavbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const navbar = document.querySelector(".mesh-nav");

      if (!navbar) return;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        navbar.classList.add("nav-hidden");
        setMenuOpen(false);
      } else {
        navbar.classList.remove("nav-hidden");
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function isActive(href) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="mesh-nav">
      <nav className="mesh-nav-inner">
        <Link
          href="/"
          className="mesh-brand"
          onClick={() => setMenuOpen(false)}
        >
          <span className="mesh-brand-mark">M</span>
          <span>
            MIND<span className="mesh-brand-accent">MESH</span>
            <small>CRAFTING THE FUTURE</small>
          </span>
        </Link>

        <div className={`mesh-nav-links ${menuOpen ? "is-open" : ""}`}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`nav-link ${isActive(link.href) ? "active" : ""}`}
              aria-current={isActive(link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/studio"
            className="mesh-nav-cta"
            onClick={() => setMenuOpen(false)}
          >
            + Create Craft
          </Link>
        </div>

        <button
          type="button"
          className="mesh-menu-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>
    </header>
  );
}
