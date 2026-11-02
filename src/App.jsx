import { useEffect, useState } from 'react'
import Search from './components/Search.jsx'
import MovieCard from './components/MovieCard.jsx'
import { MovieGridSkeleton, TrendingCardSkeleton } from './components/MovieSkeleton.jsx'
import { useDebounce } from 'react-use'
import { getTrendingMovies, updateSearchCount } from './trending.js'
import { MOVIES_DATA } from './data/movies.js'

const App = () => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const [movieList, setMovieList] = useState(MOVIES_DATA)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialLoading, setIsInitialLoading] = useState(true)

  const [trendingMovies, setTrendingMovies] = useState([])

  // Debounce the search term to prevent jitter while typing
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 300, [searchTerm])

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies()
      setTrendingMovies(movies || [])
    } catch (error) {
      console.error(`Error fetching trending movies: ${error}`)
    }
  }

  // Initial load simulation for smooth skeleton presentation
  useEffect(() => {
    loadTrendingMovies()
    const timer = setTimeout(() => {
      setIsInitialLoading(false)
    }, 450)
    return () => clearTimeout(timer)
  }, [])

  // Filter movies locally based on debounced search query
  useEffect(() => {
    setIsLoading(true)
    setErrorMessage('')

    const query = debouncedSearchTerm.trim().toLowerCase()

    try {
      if (!query) {
        setMovieList(MOVIES_DATA)
      } else {
        const filtered = MOVIES_DATA.filter((movie) => {
          const titleMatch = movie.title.toLowerCase().includes(query)
          const genreMatch = movie.genres?.some((g) => g.toLowerCase().includes(query))
          const yearMatch = movie.release_date?.startsWith(query)
          return titleMatch || genreMatch || yearMatch
        })

        setMovieList(filtered)

        if (filtered.length === 0) {
          setErrorMessage(`No movies found matching "${debouncedSearchTerm}"`)
        } else {
          // Increment search counter for the top matching movie
          updateSearchCount(debouncedSearchTerm, filtered[0]).then(() => {
            loadTrendingMovies()
          })
        }
      }
    } catch (error) {
      console.error(`Error filtering movies: ${error}`)
      setErrorMessage('Something went wrong while filtering movies.')
    } finally {
      setIsLoading(false)
    }
  }, [debouncedSearchTerm])

  // Show skeleton while initial loading, during filter computation, or while debounce is settling
  const isPendingSearch = searchTerm.trim() !== debouncedSearchTerm.trim()
  const showSkeleton = isInitialLoading || isLoading || isPendingSearch

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="/hero.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You&apos;ll Enjoy Without the Hassle
          </h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className="trending">
          <h2>Trending Movies</h2>

          {isInitialLoading ? (
            <ul className="hide-scrollbar">
              {Array.from({ length: 5 }).map((_, index) => (
                <TrendingCardSkeleton key={index} index={index + 1} />
              ))}
            </ul>
          ) : (
            trendingMovies.length > 0 && (
              <ul className="hide-scrollbar">
                {trendingMovies.map((movie, index) => (
                  <li key={movie.$id || movie.id}>
                    <p>{index + 1}</p>
                    <img
                      src={movie.poster_url || '/no-movie.png'}
                      alt={movie.title}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = '/no-movie.png'
                      }}
                    />
                  </li>
                ))}
              </ul>
            )
          )}
        </section>

        <section className="all-movies">
          <h2>All Movies</h2>

          {showSkeleton ? (
            <MovieGridSkeleton count={8} />
          ) : errorMessage ? (
            <div className="py-10 text-center">
              <p className="text-red-400 text-lg font-medium">{errorMessage}</p>
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="mt-4 px-4 py-2 bg-light-100/10 hover:bg-light-100/20 text-white rounded-lg transition-colors cursor-pointer text-sm"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default App
