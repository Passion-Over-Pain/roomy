export default function GridBackground() {
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.04] "
      aria-hidden="true"
      style={{
        backgroundImage: `
          linear-gradient(to right, black 1px, transparent 1px),
          linear-gradient(to bottom, black 1px, transparent 1px)
        `,
        backgroundSize: "72px 72px",
      }}
    />
  );
}
