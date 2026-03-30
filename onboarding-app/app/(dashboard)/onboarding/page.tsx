"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, ClipboardList, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import { Header } from "@/components/ui/Header";
import { ClientList } from "@/components/onboarding/ClientList";
import { useAllClients } from "@/hooks/useOnboarding";
import { createClient, createOnboardingProcess } from "@/lib/firebase/collections";
import type { ClientType } from "@/lib/firebase/collections";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// ─ Schema de novo cliente ────────────────────────────────────────────────────

const schema = z.object({
  nomeFantasia: z.string().min(2, "Nome muito curto"),
  cnpj: z.string().regex(/^\d{14}$/, "CNPJ deve ter 14 dígitos (só números)"),
  tipo: z.enum(["novo", "migrante"]),
  gestorNome: z.string().min(2, "Nome do gestor obrigatório"),
  gestorId: z.string().min(1, "ID do gestor obrigatório"),
});
type FormData = z.infer<typeof schema>;

// ─ Stats card ────────────────────────────────────────────────────────────────

function StatCard({ label, value, sub, icon: Icon, color }: {
  label: string; value: number; sub: string;
  icon: React.ElementType; color: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-base-300 p-5 flex items-start gap-4 animate-fade-in">
      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: `${color}15` }}>
        <Icon size={20} style={{ color }} />
      </div>
      <div>
        <p className="text-2xl font-black" style={{ color: "#1E2D52" }}>{value}</p>
        <p className="text-sm font-medium" style={{ color: "#1A1A2E" }}>{label}</p>
        <p className="text-xs mt-0.5" style={{ color: "rgba(26,26,46,0.5)" }}>{sub}</p>
      </div>
    </div>
  );
}

// ─ Page ──────────────────────────────────────────────────────────────────────

export default function OnboardingPage() {
  const { data: clients, loading } = useAllClients();
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving]       = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { tipo: "novo" },
  });

  const onSubmit = async (data: FormData) => {
    setSaving(true);
    try {
      const clientId = await createClient({
        cnpj: data.cnpj,
        nomeFantasia: data.nomeFantasia,
        tipo: data.tipo as ClientType,
        gestorId: data.gestorId,
        gestorNome: data.gestorNome,
      });
      await createOnboardingProcess(clientId, data.tipo as ClientType);
      reset();
      setModalOpen(false);
      router.push(`/onboarding/${clientId}`);
    } finally {
      setSaving(false);
    }
  };

  // Stats
  const total    = clients.length;
  const concluidos = clients.filter((c) => false).length; // sem processo concluído ainda
  const ativos   = total;

  const rows = clients.map((c) => ({ client: c, process: null }));

  return (
    <>
      <Header
        title="Onboarding de Clientes"
        subtitle="Acompanhe o progresso de entrada de novos clientes"
        actions={
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold transition-all animate-cta-pulse"
            style={{ backgroundColor: "#26CCAA" }}
          >
            <Plus size={16} />
            Novo cliente
          </button>
        }
      />

      <main className="flex-1 p-8 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Em onboarding"    value={ativos}    sub="clientes ativos"       icon={ClipboardList}  color="#1E2D52" />
          <StatCard label="No prazo"         value={ativos}    sub="dentro do SLA"         icon={CheckCircle2}   color="#26CCAA" />
          <StatCard label="Atenção"          value={0}         sub="próximo do limite"     icon={Clock}          color="#F59E0B" />
          <StatCard label="Atrasados"        value={0}         sub="precisam de ação"      icon={AlertTriangle}  color="#EF4444" />
        </div>

        {/* Tabela */}
        <ClientList rows={rows} loading={loading} />
      </main>

      {/* Modal novo cliente */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
          onClick={(e) => e.target === e.currentTarget && setModalOpen(false)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md animate-fade-in">
            <div className="px-6 py-5 border-b border-base-300">
              <h2 className="text-lg font-bold" style={{ color: "#1E2D52" }}>Novo cliente</h2>
              <p className="text-sm mt-0.5" style={{ color: "rgba(26,26,46,0.55)" }}>
                Preencha os dados para iniciar o onboarding
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-5 space-y-4">
              {/* Nome */}
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: "#1E2D52" }}>
                  Nome Fantasia
                </label>
                <input
                  {...register("nomeFantasia")}
                  className="input input-bordered w-full text-sm focus:border-primary"
                  placeholder="Ex: Empresa ABC Ltda"
                />
                {errors.nomeFantasia && (
                  <p className="text-xs mt-1" style={{ color: "#EF4444" }}>{errors.nomeFantasia.message}</p>
                )}
              </div>

              {/* CNPJ */}
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: "#1E2D52" }}>
                  CNPJ (somente números)
                </label>
                <input
                  {...register("cnpj")}
                  className="input input-bordered w-full text-sm font-mono focus:border-primary"
                  placeholder="00000000000000"
                  maxLength={14}
                />
                {errors.cnpj && (
                  <p className="text-xs mt-1" style={{ color: "#EF4444" }}>{errors.cnpj.message}</p>
                )}
              </div>

              {/* Tipo */}
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: "#1E2D52" }}>
                  Tipo de cliente
                </label>
                <select {...register("tipo")} className="select select-bordered w-full text-sm">
                  <option value="novo">Novo (sem histórico)</option>
                  <option value="migrante">Migração (outro escritório)</option>
                </select>
              </div>

              {/* Gestor */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: "#1E2D52" }}>
                    Gestor responsável
                  </label>
                  <input
                    {...register("gestorNome")}
                    className="input input-bordered w-full text-sm focus:border-primary"
                    placeholder="Nome do gestor"
                  />
                  {errors.gestorNome && (
                    <p className="text-xs mt-1" style={{ color: "#EF4444" }}>{errors.gestorNome.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: "#1E2D52" }}>
                    ID do gestor
                  </label>
                  <input
                    {...register("gestorId")}
                    className="input input-bordered w-full text-sm focus:border-primary"
                    placeholder="UID Firebase"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn btn-ghost flex-1 text-sm"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn flex-1 text-white text-sm font-semibold"
                  style={{ backgroundColor: "#26CCAA" }}
                >
                  {saving ? "Criando…" : "Iniciar onboarding"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
