"use client";

import { useState } from "react";
import { Check, User, Building2, Clock } from "lucide-react";
import { toggleChecklistItem } from "@/lib/firebase/collections";
import type { ChecklistItem } from "@/lib/firebase/collections";
import { cn, formatDate, FASE_NOMES } from "@/lib/utils";

interface ChecklistPanelProps {
  clientId: string;
  processId: string;
  items: ChecklistItem[];
  fase: 1 | 2 | 3 | 4;
}

export function ChecklistPanel({
  clientId, processId, items, fase,
}: ChecklistPanelProps) {
  const [loading, setLoading] = useState<string | null>(null);

  const handleToggle = async (item: ChecklistItem) => {
    if (loading) return;
    setLoading(item.id);
    try {
      await toggleChecklistItem(
        clientId,
        processId,
        item.id,
        item.status !== "concluido"
      );
    } finally {
      setLoading(null);
    }
  };

  const total     = items.length;
  const concluidos = items.filter((i) => i.status === "concluido").length;
  const pct        = total ? Math.round((concluidos / total) * 100) : 0;

  return (
    <div className="bg-white rounded-xl border border-base-300 overflow-hidden">
      {/* Header da fase */}
      <div className="px-6 py-4 border-b border-base-300 flex items-center justify-between"
        style={{ backgroundColor: "#F4F6F9" }}>
        <div>
          <h3 className="font-semibold text-sm" style={{ color: "#1E2D52" }}>
            Fase {fase} — {FASE_NOMES[fase]}
          </h3>
          <p className="text-xs mt-0.5" style={{ color: "rgba(26,26,46,0.55)" }}>
            {concluidos} de {total} itens concluídos
          </p>
        </div>

        {/* Mini progress */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block w-24 h-1.5 bg-base-300 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${pct}%`, backgroundColor: "#26CCAA" }}
            />
          </div>
          <span className="text-sm font-bold" style={{ color: pct === 100 ? "#26CCAA" : "#1E2D52" }}>
            {pct}%
          </span>
        </div>
      </div>

      {/* Items */}
      <ul className="divide-y divide-base-200">
        {items.map((item) => {
          const done    = item.status === "concluido";
          const atrasado = item.status === "atrasado";
          const isLoading = loading === item.id;

          return (
            <li
              key={item.id}
              className={cn(
                "flex items-start gap-4 px-6 py-4 transition-colors",
                done ? "bg-white" : "bg-white hover:bg-base-100"
              )}
            >
              {/* Checkbox */}
              <button
                onClick={() => handleToggle(item)}
                disabled={isLoading}
                className={cn(
                  "mt-0.5 w-5 h-5 rounded flex-shrink-0 border-2 flex items-center justify-center transition-all duration-150",
                  done
                    ? "border-transparent"
                    : atrasado
                    ? "border-red-300 hover:border-red-400"
                    : "border-base-300 hover:border-primary",
                  isLoading && "opacity-50 cursor-wait"
                )}
                style={done ? { backgroundColor: "#26CCAA", borderColor: "#26CCAA" } : undefined}
              >
                {done && <Check size={11} strokeWidth={3} className="text-white" />}
              </button>

              {/* Conteúdo */}
              <div className="flex-1 min-w-0">
                <p
                  className={cn("text-sm font-medium leading-snug", done && "line-through opacity-50")}
                  style={{ color: "#1A1A2E" }}
                >
                  {item.titulo}
                </p>
                {item.descricao && (
                  <p className="text-xs mt-0.5" style={{ color: "rgba(26,26,46,0.55)" }}>
                    {item.descricao}
                  </p>
                )}
                {done && item.concluidoEm && (
                  <p className="flex items-center gap-1 text-xs mt-1" style={{ color: "#26CCAA" }}>
                    <Clock size={10} />
                    Concluído em {formatDate(item.concluidoEm)}
                  </p>
                )}
              </div>

              {/* Responsável */}
              <span
                className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border flex-shrink-0"
                style={
                  item.responsavel === "cliente"
                    ? { color: "#273A6A", borderColor: "rgba(39,58,106,0.2)", backgroundColor: "rgba(39,58,106,0.05)" }
                    : { color: "#1B8C76", borderColor: "rgba(27,140,118,0.2)", backgroundColor: "rgba(27,140,118,0.05)" }
                }
              >
                {item.responsavel === "cliente"
                  ? <><User size={10} /> Cliente</>
                  : <><Building2 size={10} /> DeMarchi</>
                }
              </span>
            </li>
          );
        })}

        {items.length === 0 && (
          <li className="px-6 py-8 text-center text-sm" style={{ color: "rgba(26,26,46,0.4)" }}>
            Nenhum item nesta fase.
          </li>
        )}
      </ul>
    </div>
  );
}
