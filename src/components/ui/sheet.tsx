'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface SheetContextType {
  open: boolean
  setOpen: (open: boolean) => void
}

const SheetContext = React.createContext<SheetContextType | null>(null)

const useSheet = () => {
  const context = React.useContext(SheetContext)
  if (!context) {
    throw new Error('useSheet must be used within a Sheet component')
  }
  return context
}

interface SheetProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  defaultOpen?: boolean
}

const Sheet = React.forwardRef<HTMLDivElement, SheetProps>(
  ({ open: controlledOpen, onOpenChange, defaultOpen = false, children, ...props }, ref) => {
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen)

    const open = controlledOpen ?? internalOpen
    const setOpen = React.useCallback(
      (newOpen: boolean) => {
        setInternalOpen(newOpen)
        onOpenChange?.(newOpen)
      },
      [onOpenChange]
    )

    React.useEffect(() => {
      if (open) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'unset'
      }

      return () => {
        document.body.style.overflow = 'unset'
      }
    }, [open])

    return (
      <SheetContext.Provider value={{ open, setOpen }}>
        <div ref={ref} {...props}>
          {children}
        </div>
      </SheetContext.Provider>
    )
  }
)
Sheet.displayName = 'Sheet'

const SheetTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }
>(({ className, asChild, children, ...props }, ref) => {
  const { open, setOpen } = useSheet()

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ref,
      onClick: (e: React.MouseEvent) => {
        setOpen(!open)
        children.props.onClick?.(e)
      },
      ...props
    })
  }

  return (
    <button
      ref={ref}
      className={cn('', className)}
      onClick={() => setOpen(!open)}
      {...props}
    >
      {children}
    </button>
  )
})
SheetTrigger.displayName = 'SheetTrigger'

const SheetContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { side?: 'top' | 'right' | 'bottom' | 'left' }
>(({ className, side = 'right', ...props }, ref) => {
  const { open, setOpen } = useSheet()

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open, setOpen])

  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50"
        onClick={() => setOpen(false)}
      />
      <div
        ref={ref}
        className={cn(
          'fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out',
          {
            'inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm': side === 'right',
            'inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm': side === 'left',
            'inset-x-0 top-0 border-b': side === 'top',
            'inset-x-0 bottom-0 border-t': side === 'bottom',
          },
          className
        )}
        {...props}
      />
    </>
  )
})
SheetContent.displayName = 'SheetContent'

export { Sheet, SheetTrigger, SheetContent }
