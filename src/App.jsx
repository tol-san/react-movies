import { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import HeroBanner from './components/HeroBanner.jsx'
import AboutSection from './components/AboutSection.jsx'
import NewsSection from './components/NewsSection.jsx'
import CommunitySection from './components/CommunitySection.jsx'
import Footer from './components/Footer.jsx'
import TrailerModal from './components/TrailerModal.jsx'
import CommunityModal from './components/CommunityModal.jsx'

const App = () => {
  const [activeTrailerId, setActiveTrailerId] = useState(null)
  const [isCommunityOpen, setIsCommunityOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#0a0608] text-gray-200 relative selection:bg-red-700 selection:text-white">
      {/* Top Navbar */}
      <Navbar onOpenCommunity={() => setIsCommunityOpen(true)} />

      {/* Main Hero Banner */}
      <HeroBanner onPlayTrailer={(id) => setActiveTrailerId(id || 'smTK_AeAPHs')} />

      {/* About Section */}
      <AboutSection />

      {/* News Section */}
      <NewsSection onPlayTrailer={(id) => setActiveTrailerId(id || 'smTK_AeAPHs')} />

      {/* Community Callout Banner */}
      <CommunitySection onOpenCommunity={() => setIsCommunityOpen(true)} />

      {/* Footer */}
      <Footer />

      {/* Interactive Trailer Modal */}
      <TrailerModal
        trailerId={activeTrailerId}
        onClose={() => setActiveTrailerId(null)}
      />

      {/* Interactive Community Modal */}
      <CommunityModal
        isOpen={isCommunityOpen}
        onClose={() => setIsCommunityOpen(false)}
      />
    </div>
  )
}

export default App
