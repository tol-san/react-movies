const HeroBanner = ({ onPlayTrailer }) => {
  return (
    <section id="hero" className="relative w-full h-[85vh] sm:h-[90vh] lg:h-screen min-h-[580px] overflow-hidden bg-[#070406]">
      {/* Full Hero Image filling the hero section */}
      <div className="absolute inset-0 w-full h-full select-none">
        <img
          src="/images/hero-main.jpg"
          alt="Evil Dead Hero"
          className="w-full h-full object-cover object-center transform scale-[1.01] transition-transform duration-1000"
        />

        {/* Clean Vignette Fades */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070406] via-transparent to-[#070406]/35 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070406]/55 via-transparent to-[#070406]/55 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#070406]/70 to-transparent pointer-events-none" />
      </div>

      {/* Modern Floating Play Button */}
      <div className="absolute left-6 sm:left-14 md:left-20 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-2.5">
        <button
          type="button"
          onClick={() => onPlayTrailer('smTK_AeAPHs')}
          className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black/60 hover:bg-red-700/90 border border-white/70 hover:border-red-400 text-white backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.9)] transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
          aria-label="Play trailer"
        >
          <span className="absolute inset-0 rounded-full border border-red-500/50 animate-ping opacity-60 pointer-events-none" />
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 fill-current translate-x-0.5 group-hover:scale-110 transition-transform"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
        <span className="font-accent text-[11px] font-bold tracking-widest uppercase text-gray-300 group-hover:text-white select-none transition-colors">
          Trailer
        </span>
      </div>
    </section>
  )
}

export default HeroBanner
