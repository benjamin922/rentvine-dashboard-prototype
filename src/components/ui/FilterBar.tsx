import {
  type HTMLAttributes,
  type ReactNode,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import clsx from "clsx";
import {
  Plus,
  X,
  Save,
  Check,
  Share2,
} from "lucide-react";
import { SegmentedControl } from "./SegmentedControl";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface SavedView {
  id: string;
  name: string;
  isDefault?: boolean;
  isShared?: boolean;
}

export interface FilterValue {
  id: string;
  field: string;
  operator: string;
  value: string;
}

export interface FixedFilter {
  field: string;
  label: string;
  options: { value: string; label: string }[];
}

export interface AvailableField {
  field: string;
  label: string;
  operators: string[];
}

export interface FilterBarProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  savedViews: SavedView[];
  activeViewId: string;
  onViewChange: (id: string) => void;
  onSaveView: (name: string) => void;
  fixedFilters: FixedFilter[];
  fixedFilterValues: Record<string, string>;
  onFixedFilterChange: (field: string, value: string) => void;
  dynamicFilters: FilterValue[];
  onAddFilter: (filter: FilterValue) => void;
  onRemoveFilter: (id: string) => void;
  onUpdateFilter: (id: string, filter: Partial<FilterValue>) => void;
  availableFields: AvailableField[];
  hasChanges: boolean;
  onApply: () => void;
  onReset: () => void;
  /** Optional: additional content rendered on the right side of the filter row */
  trailing?: ReactNode;
}

/* ------------------------------------------------------------------ */
/*  Saved-View Tabs                                                    */
/* ------------------------------------------------------------------ */

function SavedViewTabs({
  views,
  activeId,
  onSelect,
  onSave,
}: {
  views: SavedView[];
  activeId: string;
  onSelect: (id: string) => void;
  onSave: (name: string) => void;
}) {
  const [showSaveInput, setShowSaveInput] = useState(false);
  const [newName, setNewName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showSaveInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSaveInput]);

  const handleSave = () => {
    const trimmed = newName.trim();
    if (trimmed) {
      onSave(trimmed);
      setNewName("");
      setShowSaveInput(false);
    }
  };

  return (
    <div className="flex items-center gap-0.5 border-b border-rv-lightgray -mx-4 px-4 overflow-x-auto">
      {views.map((view) => {
        const isActive = view.id === activeId;
        return (
          <button
            key={view.id}
            type="button"
            onClick={() => onSelect(view.id)}
            className={clsx(
              "relative px-3 py-2 text-sm transition-colors cursor-pointer select-none whitespace-nowrap",
              "focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-rv-blue",
              isActive
                ? "font-medium text-rv-green"
                : "text-gray-500 hover:text-gray-700",
            )}
          >
            <span className="flex items-center gap-1.5">
              {view.isShared && (
                <Share2 className="h-3 w-3 text-gray-400" />
              )}
              {view.name}
            </span>
            {isActive && (
              <span
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-rv-green rounded-t"
                aria-hidden="true"
              />
            )}
          </button>
        );
      })}

      {/* Save-new-view button / inline input */}
      {showSaveInput ? (
        <div className="flex items-center gap-1 px-2 py-1">
          <input
            ref={inputRef}
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") {
                setShowSaveInput(false);
                setNewName("");
              }
            }}
            placeholder="View name..."
            className="w-28 px-2 py-1 text-xs rounded border border-rv-lightgray bg-white text-rv-black placeholder:text-rv-gray focus:outline-none focus:ring-1 focus:ring-rv-blue/30"
          />
          <button
            type="button"
            onClick={handleSave}
            className="p-1 rounded text-rv-green hover:bg-rv-green-light transition-colors cursor-pointer"
            aria-label="Save view"
          >
            <Check className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => {
              setShowSaveInput(false);
              setNewName("");
            }}
            className="p-1 rounded text-rv-gray hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Cancel"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowSaveInput(true)}
          className="flex items-center gap-1 px-2 py-2 text-xs text-gray-400 hover:text-gray-600 transition-colors cursor-pointer select-none"
          aria-label="Save current filters as a new view"
        >
          <Plus className="h-3.5 w-3.5" />
          <Save className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Add-Filter Dropdown                                                */
/* ------------------------------------------------------------------ */

