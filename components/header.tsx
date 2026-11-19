"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { foundation, navigation } from "@/lib/site";

export function Wordmark({ footer = false }: { footer?: boolean }) {
  return (
    <Link href="/" className={`wordmark ${footer ? "wordmark-footer" : ""}`}>
      {foundation.logo ? (
        <Image src={foundation.logo} width={1052} height={626} alt="" unoptimized />
      ) : (
        <span className="wordmark-monogram" aria-hidden="true">MO</span>
      )}
      <span className="wordmark-text">
        <span>Michael Ofori M.D.</span>{" "}
        <small>Foundation</small>
      </span>
    </Link>
  );
}

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);

  return (
    <header className="site-header" onKeyDown={(event) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    }}>
      <div className="wrap header-row">
        <Wordmark />
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="navigation"
          aria-label={open ? "Close menu" : "Open menu"}
          ref={toggle}
          onClick={() => setOpen(!open)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
        <nav id="navigation" className={`navigation ${open ? "is-open" : ""}`} aria-label="Main navigation">
          {navigation.map(({ label, href }) => (
            <Link key={href} href={href} onClick={() => setOpen(false)} aria-current={path === href ? "page" : undefined}>
              {label}
            </Link>
          ))}
          <Link className="button button-primary nav-donate" href="/get-involved#donate" onClick={() => setOpen(false)}>Donate</Link>
        </nav>
      </div>
    </header>
  );
}
