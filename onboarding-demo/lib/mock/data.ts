import { MockTimestamp } from "./timestamp";

// ─ Types (espelham lib/firebase/collections.ts da produção) ──────────────────

export type ClientType       = "novo" | "migrante";
export type ChecklistStatus  = "pendente" | "concluido" | "atrasado";

export interface Client {
  id: string;
  cnpj: string;
  nomeFantasia: string;
  tipo: ClientType;
  gestorId: string;
  gestorNome: string;
  criadoEm: MockTimestamp;
}

export interface OnboardingProcess {
  id: string;
  clientId: string;
  faseAtual: 1 | 2 | 3 | 4;
  progressoPct: number;
  dataInicio: MockTimestamp;
  slaAlertaEm: MockTimestamp;
  concluidoEm: MockTimestamp | null;
}

export interface ChecklistItem {
  id: string;
  processId: string;
  fase: 1 | 2 | 3 | 4;
  titulo: string;
  descricao?: string;
  responsavel: "cliente" | "demarchi";
  status: ChecklistStatus;
  concluidoEm: MockTimestamp | null;
  ordem: number;
}

export interface Document {
  id: string;
  processId: string;
  clientId: string;
  tipo: string;
  storagePath: string;
  nomeOriginal: string;
  ocrStatus: "pendente" | "processando" | "concluido" | "erro";
  ocrResultado?: { cnpj?: string; tipo?: string; validade?: string };
  expiraEm: MockTimestamp;
  uploadadoEm: MockTimestamp;
}

// ─ Checklist seed (igual ao de produção) ─────────────────────────────────────

export const CHECKLIST_SEED: Omit<ChecklistItem, "id" | "processId" | "concluidoEm">[] = [
  { fase: 1, titulo: "Contrato Social registrado",             responsavel: "cliente",  status: "pendente", ordem: 1 },
  { fase: 1, titulo: "Cartão CNPJ",                            responsavel: "cliente",  status: "pendente", ordem: 2 },
  { fase: 1, titulo: "Procuração para Contabilidade",          responsavel: "cliente",  status: "pendente", ordem: 3 },
  { fase: 1, titulo: "Procuração para Fiscal",                 responsavel: "cliente",  status: "pendente", ordem: 4 },
  { fase: 1, titulo: "Inscrição Estadual",                     responsavel: "cliente",  status: "pendente", ordem: 5 },
  { fase: 2, titulo: "Acesso Domínio ERP configurado",         responsavel: "demarchi", status: "pendente", ordem: 1 },
  { fase: 2, titulo: "Acesso NoConte configurado",             responsavel: "demarchi", status: "pendente", ordem: 2 },
  { fase: 2, titulo: "Integração bancária configurada",        responsavel: "demarchi", status: "pendente", ordem: 3 },
  { fase: 2, titulo: "Usuário no Dashboard criado",            responsavel: "demarchi", status: "pendente", ordem: 4 },
  { fase: 3, titulo: "Backup do escritório anterior",          responsavel: "cliente",  status: "pendente", ordem: 1 },
  { fase: 3, titulo: "Importação e reconciliação de dados",    responsavel: "demarchi", status: "pendente", ordem: 2 },
  { fase: 3, titulo: "Validação de saldos (DRE e BP)",         responsavel: "demarchi", status: "pendente", ordem: 3 },
  { fase: 4, titulo: "Reunião de contexto do negócio",         responsavel: "demarchi", status: "pendente", ordem: 1 },
  { fase: 4, titulo: "Definição de contatos principais",       responsavel: "cliente",  status: "pendente", ordem: 2 },
  { fase: 4, titulo: "Calendário de entregas definido",        responsavel: "demarchi", status: "pendente", ordem: 3 },
  { fase: 4, titulo: "Primeira revisão consultiva agendada",   responsavel: "demarchi", status: "pendente", ordem: 4 },
];

// ─ Helper para gerar checklist de um cliente ─────────────────────────────────

let _idCounter = 1000;
function uid(): string { return String(++_idCounter); }

function buildChecklist(
  processId: string,
  tipo: ClientType,
  concluidos: number[] // índices dos itens seed que já estão concluídos
): ChecklistItem[] {
  const base = tipo === "novo"
    ? CHECKLIST_SEED.filter((i) => i.fase !== 3)
    : CHECKLIST_SEED;

  return base.map((seed, idx) => ({
    ...seed,
    id: uid(),
    processId,
    concluidoEm: concluidos.includes(idx)
      ? MockTimestamp.daysAgo(Math.floor(Math.random() * 3) + 1)
      : null,
    status: concluidos.includes(idx) ? ("concluido" as ChecklistStatus) : "pendente",
  }));
}

// ─ Estado inicial mock ────────────────────────────────────────────────────────

