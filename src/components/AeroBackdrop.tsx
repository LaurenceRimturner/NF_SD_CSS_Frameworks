// Decorative soft light blobs behind the page.
export default function AeroBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute -top-24 -left-24 size-96 rounded-full bg-white/30 blur-3xl" />
      <div className="absolute top-1/3 -right-32 size-112 rounded-full bg-leaf/30 blur-3xl" />
      <div className="absolute -bottom-32 left-1/4 size-96 rounded-full bg-aqua/50 blur-3xl" />
    </div>
  );
}
