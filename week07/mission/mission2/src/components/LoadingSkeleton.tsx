export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-gray-300 h-64 rounded-lg mb-2" />
          <div className="bg-gray-300 h-4 rounded w-3/4 mb-2" />
          <div className="bg-gray-300 h-4 rounded w-1/2" />
        </div>
      ))}
    </div>
  );
}
