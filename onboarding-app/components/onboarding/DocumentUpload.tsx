"use client";

import { useState, useRef } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import { storage } from "@/lib/firebase/client";
import { documentsCol } from "@/lib/firebase/collections";
import type { Document as FireDoc } from "@/lib/firebase/collections";
import {
  Upload, FileText, CheckCircle2, AlertCircle,
  Loader2, X,
} from "lucide-react";
import { cn, formatDate } from "@/lib/utils";

interface DocumentUploadProps {
  clientId: string;
  processId: string;
  docs: FireDoc[];
}

const OCR_STATUS_CONFIG = {
  pendente:     { label: "Aguardando",  color: "rgba(26,26,46,0.45)", Icon: FileText },
  processando:  { label: "Validando…",  color: "#F59E0B",              Icon: Loader2  },
  concluido:    { label: "Validado",    color: "#26CCAA",              Icon: CheckCircle2 },
  erro:         { label: "Erro OCR",   color: "#EF4444",              Icon: AlertCircle  },
};

export function DocumentUpload({ clientId, processId, docs }: DocumentUploadProps) {
  const [uploading, setUploading]     = useState(false);
  const [uploadPct, setUploadPct]     = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    if (!file) return;
    setUploading(true);
    setUploadPct(0);
    setUploadError(null);

    try {
      const path     = `clients/${clientId}/documents/${Date.now()}_${file.name}`;
      const storageRef = ref(storage, path);
      const task     = uploadBytesResumable(storageRef, file);

      await new Promise<void>((resolve, reject) => {
        task.on(
          "state_changed",
          (snap) => setUploadPct(Math.round((snap.bytesTransferred / snap.totalBytes) * 100)),
          reject,
          resolve
        );
      });

      const expiraEm = new Date();
      expiraEm.setDate(expiraEm.getDate() + 90); // LGPD: 90 dias

      await addDoc(documentsCol(clientId), {
        processId,
        clientId,
        tipo: "Pendente de validação",
        storagePath: path,
        nomeOriginal: file.name,
        ocrStatus: "pendente",
        expiraEm: Timestamp.fromDate(expiraEm),
        uploadadoEm: serverTimestamp(),
      });

      // Dispara validação assíncrona via API
      fetch("/api/documents/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientId, storagePath: path }),
      });
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Erro ao enviar arquivo");
    } finally {
      setUploading(false);
      setUploadPct(0);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-base-300 overflow-hidden">
      <div className="px-6 py-4 border-b border-base-300" style={{ backgroundColor: "#F4F6F9" }}>
        <h3 className="font-semibold text-sm" style={{ color: "#1E2D52" }}>
          Documentos do Cliente
        </h3>
        <p className="text-xs mt-0.5" style={{ color: "rgba(26,26,46,0.55)" }}>
          Documentos excluídos automaticamente após 90 dias (LGPD)
        </p>
      </div>

      {/* Upload zone */}
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
                  <div
                    className="h-full rounded-full transition-all duration-200"
                    style={{ width: `${uploadPct}%`, backgroundColor: "#26CCAA" }}
                  />
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
                  Clique para enviar documento
                </p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(26,26,46,0.45)" }}>
                  PDF, PNG ou JPG — validação automática por IA
                </p>
              </div>
            </>
          )}
        </button>

        {uploadError && (
          <div className="mt-3 flex items-center gap-2 p-3 rounded-lg"
            style={{ backgroundColor: "rgba(239,68,68,0.06)", color: "#B91C1C" }}>
            <X size={14} />
            <p className="text-xs">{uploadError}</p>
          </div>
        )}
      </div>

      {/* Lista de documentos */}
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
                    {doc.nomeOriginal} · Enviado em {formatDate(doc.uploadadoEm)}
                  </p>
                </div>
                <span className="flex items-center gap-1 text-xs flex-shrink-0"
                  style={{ color: cfg.color }}>
                  <cfg.Icon
                    size={13}
                    className={cn(doc.ocrStatus === "processando" && "animate-spin")}
                  />
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