// Cliente 1 — Construtora Basalto (novo, fase 2, no prazo)
const c1: Client = {
  id: "client-001",
  cnpj: "12345678000195",
  nomeFantasia: "Construtora Basalto Ltda",
  tipo: "novo",
  gestorId: "felipe",
  gestorNome: "Felipe De Marchi",
  criadoEm: MockTimestamp.daysAgo(5),
};
const p1: OnboardingProcess = {
  id: "proc-001",
  clientId: "client-001",
  faseAtual: 2,
  progressoPct: 56,
  dataInicio: MockTimestamp.daysAgo(5),
  slaAlertaEm: MockTimestamp.daysFromNow(55),
  concluidoEm: null,
};
// 5 de 9 itens (fase 3 excluída pois é novo): fase1 tudo + 0 de fase2
const cl1 = buildChecklist("proc-001", "novo", [0, 1, 2, 3, 4]); // fase1 completa

// Cliente 2 — Mercado São João (migrante, fase 3, alerta SLA)
const c2: Client = {
  id: "client-002",
  cnpj: "98765432000118",
  nomeFantasia: "Mercado São João",
  tipo: "migrante",
  gestorId: "ana",
  gestorNome: "Ana Paula Rossini",
  criadoEm: MockTimestamp.daysAgo(22),
};
const p2: OnboardingProcess = {
  id: "proc-002",
  clientId: "client-002",
  faseAtual: 3,
  progressoPct: 44,
  dataInicio: MockTimestamp.daysAgo(22),
  slaAlertaEm: MockTimestamp.daysFromNow(38),
  concluidoEm: null,
};
// 7 de 16 itens: fase1 completa (5), fase2 parcial (2), fase3 pendente
const cl2 = buildChecklist("proc-002", "migrante", [0, 1, 2, 3, 4, 5, 6]);

// Cliente 3 — Clínica Vita Saúde (novo, fase 4, no prazo)
const c3: Client = {
  id: "client-003",
  cnpj: "11222333000181",
  nomeFantasia: "Clínica Vita Saúde",
  tipo: "novo",
  gestorId: "carlos",
  gestorNome: "Carlos Mendes",
  criadoEm: MockTimestamp.daysAgo(48),
};
const p3: OnboardingProcess = {
  id: "proc-003",
  clientId: "client-003",
  faseAtual: 4,
  progressoPct: 85,
  dataInicio: MockTimestamp.daysAgo(48),
  slaAlertaEm: MockTimestamp.daysFromNow(12),
  concluidoEm: null,
};
// 11 de 13 itens (fase3 excluída): quase tudo concluído
const cl3 = buildChecklist("proc-003", "novo", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

// Documentos de exemplo
const docs1: Document[] = [
  {
    id: "doc-001",
    processId: "proc-001",
    clientId: "client-001",
    tipo: "Contrato Social",
    storagePath: "clients/client-001/documents/contrato_social.pdf",
    nomeOriginal: "contrato_social_basalto.pdf",
    ocrStatus: "concluido",
    ocrResultado: { cnpj: "12345678000195", tipo: "Contrato Social" },
    expiraEm: MockTimestamp.daysFromNow(85),
    uploadadoEm: MockTimestamp.daysAgo(4),
  },
  {
    id: "doc-002",
    processId: "proc-001",
    clientId: "client-001",
    tipo: "Cartão CNPJ",
    storagePath: "clients/client-001/documents/cnpj.pdf",
    nomeOriginal: "cartao_cnpj.pdf",
    ocrStatus: "concluido",
    ocrResultado: { cnpj: "12345678000195", tipo: "Cartão CNPJ" },
    expiraEm: MockTimestamp.daysFromNow(86),
    uploadadoEm: MockTimestamp.daysAgo(4),
  },
];

const docs2: Document[] = [
  {
    id: "doc-003",
    processId: "proc-002",
    clientId: "client-002",
    tipo: "Procuração para Contabilidade",
    storagePath: "clients/client-002/documents/procuracao.pdf",
    nomeOriginal: "procuracao_contabilidade.pdf",
    ocrStatus: "concluido",
    ocrResultado: { tipo: "Procuração" },
    expiraEm: MockTimestamp.daysFromNow(68),
    uploadadoEm: MockTimestamp.daysAgo(20),
  },
];

// ─ Exports ────────────────────────────────────────────────────────────────────

export const INITIAL_CLIENTS: Client[] = [c1, c2, c3];

export const INITIAL_PROCESSES: Record<string, OnboardingProcess> = {
  "client-001": p1,
  "client-002": p2,
  "client-003": p3,
};

export const INITIAL_CHECKLISTS: Record<string, ChecklistItem[]> = {
  "proc-001": cl1,
  "proc-002": cl2,
  "proc-003": cl3,
};

export const INITIAL_DOCUMENTS: Record<string, Document[]> = {
  "client-001": docs1,
  "client-002": docs2,
  "client-003": [],
};

export { uid };
