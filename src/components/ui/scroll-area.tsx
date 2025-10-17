import * as React from 'react'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import { cn } from '@/lib/utils'

// Simplified scroll area without Radix UI dependency
const ScrollArea = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('relative overflow-hidden', className)}
    {...props}
  >
    <div className="h-full w-full rounded-[inherit] overflow-auto scrollbar-thin">
      {children}
    </div>
  </div>
))
ScrollArea.displayName = 'ScrollArea'

const ScrollBar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    orientation?: 'vertical' | 'horizontal'
  }
>(({ className, orientation = 'vertical', ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex touch-none select-none transition-colors',
      orientation === 'vertical' &&
        'h-full w-2.5 border-l border-l-transparent p-[1px]',
      orientation === 'horizontal' &&
        'h-2.5 w-full border-t border-t-transparent p-[1px]',
      className
    )}
    {...props}
  />
))
ScrollBar.displayName = 'ScrollBar'

export { ScrollArea, ScrollBar }
