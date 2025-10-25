import WorkflowDiagram from './WorkflowDiagram'
import { Button, Container, Section } from './ui'

export default function Hero() {
  const ArrowIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  )

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
                onClick={() => {
                  const demoSection = document.getElementById('demos')
                  if (demoSection) {
                    demoSection.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
              >
                See How It Works
              </Button>

              <Button
                variant="secondary"
                size="md"
                icon={<ArrowIcon />}
                onClick={() => {
                  const contactSection = document.getElementById('contact')
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
              >
                Get Free Automation Audit
              </Button>
            </div>

            {/* Social Proof */}
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
