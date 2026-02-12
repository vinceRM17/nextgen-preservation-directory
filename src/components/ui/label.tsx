import * as React from "react"
import { cn } from "@/lib/utils"

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  error?: boolean
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "text-sm font-medium",
          error ? "text-red-500" : "text-slate-200",
          className
        )}
        {...props}
      />
    )
  }
)
Label.displayName = "Label"

export { Label }
