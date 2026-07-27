export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-24 px-6 max-w-6xl mx-auto">
      {/* Header Skeleton */}
      <div className="space-y-3 animate-pulse mb-8">
        <div className="h-4 w-28 bg-slate-200 rounded-md"></div>
        <div className="h-8 w-64 bg-slate-300 rounded-lg"></div>
        <div className="h-4 w-96 bg-slate-200 rounded-md"></div>
      </div>

      {/* Grid Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm animate-pulse flex flex-col justify-between h-[380px]"
          >
            <div className="h-48 bg-slate-200 w-full" />
            <div className="p-6 space-y-3">
              <div className="h-4 w-20 bg-slate-200 rounded-full" />
              <div className="h-5 w-3/4 bg-slate-300 rounded-md" />
              <div className="space-y-2 pt-2">
                <div className="h-3 w-full bg-slate-200 rounded" />
                <div className="h-3 w-5/6 bg-slate-200 rounded" />
              </div>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 h-12" />
          </div>
        ))}
      </div>
    </div>
  );
}