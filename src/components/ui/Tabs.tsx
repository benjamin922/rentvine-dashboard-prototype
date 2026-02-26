import { type HTMLAttributes } from "react";
import clsx from "clsx";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface Tab {
  id: string;
  label: string;
}

interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function Tabs({
  tabs,
  activeTab,
  onChange,
  className,
  ...props
}: TabsProps) {
  return (
    <div
      className={clsx(
        "flex border-b border-rv-lightgray",
        className,
      )}
      role="tablist"
      {...props}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;

        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={clsx(
              "relative px-4 py-2.5 text-sm transition-colors cursor-pointer select-none whitespace-nowrap",
              "focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-rv-blue",
              isActive
                ? "font-medium text-rv-green"
                : "text-gray-500 hover:text-gray-700",
            )}
          >
            {tab.label}

            {/* Active indicator line */}
            {isActive && (
              <span
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-rv-green rounded-t"
                aria-hidden="true"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
