# DevMellio Design System

## Overview
A mobile-first, reusable component system built with React, Tailwind CSS, and CSS variables for easy theming and consistency.

## CSS Variables

All design tokens are defined as CSS variables in `src/index.css` for easy maintenance and theming.

### Colors

#### Primary (Blue)
```css
--color-primary-50 to --color-primary-900
```
Used for: CTAs, links, primary actions

#### Accent (Green)
```css
--color-accent-50 to --color-accent-900
```
Used for: Success states, secondary CTAs, highlights

#### Neutral (Gray)
```css
--color-gray-50 to --color-gray-900
```
Used for: Text, backgrounds, borders

### Spacing Scale
```css
--spacing-xs:   4px
--spacing-sm:   8px
--spacing-md:   16px
--spacing-lg:   24px
--spacing-xl:   32px
--spacing-2xl:  48px
--spacing-3xl:  64px
--spacing-4xl:  96px
--spacing-5xl:  128px
```

### Typography
```css
--font-sans: 'Inter', system-ui, -apple-system, sans-serif
--font-size-xs to --font-size-7xl
--font-weight-normal to --font-weight-extrabold
--line-height-tight, -normal, -relaxed
```

### Shadows
```css
--shadow-sm to --shadow-2xl
```

### Border Radius
```css
--radius-sm:   6px
--radius-md:   8px
--radius-lg:   12px
--radius-xl:   16px
--radius-2xl:  24px
--radius-3xl:  32px
--radius-full: 9999px
```

### Animation
```css
--duration-fast:   150ms
--duration-normal: 300ms
--duration-slow:   500ms

--ease-in, --ease-out, --ease-in-out
```

### Z-Index
```css
--z-base:    0
--z-dropdown: 100
--z-sticky:   200
--z-fixed:    300
--z-modal:    400
--z-popover:  500
--z-tooltip:  600
```

## Reusable Components

### Button
```jsx
import { Button } from './components/ui'

<Button variant="primary" size="md" icon={<ArrowIcon />}>
  Click Me
</Button>
```

**Props:**
- `variant`: `primary` | `secondary` | `ghost` | `accent` (default: `primary`)
- `size`: `sm` | `md` | `lg` (default: `md`)
- `icon`: React element
- `iconPosition`: `left` | `right` (default: `right`)
- `className`: Additional CSS classes
- All standard button props (`onClick`, `disabled`, etc.)

### Container
```jsx
import { Container } from './components/ui'

<Container size="xl" padding={true}>
  Content here
</Container>
```

**Props:**
- `size`: `sm` | `md` | `lg` | `xl` | `2xl` | `full` (default: `xl`)
- `padding`: boolean (default: `true`)
- `className`: Additional CSS classes

### Card
```jsx
import { Card } from './components/ui'

<Card variant="glass" padding="lg" hover={true}>
  Card content
</Card>
```

**Props:**
- `variant`: `default` | `glass` | `elevated` | `gradient` (default: `default`)
- `padding`: `none` | `sm` | `md` | `lg` | `xl` (default: `lg`)
- `hover`: boolean - adds hover scale effect (default: `false`)
- `className`: Additional CSS classes

### Section
```jsx
import { Section } from './components/ui'

<Section background="gradient" spacing="lg">
  Section content
</Section>
```

**Props:**
- `background`: `white` | `gray` | `gradient` | `dark` (default: `white`)
- `spacing`: `sm` | `md` | `lg` | `xl` | `2xl` (default: `lg`)
- `className`: Additional CSS classes

## Usage Guidelines

### Mobile-First Approach
Always start with mobile styles and use responsive prefixes:
```jsx
className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
```

### Import Pattern
```jsx
import { Button, Card, Container, Section } from './components/ui'
```

### Consistency
- Use design system variables instead of hardcoded values
- Use reusable components instead of duplicating markup
- Follow mobile-first responsive patterns
- Keep components simple and composable

### Example Usage
```jsx
import { Button, Container, Section } from './components/ui'

export default function MyComponent() {
  return (
    <Section background="gradient" spacing="xl">
      <Container>
        <h2 className="text-4xl md:text-6xl font-bold text-gray-900">
          My Heading
        </h2>
        <Button variant="primary" size="lg">
          Get Started
        </Button>
      </Container>
    </Section>
  )
}
```

## Benefits

1. **Consistency**: All components use the same design tokens
2. **Maintainability**: Change values in one place (CSS variables)
3. **Scalability**: Easy to add new components following the same patterns
4. **Mobile-First**: All components are responsive by default
5. **Developer Experience**: Simple, predictable API
6. **Performance**: Reusable components reduce bundle size
