import { Button } from "@/components/ui/button";
import GridBackground from "@/components/ui/grid-bg";
import { Box } from "lucide-react";
import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <GridBackground />

      {/* TOP NAV */}
      <header className="relative z-10 border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 border border-black flex items-center justify-center">
              <Box className="w-5 h-5" />
            </div>

            <span className="font-serif text-3xl">Roomy</span>
          </Link>

          <Link to="/" className="btn btn--secondary btn--md">
            Back Home
          </Link>
        </div>
      </header>

      {/* CONTENT */}
      <section className="relative z-10 min-h-[calc(100vh-80px)] flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <p className="uppercase tracking-[0.35em] text-xs text-black/40 mb-8">
                Error 404
              </p>

              <h1 className="font-serif text-7xl md:text-[10rem] leading-[0.9]">
                Lost In
                <br />
                Space.
              </h1>

              <p className="mt-10 text-lg leading-8 text-black/60 max-w-xl">
                The architectural environment you're looking for doesn't exist,
                was moved, or is still being created.
              </p>

              <Button variant="primary" size="lg" className="mt-12" href="/">
                Return Home
              </Button>
            </div>

            {/* RIGHT */}
            <div className="relative">
              <div className="border border-black/10 bg-[#f4f3f0] p-10 shadow-[0_20px_80px_rgba(0,0,0,0.08)]">
                <div className="aspect-4/5 bg-white border border-black/5 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-serif text-[12rem] text-black/5">
                      404
                    </span>
                  </div>

                  <div className="relative z-10 text-center">
                    <div className="w-16 h-16 border border-black mx-auto flex items-center justify-center mb-6">
                      <Box className="w-7 h-7" />
                    </div>

                    <p className="uppercase tracking-[0.3em] text-xs text-black/40">
                      Roomy System
                    </p>

                    <h3 className="mt-4 font-serif text-4xl">Room not found</h3>
                  </div>
                </div>
              </div>
              {/* FLOATING BOX */}
              <div className="hidden lg:block absolute -bottom-10 -left-10 bg-black text-white p-6 w-56">
                <p className="uppercase tracking-[0.2em] text-xs text-white/50">
                  Status
                </p>

                <h4 className="mt-3 text-xl font-semibold">Invalid Page</h4>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
