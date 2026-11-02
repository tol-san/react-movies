const MovieCard = ({ movie:
  { title, vote_average, poster_path, release_date, original_language }
}) => {
  const imageSrc = poster_path
    ? (poster_path.startsWith('/') || poster_path.startsWith('http')
        ? poster_path
        : `https://image.tmdb.org/t/p/w500/${poster_path}`)
    : '/no-movie.png';

  return (
    <div className="movie-card group">
      <div className="overflow-hidden rounded-lg bg-dark-100">
        <img
          src={imageSrc}
          alt={title}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = '/no-movie.png';
          }}
          className="aspect-[2/3] w-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="mt-4">
        <h3 title={title}>{title}</h3>

        <div className="content">
          <div className="rating">
            <img src="/star.svg" alt="Star Icon" />
            <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
          </div>

          <span>•</span>
          <p className="lang">{original_language ? original_language.toUpperCase() : 'N/A'}</p>

          <span>•</span>
          <p className="year">
            {release_date ? release_date.split('-')[0] : 'N/A'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
