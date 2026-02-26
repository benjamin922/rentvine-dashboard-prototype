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

export default function PipelineView({ title, stages, onStageClick }: PipelineViewProps) {
  const maxCount = Math.max(...stages.map(s => s.count));

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-100">
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      </div>
      <div className="p-4">
        <div className="flex items-stretch gap-1">
          {stages.map((stage, i) => (
            <div key={stage.stage} className="flex items-center flex-1 min-w-0">
              <button
                onClick={() => onStageClick?.(stage.stage)}
                className="flex-1 text-center p-3 rounded-lg hover:ring-2 hover:ring-offset-1 transition-all cursor-pointer"
                style={{
                  backgroundColor: `${stage.color}15`,
                  ['--tw-ring-color' as string]: stage.color,
                }}
              >
                <div
                  className="text-2xl font-bold mb-1"
                  style={{ color: stage.color }}
                >
                  {stage.count}
                </div>
                <div className="text-xs font-medium text-slate-600 leading-tight">
                  {stage.stage}
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${(stage.count / maxCount) * 100}%`,
                      backgroundColor: stage.color,
                    }}
                  />
                </div>
              </button>
              {i < stages.length - 1 && (
                <ChevronRight size={16} className="text-slate-300 mx-0.5 shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
