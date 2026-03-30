# Stack Definition — Agente de Onboarding de Clientes (DeMarchi)

## Context
MVP do dashboard de Onboarding de Clientes da DeMarchi. O usuário já tem BigQuery e
Google Workspace, então a stack deve ficar 100% dentro do ecossistema Google Cloud
para evitar custos extras. Firestore substitui Supabase como banco operacional —
tem sync nativo com BigQuery via extensão oficial da Firebase, e o custo para o
volume do MVP (3 novos clientes/mês, 17 usuários internos) cabe no plano gratuito.

---

## Stack Completa — 100% Google Cloud + Vercel

### Camada 1 — Frontend & Hosting (já definida)
| Tecnologia | Papel |
|---|---|
| Next.js 15 (App Router) + TypeScript | Framework principal |
| Tailwind CSS v4 + FlyonUI v2 | Design system DeMarchi |
| lucide-react | Ícones |
| **Vercel** | Hosting + Edge Functions + CI/CD |

### Camada 2 — Banco Operacional
**Firebase Firestore**
- NoSQL document store para clientes, checklists e progresso de fases
- Realtime listeners → checklist atualiza ao vivo sem polling
- Segurança com Firebase Security Rules (equivalente ao RLS do Postgres)
- **Custo no MVP:** Plano Spark (gratuito) — 50k leituras/dia + 20k escritas/dia. Para 3 clientes/mês esse valor nunca é atingido.

### Camada 3 — Analytics
**BigQuery** (já escolhido)
- **Firebase Extension "Stream Firestore to BigQuery"** → sync automático, sem código custom
- Cada write no Firestore replica para BigQuery em tempo real
- Dataset resultante: `demarchi_onboarding` com raw + changelog view
- Custo: extensão gratuita; BigQuery cobra só por query (free tier: 1TB/mês)

### Camada 4 — Auth
**Firebase Authentication + Google OAuth**
- SSO com contas @demarchi.com.br (Google Workspace) sem configuração extra
- SDK Next.js (`firebase/auth`) + middleware de proteção de rotas
- Custo: gratuito

### Camada 5 — Storage de Documentos
**Firebase Cloud Storage**
- Upload de documentos de clientes (procurações, CNPJ, contrato social)
- Security Rules por usuário autenticado
- Política de expiração → deleção automática após 90 dias (LGPD)
- Custo: Plano Spark — 5GB gratuitos, mais que suficiente para o MVP

### Camada 6 — AI / LLM
**Gemini 1.5 Pro API (Google AI Studio)**
- Já definido no PRD
- Validação de documentos enviados (extração de CNPJ, nome, tipo de doc)
- Roadmap: chat assistido para guiar colaborador nas etapas

### Camada 7 — Email Transacional
**Resend** (único serviço fora do Google, sem alternativa nativa viável)
- Alertas quando fase não avança dentro do SLA (5 dias sem atividade)
- Confirmações de conclusão de fase
- **Custo:** Plano gratuito cobre 3.000 emails/mês — suficiente para o MVP
- Templates com `react-email`, mantendo identidade visual DeMarchi

### Camada 8 — Developer Experience
| Tecnologia | Papel |
|---|---|
| Zod | Validação de schemas (API routes + formulários) |
| React Hook Form | Formulários do checklist e upload |
| `firebase-admin` | SDK server-side (API routes, middleware) |
| `firebase` | SDK client-side (auth, realtime, storage) |

---

## Modelo de Dados (Firestore)

```
/clients/{clientId}
  cnpj, nomeFantasia, tipo (novo | migrante), gestorId, criadoEm

/clients/{clientId}/onboarding/{processId}
  faseAtual (1-4), progressoPct, dataInicio, slaAlertaEm, concluidoEm

/clients/{clientId}/onboarding/{processId}/checklist/{itemId}
  fase (1-4), titulo, responsavel, status (pendente | concluido | atrasado),
  concluidoEm

/clients/{clientId}/documents/{docId}
  tipo, storagePath, ocrStatus, expiraEm

/audit_log/{logId}
  userId, acao, entidade, entidadeId, timestamp
```

