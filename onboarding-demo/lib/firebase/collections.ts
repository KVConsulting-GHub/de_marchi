/**
 * Mock de lib/firebase/collections.ts
 * Mesma API pública da versão de produção — sem dependência de Firebase.
 * Todas as operações vão para o Zustand store (lib/mock/store.ts).
 */
export type {
  Client,
  ClientType,
  OnboardingProcess,
  ChecklistItem,
  ChecklistStatus,
  Document,
} from "@/lib/mock/data";

export { CHECKLIST_SEED as CHECKLIST_PADRAO } from "@/lib/mock/data";

import { useStore } from "@/lib/mock/store";
import type { Client, ClientType } from "@/lib/mock/data";

// ─ Criar cliente ──────────────────────────────────────────────────────────────

export async function createClient(
  data: Omit<Client, "id" | "criadoEm">
): Promise<string> {
  return useStore.getState().createClient(data);
}

// ─ Criar processo de onboarding ───────────────────────────────────────────────

export async function createOnboardingProcess(
  clientId: string,
  tipo: ClientType
): Promise<string> {
  return useStore.getState().createProcess(clientId, tipo);
}

// ─ Toggle item do checklist ───────────────────────────────────────────────────

export async function toggleChecklistItem(
  clientId: string,
  processId: string,
  itemId: string,
  concluido: boolean
): Promise<void> {
  useStore.getState().toggleItem(clientId, processId, itemId, concluido);
}

// ─ Calcular progresso ─────────────────────────────────────────────────────────

export async function calcularProgresso(
  clientId: string,
  processId: string
): Promise<number> {
  const items = useStore.getState().checklists[processId] ?? [];
  if (!items.length) return 0;
  return Math.round(
    (items.filter((i) => i.status === "concluido").length / items.length) * 100
  );
}
