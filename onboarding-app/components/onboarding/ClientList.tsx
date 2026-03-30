"use client";

import Link from "next/link";
import { Building2, ArrowRight, UserCircle2 } from "lucide-react";
import { SLABadge } from "./SLABadge";
import { formatCNPJ, formatDate, FASE_NOMES, slaStatus, diasDesdeTimestamp } from "@/lib/utils";
import type { Client, OnboardingProcess } from "@/lib/firebase/collections";

interface ClientRow {
  client: Client;
  process: OnboardingProcess | null;
}

interface ClientListProps {
  rows: ClientRow[];
  loading?: boolean;
}

function SkeletonRow() {
  return (
    <tr>
      {[...Array(6)].map((_, i) => (
        <td key={i} className="px-6 py-4">
          <div className="h-4 bg-base-300 rounded animate-pulse" style={{ width: `${60 + i * 10}%` }} />
        </td>
      ))}
    </tr>
  );
}

export function ClientList({ rows, loading = false }: ClientListProps) {
  return (
    <div className="bg-white rounded-xl border border-base-300 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ backgroundColor: "#1E2D52" }}>
              {["Cliente", "CNPJ", "Tipo", "Fase Atual", "Progresso", "SLA", ""].map((h) => (
                <th
                  key={h}
                  className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-base-200">
            {loading
              ? [...Array(3)].map((_, i) => <SkeletonRow key={i} />)
              : rows.map(({ client, process }) => {
                  const fase = process?.faseAtual ?? 1;
                  const pct  = process?.progressoPct ?? 0;
                  const status = process?.dataInicio
                    ? slaStatus(fase, process.dataInicio)
                    : "ok";
                  const dias = process?.dataInicio
                    ? diasDesdeTimestamp(process.dataInicio)
                    : 0;

                  return (
                    <tr
                      key={client.id}
                      className="hover:bg-base-100 transition-colors cursor-pointer group"
                    >
                      {/* Cliente */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: "rgba(30,45,82,0.08)" }}>
                            <Building2 size={15} style={{ color: "#1E2D52" }} />
                          </div>
                          <div>
                            <p className="font-medium" style={{ color: "#1A1A2E" }}>
                              {client.nomeFantasia}
                            </p>
                            <p className="text-xs" style={{ color: "rgba(26,26,46,0.5)" }}>
                              {client.gestorNome}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* CNPJ */}
                      <td className="px-6 py-4 font-mono text-xs" style={{ color: "rgba(26,26,46,0.65)" }}>
                        {formatCNPJ(client.cnpj)}
                      </td>

                      {/* Tipo */}
                      <td className="px-6 py-4">
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-medium"
                          style={
                            client.tipo === "migrante"
                              ? { color: "#273A6A", backgroundColor: "rgba(39,58,106,0.08)" }
                              : { color: "#1B8C76", backgroundColor: "rgba(27,140,118,0.08)" }
                          }
                        >
                          {client.tipo === "migrante" ? "Migração" : "Novo"}
                        </span>
                      </td>

                      {/* Fase */}
                      <td className="px-6 py-4">
                        <p className="font-medium text-xs" style={{ color: "#1E2D52" }}>
                          Fase {fase}
                        </p>
                        <p className="text-xs" style={{ color: "rgba(26,26,46,0.5)" }}>
                          {FASE_NOMES[fase]}
                        </p>
                      </td>

                      {/* Progresso */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1.5 bg-base-300 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${pct}%`,
                                backgroundColor: pct === 100 ? "#26CCAA" : "#26CCAA",
                              }}
                            />
                          </div>
                          <span className="text-xs font-semibold" style={{ color: "#1E2D52" }}>
                            {pct}%
                          </span>
                        </div>
                      </td>

                      {/* SLA */}
                      <td className="px-6 py-4">
                        <SLABadge status={status} />
                      </td>

                      {/* Ação */}
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/onboarding/${client.id}`}
                          className="inline-flex items-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ color: "#26CCAA" }}
                        >
                          Ver detalhes
                          <ArrowRight size={12} />
                        </Link>
                      </td>
                    </tr>
                  );
                })}

            {!loading && rows.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center">
                  <Building2 size={28} className="mx-auto mb-3" style={{ color: "rgba(26,26,46,0.2)" }} />
                  <p className="text-sm font-medium" style={{ color: "rgba(26,26,46,0.4)" }}>
                    Nenhum cliente em onboarding
                  </p>
                  <p className="text-xs mt-1" style={{ color: "rgba(26,26,46,0.3)" }}>
                    Clique em "Novo cliente" para começar
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
