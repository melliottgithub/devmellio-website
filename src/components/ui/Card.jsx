export default function Card({
  children,
  variant = 'default',
  padding = 'lg',
  className = '',
  hover = false,
  ...props
}) {
  const variants = {
    default: 'bg-white border border-gray-200',
    glass: 'bg-white/40 backdrop-blur-lg border border-white/20',
    elevated: 'bg-white shadow-lg',
    gradient: 'bg-gradient-to-br from-primary-50 via-white to-accent-50',
  }

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-12',
  }

  const hoverEffect = hover
    ? 'transform hover:scale-105 hover:shadow-xl transition-all duration-[var(--duration-normal)]'
    : ''

  return (
    <div
      className={`rounded-[var(--radius-2xl)] ${variants[variant]} ${paddings[padding]} ${hoverEffect} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
