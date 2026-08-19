"use client";

import { useState } from "react";
import { bio } from "@/data/bio";

const navLinks = [
  { label: "Projects", href: "#projects" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-(--color-surface) bg-(--color-ink)/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-12">
        <a href="#" className="font-display text-sm font-bold text-(--color-paper)">
          {bio.name}
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-(--color-muted) transition-colors hover:text-(--color-paper)"
            >
              {link.label}
            </a>
          ))}
          <a
            href={bio.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-(--color-muted) transition-colors hover:text-(--color-paper)"
          >
            GitHub
          </a>
          <a
            href={bio.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-(--color-muted) transition-colors hover:text-(--color-paper)"
          >
            LinkedIn
          </a>
          <a
            href="#contact"
            className="rounded border border-(--color-signal) px-4 py-2 text-sm font-medium text-(--color-signal) transition-colors hover:bg-(--color-signal) hover:text-(--color-ink)"
          >
            Contact
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-0.5 w-6 bg-(--color-paper) transition-transform ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-(--color-paper) transition-opacity ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-(--color-paper) transition-transform ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {open && (
        <div className="flex flex-col gap-1 border-t border-(--color-surface) px-6 py-4 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-2 text-sm font-medium text-(--color-muted) transition-colors hover:text-(--color-paper)"
            >
              {link.label}
            </a>
          ))}
          <a
            href={bio.links.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="py-2 text-sm font-medium text-(--color-muted) transition-colors hover:text-(--color-paper)"
          >
            GitHub
          </a>
          <a
            href={bio.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="py-2 text-sm font-medium text-(--color-muted) transition-colors hover:text-(--color-paper)"
          >
            LinkedIn
          </a>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 rounded border border-(--color-signal) px-4 py-2 text-center text-sm font-medium text-(--color-signal) transition-colors hover:bg-(--color-signal) hover:text-(--color-ink)"
          >
            Contact
          </a>
        </div>
      )}
    </header>
  );
}
