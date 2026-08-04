import { Button } from "@/components/ui/button";

export function Community() {
  const communityImages = [
    "images/ui/community-1.webp",
    "images/ui/community-2.webp",
    "images/ui/community-3.webp",
    "images/ui/community-4.webp",
  ];
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
            {communityImages.map((image, index) => (
              <img
                key={index}
                src={image}
                className={`h-80 w-full object-cover ${index === 2 || index === 3 ? "-mt-16" : ""}`}
                alt="Community work"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
