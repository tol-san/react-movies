export const MovieCardSkeleton = () => {
  return (
    <div className="movie-card animate-pulse">
      {/* Poster skeleton */}
      <div className="w-full aspect-[2/3] rounded-lg skeleton-shimmer bg-dark-100" />

      {/* Meta skeleton */}
      <div className="mt-4 space-y-3">
        <div className="h-4 skeleton-shimmer rounded w-3/4" />

        <div className="content mt-2 flex flex-row items-center gap-2">
          <div className="h-3.5 w-10 skeleton-shimmer rounded" />
          <span className="text-gray-600">•</span>
          <div className="h-3.5 w-8 skeleton-shimmer rounded" />
          <span className="text-gray-600">•</span>
          <div className="h-3.5 w-12 skeleton-shimmer rounded" />
        </div>
      </div>
    </div>
  )
}

export const TrendingCardSkeleton = ({ index }) => {
  return (
    <li className="min-w-[230px] flex flex-row items-center animate-pulse">
      <p className="fancy-text mt-[22px] text-nowrap opacity-40">{index}</p>
      <div className="w-[127px] h-[163px] rounded-lg skeleton-shimmer -ml-3.5 shrink-0" />
    </li>
  )
}

export const MovieGridSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <MovieCardSkeleton key={i} />
      ))}
    </div>
  )
}
