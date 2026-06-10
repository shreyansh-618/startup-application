"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={scrolled ? "scrolled" : ""}>
      <nav>
        <a href="#" className="brand" aria-label="WhatBytes">
          <Logo />
        </a>
        <div className="nav-r">
          <span className="seatpill">
            <span className="dot" />
            5 seats · selection in progress
          </span>
          <a href="#apply" className="cta">Apply</a>
        </div>
      </nav>
    </header>
  );
}
