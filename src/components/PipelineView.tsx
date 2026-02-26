import { ChevronRight } from 'lucide-react';

interface PipelineStage {
  stage: string;
  count: number;
  color: string;
}

interface PipelineViewProps {
  title: string;
  stages: PipelineStage[];
  onStageClick?: (stage: string) => void;
}

export default function PipelineView({
  title,
  stages,
  onStageClick,
}: PipelineViewProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 py-3.5 border-b border-slate-100">
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      </div>

      {/* Pipeline stages */}
      <div className="p-5">
        <div className="flex items-stretch gap-0">
          {stages.map((stage, i) => (
            <div
              key={stage.stage}
              className="flex items-center flex-1 min-w-0"
            >
              {/* Stage card */}
              <button
                onClick={() => onStageClick?.(stage.stage)}
                className="flex-1 text-center p-4 rounded-xl border border-slate-200/60 bg-white hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
                style={
                  {
                    '--stage-color': stage.color,
                  } as React.CSSProperties
                }
              >
                {/* Color bar at top */}
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ backgroundColor: stage.color }}
                />

                {/* Count */}
                <div
                  className="text-[24px] font-bold leading-none mt-1"
                  style={{ color: stage.color }}
                >
                  {stage.count}
                </div>

                {/* Label */}
                <div className="text-[11px] font-medium text-slate-500 mt-1.5 leading-tight truncate">
                  {stage.stage}
                </div>
              </button>

              {/* Connecting chevron arrow between stages */}
              {i < stages.length - 1 && (
                <div className="flex items-center justify-center w-6 shrink-0">
                  <ChevronRight size={16} className="text-slate-300" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
