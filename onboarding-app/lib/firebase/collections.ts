import {
  collection,
  doc,
  addDoc,
  updateDoc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "./client";

// ─ Types ──────────────────────────────────────────────────────────────────────

export type ClientType = "novo" | "migrante";

export type ChecklistStatus = "pendente" | "concluido" | "atrasado";

export interface Client {
  id: string;
  cnpj: string;
  nomeFantasia: string;
  tipo: ClientType;
  gestorId: string;
  gestorNome: string;
  criadoEm: Timestamp;
}

export interface OnboardingProcess {
  id: string;
  clientId: string;
  faseAtual: 1 | 2 | 3 | 4;
  progressoPct: number;
  dataInicio: Timestamp;
  slaAlertaEm: Timestamp;
  concluidoEm: Timestamp | null;
}

export interface ChecklistItem {
  id: string;
  processId: string;
  fase: 1 | 2 | 3 | 4;
  titulo: string;
  descricao?: string;
  responsavel: "cliente" | "demarchi";
  status: ChecklistStatus;
  concluidoEm: Timestamp | null;
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
  expiraEm: Timestamp;
  uploadadoEm: Timestamp;
}

export interface AuditLog {
  userId: string;
  userEmail: string;
  acao: string;
  entidade: "client" | "onboarding" | "checklist" | "document";
  entidadeId: string;
  timestamp: Timestamp;
}

// ─ Helpers de coleção ─────────────────────────────────────────────────────────

export const clientsCol     = () => collection(db, "clients");
export const clientDoc      = (id: string) => doc(db, "clients", id);
export const onboardingCol  = (clientId: string) =>
  collection(db, "clients", clientId, "onboarding");
export const onboardingDoc  = (clientId: string, processId: string) =>
  doc(db, "clients", clientId, "onboarding", processId);
export const checklistCol   = (clientId: string, processId: string) =>
  collection(db, "clients", clientId, "onboarding", processId, "checklist");
export const checklistItem  = (clientId: string, processId: string, itemId: string) =>
  doc(db, "clients", clientId, "onboarding", processId, "checklist", itemId);
export const documentsCol   = (clientId: string) =>
  collection(db, "clients", clientId, "documents");
export const auditCol       = () => collection(db, "audit_log");

// ─ Checklist padrão (seed) ────────────────────────────────────────────────────

export const CHECKLIST_PADRAO: Omit<ChecklistItem, "id" | "processId" | "concluidoEm">[] = [
  // Fase 1 — Documentação
  { fase: 1, titulo: "Contrato Social registrado",        responsavel: "cliente",  status: "pendente", ordem: 1 },
  { fase: 1, titulo: "Cartão CNPJ",                       responsavel: "cliente",  status: "pendente", ordem: 2 },
  { fase: 1, titulo: "Procuração para Contabilidade",     responsavel: "cliente",  status: "pendente", ordem: 3 },
  { fase: 1, titulo: "Procuração para Fiscal",            responsavel: "cliente",  status: "pendente", ordem: 4 },
  { fase: 1, titulo: "Inscrição Estadual",                responsavel: "cliente",  status: "pendente", ordem: 5 },
  // Fase 2 — Setup de Sistemas
  { fase: 2, titulo: "Acesso Domínio ERP configurado",    responsavel: "demarchi", status: "pendente", ordem: 1 },
  { fase: 2, titulo: "Acesso NoConte configurado",        responsavel: "demarchi", status: "pendente", ordem: 2 },
  { fase: 2, titulo: "Integração bancária configurada",   responsavel: "demarchi", status: "pendente", ordem: 3 },
  { fase: 2, titulo: "Usuário no Dashboard criado",       responsavel: "demarchi", status: "pendente", ordem: 4 },
  // Fase 3 — Transferência (migrantes)
  { fase: 3, titulo: "Backup do escritório anterior",     responsavel: "cliente",  status: "pendente", ordem: 1 },
  { fase: 3, titulo: "Importação e reconciliação de dados", responsavel: "demarchi", status: "pendente", ordem: 2 },
  { fase: 3, titulo: "Validação de saldos (DRE e BP)",    responsavel: "demarchi", status: "pendente", ordem: 3 },
  // Fase 4 — Kick-off
  { fase: 4, titulo: "Reunião de contexto do negócio",    responsavel: "demarchi", status: "pendente", ordem: 1 },
  { fase: 4, titulo: "Definição de contatos principais",  responsavel: "cliente",  status: "pendente", ordem: 2 },
  { fase: 4, titulo: "Calendário de entregas definido",   responsavel: "demarchi", status: "pendente", ordem: 3 },
  { fase: 4, titulo: "Primeira revisão consultiva agendada", responsavel: "demarchi", status: "pendente", ordem: 4 },
];

// ─ Funções de escrita ─────────────────────────────────────────────────────────

export async function createClient(
  data: Omit<Client, "id" | "criadoEm">
): Promise<string> {
  const ref = await addDoc(clientsCol(), {
    ...data,
    criadoEm: serverTimestamp(),
  });
  return ref.id;
}

export async function createOnboardingProcess(
  clientId: string,
  tipo: ClientType
): Promise<string> {
  const agora   = new Date();
  const slaData = new Date(agora);
  slaData.setDate(slaData.getDate() + 55); // alerta 5 dias antes do SLA de 60

  const ref = await addDoc(onboardingCol(clientId), {
    clientId,
    faseAtual: 1,
    progressoPct: 0,
    dataInicio:   serverTimestamp(),
    slaAlertaEm:  Timestamp.fromDate(slaData),
    concluidoEm:  null,
  });

  // Seed checklist — pula fase 3 para clientes novos
  const items = tipo === "novo"
    ? CHECKLIST_PADRAO.filter((i) => i.fase !== 3)
    : CHECKLIST_PADRAO;

  for (const item of items) {
    await addDoc(checklistCol(clientId, ref.id), {
      ...item,
      processId:   ref.id,
      concluidoEm: null,
    });
  }

  return ref.id;
}

export async function toggleChecklistItem(
  clientId: string,
  processId: string,
  itemId: string,
  concluido: boolean
): Promise<void> {
  await updateDoc(checklistItem(clientId, processId, itemId), {
    status:      concluido ? "concluido" : "pendente",
    concluidoEm: concluido ? serverTimestamp() : null,
  });
}

export async function calcularProgresso(
  clientId: string,
  processId: string
): Promise<number> {
  const snap = await getDocs(checklistCol(clientId, processId));
  const total = snap.size;
  if (total === 0) return 0;
  const concluidos = snap.docs.filter(
    (d) => d.data().status === "concluido"
  ).length;
  return Math.round((concluidos / total) * 100);
}
