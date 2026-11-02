import { useState, useEffect } from 'react'

const CommunityModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    setIsSubmitted(true)
  }

  const handleResetAndClose = () => {
    setIsSubmitted(false)
    setEmail('')
    onClose()
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={handleResetAndClose}
    >
      <div
        className="relative w-full max-w-md bg-[#0f070b] border border-red-900/40 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(193,18,31,0.25)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors cursor-pointer"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {isSubmitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-red-600/20 border border-red-500 flex items-center justify-center text-red-500 text-2xl">
              ✓
            </div>
            <h3 className="font-display text-2xl font-black text-white tracking-wider uppercase">
              Welcome
            </h3>
            <p className="font-body text-gray-300 text-sm leading-relaxed">
              You are connected. Confirmation dispatched to <strong className="text-red-400">{email}</strong>.
            </p>
            <button
              type="button"
              onClick={handleResetAndClose}
              className="btn-evil-red px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider mt-4 cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="font-display text-2xl font-black text-white tracking-wider uppercase">
                Join Community
              </h3>
              <p className="font-body text-xs text-gray-400">
                Receive release updates and invitations.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="font-accent block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="your.email@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="font-body w-full bg-[#180a10] border border-[#2e1218] focus:border-red-600 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full btn-evil-red py-3 rounded-xl font-bold uppercase tracking-widest text-xs mt-2 cursor-pointer shadow-lg shadow-red-950/60"
              >
                Join
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default CommunityModal
