import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCNPJ(cnpj: string): string {
  const d = cnpj.replace(/\D/g, "");
  return d.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
}

/** Aceita qualquer objeto com .toDate() — compatível com Firebase Timestamp e MockTimestamp */
export function formatDate(ts: { toDate(): Date } | null): string {
  if (!ts) return "—";
  return ts.toDate().toLocaleDateString("pt-BR", {
    day: "2-digit", month: "2-digit", year: "numeric",
  });
}

export function diasDesdeTimestamp(ts: { toDate(): Date }): number {
  const ms = Date.now() - ts.toDate().getTime();
  return Math.floor(ms / (1000 * 60 * 60 * 24));
}

export const FASE_NOMES: Record<number, string> = {
  1: "Documentação",
  2: "Setup de Sistemas",
  3: "Transferência de Dados",
  4: "Kick-off",
};

export const FASE_PRAZO_DIAS: Record<number, number> = {
  1: 10,
  2: 10,
  3: 20,
  4: 10,
};

export function slaStatus(
  faseAtual: number,
  dataInicio: { toDate(): Date }
): "ok" | "alerta" | "atrasado" {
  const prazo = FASE_PRAZO_DIAS[faseAtual] ?? 10;
  const dias  = diasDesdeTimestamp(dataInicio);
  if (dias > prazo)         return "atrasado";
  if (dias > prazo * 0.7)  return "alerta";
  return "ok";
}
