import {
  type ReactNode,
  type HTMLAttributes,
  type MouseEvent,
  useEffect,
  useCallback,
} from "react";
import clsx from "clsx";
import { X } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  /** Max-width class override (default: "max-w-lg") */
  maxWidth?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  maxWidth = "max-w-lg",
  className,
  ...props
}: ModalProps) {
  /* Close on Escape */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("keydown", handleKeyDown);
    // Prevent body scroll while modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  /* Close when clicking the backdrop (not the card itself) */
  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      {/* Card */}
      <div
        className={clsx(
          "relative z-10 w-full bg-white rounded-xl shadow-lg",
          maxWidth,
          className,
        )}
        {...props}
      >
        {/* Header */}
        {title !== undefined && (
          <div className="flex items-center justify-between px-5 py-4 border-b border-rv-lightgray">
            <h2 className="text-base font-semibold text-rv-black">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              className="p-1 -mr-1 rounded-md text-rv-gray hover:text-rv-black hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Body */}
        <div className="px-5 py-4">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-2 px-5 py-3 border-t border-rv-lightgray">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
