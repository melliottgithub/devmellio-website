export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  iconPosition = 'right',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-[var(--duration-normal)] ease-[var(--ease-out)] focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 focus:ring-primary-500',
    secondary: 'bg-white text-primary-600 border-2 border-primary-600 hover:bg-primary-50 hover:-translate-y-1 focus:ring-primary-500',
    ghost: 'text-gray-600 hover:text-primary-600 hover:bg-primary-50',
    accent: 'bg-gradient-to-r from-accent-500 to-accent-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 focus:ring-accent-500',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-8 py-4 text-lg rounded-full',
    lg: 'px-10 py-5 text-xl rounded-full',
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span className="group-hover:translate-x-1 transition-transform">
          {icon}
        </span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className="group-hover:translate-x-1 transition-transform">
          {icon}
        </span>
      )}
    </button>
  )
}
