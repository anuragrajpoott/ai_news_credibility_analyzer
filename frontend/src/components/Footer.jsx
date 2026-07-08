import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-slate-900 py-6 text-slate-300">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-center md:flex-row md:text-left">
        <h2 className="text-xl font-bold tracking-tight text-white">
          Truth<span className="text-cyan-400">Lens</span>
        </h2>

        <p className="text-sm text-slate-400">
          © {currentYear} TruthLens. All rights reserved.
        </p>

        <div
          aria-label="Footer Links"
          className="flex items-center gap-5"
        >
          <span className="cursor-default text-sm text-slate-400">
            Privacy
          </span>

          <span className="cursor-default text-sm text-slate-400">
            Terms
          </span>

          <span className="cursor-default text-sm text-slate-400">
            Contact
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;