import { useState } from 'react'
import Hero from './components/Hero'
import ContactForm from './components/ContactForm'

function App() {
  const [showCalendar, setShowCalendar] = useState(false)

  const handleBookCall = () => {
    setShowCalendar(true)
    // Scroll to contact section
    setTimeout(() => {
      const contactSection = document.getElementById('contact')
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

  return (
    <div className="min-h-screen bg-white">
      <Hero onBookCall={handleBookCall} />

      {/* Contact Form with AI Analysis */}
      <ContactForm showCalendar={showCalendar} setShowCalendar={setShowCalendar} />
    </div>
  )
}

export default App
