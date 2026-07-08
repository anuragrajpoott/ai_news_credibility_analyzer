import React from "react";

import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav
      aria-label="Primary Navigation"
      className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          aria-label="TruthLens Home"
          className="text-2xl font-bold tracking-tight text-white"
        >
          Truth<span className="text-cyan-400">Lens</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <a
            href="#analyze"
            className="text-slate-300 transition-colors hover:text-white"
          >
            Analyze
          </a>

          <a
            href="#about"
            className="text-slate-300 transition-colors hover:text-white"
          >
            About
          </a>
        </div>

        <a
          href="https://github.com/anuragrajpoott"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View TruthLens source code on GitHub"
          className="rounded-lg border border-cyan-500 px-4 py-2 text-cyan-400 transition-colors hover:bg-cyan-500 hover:text-slate-950"
        >
          GitHub
        </a>
      </div>
    </nav>
  );
};

export default Nav;