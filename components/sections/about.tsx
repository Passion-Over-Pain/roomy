export function AboutUs() {
  return (
    <section className="py-32 bg-white" id="about">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Images on the Left */}
          <div className="grid grid-cols-2 gap-5">
            <img
              src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=800"
              className="h-80 w-full object-cover mt-16"
              alt="Concept"
            />
            <img
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=800"
              className="h-80 w-full object-cover"
              alt="Detail"
            />
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800"
              className="h-80 w-full object-cover"
              alt="Architecture"
            />
            <img
              src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=800"
              className="h-80 w-full object-cover -mt-16"
              alt="Space"
            />
          </div>

          {/* Text Description on the Right */}
          <div>
            <p className="uppercase tracking-[0.3em] text-xs text-black/40 font-bold">
              About
            </p>
            <h2 className="mt-6 font-serif text-5xl leading-tight">
              Spatial Intelligence, Reimagined.
            </h2>
            <p className="mt-8 text-black/70 leading-8 text-lg">
              We aren't just generating pixels; we are architecting potential.
              Roomy is built for the practitioners who demand the precision of
              CAD but the speed of instant visualization. By blending spatial
              logic with advanced generative models, we empower studios to
              bypass the mundane and focus on the monumental.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
