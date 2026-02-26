import React, { type HTMLAttributes } from "react";
import clsx from "clsx";
import { TrendingUp, TrendingDown } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Trend {
  direction: "up" | "down";
  value: string;
}

interface StatCardProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: React.ReactNode;
  trend?: Trend;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function StatCard({
  label,
  value,
  trend,
  className,
  ...props
}: StatCardProps) {
  return (
    <div
      className={clsx(
        "bg-white rounded-lg p-6 text-center",
        className,
      )}
      {...props}
    >
      <p className="text-xs text-rv-gray leading-snug">{label}</p>

      <p className="mt-1 text-2xl font-semibold text-rv-black leading-tight">
        {value}
      </p>

      {trend && (
        <div
          className={clsx(
            "mt-2 inline-flex items-center gap-1 text-xs font-medium",
            trend.direction === "up" ? "text-rv-green" : "text-rv-red",
          )}
        >
          {trend.direction === "up" ? (
            <TrendingUp className="h-3.5 w-3.5" />
          ) : (
            <TrendingDown className="h-3.5 w-3.5" />
          )}
          <span>{trend.value}</span>
        </div>
      )}
    </div>
  );
}
