const CATEGORIES = [
  'All',
  'Evil Dead Saga',
  'Horror',
  'Action',
  'Sci-Fi',
  'Drama'
]

const Search = ({ searchTerm, setSearchTerm, activeCategory, setActiveCategory }) => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Search Input Bar */}
      <div className="search-wrapper px-4 py-3 shadow-xl">
        <div className="relative flex items-center">
          {/* Blood-red search icon */}
          <svg
            className="absolute left-2.5 h-5 w-5 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>

          <input
            type="text"
            placeholder="Search movies, Evil Dead titles, or genres..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoComplete="off"
            spellCheck="false"
            className="w-full bg-transparent py-2 pr-10 pl-11 text-base text-gray-100 placeholder-gray-400 outline-none"
          />

          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="absolute right-2 text-gray-400 hover:text-red-400 transition-colors cursor-pointer text-sm font-semibold p-1.5"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
        {CATEGORIES.map((cat) => {
          const isSelected = activeCategory === cat
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer select-none uppercase ${
                isSelected
                  ? 'bg-red-700 text-white shadow-md shadow-red-950/60 border border-red-500'
                  : 'bg-[#180e12] text-gray-400 hover:text-white hover:bg-[#25131a] border border-[#30151c]'
              }`}
            >
              {cat}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default Search
