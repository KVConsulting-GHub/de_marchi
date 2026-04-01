# PRD — Agente de Onboarding de Clientes
**DeMarchi Contabilidade · Versão 1.0 · Abril 2026**

---

## 1. Visão Geral

O **Agente de Onboarding de Clientes** é um sistema interno que digitaliza e automatiza o processo de integração de novos clientes da DeMarchi Contabilidade, substituindo controles manuais (planilhas, e-mails) por um dashboard centralizado com rastreamento em tempo real, alertas de SLA e validação de documentos via IA.

---

## 2. Problema

- Onboarding feito via planilhas e e-mails → sem visibilidade do status em tempo real
- Sem alertas quando um cliente fica inativo por mais de N dias
- Retrabalho manual para verificar documentos recebidos
- Dificuldade de escalar: cada consultor gerencia seus clientes de forma isolada

---

## 3. Objetivos

| # | Objetivo | Métrica de sucesso |
|---|---|---|
| 1 | Centralizar o acompanhamento de onboarding | 100% dos clientes novos no sistema |
| 2 | Reduzir tempo médio de onboarding | De ~45 dias → ≤ 30 dias |
| 3 | Eliminar alertas manuais de SLA | 0 clientes atrasados sem notificação |
| 4 | Validar documentos automaticamente | ≥ 80% dos docs validados via OCR sem intervenção humana |

---

## 4. Usuários

| Perfil | Descrição |
|---|---|
| **Consultor DeMarchi** | Acompanha clientes, atualiza checklist, recebe alertas |
| **Gestor / Sócio** | Visão macro de todos os onboardings, métricas |
| **Cliente** | (futuro) Portal para upload de documentos e acompanhamento |

> Acesso restrito a e-mails `@demarchi.com.br` via Google OAuth.

---

## 5. Funcionalidades

### 5.1 MVP (v1.0)

- [ ] **Dashboard de clientes** — lista com status, progresso e SLA badge
- [ ] **Checklist de 4 fases** — Documentação → Setup de Sistemas → Transferência de Dados → Kick-off
- [ ] **Upload de documentos** — com OCR automático via Gemini 1.5 Pro
- [ ] **Alertas de SLA** — e-mail automático após 5 dias de inatividade (Vercel Cron + Resend)
- [ ] **Autenticação** — Google OAuth restrito ao domínio `@demarchi.com.br`
- [ ] **Modo Demo** — ambiente com dados fictícios, sem API keys

### 5.2 Futuro (v2+)

- Portal do cliente (upload externo)
- Integração com sistemas contábeis (Domínio, Alterdata)
- Relatórios analíticos no BigQuery
- Assinatura digital de contratos

---

## 6. Fluxo Principal

```
1. Consultor cria novo cliente → escolhe tipo (novo / migrante)
2. Sistema gera checklist automático (16 itens, 4 fases)
   → Clientes "novo" pulam Fase 3 (Transferência de Dados)
3. Consultor e cliente completam itens do checklist
4. Cliente faz upload de documentos → OCR valida automaticamente
5. Cron diário verifica inatividade ≥ 5 dias → envia e-mail de alerta
6. Ao completar todos os itens da fase → avança automaticamente
7. Fase 4 completa → onboarding encerrado
```

---

## 7. Regras de Negócio

- **SLA por fase:**
  - Fase 1 (Documentação): 7 dias
  - Fase 2 (Setup): 10 dias
  - Fase 3 (Transferência): 15 dias
  - Fase 4 (Kick-off): 5 dias
- **Inatividade:** alerta após 5 dias sem nenhum item atualizado
- **Tipo de cliente:**
  - `novo` — empresa nova, sem histórico contábil → 3 fases
  - `migrante` — vem de outro escritório, tem dados a transferir → 4 fases
- **LGPD:** documentos armazenados por 90 dias no Firebase Storage, depois expiram automaticamente

---

## 8. Fora do Escopo (v1.0)

- App mobile
- Integração com sistemas contábeis
- Multi-tenant (múltiplos escritórios)
- Pagamentos / faturamento
