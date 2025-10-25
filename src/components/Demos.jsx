import { Button, Container, Section } from './ui'

const demos = [
  {
    id: 1,
    category: 'E-commerce Automation',
    icon: '🛒',
    title: 'Order Processing System',
    problem: 'Online jewelry store spending 15 hours every week manually processing orders, creating invoices, sending tracking emails, and updating inventory spreadsheets.',
    solution: 'Automated workflow that triggers on new Shopify orders, validates data with AI, creates QuickBooks invoices, sends customer emails, and updates inventory in real-time.',
    aiMagic: 'GPT-4 validates tracking numbers before sending (preventing those embarrassing wrong-number emails), detects duplicate orders automatically, and provides natural language error alerts.',
    results: [
      { label: 'Time Saved', value: '15 hrs → 20 min/week', highlight: true },
      { label: 'Cost Savings', value: '$2,400/month' },
      { label: 'Error Rate', value: '15% → 0.2%' },
      { label: 'Customer Satisfaction', value: '+40%' }
    ],
    tools: ['Make.com', 'GPT-4', 'Shopify API', 'QuickBooks', 'Google Sheets'],
    timeline: '7 days',
    complexity: 'Medium',
    tier: 'Complete Systems'
  },
  {
    id: 2,
    category: 'Sales & Marketing',
    icon: '📈',
    title: 'AI Lead Qualification Engine',
    problem: 'B2B SaaS company getting 50-100 leads daily. Sales team wastes 60% of time on unqualified leads while hot prospects slip through the cracks.',
    solution: 'Intelligent lead scoring system that analyzes form submissions, researches company online, scores fit, routes to appropriate sales rep, and logs everything to CRM automatically.',
    aiMagic: 'GPT-4 visits the company website, analyzes their tech stack, reads recent LinkedIn posts, detects buying signals, and generates personalized outreach talking points for your sales team.',
    results: [
      { label: 'Response Time', value: '4 hrs → 15 min', highlight: true },
      { label: 'Qualified Demos', value: '+3x booked' },
      { label: 'Revenue Impact', value: '+$15K MRR' },
      { label: 'Sales Efficiency', value: '+60%' }
    ],
    tools: ['Make.com', 'GPT-4', 'Airtable', 'HubSpot API', 'Slack'],
    timeline: '10 days',
    complexity: 'High',
    tier: 'AI-Powered'
  },
  {
    id: 3,
    category: 'Customer Support',
    icon: '🎯',
    title: 'Smart Ticket Intelligence',
    problem: 'Tech company drowning in 100+ daily Zendesk tickets. Team spending 4 hours/day categorizing, VIP customers getting lost in the queue, urgent issues missed.',
    solution: 'AI-powered ticket routing that understands context, checks VIP status, detects urgency, categorizes automatically, and alerts the right team instantly via Slack.',
    aiMagic: 'GPT-4 reads ticket content and understands intent (not just keywords), detects angry customers even when they\'re polite, prioritizes based on context, and escalates time-sensitive issues automatically.',
    results: [
      { label: 'Manual Time', value: '4 hrs/day → 1 hr', highlight: true },
      { label: 'VIP Response', value: '100% under 1 hour' },
      { label: 'Resolution Time', value: '-40% average' },
      { label: 'Team Satisfaction', value: '+85%' }
    ],
    tools: ['Zendesk API', 'GPT-4', 'Airtable', 'Slack', 'Make.com'],
    timeline: '5 days',
    complexity: 'Medium',
    tier: 'Complete Systems'
  },
  {
    id: 4,
    category: 'Data & Analytics',
    icon: '🏠',
    title: 'Real Estate MLS Automation',
    problem: 'Real estate analyst spending 6-8 hours every Monday downloading data from 5 different MLS systems, merging CSVs, calculating metrics, creating charts, and emailing 50 agents.',
    solution: 'Automated data pipeline that pulls from multiple MLS APIs, normalizes different formats, identifies new/sold/price-changed properties, generates insights with AI, and distributes personalized reports.',
    aiMagic: 'GPT-4 analyzes market trends, writes natural language insights ("3-bedroom homes in Westside up 12% this week"), detects anomalies, and generates personalized commentary for each agent based on their specialties.',
    results: [
      { label: 'Weekly Time', value: '8 hrs → 30 min', highlight: true },
      { label: 'Data Accuracy', value: '+95% consistency' },
      { label: 'Agent Engagement', value: '+200%' },
      { label: 'ROI', value: '$3K/month saved' }
    ],
    tools: ['Python', 'AWS Lambda', 'GPT-4', 'MLS APIs', 'SendGrid'],
    timeline: '12 days',
    complexity: 'High',
    tier: 'AI-Powered'
  }
]

export default function Demos() {
  return (
    <Section id="demos" background="white" spacing="xl">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            See How It Works
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Real automation systems I've built. From simple workflows to AI-powered intelligence.
          </p>
        </div>

        {/* Demo Grid */}
        <div className="space-y-12">
          {demos.map((demo, index) => (
            <div
              key={demo.id}
              className="bg-white border-2 border-gray-200 rounded-3xl p-8 md:p-10 hover:border-primary-300 hover:shadow-xl transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6 gap-4">
                <div className="flex items-start gap-4">
                  <div className="text-5xl">{demo.icon}</div>
                  <div>
                    <p className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-1">
                      {demo.category}
                    </p>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                      {demo.title}
                    </h3>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                    {demo.timeline}
                  </span>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                    demo.complexity === 'High'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {demo.complexity}
                  </span>
                </div>
              </div>

              {/* Problem */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-red-500">❌</span>
                  The Problem
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  {demo.problem}
                </p>
              </div>

              {/* Solution */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-green-500">✅</span>
                  The Solution
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  {demo.solution}
                </p>
              </div>

              {/* AI Magic */}
              <div className="mb-6 p-4 bg-gradient-to-r from-primary-50 to-accent-50 border-l-4 border-primary-500 rounded-lg">
                <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-2xl">🤖</span>
                  AI Magic
                </h4>
                <p className="text-gray-800 leading-relaxed">
                  {demo.aiMagic}
                </p>
              </div>

              {/* Results Grid */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4">📊 Results</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {demo.results.map((result, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border-2 ${
                        result.highlight
                          ? 'bg-primary-50 border-primary-300'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <p className="text-xs text-gray-600 mb-1">{result.label}</p>
                      <p className={`text-lg md:text-xl font-bold ${
                        result.highlight ? 'text-primary-600' : 'text-gray-900'
                      }`}>
                        {result.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools & CTA */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-6 border-t-2 border-gray-200">
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-2">Built With:</p>
                  <div className="flex flex-wrap gap-2">
                    {demo.tools.map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-white border border-gray-300 text-gray-700 text-sm rounded-lg"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      const contactSection = document.getElementById('contact')
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' })
                      }
                    }}
                  >
                    I Want This
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Solution CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-primary-500 to-accent-500 rounded-3xl p-8 md:p-12 text-white animate-fade-in-up">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Don't See Your Use Case?
          </h3>
          <p className="text-lg md:text-xl mb-6 text-white/90 max-w-2xl mx-auto">
            These are just examples. I build custom automation solutions for any workflow.
            Tell me what you need, and I'll design a system that actually works.
          </p>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => {
              const contactSection = document.getElementById('contact')
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' })
              }
            }}
          >
            Get Your Custom Solution
          </Button>
        </div>
      </Container>
    </Section>
  )
}
