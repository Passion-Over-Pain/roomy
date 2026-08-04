import { Button } from "@/components/ui/button";

export function Cta() {
  return (
    <section className="py-32 bg-surface-soft">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <p className="uppercase tracking-[0.3em] text-[10px] text-black/40 font-bold">
          Build Faster
        </p>
        <h2 className="mt-6 font-serif text-5xl md:text-7xl leading-tight">
          Start creating cinematic architectural renders with AI.
        </h2>
        <p className="mt-8 text-black/65 text-lg leading-8 max-w-2xl mx-auto">
          Built for architects, visualization teams, and modern studios looking
          to accelerate design communication.
        </p>
        <div className="mt-12 flex flex-wrap justify-center gap-5">
          <Button variant="primary" size="lg" href="/studio/floor-to-3d">
            Start Building
          </Button>
        </div>
      </div>
    </section>
  );
}
