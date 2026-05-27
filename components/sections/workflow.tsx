import GridBackground from "../ui/grid-bg";

export function Workflow() {
  const steps = [
    {
      number: "01",
      title: "Upload Floor Plan",
      text: "Upload your JPG, PNG, or WebP layout. Our AI engine parses the structural data instantly.",
    },
    {
      number: "02",
      title: "Select Aesthetic",
      text: "Choose your interior theme, material presets, and lighting mood to match your design vision.",
    },
    {
      number: "03",
      title: "Generate & Deliver",
      text: "Receive photorealistic 3D renders. Download the high-res file or share it to the global community.",
    },
  ];

  return (
    <section
      id="workflow"
      className="py-32 bg-surface-soft overflow-hidden relative"
    >
      <GridBackground />
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Sticky Header */}
          <div className="lg:sticky lg:top-32">
            <p className="uppercase tracking-[0.3em] text-[10px] text-black/40 font-bold">
              Workflow
            </p>
            <h2 className="mt-6 font-serif text-5xl md:text-6xl leading-tight">
              From flat plans to cinematic spaces in seconds.
            </h2>
            <p className="mt-8 text-black/65 leading-8 max-w-lg">
              Roomy is built to remove the technical friction between a 2D
              sketch and a high-fidelity client presentation.
            </p>
          </div>

          {/* Steps List */}
          <div className="space-y-6">
            {steps.map((step) => (
              <div
                key={step.number}
                className="bg-white p-10 border border-black/5"
              >
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-black text-white flex items-center justify-center text-lg font-serif">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif">{step.title}</h3>
                    <p className="mt-4 text-black/65 leading-8">{step.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
