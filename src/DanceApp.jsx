import { useState } from 'react'
import DanceHero2026 from './components/DanceHero2026'
import DanceContactForm from './components/DanceContactForm'
import Footer from './components/Footer'

function DanceApp() {
  const [showCalendar, setShowCalendar] = useState(false)

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
      {/* Hero Section - 2026 Sophisticated */}
      <DanceHero2026 onBookCall={handleBookCall} />

      {/* Booking Section */}
      <DanceContactForm
        showCalendar={showCalendar}
        setShowCalendar={setShowCalendar}
      />

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default DanceApp
