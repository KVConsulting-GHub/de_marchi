# DeMarchi Onboarding — DEMO (Staging)

Versão local sem dependência de APIs externas. Dados pré-carregados em memória via Zustand.

## Rodar localmente

```bash
cd onboarding-demo
npm install
npm run dev        # http://localhost:3001
```

## O que funciona

| Feature | Status |
|---|---|
| Lista de clientes com SLA badges | ✅ |
| Timeline de 4 fases | ✅ |
| Checklist interativo (toggle em tempo real) | ✅ |
| Avanço automático de fase ao concluir todos os itens | ✅ |
| Upload de documentos (simulado) | ✅ |
| OCR via Gemini (simulado, 1.5s de delay) | ✅ |
| Criar novo cliente + processo | ✅ |
| Stats: total / no prazo / atenção / atrasado | ✅ |
| Sidebar + Header + design system DeMarchi | ✅ |

## Dados mock pré-carregados

| Cliente | Tipo | Fase | Progresso | SLA |
|---|---|---|---|---|
| Construtora Basalto Ltda | Novo | 2 — Setup | 56% | No prazo |
| Mercado São João | Migrante | 3 — Transferência | 44% | Alerta |
| Clínica Vita Saúde | Novo | 4 — Kick-off | 85% | No prazo |

> Os dados resetam ao recarregar a página (comportamento esperado no modo demo).

## Diferenças em relação à produção (`onboarding-app/`)

| Aspecto | Demo | Produção |
|---|---|---|
| Auth | Sempre logado como Felipe De Marchi | Firebase Auth + Google OAuth |
| Banco | Zustand (in-memory) | Firebase Firestore (realtime) |
| Upload | Simulado (setTimeout) | Firebase Cloud Storage |
| OCR | Resultados aleatórios (1.5s) | Gemini 1.5 Pro API |
| Alertas SLA | Não enviados | Resend email |
| Variáveis de ambiente | Nenhuma necessária | Várias (ver .env.example) |
| Porta | 3001 | 3000 |
