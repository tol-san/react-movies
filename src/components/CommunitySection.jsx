const CommunitySection = ({ onOpenCommunity }) => {
  return (
    <section id="community" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        {/* Clean Modern Community Banner */}
        <div className="evil-card rounded-2xl sm:rounded-3xl p-8 sm:p-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Red Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-800/10 blur-3xl rounded-full pointer-events-none" />

          {/* Left Minimal Text */}
          <div className="max-w-xl space-y-3 text-center md:text-left relative z-10">
            <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-widest uppercase">
              Community
            </h2>
            <p className="font-body text-gray-400 text-sm sm:text-base leading-relaxed">
              Join fans worldwide for exclusive screenings, releases, and updates.
            </p>
          </div>

          {/* Right Clean Action Button */}
          <div className="shrink-0 relative z-10 w-full md:w-auto flex justify-center">
            <button
              type="button"
              onClick={onOpenCommunity}
              className="btn-evil-red w-full sm:w-auto px-10 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest cursor-pointer shadow-xl shadow-red-950/60"
            >
              Join
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CommunitySection
