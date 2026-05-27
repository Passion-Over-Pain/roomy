import { Button } from "@/components/ui/button";
import { Box } from "lucide-react";
import { Link } from "react-router";

export default function ComingSoonPage() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden relative">
      {/* BACKGROUND GRID */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, black 1px, transparent 1px),
              linear-gradient(to bottom, black 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* TOP BAR */}
      <header className="relative z-10 border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 border border-black flex items-center justify-center">
              <Box className="w-5 h-5" />
            </div>

            <span className="font-serif text-3xl">Roomy</span>
          </Link>

          <p className="uppercase tracking-[0.3em] text-xs text-black/40">
            Upcoming Release
          </p>
        </div>
      </header>

      {/* HERO */}
      <section className="relative z-10 min-h-[calc(100vh-80px)] flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
          <div className="max-w-5xl">
            <h1 className="font-serif text-7xl md:text-[9rem] leading-[0.9] max-w-6xl">
              Something
              <br />
              Architectural
              <br />
              Is Coming.
            </h1>

            <p className="mt-10 text-lg leading-8 text-black/60 max-w-2xl">
              We’re building the next evolution of AI-powered architectural
              visualization — designed for studios, developers, and visionary
              spatial teams.
            </p>

            <Button variant="primary" size="lg" className="mt-12" href="/">
              Return Home
            </Button>
          </div>

          {/* FLOATING ARCHITECTURE PANELS */}
          <div className="hidden xl:block">
            <div className="absolute top-40 right-24 w-72 bg-white border border-black/10 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
              <div className="aspect-4/3 bg-[#f4f3f0]" />

              <div className="mt-4">
                <p className="text-xs uppercase tracking-[0.2em] text-black/40">
                  AI Workspace
                </p>

                <h3 className="font-serif text-2xl mt-2">
                  Real-Time Rendering
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
