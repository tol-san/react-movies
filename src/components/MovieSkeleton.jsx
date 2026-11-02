export const MovieCardSkeleton = () => {
  return (
    <div className="movie-card animate-pulse border border-[#2f141a]">
      {/* Poster skeleton */}
      <div className="w-full aspect-[2/3] rounded-lg skeleton-shimmer bg-[#160b0f]" />

      {/* Meta skeleton */}
      <div className="mt-4 space-y-3">
        <div className="h-4 skeleton-shimmer rounded w-3/4 bg-[#1f0e15]" />

        <div className="content mt-2 flex flex-row items-center gap-2">
          <div className="h-3.5 w-10 skeleton-shimmer rounded bg-[#1f0e15]" />
          <span className="text-gray-700">•</span>
          <div className="h-3.5 w-8 skeleton-shimmer rounded bg-[#1f0e15]" />
          <span className="text-gray-700">•</span>
          <div className="h-3.5 w-12 skeleton-shimmer rounded bg-[#1f0e15]" />
        </div>
      </div>
    </div>
  )
}

export const TrendingCardSkeleton = ({ index }) => {
  return (
    <li className="min-w-[240px] flex flex-row items-center animate-pulse">
      <p className="fancy-text text-nowrap opacity-30">{index}</p>
      <div className="w-[130px] h-[170px] rounded-lg skeleton-shimmer -ml-3.5 shrink-0 bg-[#170a0e] border border-[#301319]" />
    </li>
  )
}

export const MovieGridSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 gap-6 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <MovieCardSkeleton key={i} />
      ))}
    </div>
  )
}
