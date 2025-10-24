export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Gradient Background - Mobile First */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50 -z-10" />

      {/* Container - Mobile First with proper padding */}
      <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-12 md:py-20">
        {/* Content Grid - Stacks on mobile, side-by-side on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: Text Content - Mobile First */}
          <div className="text-center lg:text-left space-y-6 md:space-y-8 animate-fade-in-up">
            {/* Badge - Optional */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-primary-200 rounded-full text-sm font-medium text-primary-700">
              <span className="w-2 h-2 bg-accent-500 rounded-full animate-pulse"></span>
              AI-Powered Automation
            </div>

            {/* Headline - Responsive sizes, mobile-first */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Stop Wasting{' '}
              <span className="text-primary-600">20+ Hours</span>{' '}
              Per Week on Manual Work
            </h1>

            {/* Subheadline - Larger for readability */}
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              AI-powered automation systems built by a senior engineer.
              See working demos in 4 minutes, get results in 3-14 days.
            </p>

            {/* CTAs - Stack on mobile, inline on larger screens */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              {/* Primary CTA */}
              <button className="group px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                <span className="flex items-center justify-center gap-2">
                  Watch 4-Minute Demo
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </button>

              {/* Secondary CTA */}
              <button className="group px-8 py-4 bg-white text-primary-600 text-lg font-semibold border-2 border-primary-600 rounded-full hover:bg-primary-50 transform hover:-translate-y-1 transition-all duration-300">
                <span className="flex items-center justify-center gap-2">
                  Get Free Automation Audit
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
            </div>

            {/* Social Proof - Mobile friendly */}
            <div className="pt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-100">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="font-medium">500+ hours saved for clients</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent-100">
                  <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="font-medium">36+ projects analyzed</span>
              </div>
            </div>
          </div>

          {/* Right: Visual - Hidden on mobile, shows on tablet+ */}
          <div className="hidden lg:block animate-slide-in-right">
            {/* Glassmorphism Card with Demo Preview */}
            <div className="relative group">
              {/* Glass Card */}
              <div className="relative bg-white/40 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">
                {/* Video Placeholder */}
                <div className="aspect-video bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl flex items-center justify-center overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-10 h-10 text-primary-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* Mockup Content */}
                  <div className="absolute inset-0 p-6 text-left">
                    <div className="space-y-3">
                      <div className="h-4 bg-white/60 rounded w-3/4"></div>
                      <div className="h-4 bg-white/40 rounded w-1/2"></div>
                      <div className="h-32 bg-white/30 rounded mt-4"></div>
                    </div>
                  </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center p-3 bg-white/60 backdrop-blur-sm rounded-xl">
                    <div className="text-2xl font-bold text-primary-600">20+</div>
                    <div className="text-xs text-gray-600 mt-1">Hours Saved</div>
                  </div>
                  <div className="text-center p-3 bg-white/60 backdrop-blur-sm rounded-xl">
                    <div className="text-2xl font-bold text-accent-600">3-14</div>
                    <div className="text-xs text-gray-600 mt-1">Days Setup</div>
                  </div>
                  <div className="text-center p-3 bg-white/60 backdrop-blur-sm rounded-xl">
                    <div className="text-2xl font-bold text-gray-900">90%</div>
                    <div className="text-xs text-gray-600 mt-1">Less Errors</div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent-400/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary-400/20 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Hidden on mobile */}
      <div className="hidden lg:block absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
