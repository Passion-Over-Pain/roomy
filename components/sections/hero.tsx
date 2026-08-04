import { Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import GridBackground from "@/components/ui/grid-bg";

export function Hero() {
  return (
    <section className="relative h-screen flex items-center overflow-hidden bg-[#FDFBF7]">
      <GridBackground />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-24 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 border border-black/10 px-4 py-2 text-[10px] uppercase tracking-[0.3em] mb-8 font-medium">
              <div className="w-1.5 h-1.5 bg-black" />
              AI-Powered Architectural Visualization
            </div>

            <h1 className=" text-6xl md:text-8xl leading-[0.92] tracking-tightest mb-10">
              Turn 2D Plans
              <br />
              Into Photorealistic 3D Spaces
            </h1>

            <p className="text-lg leading-8 text-black/70 max-w-lg mb-12">
              Roomy transforms architectural floor plans into cinematic
              AI-generated visualizations. Designed for modern studios and
              visualization teams.
            </p>

            <div className="flex gap-4">
              <Button variant="primary" size="lg" href="/studio/floor-to-3d">
                Start Building
              </Button>
              {/* <Button variant="outline" size="lg">
                Watch Demo
              </Button> */}
            </div>
          </div>

          {/* Right Visuals */}
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-full h-full border border-black/10" />
            <div className="relative bg-white border border-black/10 shadow-2xl p-2">
              <img
                src="images/ui/hero-bg.jpg"
                className="w-full h-150 object-cover"
                alt="Architecture"
              />
            </div>

            {/* Floating Status Panel */}
            <div className="absolute -bottom-10  bg-white border border-black p-6 w-72 shadow-xl">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-black/50">
                    Render Status
                  </p>
                  <h4 className="font-serif text-lg mt-1">
                    3D Scene Generated
                  </h4>
                </div>
                <div className="bg-black text-white p-2">
                  <Sparkles size={16} />
                </div>
              </div>
              <div className="space-y-3">
                {[
                  ["Lighting", "Diffused"],
                  ["Style", "Minimal"],
                  ["Export", "8K PNG"],
                ].map(([label, val]) => (
                  <div
                    key={label}
                    className="flex justify-between text-[11px] uppercase tracking-widest"
                  >
                    <span className="text-black/40">{label}</span>
                    <span className="font-semibold">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
