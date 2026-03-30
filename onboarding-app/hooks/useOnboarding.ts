"use client";

import { useEffect, useState } from "react";
import {
  onSnapshot,
  query,
  orderBy,
  collection,
  doc,
  limit,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import type {
  Client,
  OnboardingProcess,
  ChecklistItem,
  Document as FireDoc,
} from "@/lib/firebase/collections";

// ─ Hook: lista todos os clientes em onboarding ──────────────────────────────

export interface ClientWithProcess {
  client: Client;
  process: OnboardingProcess | null;
}

export function useAllClients() {
  const [data, setData]       = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "clients"), orderBy("criadoEm", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setData(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Client)));
      setLoading(false);
    });
    return unsub;
  }, []);

  return { data, loading };
}

// ─ Hook: processo de onboarding de um cliente específico ───────────────────

export function useOnboardingProcess(clientId: string) {
  const [process, setProcess] = useState<OnboardingProcess | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!clientId) return;
    const q = query(
      collection(db, "clients", clientId, "onboarding"),
      orderBy("dataInicio", "desc"),
      limit(1)
    );
    const unsub = onSnapshot(q, (snap) => {
      if (snap.empty) {
        setProcess(null);
      } else {
        const d = snap.docs[0];
        setProcess({ id: d.id, ...d.data() } as OnboardingProcess);
      }
      setLoading(false);
    });
    return unsub;
  }, [clientId]);

  return { process, loading };
}

// ─ Hook: checklist de um processo específico ───────────────────────────────

export function useChecklist(clientId: string, processId: string) {
  const [items, setItems]     = useState<ChecklistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!clientId || !processId) return;
    const q = query(
      collection(db, "clients", clientId, "onboarding", processId, "checklist"),
      orderBy("fase"),
      orderBy("ordem")
    );
    const unsub = onSnapshot(q, (snap) => {
      setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() } as ChecklistItem)));
      setLoading(false);
    });
    return unsub;
  }, [clientId, processId]);

  const byFase = (fase: 1 | 2 | 3 | 4) => items.filter((i) => i.fase === fase);

  const progressoPct = items.length
    ? Math.round((items.filter((i) => i.status === "concluido").length / items.length) * 100)
    : 0;

  return { items, byFase, progressoPct, loading };
}

// ─ Hook: documentos de um cliente ──────────────────────────────────────────

export function useDocuments(clientId: string) {
  const [docs, setDocs]       = useState<FireDoc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!clientId) return;
    const q = query(
      collection(db, "clients", clientId, "documents"),
      orderBy("uploadadoEm", "desc")
    );
    const unsub = onSnapshot(q, (snap) => {
      setDocs(snap.docs.map((d) => ({ id: d.id, ...d.data() } as FireDoc)));
      setLoading(false);
    });
    return unsub;
  }, [clientId]);

  return { docs, loading };
}
