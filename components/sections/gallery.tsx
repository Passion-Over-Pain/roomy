// import { Button } from "@/components/ui/button";

export function Gallery() {
  const galleryImages = [
    "/images/ui/gen1.png",
    "/images/ui/gen2.png",
    "/images/ui/gen3.png",
  ];
  return (
    <section id="gallery" className="py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between">
          <div className="max-w-3xl">
            <p className="uppercase tracking-[0.3em] text-[10px] text-black/40 font-bold">
              Gallery
            </p>
            <h2 className="mt-6 font-serif text-5xl md:text-6xl leading-tight">
              AI-generated architectural visualizations.
            </h2>
          </div>
          {/* <Button variant="outline" className="mt-8 lg:mt-0">
            Explore Gallery
          </Button> */}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
          {galleryImages.map((image, index) => (
            <img
              key={index}
              src={image}
              className={`w-full object-cover ${index % 2 === 0 ? "h-100 mt-16" : "h-140"}`}
              alt="Project Gallery"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
