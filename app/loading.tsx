export default function Loading() {
  return (
    <main className="min-h-screen bg-black text-white py-20 px-4">
      <div className="max-w-2xl mx-auto opacity-50 animate-pulse">
        <div className="mb-12">
          <div className="h-10 w-32 bg-zinc-800 rounded-lg mb-2"></div>
          <div className="h-4 w-48 bg-zinc-900 rounded-lg"></div>
        </div>
        <div className="h-16 w-full bg-zinc-900 rounded-2xl mb-12"></div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 w-full bg-zinc-900 rounded-2xl border border-zinc-800"></div>
          ))}
        </div>
      </div>
    </main>
  );
}
