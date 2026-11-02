import { useEffect, useState } from 'react'
import Search from './components/Search.jsx'
import Spinner from './components/Spinner.jsx'
import MovieCard from './components/MovieCard.jsx'
import { useDebounce } from 'react-use'
import { getTrendingMovies, updateSearchCount } from './trending.js'
import { MOVIES_DATA } from './data/movies.js'

const App = () => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const [movieList, setMovieList] = useState(MOVIES_DATA)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

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

  useEffect(() => {
    loadTrendingMovies()
  }, [])

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

        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>

            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id || movie.id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="all-movies">
          <h2>All Movies</h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
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
