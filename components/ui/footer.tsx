import { Box } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black text-white py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row gap-16 justify-between">
        {/* Brand */}
        <div className="max-w-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border border-white flex items-center justify-center">
              <Box size={20} className="text-white" />
            </div>
            <span className="font-serif text-3xl font-semibold tracking-tight">
              Roomy
            </span>
          </div>
          <p className="mt-8 text-white/60 leading-8">
            AI-powered architectural visualization platform built for modern
            design workflows and cinematic spatial storytelling.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-semibold text-sm uppercase tracking-wider text-white/40">
            Navigation
          </h4>
          <ul className="mt-6 space-y-4 text-white/80 font-medium">
            <li>
              <a
                href="/#about"
                className="hover:text-white hover:underline transition"
              >
                About Roomy
              </a>
            </li>
            <li>
              <a
                href="/#features"
                className="hover:text-white hover:underline transition"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="/#process"
                className="hover:text-white hover:underline transition"
              >
                Workflow
              </a>
            </li>
            <li>
              <a
                href="/#gallery"
                className="hover:text-white hover:underline transition"
              >
                Gallery
              </a>
            </li>
            <li>
              <a
                href="/#community"
                className="hover:text-white hover:underline transition"
              >
                Community
              </a>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="font-semibold text-sm uppercase tracking-wider text-white/40">
            Social
          </h4>
          <ul className="mt-6 space-y-4 text-white/80 font-medium">
            <li>
              <a
                href="https://linkedin.com/in/tinotenda-mhedziso"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white hover:underline"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://github.com/Passion-Over-Pain"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white hover:underline"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://dev.to/passionoverpain"
                className="hover:text-white hover:underline"
              >
                Dev.To
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Credits */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-6 text-sm text-white/45">
        <p>© 2026 Roomy. All rights reserved.</p>
        <p>
          Built with <span className="text-white">🖤</span> in Africa by{" "}
          <a
            href="https://github.com/Passion-Over-Pain"
            target="_blank"
            rel="noreferrer"
            className="text-white font-semibold hover:underline"
          >
            Passion-Over-Pain
          </a>
        </p>
      </div>
    </footer>
  );
}
