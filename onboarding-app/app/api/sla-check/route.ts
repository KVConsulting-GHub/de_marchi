import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase/admin";
import { sendSLAAlert } from "@/lib/resend/sla-alert";
import { Timestamp } from "firebase-admin/firestore";

// Vercel Cron chama diariamente às 08:00 (vercel.json)
// Segurança: valida header CRON_SECRET
export async function GET(req: NextRequest) {
  const secret = req.headers.get("authorization")?.replace("Bearer ", "");
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://onboarding.demarchi.com.br";
  const alerts: string[] = [];

  try {
    const clientsSnap = await adminDb.collection("clients").get();

    for (const clientDoc of clientsSnap.docs) {
      const client = clientDoc.data();

      const processSnap = await adminDb
        .collection("clients")
        .doc(clientDoc.id)
        .collection("onboarding")
        .orderBy("dataInicio", "desc")
        .limit(1)
        .get();

      if (processSnap.empty) continue;
      const process = processSnap.docs[0].data();
      if (process.concluidoEm) continue; // já concluído

      // Verifica última atividade no checklist
      const checklistSnap = await adminDb
        .collection("clients")
        .doc(clientDoc.id)
        .collection("onboarding")
        .doc(processSnap.docs[0].id)
        .collection("checklist")
        .where("status", "==", "concluido")
        .orderBy("concluidoEm", "desc")
        .limit(1)
        .get();

      let ultimaAtividade: Date;
      if (!checklistSnap.empty) {
        const ts = checklistSnap.docs[0].data().concluidoEm as Timestamp;
        ultimaAtividade = ts.toDate();
      } else {
        const ts = process.dataInicio as Timestamp;
        ultimaAtividade = ts.toDate();
      }

      const diasSemAtividade = Math.floor(
        (Date.now() - ultimaAtividade.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (diasSemAtividade >= 5) {
        const faseNomes: Record<number, string> = {
          1: "Documentação",
          2: "Setup de Sistemas",
          3: "Transferência de Dados",
          4: "Kick-off",
        };

        await sendSLAAlert({
          gestorEmail:      `${client.gestorId}@demarchi.com.br`, // simplificado; em prod: buscar email real
          gestorNome:       client.gestorNome,
          clienteNome:      client.nomeFantasia,
          clienteCNPJ:      client.cnpj,
          faseAtual:        process.faseAtual,
          faseNome:         faseNomes[process.faseAtual] ?? "",
          diasSemAtividade,
          linkDashboard:    `${appUrl}/onboarding/${clientDoc.id}`,
        });

        alerts.push(`${client.nomeFantasia} (${diasSemAtividade}d sem atividade)`);
      }
    }

    return NextResponse.json({ ok: true, alerts, total: alerts.length });
  } catch (err) {
    console.error("[sla-check] Erro:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
