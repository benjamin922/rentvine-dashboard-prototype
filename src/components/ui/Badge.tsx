import { type HTMLAttributes } from "react";
import clsx from "clsx";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type BadgeVariant = "success" | "warning" | "error" | "info" | "default";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
  /** Hide the leading dot indicator */
  hideDot?: boolean;
}

/* ------------------------------------------------------------------ */
/*  Style maps                                                         */
/* ------------------------------------------------------------------ */

const variantClasses: Record<BadgeVariant, string> = {
  success: "bg-rv-green-light text-rv-green",
  warning: "bg-amber-50 text-amber-600",
  error: "bg-red-50 text-rv-red",
  info: "bg-rv-blue-light text-rv-blue",
  default: "bg-gray-100 text-rv-gray",
};

const dotClasses: Record<BadgeVariant, string> = {
  success: "bg-rv-green",
  warning: "bg-amber-500",
  error: "bg-rv-red",
  info: "bg-rv-blue",
  default: "bg-rv-gray",
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function Badge({
  variant = "default",
  hideDot = false,
  children,
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {!hideDot && (
        <span
          className={clsx("h-1.5 w-1.5 rounded-full shrink-0", dotClasses[variant])}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
