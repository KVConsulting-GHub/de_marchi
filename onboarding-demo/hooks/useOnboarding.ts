"use client";

import { useStore } from "@/lib/mock/store";
import type { Client, OnboardingProcess, ChecklistItem, Document } from "@/lib/mock/data";

// ─ Todos os clientes ──────────────────────────────────────────────────────────

export function useAllClients() {
  const clients = useStore((s) => s.clients);
  return { data: clients, loading: false };
}

// ─ Processo de onboarding de um cliente ──────────────────────────────────────

export function useOnboardingProcess(clientId: string) {
  const process = useStore((s) => s.processes[clientId] ?? null);
  return { process, loading: false };
}

// ─ Checklist de um processo ───────────────────────────────────────────────────

export function useChecklist(clientId: string, processId: string) {
  const items = useStore((s) => s.checklists[processId] ?? []);

  const byFase = (fase: 1 | 2 | 3 | 4) => items.filter((i) => i.fase === fase);

  const progressoPct = items.length
    ? Math.round((items.filter((i) => i.status === "concluido").length / items.length) * 100)
    : 0;

  return { items, byFase, progressoPct, loading: false };
}

// ─ Documentos de um cliente ───────────────────────────────────────────────────

export function useDocuments(clientId: string) {
  const docs = useStore((s) => s.documents[clientId] ?? []);
  return { docs, loading: false };
}

// ─ Re-exports de tipos para conveniência ─────────────────────────────────────
export type { Client, OnboardingProcess, ChecklistItem, Document };
