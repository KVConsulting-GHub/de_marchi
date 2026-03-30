import { Resend } from "resend";
import {
  Body, Button, Container, Head, Heading, Hr,
  Html, Preview, Section, Text,
} from "@react-email/components";

const resend = new Resend(process.env.RESEND_API_KEY!);

interface SLAAlertData {
  gestorEmail:    string;
  gestorNome:     string;
  clienteNome:    string;
  clienteCNPJ:    string;
  faseAtual:      number;
  faseNome:       string;
  diasSemAtividade: number;
  linkDashboard:  string;
}

const FASES = ["", "Documentação", "Setup de Sistemas", "Transferência de Dados", "Kick-off"];

export async function sendSLAAlert(data: SLAAlertData) {
  return resend.emails.send({
    from:    process.env.RESEND_FROM_EMAIL!,
    to:      data.gestorEmail,
    subject: `⚠️ SLA em risco — ${data.clienteNome} (Fase ${data.faseAtual}: ${data.faseNome})`,
    react:   <SLAAlertEmail {...data} />,
  });
}

function SLAAlertEmail({
  gestorNome, clienteNome, clienteCNPJ,
  faseAtual, faseNome, diasSemAtividade, linkDashboard,
}: SLAAlertData) {
  return (
    <Html lang="pt-BR">
      <Head />
      <Preview>Onboarding de {clienteNome} está sem atividade há {diasSemAtividade} dias</Preview>
      <Body style={{ fontFamily: "Inter, sans-serif", backgroundColor: "#F4F6F9", margin: 0, padding: "40px 0" }}>
        <Container style={{ maxWidth: 560, margin: "0 auto", backgroundColor: "#fff", borderRadius: 12, overflow: "hidden" }}>

          {/* Header */}
          <Section style={{ backgroundColor: "#1E2D52", padding: "24px 32px" }}>
            <Heading style={{ color: "#26CCAA", fontSize: 22, margin: 0, fontWeight: 700 }}>
              DeMarchi Contabilidade
            </Heading>
            <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, margin: "4px 0 0" }}>
              Alerta de Onboarding
            </Text>
          </Section>

          {/* Corpo */}
          <Section style={{ padding: "32px" }}>
            <Text style={{ fontSize: 16, color: "#1A1A2E", marginBottom: 8 }}>
              Olá, <strong>{gestorNome}</strong>
            </Text>
            <Text style={{ fontSize: 15, color: "#374151", lineHeight: 1.6 }}>
              O onboarding de <strong>{clienteNome}</strong> (CNPJ: {clienteCNPJ}) está
              parado na <strong>Fase {faseAtual} — {faseNome}</strong> há{" "}
              <strong style={{ color: "#EF4444" }}>{diasSemAtividade} dias</strong> sem atividade.
            </Text>

            <Hr style={{ borderColor: "#E8ECF2", margin: "24px 0" }} />

            <Section style={{ backgroundColor: "#FEF3C7", borderRadius: 8, padding: "16px 20px", marginBottom: 24 }}>
              <Text style={{ fontSize: 14, color: "#92400E", margin: 0, fontWeight: 600 }}>
                ⚠️ Ação necessária
              </Text>
              <Text style={{ fontSize: 14, color: "#78350F", margin: "6px 0 0" }}>
                Entre em contato com o cliente para desbloquear a fase ou marque os itens
                que já foram concluídos no dashboard.
              </Text>
            </Section>

            <Button
              href={linkDashboard}
              style={{
                backgroundColor: "#26CCAA",
                color: "#ffffff",
                borderRadius: 6,
                padding: "12px 24px",
                fontSize: 15,
                fontWeight: 600,
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Ver checklist do cliente
            </Button>
          </Section>

          {/* Footer */}
          <Section style={{ backgroundColor: "#F4F6F9", padding: "16px 32px", borderTop: "1px solid #E8ECF2" }}>
            <Text style={{ fontSize: 12, color: "rgba(26,26,46,0.55)", margin: 0 }}>
              DeMarchi Contabilidade · Caxias do Sul, RS · 38 anos transformando números em decisões
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
