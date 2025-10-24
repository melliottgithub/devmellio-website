export default function Container({
  children,
  size = 'xl',
  className = '',
  padding = true
}) {
  const sizes = {
    sm: 'max-w-[var(--container-sm)]',
    md: 'max-w-[var(--container-md)]',
    lg: 'max-w-[var(--container-lg)]',
    xl: 'max-w-[var(--container-xl)]',
    '2xl': 'max-w-[var(--container-2xl)]',
    full: 'max-w-full',
  }

  const paddingClasses = padding ? 'px-6 sm:px-8 md:px-12 lg:px-16' : ''

  return (
    <div className={`container mx-auto ${sizes[size]} ${paddingClasses} ${className}`}>
      {children}
    </div>
  )
}
