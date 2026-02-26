import { Settings, X } from "lucide-react";
import type { DashboardWidget } from "../../data/dashboard";
import { Card, CardHeader, CardContent } from "../ui/Card";
import WidgetRenderer from "./WidgetRenderer";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface BaseWidgetProps {
  widget: DashboardWidget;
  isEditing: boolean;
  onRemove?: (id: string) => void;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function BaseWidget({
  widget,
  isEditing,
  onRemove,
}: BaseWidgetProps) {
  return (
    <Card className="h-full overflow-hidden flex flex-col">
      <CardHeader
        title={widget.title}
        action={
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="p-1 rounded-md text-rv-gray hover:text-rv-black hover:bg-gray-100 transition-colors"
              aria-label="Widget settings"
            >
              <Settings className="h-4 w-4" />
            </button>

            {isEditing && onRemove && (
              <button
                type="button"
                onClick={() => onRemove(widget.id)}
                className="p-1 rounded-md text-rv-gray hover:text-rv-red hover:bg-red-50 transition-colors"
                aria-label={`Remove ${widget.title}`}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        }
      />
      <CardContent className="flex-1 min-h-0">
        <WidgetRenderer type={widget.type} />
      </CardContent>
    </Card>
  );
}
