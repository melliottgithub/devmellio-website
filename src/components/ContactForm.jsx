import { useState, useEffect } from 'react'
import { Button, Container, Section } from './ui'

export default function ContactForm({ showCalendar: showCalendarProp, setShowCalendar: setShowCalendarProp, calendlyLoaded: calendlyLoadedProp, setCalendlyLoaded: setCalendlyLoadedProp }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    automationNeed: '',
    honeypot: '' // Bot detection field - must remain empty
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [aiResponse, setAiResponse] = useState(null)
  const [error, setError] = useState(null)
  const [hasAnimated, setHasAnimated] = useState(false)
  const [isSlowResponse, setIsSlowResponse] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const showCalendar = showCalendarProp || false
  const setShowCalendar = setShowCalendarProp || (() => {})
  const calLoaded = calendlyLoadedProp || false
  const setCalLoaded = setCalendlyLoadedProp || (() => {})
  const [_skeletonFading, _setSkeletonFading] = useState(false)
  const [meetingScheduled, setMeetingScheduled] = useState(false)
  const [_scheduledEventData, setScheduledEventData] = useState(null)
  const [calInitialized, setCalInitialized] = useState(false)
  const [showForm, setShowForm] = useState(false)

  // Initialize Cal.com widget immediately on mount (hidden)
  useEffect(() => {
    // Try immediately first
    if (window.Cal && !calInitialized) {
      setCalInitialized(true)
      return
    }

    // If not ready, poll for Cal.com to be available
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

  // Mark as animated after first render
  useEffect(() => {
    if (!aiResponse && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [aiResponse, hasAnimated])


  // Initialize Cal.com inline widget when ready (loads in background)
  useEffect(() => {
    if (calInitialized && window.Cal && setCalLoaded) {
      setCalLoaded(false)

      // Initialize Cal.com
      const Cal = window.Cal

      // Listen for booking successful event
      Cal("on", {
        action: "bookingSuccessful",
        callback: (e) => {
          setMeetingScheduled(true)
          setScheduledEventData(e.detail)

          // Scroll to top to show success message
          requestAnimationFrame(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
          })

          // Track conversion event in Google Analytics (if available)
          if (window.gtag) {
            window.gtag('event', 'meeting_scheduled', {
              event_category: 'conversion',
              event_label: 'strategy_call',
              value: 1
            })
          }

          // Send booking data to backend
          fetch('https://w3o3gzmmwa.execute-api.us-east-1.amazonaws.com/prod/booking', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              cal_event: e.detail,
              lead_id: aiResponse?.lead_id || 'direct-booking'
            })
          })
            .then(r => r.json())
            .catch(err => console.error('Failed to save booking:', err))
        }
      })

      // Initialize Cal.com inline widget
      Cal("inline", {
        elementOrSelector: "#cal-booking-widget",
        calLink: "mellio/30min",
        config: {
          name: "",
          email: "",
          notes: "",
          theme: "light"
        }
      })

      // Mark as loaded after initialization
      setTimeout(() => {
        setCalLoaded(true)
      }, 1000)
    }
  }, [calInitialized, aiResponse?.lead_id, setCalLoaded]) // Run when Cal.com script is ready

  // Common email typos
  const emailTypos = {
    'gmail.con': 'gmail.com',
    'gmail.co': 'gmail.com',
    'gmial.com': 'gmail.com',
    'gmai.com': 'gmail.com',
    'gmaill.com': 'gmail.com',
    'yahooo.com': 'yahoo.com',
    'yaho.com': 'yahoo.com',
    'yahoo.con': 'yahoo.com',
    'hotmail.con': 'hotmail.com',
    'hotmail.co': 'hotmail.com',
    'hotmial.com': 'hotmail.com',
    'outlook.con': 'outlook.com',
    'outlok.com': 'outlook.com',
    'icloud.con': 'icloud.com',
    'icoud.com': 'icloud.com',
  }

  // Validation functions
  const validate = {
    name: (value) => {
      if (!value.trim()) return "Name is required"
      if (value.length < 2) return "Name must be at least 2 characters"
      if (value.length > 100) return "Name is too long (max 100 characters)"
      return null
    },

    email: (value) => {
      if (!value.trim()) return "Email is required"
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) return "Please enter a valid email address"
      if (value.length > 254) return "Email is too long"

      // Check for common typos
      const domain = value.split('@')[1]?.toLowerCase()
      if (domain && emailTypos[domain]) {
        const suggested = value.split('@')[0] + '@' + emailTypos[domain]
        return `Did you mean "${suggested}"?`
      }

      return null
    },

    automationNeed: (value) => {
      if (!value.trim()) return "Please describe what you need automated"
      if (value.length < 20) return "Please provide more details (at least 20 characters)"
      if (value.length > 2000) return "Description is too long (max 2000 characters)"
      return null
    }
  }

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true })
    const error = validate[field](formData[field])
    setErrors({ ...errors, [field]: error })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    // Clear error when user starts typing (if field was touched)
    if (touched[name]) {
      const error = validate[name](value)
      setErrors({ ...errors, [name]: error })
    }
  }

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

  const submitToAPI = async (controller) => {
    const API_ENDPOINT = 'https://w3o3gzmmwa.execute-api.us-east-1.amazonaws.com/prod/contact'

    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        need: formData.automationNeed,
        honeypot: formData.honeypot
      }),
      signal: controller.signal
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))

      // Smart error messages based on status
      if (response.status === 500) {
        throw new Error('Server error. We may have saved your information. Check your email or contact devmellio@gmail.com')
      } else if (response.status === 400) {
        // Handle specific validation errors
        const errorMsg = errorData.detail || 'Invalid form data. Please check your inputs.'
        if (errorMsg.includes('honeypot') || errorMsg.includes('Invalid submission')) {
          throw new Error('There was a problem with your submission. Please try again or email devmellio@gmail.com')
        } else if (errorMsg.includes('Disposable email')) {
          throw new Error('Please use a permanent email address (temporary email services are not allowed)')
        } else if (errorMsg.includes('inappropriate content')) {
          throw new Error('Your message contains words that triggered our spam filter. Please rephrase and try again.')
        }
        throw new Error(errorMsg)
      } else if (response.status === 429) {
        throw new Error("You've submitted too many forms. Please try again in an hour or email devmellio@gmail.com directly.")
      } else {
        throw new Error(errorData.detail || 'Failed to submit form')
      }
    }

    return await response.json()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Mark all fields as touched
    setTouched({ name: true, email: true, automationNeed: true })

    // Validate all fields
    const newErrors = {
      name: validate.name(formData.name),
      email: validate.email(formData.email),
      automationNeed: validate.automationNeed(formData.automationNeed)
    }

    setErrors(newErrors)

    // Check if there are any errors
    if (Object.values(newErrors).some(error => error !== null)) {
      // Scroll to first error
      const firstErrorField = Object.keys(newErrors).find(key => newErrors[key] !== null)
      document.getElementById(firstErrorField)?.focus()
      return
    }

    // Frontend validation passed, submit to backend
    setIsSubmitting(true)
    setError(null)
    setIsSlowResponse(false)

    // AbortController for timeout
    const controller = new AbortController()

    // Slow response warning at 10 seconds
    const slowTimeout = setTimeout(() => {
      setIsSlowResponse(true)
    }, 10000)

    // Abort at 30 seconds
    const abortTimeout = setTimeout(() => {
      controller.abort()
    }, 30000)

    let attempts = 0
    const maxAttempts = 2 // Initial + 1 retry

    while (attempts < maxAttempts) {
      try {
        attempts++
        setRetryCount(attempts - 1)

        // Check network status
        if (!navigator.onLine) {
          throw new Error('OFFLINE')
        }

        const data = await submitToAPI(controller)

        // Success!
        clearTimeout(slowTimeout)
        clearTimeout(abortTimeout)

        if (data.success) {
          setAiResponse(data)
          // Clear form inputs after successful submission
          setFormData({ name: '', email: '', automationNeed: '', honeypot: '' })
          setErrors({})
          setTouched({})
          setRetryCount(0)
          setIsSubmitting(false)
          setIsSlowResponse(false)
        } else {
          throw new Error(data.message || 'Failed to submit form')
        }

        break // Success, exit loop

      } catch (err) {
        clearTimeout(slowTimeout)
        clearTimeout(abortTimeout)

        console.error('Form submission error:', err)

        // Don't retry on validation errors or user abort
        const shouldRetry = attempts < maxAttempts &&
                          err.name !== 'AbortError' &&
                          err.message !== 'OFFLINE' &&
                          !err.message.includes('Invalid form data')

        if (shouldRetry) {
          // Wait before retry (exponential backoff: 1s)
          await sleep(1000)
          continue // Retry
        }

        // Final error - set error message with smart handling
        if (err.name === 'AbortError') {
          setError('Request timed out after 30 seconds. Your submission may have been saved. Please check your email or try again.')
        } else if (err.message === 'OFFLINE') {
          setError('No internet connection. Please check your connection and try again.')
        } else if (err.message.includes('Server error')) {
          setError(err.message) // Already has good message
        } else {
          setError(err.message || 'Something went wrong. Please try again or email devmellio@gmail.com directly.')
        }

        // DON'T clear form data on error - preserve it!
        setIsSubmitting(false)
        setIsSlowResponse(false)
        break
      }
    }
  }

  return (
    <Section id="contact" background="gradient" spacing="sm">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Heading - Only show when calendar is hidden */}
          {!showCalendar && (
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Ready to Stop Wasting Time on Manual Work?
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
                Let's discuss how automation can save you 20+ hours per week and boost your ROI.
              </p>

              {/* Primary CTA: Book Strategy Call */}
              {!aiResponse && (
              <div className="flex flex-col items-center gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto"
                  onClick={() => {
                    setShowCalendar(true)
                    requestAnimationFrame(() => {
                      document.getElementById('cal-widget')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    })
                  }}
                >
                  Book Strategy Call
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </Button>
                <p className="text-sm text-gray-600">
                  Want a free AI analysis first?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(true)
                      setTimeout(() => {
                        document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })
                      }, 100)
                    }}
                    className="text-primary-600 hover:text-primary-700 font-medium underline"
                  >
                    Get your automation audit
                  </button>
                </p>
              </div>
              )}
            </div>
          )}

          {/* Cal.com Widget - ALWAYS in DOM, loads in background */}
          <div
            id="cal-widget"
            className="-mx-4 sm:mx-0 relative"
            style={{
              height: showCalendar && !meetingScheduled ? 'auto' : '0',
              overflow: 'visible'
            }}
          >
            {/* Cal.com Embed - Full size always, only opacity changes */}
            <div
              style={{
                opacity: showCalendar && !meetingScheduled && calLoaded ? '1' : '0',
                pointerEvents: showCalendar && !meetingScheduled && calLoaded ? 'auto' : 'none',
                minHeight: showCalendar && !meetingScheduled ? 'calc(100vh - 120px)' : '0'
              }}
              className={showCalendar && !meetingScheduled ? 'sm:min-h-[900px]' : ''}
            >
              <div
                id="cal-booking-widget"
                className="w-full h-[calc(100vh-120px)] sm:h-[900px] overflow-hidden"
              ></div>
            </div>

            {/* Loading Skeleton - Shows when clicked but not loaded yet */}
            {showCalendar && !calLoaded && !meetingScheduled && (
              <div className="absolute inset-0 w-full h-[calc(100vh-120px)] sm:h-[900px] bg-white z-10">
                  <div className="w-full h-full overflow-hidden">
                    <div className="p-4 sm:p-8 space-y-6 animate-pulse">
                      {/* Header - Name and meeting title */}
                      <div className="text-center space-y-3">
                        <div className="h-5 bg-gray-200 rounded w-32 mx-auto"></div>
                        <div className="h-8 bg-gray-300 rounded w-56 mx-auto"></div>
                        <div className="flex items-center justify-center gap-4 mt-4">
                          <div className="flex items-center gap-2">
                            <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-16"></div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-48"></div>
                          </div>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="h-px bg-gray-200"></div>

                      {/* Calendar title */}
                      <div className="h-6 bg-gray-200 rounded w-48 mx-auto"></div>

                      {/* Month navigation */}
                      <div className="flex items-center justify-center gap-4">
                        <div className="h-8 w-8 bg-gray-200 rounded"></div>
                        <div className="h-6 bg-gray-300 rounded w-32"></div>
                        <div className="h-8 w-8 bg-gray-200 rounded"></div>
                      </div>

                      {/* Calendar grid */}
                      <div className="grid grid-cols-7 gap-2 px-4">
                        {/* Day headers */}
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                          <div key={`header-${i}`} className="h-8 flex items-center justify-center">
                            <div className="h-4 w-4 bg-gray-200 rounded"></div>
                          </div>
                        ))}
                        {/* Calendar days */}
                        {[...Array(35)].map((_, i) => (
                          <div key={i} className="h-10 bg-gray-100 rounded hover:bg-gray-200 transition-colors"></div>
                        ))}
                      </div>

                      {/* Timezone */}
                      <div className="flex items-center justify-center gap-2 mt-6">
                        <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-40"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
          </div>

          {/* Form - Show when user clicks "Get your automation audit" */}
          <div style={{ display: showForm && !aiResponse && !showCalendar && !meetingScheduled ? 'block' : 'none' }}>
          {!aiResponse && !showCalendar && !meetingScheduled && showForm ? (
            <form id="contact-form" onSubmit={handleSubmit} className={`space-y-6 ${!hasAnimated ? 'animate-fade-in-up' : ''}`} style={!hasAnimated ? { animationDelay: '0.1s' } : {}}>
              {/* Card Container */}
              <div className={`sm:bg-white/80 sm:backdrop-blur-sm sm:border sm:border-gray-200 sm:rounded-3xl p-4 sm:p-8 md:p-10 sm:shadow-lg relative ${isSubmitting ? 'opacity-60 pointer-events-none' : ''}`}>
                {/* Loading Overlay */}
                {isSubmitting && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm rounded-3xl z-10">
                    <div className="text-center max-w-md px-6">
                      <svg className="animate-spin h-12 w-12 text-primary-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <p className="text-lg font-semibold text-gray-900">
                        {retryCount > 0 ? `Retrying (attempt ${retryCount + 1})...` : 'Analyzing with AI...'}
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        {isSlowResponse
                          ? '⏱️ Taking longer than usual. Still processing...'
                          : 'This usually takes 3-5 seconds'}
                      </p>
                    </div>
                  </div>
                )}
                {/* Name Field */}
                <div className="mb-6">
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={() => handleBlur('name')}
                    required
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all outline-none text-gray-900 ${
                      touched.name && errors.name
                        ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                        : 'border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200'
                    }`}
                    placeholder="Sarah Johnson"
                  />
                  {touched.name && errors.name && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur('email')}
                    required
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all outline-none text-gray-900 ${
                      touched.email && errors.email
                        ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                        : 'border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200'
                    }`}
                    placeholder="sarah@company.com"
                  />
                  {touched.email && errors.email && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Honeypot Field - Hidden from humans, visible to bots */}
                <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
                  <label htmlFor="website">Website (leave blank)</label>
                  <input
                    type="text"
                    id="website"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleChange}
                    tabIndex="-1"
                    autoComplete="off"
                  />
                </div>

                {/* Automation Need Field */}
                <div className="mb-8">
                  <label htmlFor="automationNeed" className="block text-sm font-semibold text-gray-700 mb-2">
                    What do you need help automating?
                  </label>
                  <textarea
                    id="automationNeed"
                    name="automationNeed"
                    value={formData.automationNeed}
                    onChange={handleChange}
                    onBlur={() => handleBlur('automationNeed')}
                    required
                    rows="4"
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all outline-none text-gray-900 resize-none ${
                      touched.automationNeed && errors.automationNeed
                        ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                        : 'border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200'
                    }`}
                    placeholder="e.g., We spend 3 hours every day manually copying leads from Facebook ads into our CRM..."
                  />
                  {touched.automationNeed && errors.automationNeed ? (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.automationNeed}
                    </p>
                  ) : (
                    <>
                      {/* Normal hint */}
                      <p className="mt-2 text-sm text-gray-500">
                        Be specific! The more details you provide, the better my AI can analyze your situation.
                        {formData.automationNeed.length > 0 && (
                          <span className="ml-2 text-gray-400">
                            ({formData.automationNeed.length}/2000 characters)
                          </span>
                        )}
                      </p>

                      {/* Warning at 1900 characters */}
                      {formData.automationNeed.length >= 1900 && formData.automationNeed.length < 2000 && (
                        <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                          <p className="text-sm text-amber-800 flex items-center gap-2">
                            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <span>Approaching character limit - focus on your main pain point. ({2000 - formData.automationNeed.length} characters remaining)</span>
                          </p>
                        </div>
                      )}

                      {/* Email fallback at 2000 characters */}
                      {formData.automationNeed.length >= 2000 && (
                        <div className="mt-2 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                          <p className="text-sm text-blue-900 font-semibold mb-2 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            Character limit reached
                          </p>
                          <p className="text-sm text-blue-800 mb-3">
                            Have more details to share? No problem - email me your full description:
                          </p>
                          <a
                            href={`mailto:devmellio@gmail.com?subject=Detailed%20Automation%20Request%20from%20${encodeURIComponent(formData.name || 'Contact Form')}&body=Name:%20${encodeURIComponent(formData.name)}%0D%0AEmail:%20${encodeURIComponent(formData.email)}%0D%0A%0D%0AWhat%20I%20need%20automated:%0D%0A${encodeURIComponent(formData.automationNeed)}`}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Email Me Full Details
                          </a>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing with AI...
                    </>
                  ) : (
                    <>
                      Get Free AI Analysis
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </Button>

                {/* Error Message with Fallback Options */}
                {error && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <div className="flex-1">
                        <p className="text-sm text-red-700 font-medium mb-2">{error}</p>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <a
                            href={`mailto:devmellio@gmail.com?subject=Automation Request from ${formData.name || 'Contact Form'}&body=Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AWhat I need automated:%0D%0A${formData.automationNeed}`}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Email Me Directly
                          </a>
                          <button
                            onClick={() => setError(null)}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-red-700 text-sm font-medium rounded-lg border border-red-300 transition-colors"
                          >
                            Try Again
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Trust Indicators */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center justify-center gap-3 sm:gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>No commitment required</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>No sales pitch</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Response within 24 hours</span>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          ) : null}
          </div>
          {meetingScheduled ? (
            /* Meeting Scheduled Success View */
            <div className="sm:bg-gradient-to-br sm:from-green-50 sm:to-primary-50 sm:border-2 sm:border-green-200 sm:rounded-3xl sm:shadow-xl p-4 sm:p-8 md:p-10 text-center relative z-[999999] bg-white"
              style={{ position: 'relative', zIndex: 999999, backgroundColor: 'white' }}>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">You're All Set! 🎉</h3>
              <p className="text-lg text-gray-700 mb-6">
                Your strategy call has been scheduled. Check your email for the calendar invitation and meeting details.
              </p>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 mb-6">
                <h4 className="text-lg font-bold text-gray-900 mb-3">What to Expect</h4>
                <div className="space-y-3 text-left text-gray-700">
                  <div className="flex items-start gap-3">
                    <span className="text-primary-500 mt-1">•</span>
                    <div>You'll receive a calendar invitation with meeting link</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary-500 mt-1">•</span>
                    <div>We'll discuss your automation needs{aiResponse ? ' and the AI analysis' : ''}</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary-500 mt-1">•</span>
                    <div>I'll answer your questions and outline next steps</div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-6">
                Looking forward to talking with you! 👋
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    // Show form to get AI analysis
                    setShowCalendar(false)
                    setMeetingScheduled(false)
                  }}
                >
                  Get Free AI Analysis
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => {
                    // Reset everything
                    setAiResponse(null)
                    setShowCalendar(false)
                    setMeetingScheduled(false)
                    setScheduledEventData(null)
                  }}
                >
                  Done
                </Button>
              </div>
            </div>
          ) : aiResponse ? (
            /* AI Response Display */
            <div className="animate-fade-in-up">
              {!showCalendar ? (
                // Analysis view - No card on mobile, card on desktop
                <div className="sm:bg-gradient-to-br sm:from-primary-50 sm:to-accent-50 sm:border-2 sm:border-primary-200 sm:rounded-3xl sm:shadow-xl p-4 sm:p-8 md:p-10">
                  {/* Success Header */}
                  <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-500 flex items-center justify-center">
                        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Analysis Complete! 🎯</h3>
                        <p className="text-sm text-gray-600">Here's what I found</p>
                      </div>
                    </div>

                {/* AI Analysis Results */}
                <div className="space-y-4">
                  {/* Personalized Message */}
                  {aiResponse.analysis?.personalized_message && (
                    <div className="pb-4 border-b border-gray-200 sm:bg-white/80 sm:backdrop-blur-sm sm:rounded-2xl sm:p-6 sm:border sm:border-primary-200">
                      <p className="text-lg text-gray-800 leading-relaxed">
                        {aiResponse.analysis.personalized_message}
                      </p>
                    </div>
                  )}

                  {/* Estimated Impact */}
                  {aiResponse.analysis && (
                    <div className="pb-4 border-b border-gray-200 sm:bg-white/80 sm:backdrop-blur-sm sm:rounded-2xl sm:p-6 sm:border sm:border-gray-200">
                      <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="text-2xl">📊</span>
                        Estimated Impact
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {aiResponse.analysis.time_saved_hours_per_week && (
                          <div className="bg-primary-50 rounded-xl p-4">
                            <p className="text-sm text-gray-600 mb-1">Time Saved</p>
                            <p className="text-2xl font-bold text-primary-600">
                              {aiResponse.analysis.time_saved_hours_per_week} hrs/week
                            </p>
                          </div>
                        )}
                        {aiResponse.analysis.cost_savings_monthly && (
                          <div className="bg-green-50 rounded-xl p-4">
                            <p className="text-sm text-gray-600 mb-1">Cost Savings</p>
                            <p className="text-2xl font-bold text-green-600">
                              ${aiResponse.analysis.cost_savings_monthly}/month
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Recommended Solution */}
                  {aiResponse.analysis && (
                    <div className="pb-4 border-b border-gray-200 sm:bg-white/80 sm:backdrop-blur-sm sm:rounded-2xl sm:p-6 sm:border sm:border-gray-200">
                      <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="text-2xl">🛠️</span>
                        Recommended Solution
                      </h4>
                      <div className="space-y-3 text-gray-700">
                        {aiResponse.analysis.recommended_tier && (
                          <div className="flex items-start gap-2">
                            <span className="text-primary-500 mt-1">•</span>
                            <div>
                              <strong>Service Tier:</strong> {aiResponse.analysis.recommended_tier}
                            </div>
                          </div>
                        )}
                        {aiResponse.analysis.timeline_days && (
                          <div className="flex items-start gap-2">
                            <span className="text-primary-500 mt-1">•</span>
                            <div>
                              <strong>Timeline:</strong> {aiResponse.analysis.timeline_days}{aiResponse.analysis.timeline_days.includes('day') ? '' : ' days'}
                            </div>
                          </div>
                        )}
                        {aiResponse.analysis.complexity && (
                          <div className="flex items-start gap-2">
                            <span className="text-primary-500 mt-1">•</span>
                            <div>
                              <strong>Complexity:</strong> {aiResponse.analysis.complexity}
                            </div>
                          </div>
                        )}
                        {aiResponse.analysis.tools_needed && (
                          <div className="flex items-start gap-2">
                            <span className="text-primary-500 mt-1">•</span>
                            <div>
                              <strong>Tools:</strong> {aiResponse.analysis.tools_needed}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Next Steps */}
                  <div className="pb-4 border-b border-gray-200 sm:bg-white/80 sm:backdrop-blur-sm sm:rounded-2xl sm:p-6 sm:border sm:border-gray-200">
                    <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="text-2xl">📋</span>
                      What Happens Next
                    </h4>
                    <div className="space-y-2 text-gray-700">
                      <p>1. <strong>Check your email</strong> - I've sent you a detailed analysis with next steps</p>
                      <p>2. <strong>I've been notified</strong> - I'll review your case and prepare specific recommendations</p>
                      <p>3. <strong>Book a call</strong> - Let's discuss how to implement this automation (optional)</p>
                    </div>
                  </div>

                    {/* CTA Button */}
                    <div className="pt-4">
                      <Button
                        variant="primary"
                        size="md"
                        className="w-full"
                        onClick={() => setShowCalendar(true)}
                      >
                        Book Strategy Call
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </Button>
                    </div>

                  {/* Footer Note */}
                  <p className="text-sm text-gray-600 text-center pt-4 border-t border-gray-200">
                    🔒 No commitment required. No sales pitch. Just showing you what's possible.
                  </p>
                </div>
              </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  )
}
