import { INITIAL_TRENDING_MOVIES } from './data/movies.js';

const STORAGE_KEY = 'static_movie_trending_searches';

export const updateSearchCount = async (searchTerm, movie) => {
  if (!searchTerm || !movie) return;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    let trending = raw ? JSON.parse(raw) : [...INITIAL_TRENDING_MOVIES];

    const cleanTerm = searchTerm.trim().toLowerCase();
    const existingIndex = trending.findIndex(
      (item) =>
        item.id === movie.id ||
        (item.title && item.title.toLowerCase() === cleanTerm)
    );

    if (existingIndex !== -1) {
      trending[existingIndex].count = (trending[existingIndex].count || 0) + 1;
    } else {
      trending.push({
        $id: `local-${Date.now()}-${movie.id}`,
        id: movie.id,
        title: movie.title,
        poster_url: movie.poster_path || movie.poster_url || '/no-movie.png',
        count: 1
      });
    }

    // Keep sorted by count descending
    trending.sort((a, b) => (b.count || 0) - (a.count || 0));

    localStorage.setItem(STORAGE_KEY, JSON.stringify(trending));
  } catch (error) {
    console.error('Error updating local search count:', error);
  }
};

export const getTrendingMovies = async () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TRENDING_MOVIES));
      return INITIAL_TRENDING_MOVIES;
    }
    const trending = JSON.parse(raw);
    return trending.slice(0, 5);
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return INITIAL_TRENDING_MOVIES;
  }
};
