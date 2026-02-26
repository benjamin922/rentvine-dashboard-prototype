import { type ReactNode, type HTMLAttributes } from "react";
import clsx from "clsx";

/* ------------------------------------------------------------------ */
/*  Card                                                               */
/* ------------------------------------------------------------------ */

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        "bg-white border border-rv-lightgray rounded-xl p-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CardHeader                                                         */
/* ------------------------------------------------------------------ */

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children?: ReactNode;
}

export function CardHeader({
  title,
  subtitle,
  action,
  children,
  className,
  ...props
}: CardHeaderProps) {
  return (
    <div
      className={clsx("flex items-start justify-between mb-3", className)}
      {...props}
    >
      <div className="min-w-0">
        <h3 className="text-base font-semibold text-rv-black leading-tight">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-0.5 text-sm text-rv-gray leading-snug">
            {subtitle}
          </p>
        )}
      </div>

      {(action || children) && (
        <div className="ml-3 flex items-center gap-2 shrink-0">
          {action}
          {children}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CardContent                                                        */
/* ------------------------------------------------------------------ */

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CardContent({
  children,
  className,
  ...props
}: CardContentProps) {
  return (
    <div className={clsx(className)} {...props}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CardFooter                                                         */
/* ------------------------------------------------------------------ */

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CardFooter({
  children,
  className,
  ...props
}: CardFooterProps) {
  return (
    <div
      className={clsx(
        "mt-3 pt-3 border-t border-rv-lightgray",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
