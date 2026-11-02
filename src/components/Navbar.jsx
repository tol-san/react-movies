import { useState } from 'react'

const Navbar = ({ onOpenCommunity }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'News', href: '#news' },
    { name: 'Community', href: '#community' }
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#070406]/70 backdrop-blur-xl border-b border-[#240e14]/60 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-4 flex items-center justify-between">
        {/* Brand Logo with Cinzel display styling */}
        <a href="#hero" className="flex items-center gap-2 group select-none">
          <span className="font-display font-black text-xl tracking-[0.22em] text-white group-hover:text-red-500 transition-colors">
            EVIL <span className="text-red-600">DEAD</span>
          </span>
        </a>

        {/* Desktop Nav Items in Space Grotesk */}
        <div className="hidden md:flex items-center gap-9">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-accent text-xs font-semibold uppercase tracking-widest text-gray-400 hover:text-white transition-colors relative py-1 hover:after:w-full after:w-0 after:h-[2px] after:bg-red-600 after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-300"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Join Community CTA */}
        <div className="hidden md:flex items-center">
          <button
            type="button"
            onClick={onOpenCommunity}
            className="btn-evil-red px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer"
          >
            Join Community
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-gray-400 hover:text-white p-2 rounded-lg focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0c0508]/95 backdrop-blur-2xl border-b border-[#291017] px-6 py-5 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block font-accent text-xs font-semibold uppercase tracking-widest text-gray-300 hover:text-red-500 transition-colors py-1"
            >
              {link.name}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false)
              onOpenCommunity()
            }}
            className="w-full btn-evil-red px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider mt-2"
          >
            Join Community
          </button>
        </div>
      )}
    </nav>
  )
}

export default Navbar
