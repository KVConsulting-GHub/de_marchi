import { create } from "zustand";
import { MockTimestamp } from "./timestamp";
import {
  INITIAL_CLIENTS,
  INITIAL_PROCESSES,
  INITIAL_CHECKLISTS,
  INITIAL_DOCUMENTS,
  CHECKLIST_SEED,
  uid,
  type Client,
  type ClientType,
  type OnboardingProcess,
  type ChecklistItem,
  type Document,
} from "./data";

interface AppStore {
  // ─ Estado ────────────────────────────────────────────────────
  clients:    Client[];
  processes:  Record<string, OnboardingProcess>; // clientId → process
  checklists: Record<string, ChecklistItem[]>;   // processId → items
  documents:  Record<string, Document[]>;        // clientId → docs

  // ─ Ações ─────────────────────────────────────────────────────
  createClient: (data: Omit<Client, "id" | "criadoEm">) => string;

  createProcess: (clientId: string, tipo: ClientType) => string;

  toggleItem: (
    clientId: string,
    processId: string,
    itemId: string,
    done: boolean
  ) => void;

  addDocument: (
    clientId: string,
    doc: Omit<Document, "id" | "uploadadoEm" | "expiraEm" | "ocrStatus">
  ) => string;

  updateDocOCR: (
    clientId: string,
    docId: string,
    result: { tipo?: string | null; cnpj?: string | null; validade?: string | null }
  ) => void;
}

export const useStore = create<AppStore>((set, get) => ({
  clients:    INITIAL_CLIENTS,
  processes:  INITIAL_PROCESSES,
  checklists: INITIAL_CHECKLISTS,
  documents:  INITIAL_DOCUMENTS,

  // ─ Criar cliente ──────────────────────────────────────────────
  createClient(data) {
    const id: string = `client-${uid()}`;
    const client: Client = { ...data, id, criadoEm: MockTimestamp.now() };
    set((s) => ({ clients: [client, ...s.clients] }));
    return id;
  },

  // ─ Criar processo de onboarding com checklist seed ───────────
  createProcess(clientId, tipo) {
    const processId = `proc-${uid()}`;
    const slaDate   = MockTimestamp.daysFromNow(55);
    const process: OnboardingProcess = {
      id:           processId,
      clientId,
      faseAtual:    1,
      progressoPct: 0,
      dataInicio:   MockTimestamp.now(),
      slaAlertaEm:  slaDate,
      concluidoEm:  null,
    };

    const items = (tipo === "novo"
      ? CHECKLIST_SEED.filter((i) => i.fase !== 3)
      : CHECKLIST_SEED
    ).map((seed) => ({
      ...seed,
      id:          uid(),
      processId,
      concluidoEm: null as MockTimestamp | null,
      status:      "pendente" as const,
    }));

    set((s) => ({
      processes:  { ...s.processes,  [clientId]: process },
      checklists: { ...s.checklists, [processId]: items },
    }));

    return processId;
  },

  // ─ Toggle item do checklist ───────────────────────────────────
  toggleItem(clientId, processId, itemId, done) {
    set((s) => {
      const items = (s.checklists[processId] ?? []).map((i) =>
        i.id === itemId
          ? {
              ...i,
              status:      done ? ("concluido" as const) : ("pendente" as const),
              concluidoEm: done ? MockTimestamp.now() : null,
            }
          : i
      );

      // Recalcula progresso
      const pct   = items.length
        ? Math.round((items.filter((i) => i.status === "concluido").length / items.length) * 100)
        : 0;

      // Avança fase automaticamente se todos os itens da fase atual estiverem concluídos
      const process = s.processes[clientId];
      let faseAtual = process?.faseAtual ?? 1;

      if (process) {
        const faseItems = items.filter((i) => i.fase === faseAtual);
        const faseConc  = faseItems.every((i) => i.status === "concluido");
        if (faseConc && faseItems.length > 0 && faseAtual < 4) {
          // Encontra próxima fase que tem itens
          const fasesComItens = [...new Set(items.map((i) => i.fase))].sort();
          const idx = fasesComItens.indexOf(faseAtual);
          if (idx !== -1 && idx < fasesComItens.length - 1) {
            faseAtual = fasesComItens[idx + 1] as 1 | 2 | 3 | 4;
          }
        }
      }

      return {
        checklists: { ...s.checklists, [processId]: items },
        processes: process
          ? {
              ...s.processes,
              [clientId]: { ...process, progressoPct: pct, faseAtual },
            }
          : s.processes,
      };
    });
  },

  // ─ Adicionar documento ────────────────────────────────────────
  addDocument(clientId, docData) {
    const id  = `doc-${uid()}`;
    const doc: Document = {
      ...docData,
      id,
      ocrStatus:   "pendente",
      uploadadoEm: MockTimestamp.now(),
      expiraEm:    MockTimestamp.daysFromNow(90),
    };
    set((s) => ({
      documents: {
        ...s.documents,
        [clientId]: [doc, ...(s.documents[clientId] ?? [])],
      },
    }));
    return id;
  },

  // ─ Atualizar resultado de OCR ─────────────────────────────────
  updateDocOCR(clientId, docId, result) {
    set((s) => ({
      documents: {
        ...s.documents,
        [clientId]: (s.documents[clientId] ?? []).map((d) =>
          d.id === docId
            ? {
                ...d,
                ocrStatus: "concluido" as const,
                tipo:      result.tipo ?? d.tipo,
                ocrResultado: {
                  tipo:      result.tipo     ?? undefined,
                  cnpj:      result.cnpj     ?? undefined,
                  validade:  result.validade ?? undefined,
                },
              }
            : d
        ),
      },
    }));
  },
}));
