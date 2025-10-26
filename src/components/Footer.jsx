import { Section, Container } from './ui'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <Section background="dark" spacing="md">
      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <h3 className="text-xl font-bold mb-4">DevMellio</h3>
              <p className="text-gray-400 mb-4">
                AI-powered business automation systems built by an AI engineer. Save 20+ hours per week with proven workflows.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#contact" className="hover:text-white transition-colors">
                    Get Started
                  </a>
                </li>
                <li>
                  <a href="mailto:devmellio@gmail.com" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="mailto:devmellio@gmail.com" className="hover:text-white transition-colors">
                    devmellio@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; {currentYear} DevMellio. All rights reserved.</p>
          </div>
        </div>
      </Container>
    </Section>
  )
}
