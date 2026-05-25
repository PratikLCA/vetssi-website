"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/ssi-definitions", label: "Definitions", longLabel: "SSI Definitions" },
  { href: "/contamination-pathways", label: "Pathways", longLabel: "Contamination Pathways" },
  { href: "/protocols", label: "Protocols" },
  { href: "/roles", label: "Roles", longLabel: "Roles & Responsibilities" },
  { href: "/videos", label: "Videos" },
  { href: "/contributors", label: "Contributors" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
];

export default function NavBar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-warm-gray">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Wordmark */}
          <Link
            href="/"
            className="font-serif text-2xl font-semibold text-navy tracking-widest"
            style={{ letterSpacing: "0.2em" }}
          >
            VETSSI
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link transition-colors ${
                    isActive
                      ? "text-steel border-b-2 border-steel pb-0.5"
                      : "text-text-muted hover:text-navy"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile / tablet hamburger */}
          <button
            className="lg:hidden p-2 text-navy"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile / tablet drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-warm-gray">
          <div className="px-6 py-4 flex flex-col gap-5">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`nav-link text-sm ${
                    isActive ? "text-steel" : "text-text-muted"
                  }`}
                >
                  {link.longLabel ?? link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
