"use client";

import { useState } from "react";
import { use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Building2, Calendar, Percent } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/ui/Header";
import { PhaseTimeline } from "@/components/onboarding/PhaseTimeline";
import { ChecklistPanel } from "@/components/onboarding/ChecklistPanel";
import { DocumentUpload } from "@/components/onboarding/DocumentUpload";
import { SLABadge } from "@/components/onboarding/SLABadge";
import {
  useOnboardingProcess,
  useChecklist,
  useDocuments,
  useAllClients,
} from "@/hooks/useOnboarding";
import { formatCNPJ, formatDate, FASE_NOMES, slaStatus } from "@/lib/utils";

interface PageProps {
  params: Promise<{ clientId: string }>;
}

export default function ClientOnboardingPage({ params }: PageProps) {
  const { clientId } = use(params);
  const { data: allClients } = useAllClients();
  const { process, loading: pLoading } = useOnboardingProcess(clientId);
  const { byFase, progressoPct, loading: cLoading } = useChecklist(
    clientId,
    process?.id ?? ""
  );
  const { docs } = useDocuments(clientId);

  const client    = allClients.find((c) => c.id === clientId);
  const faseAtual = (process?.faseAtual ?? 1) as 1 | 2 | 3 | 4;
  const [faseSelecionada, setFaseSelecionada] = useState<1 | 2 | 3 | 4>(faseAtual);

  const status = process?.dataInicio ? slaStatus(faseAtual, process.dataInicio) : "ok";

  if (!pLoading && !process) {
    return (
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <Building2 size={40} className="mx-auto mb-4" style={{ color: "rgba(26,26,46,0.2)" }} />
          <p className="font-medium" style={{ color: "#1E2D52" }}>Onboarding não encontrado</p>
          <Link href="/onboarding" className="text-sm mt-2 inline-block" style={{ color: "#26CCAA" }}>
            Voltar à lista
          </Link>
        </div>
      </main>
    );
  }

  return (
    <>
      <Header
        title={client?.nomeFantasia ?? "Carregando…"}
        subtitle={client ? `CNPJ: ${formatCNPJ(client.cnpj)} · ${client.tipo === "migrante" ? "Migração" : "Novo cliente"}` : ""}
        actions={
          <Link href="/onboarding"
            className="flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg border border-base-300 hover:bg-base-200 transition-colors"
            style={{ color: "#1E2D52" }}>
            <ArrowLeft size={15} />
            Voltar
          </Link>
        }
      />

      <main className="flex-1 p-8 space-y-6 animate-fade-in">
        {/* Resumo */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-base-300 p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(38,204,170,0.1)" }}>
              <Percent size={17} style={{ color: "#26CCAA" }} />
            </div>
            <div>
              <p className="text-xl font-black" style={{ color: "#1E2D52" }}>{progressoPct}%</p>
              <p className="text-xs" style={{ color: "rgba(26,26,46,0.55)" }}>Progresso geral</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-base-300 p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(30,45,82,0.08)" }}>
              <Building2 size={17} style={{ color: "#1E2D52" }} />
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color: "#1E2D52" }}>Fase {faseAtual}</p>
              <p className="text-xs" style={{ color: "rgba(26,26,46,0.55)" }}>{FASE_NOMES[faseAtual]}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-base-300 p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(30,45,82,0.08)" }}>
              <Calendar size={17} style={{ color: "#1E2D52" }} />
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color: "#1E2D52" }}>
                {process ? formatDate(process.dataInicio) : "—"}
              </p>
              <p className="text-xs" style={{ color: "rgba(26,26,46,0.55)" }}>Início do onboarding</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-base-300 p-4 flex items-center gap-3">
            <SLABadge status={status} />
          </div>
        </div>

        {/* Progress bar geral */}
        <div className="bg-white rounded-xl border border-base-300 p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold" style={{ color: "#1E2D52" }}>Progresso total</p>
            <p className="text-sm font-bold" style={{ color: "#26CCAA" }}>{progressoPct}%</p>
          </div>
          <div className="h-2 bg-base-300 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${progressoPct}%`, backgroundColor: "#26CCAA" }}
            />
          </div>
        </div>

        {/* Timeline de fases */}
        <div className="bg-white rounded-xl border border-base-300 p-6">
          <PhaseTimeline
            faseAtual={faseAtual}
            incluiFase3={client?.tipo === "migrante"}
            faseSelecionada={faseSelecionada}
            onSelectFase={setFaseSelecionada}
          />
        </div>

        {/* Grid: checklist + documentos */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Checklist da fase selecionada */}
          {process && (
            <ChecklistPanel
              clientId={clientId}
              processId={process.id}
              items={byFase(faseSelecionada)}
              fase={faseSelecionada}
            />
          )}

          {/* Documentos */}
          {process && (
            <DocumentUpload
              clientId={clientId}
              processId={process.id}
              docs={docs}
            />
          )}
        </div>
      </main>
    </>
  );
}
