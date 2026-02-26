import { useState } from "react";
import {
  LayoutDashboard,
  Home,
  Wrench,
  DollarSign,
  TrendingUp,
  Plus,
  Pencil,
  Trash2,
  ArrowRight,
} from "lucide-react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface DashboardCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  kind: "default" | "template" | "custom";
}

/* ------------------------------------------------------------------ */
/*  Static data                                                        */
/* ------------------------------------------------------------------ */

const TEMPLATE_DASHBOARDS: DashboardCard[] = [
  {
    id: "tpl-maintenance",
    title: "Maintenance Coordinator",
    description:
      "Open tickets, average resolution time, vendor response rates, and work orders by category.",
    icon: <Wrench className="h-5 w-5" />,
    kind: "template",
  },
  {
    id: "tpl-accounting",
    title: "Accounting Manager",
    description:
      "Trust account balance, bank reconciliation status, pending payables, and rent collection rates.",
    icon: <DollarSign className="h-5 w-5" />,
    kind: "template",
  },
  {
    id: "tpl-executive",
    title: "Executive Overview",
    description:
      "Portfolio occupancy rate, revenue per unit, vacancy cost analysis, and lease renewal pipeline.",
    icon: <TrendingUp className="h-5 w-5" />,
    kind: "template",
  },
];

const INITIAL_CUSTOM: DashboardCard[] = [
  {
    id: "custom-1",
    title: "My Custom Dashboard 1",
    description:
      "Personalized view with unit statistics, expiring leases, and overdue balances widgets.",
    icon: <LayoutDashboard className="h-5 w-5" />,
    kind: "custom",
  },
  {
    id: "custom-2",
    title: "My Custom Dashboard 2",
    description:
      "Focused on property-level occupancy trends and monthly revenue comparisons.",
    icon: <LayoutDashboard className="h-5 w-5" />,
    kind: "custom",
  },
];

/* ------------------------------------------------------------------ */
/*  DashboardCard Component                                            */
/* ------------------------------------------------------------------ */

