import Hero from './components/Hero'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />

      {/* More sections will be added here */}
      <div className="container mx-auto px-6 py-12 text-center text-gray-500">
        <p className="text-sm">✅ Hero section built with 2026 design system</p>
        <p className="text-xs mt-2">More sections coming next...</p>
      </div>
    </div>
  )
}

export default App
