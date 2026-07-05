export default function Loading() {
  return (
    <div className="fixed inset-0 bg-shakti-cream/80 backdrop-blur-sm z-[100] flex items-center justify-center font-sans">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-shakti-mitti/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-shakti-rust rounded-full border-t-transparent animate-spin"></div>
        </div>
        <p className="text-shakti-dark font-bold tracking-widest uppercase text-sm animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
