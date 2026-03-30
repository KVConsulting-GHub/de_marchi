import { NextRequest, NextResponse } from "next/server";
import { getDownloadURL } from "firebase-admin/storage";
import { adminDb } from "@/lib/firebase/admin";
import { validateDocument } from "@/lib/gemini/validate-doc";
import { getApp } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";

export async function POST(req: NextRequest) {
  try {
    const { clientId, storagePath } = await req.json();
    if (!clientId || !storagePath) {
      return NextResponse.json({ error: "clientId e storagePath são obrigatórios" }, { status: 400 });
    }

    // 1. Busca o documento no Firestore pelo storagePath
    const docsSnap = await adminDb
      .collection("clients")
      .doc(clientId)
      .collection("documents")
      .where("storagePath", "==", storagePath)
      .limit(1)
      .get();

    if (docsSnap.empty) {
      return NextResponse.json({ error: "Documento não encontrado" }, { status: 404 });
    }

    const docRef = docsSnap.docs[0].ref;

    // Marca como processando
    await docRef.update({ ocrStatus: "processando" });

    // 2. Baixa o arquivo do Firebase Storage
    const bucket  = getStorage(getApp()).bucket();
    const file    = bucket.file(storagePath);
    const [buffer] = await file.download();
    const [meta]  = await file.getMetadata();
    const mimeType = (meta.contentType as string) ?? "application/octet-stream";

    // 3. Valida com Gemini
    const result = await validateDocument(buffer, mimeType);

    // 4. Atualiza Firestore com resultado
    await docRef.update({
      ocrStatus:    result.erro ? "erro" : "concluido",
      ocrResultado: {
        tipo:      result.tipo,
        cnpj:      result.cnpj,
        validade:  result.validade,
        confianca: result.confianca,
      },
      ...(result.tipo && { tipo: result.tipo }),
    });

    return NextResponse.json({ ok: true, resultado: result });
  } catch (err) {
    console.error("[documents/validate] Erro:", err);
    return NextResponse.json({ error: "Erro ao validar documento" }, { status: 500 });
  }
}
