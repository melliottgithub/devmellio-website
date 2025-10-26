import { useState, useEffect } from 'react'
import WorkflowDiagram from './WorkflowDiagram'
import { Button, Container, Section } from './ui'

export default function Hero({ onBookCall, calendlyLoaded }) {
  const [stats, setStats] = useState(null)
  const [currentStatIndex, setCurrentStatIndex] = useState(0)

  useEffect(() => {
    fetch('https://w3o3gzmmwa.execute-api.us-east-1.amazonaws.com/prod/stats/public')
      .then(r => r.json())
      .then(data => setStats(data))
      .catch(err => console.error('Failed to load stats:', err))
  }, [])

  // Auto-rotate stats every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatIndex(prev => (prev + 1) % 3)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const ArrowIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  )

  const statsData = [
    {
      icon: (
        <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgColor: 'bg-primary-100',
      text: stats ? `${stats.hours_weekly_potential}+ hours/week opportunities identified` : '165+ hours/week opportunities identified'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgColor: 'bg-green-100',
      text: stats ? `$${Math.round(stats.cost_savings_annual_potential / 1000)}K+ in annual savings potential` : '$354K+ in annual savings potential'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgColor: 'bg-accent-100',
      text: stats ? `${stats.opportunities_analyzed}+ automation opportunities analyzed` : '14+ automation opportunities analyzed'
    }
  ]

  const currentStat = statsData[currentStatIndex]

  return (
    <Section background="gradient" spacing="lg" className="min-h-screen flex items-center overflow-hidden">
      <Container>
        {/* Content Grid - Stacks on mobile, side-by-side on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: Text Content - Mobile First */}
          <div className="text-center lg:text-left space-y-6 md:space-y-8 animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-primary-200 rounded-full text-sm font-medium text-primary-700">
              <span className="w-2 h-2 bg-accent-500 rounded-full animate-pulse"></span>
              AI-Powered Automation
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Stop Wasting{' '}
              <span className="text-primary-600">20+ Hours</span>{' '}
              Per Week on Manual Work
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              AI-powered automation systems built by an AI engineer.
              Get results in 3-14 days with proven workflows.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Button
                variant="primary"
                size="md"
                icon={<ArrowIcon />}
                onClick={onBookCall}
                className="relative"
              >
                {/* Green indicator when Calendly is ready */}
                {calendlyLoaded && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                )}
                Book a Strategy Call
              </Button>
            </div>

            {/* Social Proof - Rotating Stats Carousel */}
            <div className="pt-8 flex items-center justify-center lg:justify-start">
              <div className="relative flex items-center gap-3 min-h-[60px]">
                {/* Animated stat display */}
                <div
                  key={currentStatIndex}
                  className="flex items-center gap-3 animate-fade-in"
                >
                  <div className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full ${currentStat.bgColor} transition-colors duration-500`}>
                    {currentStat.icon}
                  </div>
                  <span className="font-medium text-sm sm:text-base text-gray-700 max-w-xs sm:max-w-md">
                    {currentStat.text}
                  </span>
                </div>

                {/* Dots indicator */}
                <div className="flex gap-1.5 ml-2">
                  {statsData.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentStatIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        idx === currentStatIndex
                          ? 'bg-primary-600 w-6'
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`View stat ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Visual - Hidden on mobile */}
          <div className="hidden lg:block animate-slide-in-right">
            <WorkflowDiagram />
          </div>
        </div>
      </Container>

      {/* Scroll Indicator */}
      <div className="hidden lg:block absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </Section>
  )
}
