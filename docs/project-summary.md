# Resumo do Projeto — DeMarchi Contabilidade
**Agentes de IA · Status Atual · Abril 2026**

---

## Visão Geral

O projeto DeMarchi consiste em **3 agentes de IA** desenvolvidos para modernizar os processos internos da DeMarchi Contabilidade, com foco em consultoria, gestão de pessoas e onboarding de clientes.

---

## Os 3 Agentes

### 1. Agente de Análise Crítica (Consultoria 4.0)
> Analisa documentos contábeis, balanços e relatórios gerenciais, fornecendo diagnósticos e recomendações estratégicas com linguagem executiva.

**Capacidades:**
- Leitura e interpretação de DRE, balanço patrimonial, fluxo de caixa
- Identificação de gargalos financeiros e oportunidades de otimização
- Geração de relatórios executivos com linguagem acessível ao cliente
- Comparativos com benchmarks do setor

---

### 2. Agente de RH & Base de Conhecimento
> Centraliza o conhecimento interno da DeMarchi e responde dúvidas de colaboradores sobre processos, políticas e legislação trabalhista.

**Capacidades:**
- Respostas sobre eSocial, folha de pagamento, férias, rescisões
- Consulta à base de conhecimento interna (manuais, procedimentos)
- Onboarding de colaboradores internos
- Atualização automática com mudanças de legislação

---

### 3. Agente de Onboarding de Clientes ← *em desenvolvimento ativo*
> Dashboard web que digitaliza e automatiza a integração de novos clientes, com checklist inteligente, validação de documentos via IA e alertas de SLA.

**Capacidades:**
- Checklist de 4 fases com avanço automático
- Upload e validação de documentos via OCR (Gemini 1.5 Pro)
- Alertas automáticos de SLA por e-mail
- Dashboard em tempo real para consultores

---

## Status do Desenvolvimento

| Agente | Status | Ambiente |
|---|---|---|
| Análise Crítica | Definido / Em planejamento | — |
| RH & Base de Conhecimento | Definido / Em planejamento | — |
| **Onboarding de Clientes** | **Em desenvolvimento ativo** | Demo no Vercel |

---

## Agente de Onboarding — Progresso Técnico

### Concluído
- [x] Definição de stack (Next.js 15 + Firebase + Gemini + Resend + Vercel)
- [x] Scaffold completo do projeto de produção (`onboarding-app/` — 32 arquivos)
- [x] Scaffold completo do projeto demo (`onboarding-demo/` — 28 arquivos)
- [x] Design system implementado (cores DeMarchi, FlyonUI v2, Tailwind v4)
- [x] Todos os componentes criados (Sidebar, Header, ClientList, PhaseTimeline, ChecklistPanel, DocumentUpload, SLABadge)
- [x] Mock data com 3 clientes pré-carregados e Zustand store
- [x] Build sem erros no Vercel
- [x] Deploy do demo no Vercel (branch `onboarding_app`, pasta `onboarding-demo/`)

### Próximos Passos
- [ ] Configurar projeto Firebase (Auth, Firestore, Storage)
- [ ] Adicionar variáveis de ambiente no Vercel (produção)
- [ ] Deploy do `onboarding-app/` (produção) no Vercel
- [ ] Configurar Firebase Extension para sync com BigQuery
- [ ] Testes com usuários internos da DeMarchi

---

## Repositório

- **Repo:** `KVConsulting-GHub/de_marchi`
- **Branch de desenvolvimento:** `onboarding_app`
- **Demo:** `onboarding-demo/` → Vercel (sem API keys, dados fictícios)
- **Produção:** `onboarding-app/` → Vercel (requer configuração Firebase)

---

## Arquivos de Referência

| Arquivo | Descrição |
|---|---|
| `prompt-mestre-demarchi.md` | Design system e guia de identidade visual |
| `stack-onboarding-mvp.md` | Definição completa da stack técnica |
| `docs/PRD.md` | Product Requirements Document |
| `docs/system-design.md` | Arquitetura técnica detalhada |
| `onboarding-demo/` | Projeto demo rodável localmente (`npm run dev`) |
| `onboarding-app/` | Projeto de produção (requer Firebase + APIs) |
