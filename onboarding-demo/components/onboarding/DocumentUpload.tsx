"use client";

import { useState, useRef } from "react";
import { useStore } from "@/lib/mock/store";
import type { Document } from "@/lib/mock/data";
import {
  Upload, FileText, CheckCircle2, AlertCircle, Loader2, X,
} from "lucide-react";
import { cn, formatDate } from "@/lib/utils";

interface DocumentUploadProps {
  clientId: string;
  processId: string;
  docs: Document[];
}

const OCR_STATUS_CONFIG = {
  pendente:    { label: "Aguardando",  color: "rgba(26,26,46,0.45)", Icon: FileText },
  processando: { label: "Validando…",  color: "#F59E0B",              Icon: Loader2  },
  concluido:   { label: "Validado",    color: "#26CCAA",              Icon: CheckCircle2 },
  erro:        { label: "Erro OCR",    color: "#EF4444",              Icon: AlertCircle  },
};

// Resultados OCR fictícios para simular a IA
const MOCK_OCR_RESULTS = [
  { tipo: "Contrato Social",            cnpj: null,      validade: null },
  { tipo: "Cartão CNPJ",               cnpj: "detectado pelo Gemini", validade: null },
  { tipo: "Procuração para Fiscal",     cnpj: null,      validade: "31/12/2026" },
  { tipo: "Procuração para Contabilidade", cnpj: null,   validade: "31/12/2026" },
  { tipo: "Inscrição Estadual",         cnpj: null,      validade: null },
];

export function DocumentUpload({ clientId, processId, docs }: DocumentUploadProps) {
  const { addDocument, updateDocOCR } = useStore();
  const [uploading, setUploading]     = useState(false);
  const [uploadPct, setUploadPct]     = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    setUploading(true);
    setUploadPct(0);

    // Simula progresso de upload (500ms)
    await new Promise<void>((resolve) => {
      let pct = 0;
      const timer = setInterval(() => {
        pct += 20;
        setUploadPct(Math.min(pct, 95));
        if (pct >= 100) { clearInterval(timer); resolve(); }
      }, 100);
    });

    setUploadPct(100);

    const docId = addDocument(clientId, {
      processId,
      clientId,
      tipo: "Pendente de validação",
      storagePath: `mock/clients/${clientId}/${file.name}`,
      nomeOriginal: file.name,
      ocrResultado: undefined,
    });

    setUploading(false);
    setUploadPct(0);

    // Simula validação Gemini (1.5s de delay)
    // Marca como "processando"
    useStore.setState((s) => ({
      documents: {
        ...s.documents,
        [clientId]: (s.documents[clientId] ?? []).map((d) =>
          d.id === docId ? { ...d, ocrStatus: "processando" as const } : d
        ),
      },
    }));

    await new Promise((r) => setTimeout(r, 1500));

    // Retorna resultado fictício
    const result = MOCK_OCR_RESULTS[Math.floor(Math.random() * MOCK_OCR_RESULTS.length)];
    updateDocOCR(clientId, docId, result);
  };

  return (
    <div className="bg-white rounded-xl border border-base-300 overflow-hidden">
      <div className="px-6 py-4 border-b border-base-300" style={{ backgroundColor: "#F4F6F9" }}>
        <h3 className="font-semibold text-sm" style={{ color: "#1E2D52" }}>
          Documentos do Cliente
        </h3>
        <p className="text-xs mt-0.5" style={{ color: "rgba(26,26,46,0.55)" }}>
          Excluídos automaticamente após 90 dias (LGPD) · OCR simulado via Gemini
        </p>
      </div>

      <div className="p-6">
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
        />
        <button
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className={cn(
            "w-full border-2 border-dashed rounded-xl p-6 flex flex-col items-center gap-3 transition-all",
            uploading
              ? "opacity-60 cursor-wait border-base-300"
              : "border-base-300 hover:border-primary cursor-pointer hover:bg-base-100"
          )}
        >
          {uploading ? (
            <>
              <Loader2 size={24} className="animate-spin" style={{ color: "#26CCAA" }} />
              <div className="w-full max-w-xs">
                <div className="h-1.5 bg-base-300 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-100"
                    style={{ width: `${uploadPct}%`, backgroundColor: "#26CCAA" }} />
                </div>
                <p className="text-xs text-center mt-1" style={{ color: "rgba(26,26,46,0.55)" }}>
                  {uploadPct}% enviado
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "rgba(38,204,170,0.1)" }}>
                <Upload size={20} style={{ color: "#26CCAA" }} />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium" style={{ color: "#1E2D52" }}>
                  Clique para simular envio de documento
                </p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(26,26,46,0.45)" }}>
                  PDF, PNG ou JPG · OCR Gemini simulado (1.5s)
                </p>
              </div>
            </>
          )}
        </button>
      </div>

      {docs.length > 0 && (
        <ul className="border-t border-base-300 divide-y divide-base-200">
          {docs.map((doc) => {
            const cfg = OCR_STATUS_CONFIG[doc.ocrStatus];
            return (
              <li key={doc.id} className="flex items-center gap-3 px-6 py-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#F4F6F9" }}>
                  <FileText size={15} style={{ color: "#1E2D52" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: "#1A1A2E" }}>
                    {doc.ocrResultado?.tipo ?? doc.tipo}
                  </p>
                  <p className="text-xs truncate" style={{ color: "rgba(26,26,46,0.45)" }}>
                    {doc.nomeOriginal} · {formatDate(doc.uploadadoEm)}
                  </p>
                </div>
                <span className="flex items-center gap-1 text-xs flex-shrink-0"
                  style={{ color: cfg.color }}>
                  <cfg.Icon size={13}
                    className={cn(doc.ocrStatus === "processando" && "animate-spin")} />
                  {cfg.label}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
