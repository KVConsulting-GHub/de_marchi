import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle2, Clock } from "lucide-react";

type SLAStatus = "ok" | "alerta" | "atrasado";

interface SLABadgeProps {
  status: SLAStatus;
  diasRestantes?: number;
  className?: string;
}

const CONFIG: Record<SLAStatus, {
  label: string;
  bg: string;
  text: string;
  border: string;
  Icon: React.ElementType;
}> = {
  ok: {
    label: "No prazo",
    bg: "rgba(38,204,170,0.08)",
    text: "#1B8C76",
    border: "rgba(38,204,170,0.3)",
    Icon: CheckCircle2,
  },
  alerta: {
    label: "Atenção",
    bg: "rgba(245,158,11,0.08)",
    text: "#92400E",
    border: "rgba(245,158,11,0.3)",
    Icon: Clock,
  },
  atrasado: {
    label: "Atrasado",
    bg: "rgba(239,68,68,0.08)",
    text: "#B91C1C",
    border: "rgba(239,68,68,0.3)",
    Icon: AlertTriangle,
  },
};

export function SLABadge({ status, diasRestantes, className }: SLABadgeProps) {
  const { label, bg, text, border, Icon } = CONFIG[status];
  return (
    <span
      className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border", className)}
      style={{ backgroundColor: bg, color: text, borderColor: border }}
    >
      <Icon size={12} strokeWidth={2.5} />
      {label}
      {diasRestantes !== undefined && status !== "atrasado" && (
        <span className="opacity-70">· {diasRestantes}d</span>
      )}
    </span>
  );
}
