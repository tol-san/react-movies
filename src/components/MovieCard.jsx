const MovieCard = ({ movie, onPlayTrailer }) => {
  const { title, vote_average, poster_path, release_date, original_language, genres, tagline, trailerId } = movie

  const imageSrc = poster_path
    ? poster_path.startsWith('/') || poster_path.startsWith('http')
      ? poster_path
      : `https://image.tmdb.org/t/p/w500/${poster_path}`
    : '/no-movie.png'

  const year = release_date ? release_date.split('-')[0] : 'N/A'
  const rating = vote_average ? vote_average.toFixed(1) : 'N/A'

  return (
    <div className="movie-card group">
      {/* Poster Image Container */}
      <div className="relative overflow-hidden rounded-lg bg-[#0e070a] aspect-[2/3] w-full">
        <img
          src={imageSrc}
          alt={title}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = '/no-movie.png'
          }}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient dark vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#120a0d] via-transparent to-transparent opacity-80" />

        {/* Rating Badge top-right */}
        <div className="absolute top-2.5 right-2.5 bg-black/80 backdrop-blur-md px-2 py-1 rounded-md border border-red-950/60 flex items-center gap-1 shadow-md">
          <svg className="w-3.5 h-3.5 fill-red-500 text-red-500" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-xs font-bold text-white">{rating}</span>
        </div>

        {/* Trailer play button on hover */}
        {trailerId && (
          <button
            type="button"
            onClick={() => onPlayTrailer && onPlayTrailer(trailerId)}
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/45 backdrop-blur-[2px] transition-all duration-300 cursor-pointer"
            aria-label={`Watch trailer for ${title}`}
          >
            <div className="w-11 h-11 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-lg shadow-red-900/60 transform scale-90 group-hover:scale-100 transition-transform">
              <svg className="w-5 h-5 fill-current translate-x-0.5" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </button>
        )}
      </div>

      {/* Movie Details */}
      <div className="mt-3.5 flex flex-col justify-between flex-1">
        <div>
          {/* Tagline or Genre preview */}
          {tagline ? (
            <p className="text-[11px] text-red-400 font-semibold italic line-clamp-1 mb-1">
              &ldquo;{tagline}&rdquo;
            </p>
          ) : genres && genres.length > 0 ? (
            <p className="text-[11px] text-gray-400 uppercase tracking-wider mb-1 line-clamp-1">
              {genres.slice(0, 2).join(' • ')}
            </p>
          ) : null}

          <h3
            className="text-white font-bold text-base line-clamp-1 group-hover:text-red-400 transition-colors font-['Montserrat']"
            title={title}
          >
            {title}
          </h3>
        </div>

        {/* Footer meta row */}
        <div className="mt-3 pt-2.5 border-t border-[#2d141b] flex items-center justify-between text-xs text-gray-400">
          <span className="px-1.5 py-0.5 rounded bg-red-950/40 border border-red-900/40 text-[10px] font-bold text-gray-300 uppercase">
            {original_language ? original_language.toUpperCase() : 'EN'}
          </span>

          <span className="font-medium text-gray-300">{year}</span>

          {trailerId ? (
            <button
              type="button"
              onClick={() => onPlayTrailer && onPlayTrailer(trailerId)}
              className="text-red-500 hover:text-red-400 font-bold text-[11px] uppercase tracking-wider cursor-pointer"
            >
              Trailer
            </button>
          ) : (
            <span className="text-[11px] text-gray-500">Film</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default MovieCard
