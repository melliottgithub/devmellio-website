import { useState } from 'react'
import Hero from './components/Hero'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'

function App() {
  const [showCalendar, setShowCalendar] = useState(false)
  const [calLoaded, setCalLoaded] = useState(false)

  const handleBookCall = () => {
    setShowCalendar(true)
    // Scroll to Cal.com widget
    requestAnimationFrame(() => {
      const calSection = document.getElementById('cal-widget')
      if (calSection) {
        calSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })
  }

  return (
    <div className="bg-white">
      <Hero onBookCall={handleBookCall} calendlyLoaded={calLoaded} />

      {/* Contact Form with AI Analysis */}
      <ContactForm
        showCalendar={showCalendar}
        setShowCalendar={setShowCalendar}
        calendlyLoaded={calLoaded}
        setCalendlyLoaded={setCalLoaded}
      />

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
