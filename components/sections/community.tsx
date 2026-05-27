import { Button } from "@/components/ui/button";

export function Community() {
  return (
    <section id="community" className="py-32 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <p className="uppercase tracking-[0.3em] text-[10px] text-white/40 font-bold">
              Community
            </p>
            <h2 className="mt-6 font-serif text-5xl md:text-6xl leading-tight">
              A global feed for visionary architecture teams.
            </h2>
            <p className="mt-8 text-white/70 leading-8 max-w-xl text-lg">
              Publish projects publicly, discover new interior concepts, and
              collaborate with designers shaping the next generation of
              architectural visualization.
            </p>
            <div className="mt-12 flex gap-4">
              <Button variant="outline">Join Community</Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            {[1, 2, 3, 4].map((i) => (
              <img
                key={i}
                src="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=1200"
                className={`h-80 w-full object-cover ${i === 2 || i === 3 ? "-mt-16" : ""}`}
                alt="Community work"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
