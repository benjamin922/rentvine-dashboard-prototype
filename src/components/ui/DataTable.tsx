import { type ReactNode, type HTMLAttributes } from "react";
import clsx from "clsx";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface Column<T> {
  key: string;
  header: string;
  /** Custom cell renderer. Receives the row data and row index. */
  render?: (row: T, index: number) => ReactNode;
  align?: "left" | "center" | "right";
  width?: string;
}

interface DataTableProps<T> extends HTMLAttributes<HTMLDivElement> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T, index: number) => void;
  emptyMessage?: string;
}

/* ------------------------------------------------------------------ */
/*  Alignment helper                                                   */
/* ------------------------------------------------------------------ */

const alignClass = (align?: "left" | "center" | "right") => {
  if (align === "center") return "text-center";
  if (align === "right") return "text-right";
  return "text-left";
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function DataTable<T>({
  columns,
  data,
  onRowClick,
  emptyMessage = "No data available",
  className,
  ...props
}: DataTableProps<T>) {
  return (
    <div className={clsx("overflow-x-auto", className)} {...props}>
      <table className="w-full border-collapse">
        <thead className="sticky top-0 z-10 bg-white">
          <tr className="border-b border-rv-lightgray">
            {columns.map((col) => (
              <th
                key={col.key}
                className={clsx(
                  "px-4 py-2.5 text-xs uppercase font-medium text-gray-500 tracking-wide whitespace-nowrap",
                  alignClass(col.align),
                )}
                style={col.width ? { width: col.width } : undefined}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-8 text-center text-sm text-rv-gray"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                onClick={onRowClick ? () => onRowClick(row, rowIdx) : undefined}
                className={clsx(
                  "border-b border-rv-lightgray last:border-b-0 transition-colors",
                  rowIdx % 2 === 1 && "bg-slate-50",
                  onRowClick && "cursor-pointer hover:bg-blue-50",
                )}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={clsx(
                      "px-4 py-2.5 text-sm text-rv-black whitespace-nowrap",
                      alignClass(col.align),
                    )}
                    style={col.width ? { width: col.width } : undefined}
                  >
                    {col.render
                      ? col.render(row, rowIdx)
                      : ((row as Record<string, unknown>)[col.key] as ReactNode) ?? "—"}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