function AddFilterDropdown({
  fields,
  usedFields,
  onSelect,
}: {
  fields: AvailableField[];
  usedFields: Set<string>;
  onSelect: (field: AvailableField) => void;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const available = fields.filter((f) => !usedFields.has(f.field));

  // Close on outside click
  const handleOutsideClick = useCallback((e: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.target as Node)
    ) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleOutsideClick);
      return () =>
        document.removeEventListener("mousedown", handleOutsideClick);
    }
  }, [open, handleOutsideClick]);

  if (available.length === 0) return null;

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={clsx(
          "inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-full border border-dashed border-gray-300 text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-colors cursor-pointer select-none",
        )}
      >
        <Plus className="h-3 w-3" />
        Add Filter
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 z-30 w-52 bg-white border border-rv-lightgray rounded-lg shadow-lg py-1">
          {available.map((field) => (
            <button
              key={field.field}
              type="button"
              onClick={() => {
                onSelect(field);
                setOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm text-rv-black hover:bg-gray-50 transition-colors cursor-pointer"
            >
              {field.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Filter Chip (inline editable)                                      */
/* ------------------------------------------------------------------ */

function FilterChip({
  filter,
  fieldDef,
  isCommitted,
  onUpdate,
  onRemove,
}: {
  filter: FilterValue;
  fieldDef: AvailableField | undefined;
  isCommitted: boolean;
  onUpdate: (partial: Partial<FilterValue>) => void;
  onRemove: () => void;
}) {
  const [editing, setEditing] = useState(!filter.value);
  const [localOp, setLocalOp] = useState(filter.operator);
  const [localVal, setLocalVal] = useState(filter.value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  const commitEdit = () => {
    if (localVal.trim()) {
      onUpdate({ operator: localOp, value: localVal.trim() });
      setEditing(false);
    }
  };

  const operators = fieldDef?.operators ?? ["="];
  const label = fieldDef?.label ?? filter.field;

  if (editing) {
    return (
      <span
        className={clsx(
          "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs bg-white",
          "border-dashed border-rv-blue",
        )}
      >
        <span className="font-medium text-rv-black">{label}</span>

        {operators.length > 1 ? (
          <select
            value={localOp}
            onChange={(e) => setLocalOp(e.target.value)}
            className="bg-transparent text-rv-gray text-xs focus:outline-none cursor-pointer appearance-none px-0.5"
          >
            {operators.map((op) => (
              <option key={op} value={op}>
                {op}
              </option>
            ))}
          </select>
        ) : (
          <span className="text-rv-gray">{localOp}</span>
        )}

        <input
          ref={inputRef}
          type="text"
          value={localVal}
          onChange={(e) => setLocalVal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") commitEdit();
            if (e.key === "Escape") {
              if (!filter.value) {
                onRemove();
              } else {
                setLocalOp(filter.operator);
                setLocalVal(filter.value);
                setEditing(false);
              }
            }
          }}
          placeholder="value"
          className="w-16 bg-transparent text-rv-black text-xs focus:outline-none placeholder:text-gray-400"
        />

        <button
          type="button"
          onClick={commitEdit}
          className="p-0.5 rounded text-rv-green hover:bg-rv-green-light transition-colors cursor-pointer"
        >
          <Check className="h-3 w-3" />
        </button>
        <button
          type="button"
          onClick={onRemove}
          className="p-0.5 rounded text-rv-gray hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <X className="h-3 w-3" />
        </button>
      </span>
    );
  }

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs cursor-pointer select-none transition-colors",
        isCommitted
          ? "border-solid border-gray-300 bg-gray-50 text-rv-black hover:bg-gray-100"
          : "border-dashed border-rv-blue bg-rv-blue-light text-rv-blue",
      )}
      onClick={() => setEditing(true)}
    >
      <span className="font-medium">{label}</span>
      <span className="text-rv-gray">{filter.operator}</span>
      <span>{filter.value}</span>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="ml-0.5 p-0.5 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
        aria-label={`Remove ${label} filter`}
      >
        <X className="h-3 w-3" />
      </button>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  FilterBar (main component)                                         */
/* ------------------------------------------------------------------ */

export function FilterBar({
  savedViews,
  activeViewId,
  onViewChange,
  onSaveView,
  fixedFilters,
  fixedFilterValues,
  onFixedFilterChange,
  dynamicFilters,
  onAddFilter,
  onRemoveFilter,
  onUpdateFilter,
  availableFields,
  hasChanges,
  onApply,
  onReset,
  trailing,
  className,
  ...props
}: FilterBarProps) {
  const usedFields = new Set(dynamicFilters.map((f) => f.field));

  const handleAddField = (field: AvailableField) => {
    const newFilter: FilterValue = {
      id: `filter-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      field: field.field,
      operator: field.operators[0] ?? "=",
      value: "",
    };
    onAddFilter(newFilter);
  };

  return (
    <div
      className={clsx(
        "bg-white border border-rv-lightgray rounded-xl",
        className,
      )}
      {...props}
    >
      {/* ---- Saved Views row ---- */}
      <div className="px-4 pt-1">
        <SavedViewTabs
          views={savedViews}
          activeId={activeViewId}
          onSelect={onViewChange}
          onSave={onSaveView}
        />
      </div>

      {/* ---- Filters row ---- */}
      <div className="px-4 py-3 flex flex-wrap items-center gap-2">
        {/* Fixed filters (segmented controls) */}
        {fixedFilters.map((ff) => (
          <div key={ff.field} className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              {ff.label}
            </span>
            <SegmentedControl
              size="sm"
              options={ff.options}
              value={fixedFilterValues[ff.field] ?? ff.options[0]?.value ?? ""}
              onChange={(val) => onFixedFilterChange(ff.field, val)}
            />
          </div>
        ))}

        {/* Divider between fixed and dynamic */}
        {fixedFilters.length > 0 && dynamicFilters.length > 0 && (
          <div className="h-5 w-px bg-rv-lightgray mx-1" aria-hidden="true" />
        )}

        {/* Dynamic filter chips */}
        {dynamicFilters.map((filter) => (
          <FilterChip
            key={filter.id}
            filter={filter}
            fieldDef={availableFields.find((f) => f.field === filter.field)}
            isCommitted={!hasChanges}
            onUpdate={(partial) => onUpdateFilter(filter.id, partial)}
            onRemove={() => onRemoveFilter(filter.id)}
          />
        ))}

        {/* Add Filter dropdown */}
        <AddFilterDropdown
          fields={availableFields}
          usedFields={usedFields}
          onSelect={handleAddField}
        />

        {/* Spacer pushes right-side actions */}
        <div className="flex-1" />

        {/* Apply / Reset */}
        {hasChanges && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onReset}
              className="text-xs text-rv-gray hover:text-rv-black transition-colors cursor-pointer select-none"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={onApply}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-rv-green text-white hover:bg-[#027a38] active:bg-[#026b31] transition-colors cursor-pointer select-none"
            >
              <Check className="h-3.5 w-3.5" />
              Apply Filters
            </button>
          </div>
        )}

        {/* Trailing content (e.g. search, export button) */}
        {trailing}
      </div>
    </div>
  );
}
