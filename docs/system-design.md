# System Design — Onboarding App
**DeMarchi Contabilidade · Stack Técnica Completa**

---

## 1. Visão da Arquitetura

```
┌─────────────────────────────────────────────────────┐
│                   VERCEL (Edge)                     │
│  Next.js 15 App Router · SSR + Static + API Routes  │
└───────────┬──────────────────┬──────────────────────┘
            │                  │
    ┌───────▼──────┐   ┌───────▼──────────┐
    │   Firebase   │   │   Google Cloud   │
    │  Firestore   │   │    BigQuery       │
    │  Auth        │   │  (analytics)     │
    │  Storage     │   └──────────────────┘
    └───────┬──────┘
            │ Firebase Extension
            └──────────────────► BigQuery (sync automático)
```

---

## 2. Stack Completa

| Camada | Tecnologia | Justificativa |
|---|---|---|
| **Frontend** | Next.js 15 (App Router) | SSR, file-based routing, Server Actions |
| **Linguagem** | TypeScript 5 | Type safety ponta a ponta |
| **UI / Estilo** | Tailwind CSS v4 + FlyonUI v2 | Design system DeMarchi, componentes prontos |
| **Estado** | Zustand (demo) / Firestore listeners (prod) | Reativo, sem prop drilling |
| **Auth** | Firebase Auth + Google OAuth | Restrito a `@demarchi.com.br` |
| **Banco operacional** | Firebase Firestore | Realtime, offline-first, free tier generoso |
| **Analytics** | BigQuery | SQL ad-hoc sobre todos os onboardings |
| **Storage** | Firebase Cloud Storage | Upload de docs, lifecycle 90 dias (LGPD) |
| **IA / OCR** | Gemini 1.5 Pro | Validação automática de documentos |
| **E-mail** | Resend + react-email | Templates branded, alertas de SLA |
| **Deploy** | Vercel | CI/CD automático via Git push |
| **Cron** | Vercel Cron Jobs | SLA check diário às 08:00 |
| **Formulários** | react-hook-form + zod | Validação client-side + server-side |

---

## 3. Estrutura de Dados (Firestore)

```
clients/
  {clientId}/
    nome: string
    cnpj: string
    tipo: "novo" | "migrante"
    responsavel: string
    email: string
    criadoEm: Timestamp

onboarding_processes/
  {processId}/
    clientId: string
    faseAtual: 1 | 2 | 3 | 4
    tipo: "novo" | "migrante"
    iniciadoEm: Timestamp
    ultimaAtividade: Timestamp
    concluido: boolean

checklist_items/
  {itemId}/
    processId: string
    fase: 1 | 2 | 3 | 4
    titulo: string
    responsavel: "cliente" | "demarchi"
    status: "pendente" | "em_andamento" | "concluido"
    concluidoEm?: Timestamp

documents/
  {docId}/
    processId: string
    nome: string
    tipo: string
    storageUrl: string
    ocrStatus: "pendente" | "processando" | "aprovado" | "rejeitado"
    ocrResultado?: string
    enviadoEm: Timestamp

audit_log/
  {logId}/
    acao: string
    userId: string
    targetId: string
    timestamp: Timestamp
```

---

## 4. Estrutura de Pastas

```
onboarding-app/              ← Produção
├── app/
│   ├── layout.tsx
│   ├── page.tsx             ← redirect → /onboarding
│   ├── (auth)/login/
│   ├── (dashboard)/
│   │   ├── layout.tsx       ← Auth guard
│   │   ├── onboarding/
│   │   │   ├── page.tsx     ← Lista de clientes
│   │   │   └── [clientId]/  ← Detalhe + checklist
│   └── api/
│       ├── sla-check/       ← Vercel Cron
│       └── documents/validate/
├── components/
│   ├── ui/                  ← Sidebar, Header
│   └── onboarding/          ← SLABadge, PhaseTimeline, ChecklistPanel, DocumentUpload, ClientList
├── hooks/useOnboarding.ts   ← Firestore realtime listeners
├── lib/
│   ├── firebase/            ← client.ts, admin.ts, collections.ts
│   ├── gemini/              ← validate-doc.ts
│   ├── resend/              ← sla-alert.tsx
│   └── utils.ts
├── styles/globals.css
├── vercel.json
└── .env.example

onboarding-demo/             ← Demo / Staging (sem API keys)
├── lib/mock/
│   ├── timestamp.ts         ← MockTimestamp (drop-in para Firebase Timestamp)
│   ├── data.ts              ← Tipos + 3 clientes pré-carregados
│   └── store.ts             ← Zustand store com mesma API do Firestore
└── ...                      ← Mesmos componentes, sem dependências externas
```

---

## 5. API Routes

| Rota | Método | Descrição |
|---|---|---|
| `/api/sla-check` | GET | Vercel Cron — verifica inatividade ≥ 5 dias e envia alertas |
| `/api/documents/validate` | POST | Download do Storage → OCR Gemini → atualiza Firestore |

### Segurança
- `/api/sla-check` exige header `Authorization: Bearer {CRON_SECRET}`
- Todas as rotas de dashboard protegidas por `onAuthStateChanged` no layout
- Firestore Security Rules: leitura/escrita apenas para usuários autenticados com `@demarchi.com.br`

---

## 6. Fluxo de Deploy

```
git push origin main
        │
        ▼
   Vercel detecta
        │
        ├─ Branch main → Production deploy
        └─ Outras branches → Preview deploy (URL única)
```

### Variáveis de Ambiente (Vercel)

```env
# Firebase Client
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID

# Firebase Admin
FIREBASE_ADMIN_PROJECT_ID
FIREBASE_ADMIN_CLIENT_EMAIL
FIREBASE_ADMIN_PRIVATE_KEY

# APIs
GEMINI_API_KEY
RESEND_API_KEY
CRON_SECRET
```

---

## 7. Design System

| Token | Valor |
|---|---|
| `--color-primary` | `#26CCAA` (teal DeMarchi) |
| `--color-secondary` | `#1E2D52` (navy DeMarchi) |
| `--color-bg` | `#F4F6F9` |
| `--font-sans` | Inter |
| `--font-mono` | JetBrains Mono |

Componentes FlyonUI v2 com tema customizado via CSS variables em `styles/globals.css`.

---

## 8. Compliance LGPD

- Documentos no Storage com lifecycle rule de **90 dias**
- `audit_log` collection registra todas as ações sensíveis
- Acesso restrito por domínio corporativo
- Dados de clientes não expostos em rotas públicas
