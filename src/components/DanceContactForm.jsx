import { useState, useEffect } from 'react'
import { Button, Container, Section } from './ui'

export default function DanceContactForm({ showCalendar: showCalendarProp, setShowCalendar: setShowCalendarProp }) {
  const [meetingScheduled, setMeetingScheduled] = useState(false)
  const [calInitialized, setCalInitialized] = useState(false)
  const showCalendar = showCalendarProp || false
  const setShowCalendar = setShowCalendarProp || (() => {})

  // Initialize Cal.com widget when ready
  useEffect(() => {
    // Poll for Cal.com to be available
    const checkCal = () => {
      if (window.Cal && !calInitialized) {
        setCalInitialized(true)
      }
    }

    // Check every 100ms for up to 5 seconds
    const interval = setInterval(checkCal, 100)
    const timeout = setTimeout(() => clearInterval(interval), 5000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [calInitialized])

  // Initialize Cal.com inline widget
  useEffect(() => {
    if (calInitialized && window.Cal) {
      const Cal = window.Cal

      // Listen for booking successful event
      Cal("on", {
        action: "bookingSuccessful",
        callback: (e) => {
          setMeetingScheduled(true)

          // Track conversion event in Google Analytics (if available)
          if (window.gtag) {
            window.gtag('event', 'lesson_booked', {
              event_category: 'conversion',
              event_label: 'private_lesson',
              value: 1
            })
          }
        }
      })

      // Initialize Cal.com inline widget with the provided code
      Cal("init", "dance-privates", {origin:"https://app.cal.com"})

      Cal.ns["dance-privates"]("inline", {
        elementOrSelector:"#my-cal-inline-dance-privates",
        config: {"layout":"month_view"},
        calLink: "wedancebachata/dance-privates",
      })

      Cal.ns["dance-privates"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"})
    }
  }, [calInitialized])

  // Scroll to success message when booking is confirmed
  useEffect(() => {
    if (meetingScheduled) {
      requestAnimationFrame(() => {
        const successEl = document.getElementById('booking-success')
        if (successEl) {
          successEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      })
    }
  }, [meetingScheduled])

  return (
    <Section
      id="contact"
      background="white"
      spacing={showCalendar || meetingScheduled ? "xl" : "none"}
      style={{ display: showCalendar || meetingScheduled ? 'block' : 'none' }}
    >
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Cal.com Widget */}
          <div
            id="cal-widget"
            className="-mx-4 sm:mx-0 relative"
            style={{
              display: showCalendar && !meetingScheduled ? 'block' : 'none'
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowCalendar(false)}
              className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-center"
              aria-label="Close calendar"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div
              id="my-cal-inline-dance-privates"
              style={{
                width: '100%',
                height: '100%',
                overflow: 'scroll',
                minHeight: 'calc(100vh - 120px)'
              }}
              className="sm:min-h-[900px]"
            ></div>
          </div>

          {/* Success Message */}
          {meetingScheduled && (
            <div
              id="booking-success"
              className="sm:bg-gradient-to-br sm:from-green-50 sm:to-blue-50 sm:border-2 sm:border-green-200 sm:rounded-3xl sm:shadow-xl p-4 sm:p-8 md:p-10 text-center animate-fade-in-up"
            >
              <div className="mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">You're All Set!</h3>
                <p className="text-lg text-gray-700">
                  Your private lesson has been scheduled. Check your email for the confirmation and details.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 mb-6 max-w-2xl mx-auto">
                <h4 className="text-lg font-bold text-gray-900 mb-4">What to Expect</h4>
                <div className="space-y-3 text-left text-gray-700">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <strong>Calendar invitation sent</strong> - Check your email for the meeting link and details
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <strong>Personalized instruction</strong> - We'll focus on what YOU need to improve
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <strong>World-class technique</strong> - Learn from training with Ataca, Korke & Judith
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-gray-600">
                  Can't wait to dance with you!
                </p>
                <p className="text-sm text-gray-500">
                  Follow <a href="https://instagram.com/wedancebachata" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-medium underline">@wedancebachata</a> on Instagram for tips and updates
                </p>
              </div>

              <Button
                variant="secondary"
                size="md"
                onClick={() => {
                  setMeetingScheduled(false)
                  setShowCalendar(false)
                }}
                className="mt-6"
              >
                Done
              </Button>
            </div>
          )}
        </div>
      </Container>
    </Section>
  )
}
