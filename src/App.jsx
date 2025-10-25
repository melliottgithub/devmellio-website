import Hero from './components/Hero'
import Demos from './components/Demos'
import ContactForm from './components/ContactForm'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />

      {/* Demos Section */}
      <Demos />

      {/* Contact Form with AI Analysis */}
      <ContactForm />

      {/* More sections will be added here */}
      <div className="container mx-auto px-6 py-12 text-center text-gray-500">
        <p className="text-sm">✅ Hero → Demos → AI Contact Form</p>
        <p className="text-xs mt-2">More sections coming next...</p>
      </div>
    </div>
  )
}

export default App
