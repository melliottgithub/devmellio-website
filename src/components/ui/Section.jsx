export default function Section({
  children,
  background = 'white',
  spacing = 'lg',
  className = '',
  ...props
}) {
  const backgrounds = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    gradient: 'bg-gradient-to-br from-primary-50 via-white to-accent-50',
    dark: 'bg-gray-900 text-white',
  }

  const spacings = {
    sm: 'py-8 md:py-12',
    md: 'py-12 md:py-16',
    lg: 'py-12 md:py-20',
    xl: 'py-16 md:py-24',
    '2xl': 'py-20 md:py-32',
  }

  return (
    <section
      className={`relative ${backgrounds[background]} ${spacings[spacing]} ${className}`}
      {...props}
    >
      {children}
    </section>
  )
}
