import { Button } from './ui'

export default function DanceHero2026({ onBookCall }) {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 overflow-hidden">
      {/* Animated gradient orbs - sophisticated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-indigo-500/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Glassmorphism container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-5xl w-full">

          {/* Main content card with frosted glass effect */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-12 md:p-16 shadow-2xl">

            {/* Headline - Kinetic feel */}
            <div className="text-center space-y-6 mb-8">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-none tracking-tight">
                <span className="bg-gradient-to-r from-blue-300 via-sky-200 to-indigo-300 bg-clip-text text-transparent">
                  Master the Art
                </span>
                <br/>
                <span className="text-white">of Social Dancing</span>
              </h1>

              <p className="text-xl sm:text-2xl text-gray-300 font-light">
                Social Bachata Training with Michael Elliott
              </p>

              <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">
                Learn to dance with passion, energy & authentic connection
              </p>
            </div>

            {/* CTA - FIRST - Above everything else */}
            <div className="text-center mb-12">
              <button
                onClick={onBookCall}
                className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:via-indigo-500 hover:to-blue-600 text-white text-xl font-bold rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
              >
                <span>Start Your Journey</span>
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <p className="mt-4 text-sm text-gray-400">
                In-Person Training • Social Dance Courses • All Levels Welcome
              </p>
            </div>

            {/* Credentials Grid - All the info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl sm:text-4xl font-bold text-blue-400 mb-1">150+</div>
                <div className="text-xs sm:text-sm text-gray-400">Private Hours</div>
              </div>
              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl sm:text-4xl font-bold text-sky-400 mb-1">48+</div>
                <div className="text-xs sm:text-sm text-gray-400">Workshops</div>
              </div>
              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl sm:text-4xl font-bold text-indigo-400 mb-1">15</div>
                <div className="text-xs sm:text-sm text-gray-400">Cities</div>
              </div>
              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl sm:text-4xl font-bold text-cyan-400 mb-1">2+</div>
                <div className="text-xs sm:text-sm text-gray-400">Years Training</div>
              </div>
            </div>

            {/* Instructors - Highlighted */}
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
              <h3 className="text-sm font-semibold text-gray-400 mb-4 text-center">TRAINING EXTENSIVELY WITH THE LEGENDS</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-center sm:text-left">
                <div className="space-y-2">
                  <div className="text-white font-semibold">Ataca & la Alemana</div>
                  <div className="text-xs text-gray-400">Island Touch | 100M+ Views</div>
                </div>
                <div className="space-y-2">
                  <div className="text-white font-semibold">Korke & Judith</div>
                  <div className="text-xs text-gray-400">Bachata Sensual Creators</div>
                </div>
                <div className="space-y-2">
                  <div className="text-white font-semibold">Gero & Migle</div>
                  <div className="text-xs text-gray-400">Esencia Method</div>
                </div>
                <div className="space-y-2">
                  <div className="text-white font-semibold">Klau y Ros</div>
                  <div className="text-xs text-gray-400">Endless Bachata</div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10 text-center">
                <div className="text-sm text-gray-300">
                  + Bachata Sensual America & Sensual Movement instructors
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              <div className="backdrop-blur-md bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-2 text-sm text-blue-200">
                ✨ Competition Winner
              </div>
              <div className="backdrop-blur-md bg-indigo-500/20 border border-indigo-400/30 rounded-full px-4 py-2 text-sm text-indigo-200">
                🎓 Certified Island Touch
              </div>
              <div className="backdrop-blur-md bg-sky-500/20 border border-sky-400/30 rounded-full px-4 py-2 text-sm text-sky-200">
                💃 Passionate Connections
              </div>
            </div>

          </div>

          {/* Bottom trust line */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>Elevate your social dance • Master flow, musicality & authentic connection</p>
          </div>
        </div>
      </div>
    </div>
  )
}
