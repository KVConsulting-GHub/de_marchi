"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { FASE_NOMES } from "@/lib/utils";

interface PhaseTimelineProps {
  faseAtual: 1 | 2 | 3 | 4;
  incluiFase3?: boolean; // false para clientes novos
  onSelectFase?: (fase: 1 | 2 | 3 | 4) => void;
  faseSelecionada?: number;
}

export function PhaseTimeline({
  faseAtual,
  incluiFase3 = true,
  onSelectFase,
  faseSelecionada,
}: PhaseTimelineProps) {
  const fases = incluiFase3 ? [1, 2, 3, 4] : [1, 2, 4];

  return (
    <div className="flex items-start w-full">
      {fases.map((fase, idx) => {
        const faseNum   = fase as 1 | 2 | 3 | 4;
        const completed = faseNum < faseAtual;
        const active    = faseNum === faseAtual;
        const selected  = faseNum === faseSelecionada;
        const isLast    = idx === fases.length - 1;

        return (
          <div key={fase} className="flex items-center flex-1">
            {/* Step */}
            <button
              onClick={() => onSelectFase?.(faseNum)}
              className={cn(
                "flex flex-col items-center gap-2 group flex-shrink-0",
                onSelectFase && "cursor-pointer"
              )}
            >
              {/* Círculo */}
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-150",
                  completed && "text-white",
                  active && "text-white ring-4",
                  !completed && !active && "text-muted border-2"
                )}
                style={{
                  backgroundColor: completed
                    ? "#26CCAA"
                    : active
                    ? "#26CCAA"
                    : "#E8ECF2",
                  borderColor: !completed && !active ? "#C8D0DC" : undefined,
                  color:
                    !completed && !active ? "rgba(26,26,46,0.4)" : undefined,
                  ringColor: active ? "rgba(38,204,170,0.25)" : undefined,
                  boxShadow: active
                    ? "0 0 0 4px rgba(38,204,170,0.2)"
                    : selected && !active
                    ? "0 0 0 3px rgba(38,204,170,0.15)"
                    : undefined,
                }}
              >
                {completed ? <Check size={14} strokeWidth={3} /> : fase}
              </div>

              {/* Label */}
              <div className="text-center">
                <p
                  className={cn("text-xs font-semibold leading-tight whitespace-nowrap")}
                  style={{
                    color: completed || active ? "#1E2D52" : "rgba(26,26,46,0.45)",
                  }}
                >
                  Fase {fase}
                </p>
                <p
                  className="text-xs leading-tight whitespace-nowrap hidden sm:block"
                  style={{ color: "rgba(26,26,46,0.55)" }}
                >
                  {FASE_NOMES[faseNum]}
                </p>
              </div>
            </button>

            {/* Connector */}
            {!isLast && (
              <div
                className="flex-1 h-0.5 mx-2 mb-6 transition-all duration-300"
                style={{
                  backgroundColor: completed ? "#26CCAA" : "#E8ECF2",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
