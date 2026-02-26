import { useState, useCallback, useRef, useMemo } from "react";
import { Responsive, useContainerWidth } from "react-grid-layout";
import type { LayoutItem } from "react-grid-layout";
import {
  Plus,
  LayoutDashboard,
  Save,
  X,
  GripVertical,
} from "lucide-react";

import {
  defaultWidgets,
  widgetCatalog,
  type DashboardWidget,
  type WidgetCatalogItem,
} from "../../data/dashboard";
import BaseWidget from "../../components/widgets/BaseWidget";
import { Button } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";

/* ------------------------------------------------------------------ */
/*  Responsive grid layout                                             */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Derive react-grid-layout layout from our widget data */
function widgetsToLayout(widgets: DashboardWidget[]) {
  return widgets.map((w) => ({
    i: w.id,
    x: w.x,
    y: w.y,
    w: w.w,
    h: w.h,
    minW: 2,
    minH: 2,
  }));
}

/** Group catalog items by category */
function groupByCategory(
  items: WidgetCatalogItem[],
): Record<string, WidgetCatalogItem[]> {
  return items.reduce<Record<string, WidgetCatalogItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});
}

let nextWidgetId = defaultWidgets.length + 1;
function generateWidgetId(): string {
  return `w${nextWidgetId++}`;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function HomePage() {
  /* ---- container width for responsive grid ---------------------- */
  const { ref: containerRef, width: containerWidth } = useContainerWidth();

  /* ---- state ---------------------------------------------------- */
  const [widgets, setWidgets] = useState<DashboardWidget[]>(defaultWidgets);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingWidget, setIsAddingWidget] = useState(false);

  // Snapshot taken when user enters edit mode, used for cancel/revert
  const snapshotRef = useRef<DashboardWidget[]>(widgets);

  /* ---- derived -------------------------------------------------- */
  const layout = useMemo(() => widgetsToLayout(widgets), [widgets]);
  const catalogGrouped = useMemo(() => groupByCategory(widgetCatalog), []);

  /* ---- callbacks ------------------------------------------------ */

  /** Sync widget positions when react-grid-layout reports a change */
  const handleLayoutChange = useCallback(
    (newLayout: LayoutItem[]) => {
      setWidgets((prev) =>
        prev.map((widget) => {
          const item = newLayout.find((l) => l.i === widget.id);
          if (!item) return widget;
          return {
            ...widget,
            x: item.x,
            y: item.y,
            w: item.w,
            h: item.h,
          };
        }),
      );
    },
    [],
  );

  const handleRemove = useCallback((id: string) => {
    setWidgets((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const handleStartEditing = useCallback(() => {
    snapshotRef.current = widgets;
    setIsEditing(true);
  }, [widgets]);

  const handleSave = useCallback(() => {
    // In a real app this would POST to the API
    setIsEditing(false);
  }, []);

  const handleCancel = useCallback(() => {
    setWidgets(snapshotRef.current);
    setIsEditing(false);
  }, []);

  const handleAddWidget = useCallback((catalogItem: WidgetCatalogItem) => {
    // Find max y to position new widget at the bottom
    setWidgets((prev) => {
      const maxY = prev.reduce(
        (max, w) => Math.max(max, w.y + w.h),
        0,
      );

      const newWidget: DashboardWidget = {
        id: generateWidgetId(),
        type: catalogItem.type,
        title: catalogItem.label,
        x: 0,
        y: maxY,
        w: catalogItem.defaultW,
        h: catalogItem.defaultH,
      };

      return [...prev, newWidget];
    });

    setIsAddingWidget(false);
  }, []);

  /* ---- render --------------------------------------------------- */
  return (
    <div className="space-y-4">
      {/* ---- Editing info bar ------------------------------------ */}
      {isEditing && (
        <div className="flex items-center justify-between gap-4 rounded-lg bg-rv-blue-light border border-rv-blue/20 px-4 py-2.5 text-sm text-rv-blue-dark">
          <div className="flex items-center gap-2">
            <GripVertical className="h-4 w-4 shrink-0" />
            <span>
              Drag widgets to rearrange. Resize from bottom-right corner.
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="primary"
              size="sm"
              icon={<Save />}
              onClick={handleSave}
            >
              Save
            </Button>
            <Button
              variant="secondary"
              size="sm"
              icon={<X />}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* ---- Page header ----------------------------------------- */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="h-6 w-6 text-rv-blue-dark" />
          <h1 className="text-2xl font-semibold text-rv-blue-dark">
            Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="tertiary"
            size="sm"
            icon={<Plus />}
            disabled={isEditing}
            onClick={() => setIsAddingWidget(true)}
          >
            Add Widget
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleStartEditing}
            disabled={isEditing}
          >
            Configure Dashboard
          </Button>
        </div>
      </div>

      {/* ---- Grid layout ----------------------------------------- */}
      <div ref={containerRef}>
        {containerWidth > 0 && (
          <Responsive
            className="layout"
            width={containerWidth}
            layouts={{ lg: layout }}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 12, sm: 12, xs: 1, xxs: 1 }}
            rowHeight={55}
            compactType="vertical"
            isDraggable={isEditing}
            isResizable={isEditing}
            draggableCancel=".widget-content"
            onLayoutChange={handleLayoutChange}
            style={{ minHeight: "calc(100vh - 200px)" }}
          >
            {widgets.map((widget) => (
              <div
                key={widget.id}
                data-grid={{
                  x: widget.x,
                  y: widget.y,
                  w: widget.w,
                  h: widget.h,
                  minW: 2,
                  minH: 2,
                }}
              >
                <BaseWidget
                  widget={widget}
                  isEditing={isEditing}
                  onRemove={handleRemove}
                />
              </div>
            ))}
          </Responsive>
        )}
      </div>

      {/* ---- Add Widget Modal ------------------------------------ */}
      <Modal
        isOpen={isAddingWidget}
        onClose={() => setIsAddingWidget(false)}
        title="Add Widget"
        maxWidth="max-w-2xl"
      >
        <div className="space-y-5 max-h-[60vh] overflow-y-auto -mx-5 px-5">
          {Object.entries(catalogGrouped).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-rv-gray mb-2">
                {category}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {items.map((item) => (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => handleAddWidget(item)}
                    className="text-left rounded-lg border border-rv-lightgray p-3 hover:border-rv-blue hover:bg-rv-blue-light transition-colors cursor-pointer group"
                  >
                    <p className="text-sm font-medium text-rv-black group-hover:text-rv-blue-dark">
                      {item.label}
                    </p>
                    <p className="text-xs text-rv-gray mt-0.5 line-clamp-2">
                      {item.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}
