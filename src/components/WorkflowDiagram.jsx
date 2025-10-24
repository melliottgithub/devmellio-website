// Animated workflow diagram - placeholder until you have demo videos

export default function WorkflowDiagram() {
  return (
    <div className="relative">
      {/* Glass Card */}
      <div className="relative bg-white/40 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">
        {/* Workflow Diagram */}
        <div className="space-y-6">
          {/* Step 1 */}
          <div className="flex items-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
              1
            </div>
            <div className="flex-1">
              <div className="h-3 bg-gradient-to-r from-primary-200 to-primary-100 rounded-full"></div>
              <p className="text-sm text-gray-600 mt-2">Manual Data Entry</p>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center">
            <svg className="w-6 h-6 text-gray-400 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>

          {/* Step 2 */}
          <div className="flex items-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
              2
            </div>
            <div className="flex-1">
              <div className="h-3 bg-gradient-to-r from-accent-200 to-accent-100 rounded-full w-3/4"></div>
              <p className="text-sm text-gray-600 mt-2">AI-Powered Automation</p>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center">
            <svg className="w-6 h-6 text-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>

          {/* Step 3 */}
          <div className="flex items-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
              3
            </div>
            <div className="flex-1">
              <div className="h-3 bg-gradient-to-r from-gray-300 to-gray-200 rounded-full w-1/2"></div>
              <p className="text-sm text-gray-600 mt-2">20+ Hours Saved Weekly</p>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/20">
          <div className="text-center p-3 bg-white/60 backdrop-blur-sm rounded-xl transform hover:scale-105 transition-transform">
            <div className="text-2xl font-bold text-primary-600">20+</div>
            <div className="text-xs text-gray-600 mt-1">Hours Saved</div>
          </div>
          <div className="text-center p-3 bg-white/60 backdrop-blur-sm rounded-xl transform hover:scale-105 transition-transform">
            <div className="text-2xl font-bold text-accent-600">3-14</div>
            <div className="text-xs text-gray-600 mt-1">Days Setup</div>
          </div>
          <div className="text-center p-3 bg-white/60 backdrop-blur-sm rounded-xl transform hover:scale-105 transition-transform">
            <div className="text-2xl font-bold text-gray-900">90%</div>
            <div className="text-xs text-gray-600 mt-1">Less Errors</div>
          </div>
        </div>

        {/* Badge */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100/80 backdrop-blur-sm border border-primary-200 rounded-full text-sm font-medium text-primary-700">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Automated in 3-14 days
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent-400/20 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary-400/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
    </div>
  )
}
