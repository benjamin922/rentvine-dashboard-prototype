import { type HTMLAttributes } from "react";
import clsx from "clsx";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface SegmentOption {
  value: string;
  label: string;
}

interface SegmentedControlProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: SegmentOption[];
  value: string;
  onChange: (value: string) => void;
  /** Size variant */
  size?: "sm" | "md";
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function SegmentedControl({
  options,
  value,
  onChange,
  size = "md",
  className,
  ...props
}: SegmentedControlProps) {
  return (
    <div
      className={clsx(
        "inline-flex bg-gray-100 rounded-lg p-0.5",
        className,
      )}
      role="radiogroup"
      {...props}
    >
      {options.map((option) => {
        const isActive = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => onChange(option.value)}
            className={clsx(
              "rounded-md transition-all duration-150 cursor-pointer select-none whitespace-nowrap",
              "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-rv-blue",
              size === "sm"
                ? "px-2.5 py-1 text-xs"
                : "px-3 py-1.5 text-sm",
              isActive
                ? "bg-white shadow-sm font-medium text-rv-black"
                : "text-gray-500 hover:text-gray-700",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
