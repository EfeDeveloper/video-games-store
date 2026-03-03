export const Loader = () => {
  return (
    <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="bg-[#27272A] rounded-lg overflow-hidden animate-pulse"
        >
          <div className="bg-gray-700 aspect-video" />
          <div className="space-y-3 p-4">
            <div className="bg-gray-700 rounded w-3/4 h-6" />
            <div className="bg-gray-700 rounded w-1/2 h-4" />
            <div className="bg-gray-700 rounded w-2/3 h-4" />
            <div className="flex justify-between items-center mt-4">
              <div className="bg-gray-700 rounded w-20 h-8" />
              <div className="bg-gray-700 rounded w-24 h-10" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
