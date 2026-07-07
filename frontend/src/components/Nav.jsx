import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-white"
        >
          Truth<span className="text-cyan-400">Lens</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <a
            href="#analyze"
            className="text-slate-300 hover:text-white transition"
          >
            Analyze
          </a>

          <a
            href="#about"
            className="text-slate-300 hover:text-white transition"
          >
            About
          </a>
        </div>

        <a
          href="https://github.com/anuragrajpoott"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-cyan-500 px-4 py-2 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 transition"
        >
          GitHub
        </a>
      </div>
    </nav>
  );
};

export default Nav;