const AboutSection = () => {
  return (
    <section id="about" className="py-20 sm:py-28 relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-red-950/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        {/* Section Heading with Cinzel font */}
        <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-widest uppercase mb-10 sm:mb-14">
          About
        </h2>

        {/* 2-Column Responsive Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Text Card: Clean, modern, concise without clutter */}
          <div className="lg:col-span-7 evil-card rounded-2xl sm:rounded-3xl p-8 sm:p-12 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
            <div className="space-y-6 my-auto">
              <p className="font-body text-gray-200 text-lg sm:text-xl font-normal leading-relaxed">
                Five films. One isolated cabin. Over four decades of groundbreaking horror created by Sam Raimi.
              </p>

              <p className="font-body text-gray-400 text-sm sm:text-base leading-relaxed">
                The saga centers on the <span className="text-red-500 font-medium">Necronomicon Ex-Mortis</span>, an ancient Sumerian grimoire that unleashes relentless demonic forces.
              </p>
            </div>

            {/* Minimal Stat Badges using Space Grotesk */}
            <div className="grid grid-cols-3 gap-4 pt-8 mt-8 border-t border-[#2a1117]">
              <div>
                <span className="font-accent block text-2xl sm:text-3xl font-bold text-white tracking-tight">5</span>
                <span className="font-accent text-[11px] font-semibold text-gray-400 uppercase tracking-widest">Films</span>
              </div>
              <div>
                <span className="font-accent block text-2xl sm:text-3xl font-bold text-white tracking-tight">1981</span>
                <span className="font-accent text-[11px] font-semibold text-gray-400 uppercase tracking-widest">Genesis</span>
              </div>
              <div>
                <span className="font-accent block text-2xl sm:text-3xl font-bold text-red-500 tracking-tight">Icon</span>
                <span className="font-accent text-[11px] font-semibold text-gray-400 uppercase tracking-widest">Ash Williams</span>
              </div>
            </div>
          </div>

          {/* Right Artwork Card */}
          <div className="lg:col-span-5 evil-card rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-2xl flex items-center justify-center relative overflow-hidden group">
            <div className="relative w-full h-full min-h-[340px] sm:min-h-[400px] rounded-xl sm:rounded-2xl overflow-hidden bg-black flex items-center justify-center">
              <img
                src="/images/about-poster-clean.jpg"
                alt="Evil Dead Franchise Artwork"
                className="w-full h-full object-cover object-center filter contrast-125 brightness-95 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0508] via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
