import { ScanLine, Layers3, ShieldCheck, Globe2, Download } from "lucide-react";

export function Features() {
  return (
    <section id="features" className="py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-3xl">
          <p className="uppercase tracking-[0.3em] text-[10px] text-black/40 font-bold">
            Features
          </p>
          <h2 className="mt-6 font-serif text-5xl md:text-6xl leading-tight">
            Designed for high-performance architectural workflows.
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 mt-20">
          {/* Card 1: Primary Feature */}
          <article className="lg:col-span-7 bg-surface-soft border p-10 relative overflow-hidden min-h-130">
            <div className="max-w-md">
              <div className="w-14 h-14 border flex items-center justify-center bg-white">
                <ScanLine size={24} />
              </div>
              <h3 className="mt-8 text-3xl font-serif">
                Instant 2D-to-3D Rendering
              </h3>
              <p className="mt-5 text-black/65 leading-8">
                Upload blueprints or sketches and generate photorealistic
                environments with AI-driven lighting, materials, and spatial
                composition.
              </p>
            </div>
          </article>

          {/* Card 2: Scene Comparison */}
          <article className="lg:col-span-5 border p-10 min-h-130 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 border flex items-center justify-center">
                <Layers3 size={24} />
              </div>
              <h3 className="mt-8 text-3xl font-serif">
                Side-by-Side Comparison
              </h3>
              <p className="mt-5 text-black/65 leading-8">
                Validate spatial accuracy by comparing your original layout with
                the AI render in real-time.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-10">
              <div className="bg-surface-soft p-4 border">
                <img
                  src="https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=600"
                  className="h-32 w-full object-cover"
                  alt="Original"
                />
                <p className="mt-3 text-[10px] uppercase tracking-[0.2em] font-bold">
                  Original
                </p>
              </div>
              <div className="bg-black p-4">
                <img
                  src="https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=600"
                  className="h-32 w-full object-cover"
                  alt="Render"
                />
                <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-white font-bold">
                  AI Render
                </p>
              </div>
            </div>
          </article>

          {/* Cards 3, 4, 5: Grid Items */}
          {[
            {
              icon: ShieldCheck,
              title: "Enterprise Privacy",
              text: "Fine-grained visibility settings for confidential projects.",
            },
            {
              icon: Globe2,
              title: "Global Community",
              text: "Discover inspiring visualizations and share concepts.",
              featured: true,
            },
            {
              icon: Download,
              title: "High-Res Export",
              text: "Presentation-ready renders for client reviews.",
            },
          ].map((item, idx) => (
            <article
              key={idx}
              className={`lg:col-span-4 border p-10 flex flex-col justify-start transition-colors ${
                item.featured
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-gray-200"
              }`}
            >
              <div
                className={`w-14 h-14 border flex items-center justify-center ${
                  item.featured
                    ? "border-white/30 text-white"
                    : "border-gray-200 text-black"
                }`}
              >
                <item.icon size={24} className="stroke-current" />
              </div>
              <h3 className="mt-8 text-2xl font-serif">{item.title}</h3>
              <p
                className={`mt-5 leading-8 ${
                  item.featured ? "text-white/70" : "text-black/65"
                }`}
              >
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