```
BigQuery — via Firebase Extension (auto-gerado)
  firestore_export.clients_raw_changelog
  firestore_export.checklist_raw_changelog
  → Views derivadas: sla_metrics, onboarding_kpis
```

---

## Diagrama de Fluxo

```
Google Workspace SSO (@demarchi.com.br)
        ↓
  Firebase Auth (Google OAuth — gratuito)
        ↓
  Next.js App (Vercel)
   ├── Dashboard → Firestore realtime listeners
   ├── Upload docs → Firebase Cloud Storage
   ├── Validação → Gemini API (OCR)
   └── SLA check → Vercel Cron → Resend (email)
        ↓
  Firebase Extension: Firestore → BigQuery (automático)
        ↓
  BigQuery: relatórios SLA, KPIs, tempo por fase
```

---

## Comparativo de Custo (MVP — 3 clientes/mês)

| Serviço | Custo estimado/mês |
|---|---|
| Vercel (Hobby ou Pro) | $0 – $20 |
| Firebase (Firestore + Auth + Storage) | $0 (plano Spark) |
| BigQuery | $0 (free tier: 1TB query/mês) |
| Firebase Extension Firestore→BQ | $0 |
| Gemini API | ~$0–2 (poucos docs/mês) |
| Resend | $0 (free tier: 3k emails/mês) |
| **Total** | **$0 – $22/mês** |

---

## Variáveis de Ambiente

```env
# Firebase (client-side — público)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Firebase Admin (server-side — secreto)
FIREBASE_ADMIN_PROJECT_ID=
FIREBASE_ADMIN_CLIENT_EMAIL=
FIREBASE_ADMIN_PRIVATE_KEY=

# Gemini
GEMINI_API_KEY=

# Resend
RESEND_API_KEY=
RESEND_FROM_EMAIL=onboarding@demarchi.com.br
```

---

## Estrutura de Arquivos (MVP)

```
/
├── app/
│   ├── layout.tsx                         # providers: Firebase, Toaster
│   ├── (auth)/login/page.tsx              # tela de login Google
│   ├── (dashboard)/
│   │   ├── layout.tsx                     # sidebar + auth guard
│   │   ├── onboarding/
│   │   │   ├── page.tsx                   # lista todos os clientes em onboarding
│   │   │   └── [clientId]/page.tsx        # detalhe: fases + checklist + docs
│   │   └── page.tsx                       # redirect → /onboarding
│   └── api/
│       ├── sla-check/route.ts             # Vercel Cron → checa SLA → Resend
│       └── documents/validate/route.ts   # recebe file → Gemini OCR
├── lib/
│   ├── firebase/client.ts                 # initializeApp client
│   ├── firebase/admin.ts                  # initializeApp admin
│   ├── firebase/collections.ts            # helpers typed (getClient, etc.)
│   ├── gemini/validate-doc.ts             # extrai CNPJ/tipo do documento
│   └── resend/sla-alert.tsx              # template de email (react-email)
├── components/
│   ├── onboarding/
│   │   ├── ClientList.tsx                 # tabela com progresso de todos
│   │   ├── PhaseTimeline.tsx              # barra das 4 fases (visual)
│   │   ├── ChecklistPanel.tsx             # itens da fase atual + toggle
│   │   ├── DocumentUpload.tsx             # upload + status OCR
│   │   └── SLABadge.tsx                   # verde / amarelo / vermelho
│   └── ui/                                # componentes base (design system)
├── hooks/
│   └── useOnboarding.ts                   # Firestore realtime listener
├── styles/globals.css                     # tokens CSS DeMarchi
└── vercel.json                            # cron: sla-check a cada 24h
```

---

## Verificação End-to-End

1. `npm run dev` → app abre em localhost:3000
2. Login com conta @demarchi.com.br → redireciona ao dashboard
3. Criar novo cliente → aparece na lista com fase 1 (Documentação) ativa
4. Marcar item do checklist → progresso % atualiza em tempo real (Firestore listener)
5. Upload de documento → Gemini retorna tipo e CNPJ extraídos
6. Forçar data SLA vencida → Vercel Cron dispara → email chega via Resend
7. Abrir BigQuery console → tabela `checklist_raw_changelog` tem o evento registrado