function DashboardCardItem({
  card,
  onOpen,
  onEdit,
  onDelete,
}: {
  card: DashboardCard;
  onOpen: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}) {
  const isTemplate = card.kind === "template";
  const isCustom = card.kind === "custom";

  return (
    <Card
      className={
        isTemplate
          ? "!border-blue-200 bg-blue-50/30 hover:bg-blue-50/60 transition-colors"
          : "hover:bg-gray-50/50 transition-colors"
      }
    >
      <div className="flex flex-col h-full">
        {/* Icon + Title row */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2.5">
            <div
              className={
                isTemplate
                  ? "flex items-center justify-center h-9 w-9 rounded-lg bg-blue-100 text-rv-blue shrink-0"
                  : card.kind === "default"
                    ? "flex items-center justify-center h-9 w-9 rounded-lg bg-rv-green-light text-rv-green shrink-0"
                    : "flex items-center justify-center h-9 w-9 rounded-lg bg-gray-100 text-rv-gray shrink-0"
              }
            >
              {card.icon}
            </div>
            <h3 className="text-sm font-semibold text-rv-black leading-tight">
              {card.title}
            </h3>
          </div>

          {/* Custom card action icons */}
          {isCustom && (
            <div className="flex items-center gap-0.5 shrink-0 -mt-0.5 -mr-1">
              {onEdit && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit();
                  }}
                  className="p-1.5 rounded-md text-gray-400 hover:text-rv-black hover:bg-gray-100 transition-colors cursor-pointer"
                  aria-label={`Edit ${card.title}`}
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
              )}
              {onDelete && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                  }}
                  className="p-1.5 rounded-md text-gray-400 hover:text-rv-red hover:bg-red-50 transition-colors cursor-pointer"
                  aria-label={`Delete ${card.title}`}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-xs text-rv-gray leading-relaxed mb-4 flex-1">
          {card.description}
        </p>

        {/* Action */}
        <div>
          {card.kind === "default" && (
            <Button
              variant="primary"
              size="sm"
              iconRight={<ArrowRight />}
              onClick={onOpen}
            >
              Open
            </Button>
          )}
          {isTemplate && (
            <Button
              variant="secondary"
              size="sm"
              iconRight={<ArrowRight />}
              onClick={onOpen}
            >
              Use Template
            </Button>
          )}
          {isCustom && (
            <Button
              variant="secondary"
              size="sm"
              iconRight={<ArrowRight />}
              onClick={onOpen}
            >
              Open
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function DashboardsPage() {
  const [customDashboards, setCustomDashboards] =
    useState<DashboardCard[]>(INITIAL_CUSTOM);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleCreate = () => {
    const trimmed = newName.trim();
    if (!trimmed) return;

    const newDashboard: DashboardCard = {
      id: `custom-${Date.now()}`,
      title: trimmed,
      description: "A new custom dashboard. Add widgets to get started.",
      icon: <LayoutDashboard className="h-5 w-5" />,
      kind: "custom",
    };
    setCustomDashboards((prev) => [...prev, newDashboard]);
    setNewName("");
    setShowCreateModal(false);
  };

  const handleDelete = (id: string) => {
    setCustomDashboards((prev) => prev.filter((d) => d.id !== id));
    setDeleteConfirmId(null);
  };

  const defaultCard: DashboardCard = {
    id: "home",
    title: "Home Dashboard",
    description:
      "Your default dashboard with unit statistics, work orders, lease balances, and revenue overview widgets.",
    icon: <Home className="h-5 w-5" />,
    kind: "default",
  };

  return (
    <div className="space-y-8">
      {/* ---- Header ---- */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-rv-blue-light text-rv-blue">
            <LayoutDashboard className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-rv-blue-dark leading-tight">
              Dashboards
            </h1>
            <p className="text-sm text-rv-gray mt-0.5">
              Manage and create custom dashboards for your team
            </p>
          </div>
        </div>
        <Button
          variant="primary"
          icon={<Plus />}
          onClick={() => setShowCreateModal(true)}
        >
          Create Dashboard
        </Button>
      </div>

      {/* ---- Default Dashboard ---- */}
      <section>
        <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
          Default
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <DashboardCardItem
            card={defaultCard}
            onOpen={() => {
              window.location.href = "/";
            }}
          />
        </div>
      </section>

      {/* ---- Templates ---- */}
      <section>
        <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
          Templates
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TEMPLATE_DASHBOARDS.map((tpl) => (
            <DashboardCardItem
              key={tpl.id}
              card={tpl}
              onOpen={() => {
                /* Prototype: no-op */
              }}
            />
          ))}
        </div>
      </section>

      {/* ---- My Dashboards ---- */}
      {customDashboards.length > 0 && (
        <section>
          <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
            My Dashboards
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {customDashboards.map((dash) => (
              <DashboardCardItem
                key={dash.id}
                card={dash}
                onOpen={() => {
                  /* Prototype: no-op */
                }}
                onEdit={() => {
                  /* Prototype: no-op */
                }}
                onDelete={() => setDeleteConfirmId(dash.id)}
              />
            ))}
          </div>
        </section>
      )}

      {/* ---- Create Modal ---- */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          setNewName("");
        }}
        title="Create Dashboard"
        footer={
          <>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setShowCreateModal(false);
                setNewName("");
              }}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleCreate}
              disabled={!newName.trim()}
            >
              Create
            </Button>
          </>
        }
      >
        <div className="space-y-3">
          <label className="block">
            <span className="text-sm font-medium text-rv-black">
              Dashboard Name
            </span>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCreate();
              }}
              placeholder="e.g. Regional Overview"
              className="mt-1.5 w-full px-3 py-2 text-sm rounded-lg border border-rv-lightgray bg-white text-rv-black placeholder:text-rv-gray focus:outline-none focus:ring-2 focus:ring-rv-blue/30 focus:border-rv-blue transition-colors"
              autoFocus
            />
          </label>
          <p className="text-xs text-rv-gray">
            You can add and arrange widgets after creating the dashboard.
          </p>
        </div>
      </Modal>

      {/* ---- Delete Confirmation Modal ---- */}
      <Modal
        isOpen={deleteConfirmId !== null}
        onClose={() => setDeleteConfirmId(null)}
        title="Delete Dashboard"
        footer={
          <>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setDeleteConfirmId(null)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="!bg-rv-red hover:!bg-red-700"
              onClick={() => {
                if (deleteConfirmId) handleDelete(deleteConfirmId);
              }}
            >
              Delete
            </Button>
          </>
        }
      >
        <p className="text-sm text-rv-black">
          Are you sure you want to delete{" "}
          <strong>
            {customDashboards.find((d) => d.id === deleteConfirmId)?.title}
          </strong>
          ? This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
}
