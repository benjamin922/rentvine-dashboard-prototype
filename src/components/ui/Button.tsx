import {
  type ButtonHTMLAttributes,
  type ReactNode,
  forwardRef,
} from "react";
import clsx from "clsx";
import { Loader2 } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type ButtonVariant = "primary" | "secondary" | "tertiary";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconRight?: ReactNode;
  loading?: boolean;
  children?: ReactNode;
}

/* ------------------------------------------------------------------ */
/*  Style maps                                                         */
/* ------------------------------------------------------------------ */

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-rv-green text-white hover:bg-[#027a38] active:bg-[#026b31] disabled:bg-rv-green/50",
  secondary:
    "bg-white border border-rv-lightgray text-rv-black hover:bg-gray-50 active:bg-gray-100 disabled:opacity-50",
  tertiary:
    "bg-transparent text-rv-blue hover:bg-rv-blue-light active:bg-rv-blue-hover disabled:opacity-50",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "text-xs px-2.5 py-1.5 gap-1.5",
  md: "text-sm px-3.5 py-2 gap-2",
  lg: "text-base px-5 py-2.5 gap-2.5",
};

const iconSizeClasses: Record<ButtonSize, string> = {
  sm: "[&_svg]:h-3.5 [&_svg]:w-3.5",
  md: "[&_svg]:h-4 [&_svg]:w-4",
  lg: "[&_svg]:h-5 [&_svg]:w-5",
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "md",
      icon,
      iconRight,
      loading = false,
      disabled,
      children,
      className,
      ...props
    },
    ref,
  ) {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={clsx(
          "inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-150 cursor-pointer select-none",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rv-blue",
          "disabled:cursor-not-allowed",
          variantClasses[variant],
          sizeClasses[size],
          iconSizeClasses[size],
          className,
        )}
        {...props}
      >
        {loading ? (
          <Loader2 className="animate-spin" />
        ) : (
          icon && <span className="shrink-0">{icon}</span>
        )}

        {children && <span>{children}</span>}

        {iconRight && !loading && (
          <span className="shrink-0">{iconRight}</span>
        )}
      </button>
    );
  },
);
