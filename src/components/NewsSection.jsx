const NEWS_CARDS = [
  {
    id: 'news-1',
    title: 'Evil Dead Rise',
    year: '2023',
    poster: '/images/poster-evil-dead-rise.jpg',
    description: 'Lee Cronin shifts the Deadite nightmare to an LA high-rise apartment building.',
    trailerId: 'smTK_AeAPHs'
  },
  {
    id: 'news-2',
    title: 'The Evil Dead',
    year: '1981',
    poster: '/images/poster-the-evil-dead.jpg',
    description: 'Sam Raimi’s indie masterpiece that redefined supernatural horror cinema.',
    trailerId: 'NL6jL8yD_Lg'
  },
  {
    id: 'news-3',
    title: 'Splatter Royale',
    year: 'Game Update',
    poster: '/images/hero-main.jpg',
    description: '40-player battle royale update featuring custom weapons and Deadite classes.',
    trailerId: 'CZ-wU5eT4uE'
  }
]

const NewsSection = ({ onPlayTrailer }) => {
  return (
    <section id="news" className="py-20 sm:py-28 relative overflow-hidden bg-[#090407]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-12 sm:mb-16">
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-widest uppercase">
            News
          </h2>
          <span className="font-accent text-xs font-semibold text-gray-400 uppercase tracking-widest">
            Latest Releases
          </span>
        </div>

        {/* 3-Column Clean Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
          {NEWS_CARDS.map((item) => (
            <article
              key={item.id}
              className="evil-card rounded-2xl overflow-hidden flex flex-col justify-between group transition-all duration-300 shadow-xl"
            >
              {/* Media Visual */}
              <div className="relative aspect-[16/10] overflow-hidden bg-black">
                <img
                  src={item.poster}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0609] via-transparent to-transparent opacity-90" />

                {/* Quick Play Trigger */}
                <button
                  type="button"
                  onClick={() => onPlayTrailer(item.trailerId)}
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 backdrop-blur-[2px] transition-opacity cursor-pointer"
                  aria-label={`Preview ${item.title}`}
                >
                  <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-900/60 transform scale-90 group-hover:scale-100 transition-transform">
                    <svg className="w-5 h-5 fill-current translate-x-0.5" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </button>
              </div>

              {/* Minimal Clean Text Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-accent text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                      {item.title}
                    </h3>
                    <span className="font-accent text-xs font-semibold text-red-500">
                      {item.year}
                    </span>
                  </div>

                  <p className="font-body text-xs sm:text-sm text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#260f15] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => onPlayTrailer(item.trailerId)}
                    className="font-accent text-xs font-bold text-gray-300 hover:text-red-400 uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <span>Watch Preview</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default NewsSection
