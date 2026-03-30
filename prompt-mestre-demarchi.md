# Prompt Mestre — DeMarchi Contabilidade
> **Versão:** 2.0 — Adaptado para DeMarchi Contabilidade
> **Uso:** Cole este documento inteiro no Lovable, Cursor, v0, Google AI Studio ou qualquer LLM com geração de código.
> **Output esperado:** Design system completo + landing page estruturada com copy customizado, tokens CSS, configuração Tailwind e componentes prontos.

---

## ── INPUTS DO PROJETO ──────────────────────────────────────────────

```yaml
# ─ Identidade Visual ────────────────────────────────────────
marca:           "DeMarchi Contabilidade"
tagline:         "Contabilidade consultiva com tecnologia e atendimento humano"
fonte:           "Inter"
fonte_url:       "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap"
cor_primaria:    "#26CCAA"      # verde-teal da marca — ação principal, CTA, destaques
cor_acento:      "#1E2D52"      # azul-marinho profundo — hierarquia, nav, títulos
cor_apoio_1:     "#1B8C76"      # verde escuro — hover, estados ativos
cor_apoio_2:     "#273A6A"      # azul médio — superfícies secundárias
tema:            "light"        # tema claro — fundo branco/cinza suave
tamanho_base:    16             # px — corpo do texto desktop
razao_modular:   1.333          # escala musical perfeita
entrelinha:      1.6            # recomendado para textos informativos/consultivos

# ─ Negócio ──────────────────────────────────────────────────
nome_empresa:         "DeMarchi Contabilidade"
segmento:             "Escritório de Contabilidade / Gestão Empresarial e Patrimonial"
descricao_curta:      "Fundada em 1987 em Caxias do Sul, a DeMarchi oferece contabilidade consultiva com acompanhamento mensal, dashboard em tempo real e tecnologia integrada — tudo com atendimento humano e linguagem clara."
publico_primario:     "Pequenos e médios empresários que precisam de mais do que obrigações fiscais cumpridas — querem entender os números do negócio e tomar decisões com segurança"
publico_secundario:   "Gestores financeiros e CFOs de empresas em crescimento que buscam um parceiro contábil ágil e consultivo"

dor_principal:        "O empresário não entende os relatórios contábeis que recebe — são técnicos demais — e toma decisões no escuro sem saber se o negócio está realmente lucrando"
dor_secundaria:       "Processos manuais lentos, acúmulo de burocracia e falta de visibilidade em tempo real sobre a saúde financeira da empresa"

beneficio_principal:  "O empresário passa a entender seus números, acompanhar indicadores em tempo real e tomar decisões embasadas em dados — com um relatório consultivo claro e contextualizado"
beneficio_secundario: "Redução de burocracia, cumprimento de obrigações fiscais sem estresse e um time contábil que fala a língua do negócio"

diferenciais:
  - "Contabilidade Consultiva — relatório mensal em linguagem clara com indicadores de lucratividade, EBITDA e prazos médios contextualizados para o seu negócio"
  - "Dashboard Contábil em tempo real — acompanhe a saúde financeira da empresa a qualquer hora, direto do seu dispositivo"
  - "Tecnologia e integração digital — automação de processos para desburocratizar e agilizar obrigações contábeis, fiscais e de RH"
  - "Atendimento humanizado — equipe dedicada, relacionamento próximo e respostas rápidas, sem você precisar entender de contabilidade"
  - "38 anos de experiência — fundada em 1987 em Caxias do Sul, com histórico sólido e base de clientes em todo o Brasil"
  - "Solução integrada — contabilidade, fiscal e recursos humanos em um único escritório, eliminando fragmentação de fornecedores"

prova_social:
  - "38 anos de história — fundada em 1987, com décadas de confiança construída por empresários do sul do Brasil"
  - "Presença nacional — atende empresas em múltiplos estados, de Caxias do Sul ao Brasil inteiro"
  - "Relatórios consultivos entregues em 3 a 5 dias — agilidade que escritórios tradicionais não conseguem"

objecoes_comuns:
  - "Já tenho um contador — por que mudar para a DeMarchi?"
  - "Meu negócio é pequeno demais para precisar de contabilidade consultiva"
  - "Como funciona o dashboard? Preciso instalar alguma coisa?"
  - "Vocês entendem o meu segmento de atuação específico?"
  - "Quanto tempo leva para migrar de escritório contábil?"
  - "E se eu tiver dúvidas fora do horário comercial?"

planos:
  - nome: "Essencial"
    preco: "Sob consulta"
    para: "Empresas que precisam de contabilidade, fiscal e folha de pagamento com qualidade e segurança"
  - nome: "Consultivo"
    preco: "Sob consulta"
    para: "Empresas que querem relatório mensal, dashboard e acompanhamento estratégico do negócio"
  - nome: "Estratégico"
    preco: "Sob consulta"
    para: "Empresas em crescimento que precisam de integração total, automação e parceria próxima de gestão"

cta_primario:    "Quero entender meus números"
cta_secundario:  "Conhecer a DeMarchi"

tom_de_voz:
  - "Consultivo e claro — fala como um sócio de negócios experiente, não como um técnico cheio de jargão"
  - "Direto e concreto — usa dados, anos, resultados reais em vez de adjetivos vagos como 'excelente' ou 'líder de mercado'"
  - "Humanizado e próximo — transmite confiança sem ser frio ou corporativo"
  - "Empoderador — o empresário deve se sentir capaz de entender seus números após ler qualquer seção"
  - "EVITAR: termos técnicos contábeis sem explicação, linguagem burocrática, frases longas com muitos subordinados"

# ─ Stack Técnica ─────────────────────────────────────────────
framework:        "Next.js 15 (App Router)"
linguagem:        "TypeScript"
estilizacao:      "Tailwind CSS v4"
biblioteca_ui:    "FlyonUI v2"
componentes_ref:  "21st.dev"
icones:           "lucide-react"
animacoes:        "CSS keyframes + Tailwind transitions"
```

---
## ── INSTRUÇÕES FIXAS DO SISTEMA ────────────────────────────────────
> Não altere nada abaixo desta linha. Esta seção contém toda a lógica de geração.

### MISSÃO
Com base nos inputs acima, gere um **design system visual completo** e uma **landing page estruturada** com copy em PT-BR. O output deve ser production-ready, visualmente distinto e totalmente customizado para a DeMarchi Contabilidade.

**Contexto visual importante:** A DeMarchi possui identidade visual consolidada com:
- Verde-teal vibrante `#26CCAA` como cor de destaque e "contabilidade" no logo
- Azul-marinho profundo `#1E2D52` como cor institucional principal e "DeMarchi" no logo
- Símbolo DM com bloco turquesa + letras azul-marinho
- Atmosfera: profissional, moderna, confiável — não bancária, não fria

---

## PARTE 1 — Design System Visual

### 1. Paleta de Cores

#### 1.1 Cores da Marca

| Token CSS | Hex | Nome semântico | Uso exato |
|-----------|-----|----------------|-----------|
| `--color-primary` | `#26CCAA` | Verde-Teal DeMarchi | CTAs, badges de destaque, ícones de benefício, sublinhados de título |
| `--color-primary-dark` | `#1B8C76` | Verde Escuro | Hover do CTA primário, estados ativos, bordas de foco |
| `--color-secondary` | `#1E2D52` | Azul-Marinho Institucional | Títulos principais, nav, footer, texto de alto peso |
| `--color-secondary-mid` | `#273A6A` | Azul Médio | Cards de destaque, seções de fundo alternado escuro |
| `--color-accent` | `#0099F4` | Azul Brilhante | Info, links inline, badges informativos |
| `--color-text` | `#1A1A2E` | Preto-Azulado | Corpo do texto, máxima legibilidade |
| `--color-bg` | `#FFFFFF` | Branco | Background base da página |

#### 1.2 Escala de Superfícies (tema light)

| Token CSS | Hex calculado | FlyonUI token | Uso |
|-----------|--------------|---------------|-----|
| `--color-bg-base` | `#FFFFFF` | `base-100` | Página, fundo geral |
| `--color-bg-subtle` | `#F4F6F9` | `base-200` | Nav, sidebar, seções alternadas |
| `--color-bg-surface` | `#E8ECF2` | `base-300` | Cards, painéis, modais |
| `--color-bg-raised` | `#D8DDE8` | `neutral` | Hover states, inputs |

#### 1.3 Escala de Texto (5 níveis)

| Token | Opacidade | FlyonUI | Uso |
|-------|-----------|---------|-----|
| `--text-high` | 100% `#1A1A2E` | `base-content` | Títulos, labels, valores numéricos |
| `--text-default` | 92% | `base-content/90` | Corpo do texto principal |
| `--text-medium` | 78% | `base-content/75` | Parágrafos secundários |
| `--text-muted` | 55% | `base-content/55` | Metadados, timestamps, legenda |
| `--text-faint` | 30% | `base-content/30` | Placeholder, disabled |

#### 1.4 Bordas

| Nível | Hex | FlyonUI | Uso |
|-------|-----|---------|-----|
| Subtle | `#E8ECF2` | `border-base-300` | Cards, separadores |
| Default | `#C8D0DC` | `border-base-content/20` | Inputs, tabelas |
| Focus | `#26CCAA` | `border-primary` | Foco de inputs, seleção ativa |

#### 1.5 Cores Semânticas

| Papel | Base | FlyonUI class | Token CSS |
|-------|------|---------------|-----------|
| Success | `#26CCAA` | `success` | `--color-success` |
| Warning | `#F59E0B` | `warning` | `--color-warning` |
| Danger | `#EF4444` | `error` | `--color-danger` |
| Info | `#0099F4` | `info` | `--color-info` |

#### 1.6 Regras de Uso de Cores

1. **`#26CCAA` (verde-teal)** é reservado para ação — use em CTAs, ícones de benefícios e métricas positivas. Nunca em texto corrido longo (dificulta leitura em body size).
2. **`#1E2D52` (azul-marinho)** domina autoridade — é a cor de títulos h1/h2 e do navbar. Cria contraste forte com o fundo branco sem ser agressivo.
3. **Hierarquia só com cor:** Título `#1E2D52` > Subtítulo `#273A6A` > Corpo `#1A1A2E` > Metadado `rgba(26,26,46,0.55)`.
4. **Fundos alternados:** Alterne `#FFFFFF` e `#F4F6F9` entre seções para criar ritmo sem usar cor de marca no background.
5. **Nunca fazer:** Texto verde-teal sobre fundo branco em tamanho menor que 18px (contraste insuficiente WCAG AA). Sempre verificar pares antes de usar.

---

### 2. Tipografia

#### 2.1 Import e Declaração
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');
--font-sans: 'Inter', system-ui, -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

#### 2.2 Avaliação da Fonte — Inter

Inter foi projetada especificamente para interfaces digitais e é uma das escolhas mais sólidas para um escritório contábil que quer transmitir precisão e modernidade. Sua distinção entre I/l/1 é excelente, garantindo que números e códigos fiscais sejam lidos com clareza. Suporta completamente o alfabeto português com ç, ã, á e demais caracteres. O ponto fraco é que Inter é onipresente — para destacar a DeMarchi como diferenciada, compensar com composição tipográfica forte (tamanhos, pesos e espaçamentos bem calibrados) em vez de depender da fonte para personalidade.

#### 2.3 Escala Modular Calculada (base 16px × 1.333)

| Token CSS | px (arredondado) | Tailwind key | Peso | Letter-spacing | Line-height | Uso |
|-----------|-----------------|--------------|------|----------------|-------------|-----|
| `--fs-display` | 50px | `display` | 900 | -0.03em | 1.1 | Hero headline principal |
| `--fs-h1` | 38px | `4xl` | 700 | -0.02em | 1.2 | Título de página / seção hero |
| `--fs-h2` | 28px | `3xl` | 600 | -0.01em | 1.3 | Título de seção |
| `--fs-h3` | 23px | `2xl` | 600 | 0 | 1.35 | Título de card, sub-seção |
| `--fs-h4` | 21px | `xl` | 500 | 0 | 1.4 | Label de bloco, título de feature |
| `--fs-body` | 16px | `base` | 400 | 0 | 1.6 | Corpo do texto |
| `--fs-small` | 12px | `sm` | 400 | 0 | 1.6 | Metadados, tags |
| `--fs-label` | 10px | `xs` | 600 | +0.05em | 1 | Labels uppercase, badges de categoria |
| `--fs-micro` | 9px | `2xs` | 500 | +0.03em | 1 | Chips, footnotes |

#### 2.4 Regras de Tipografia (12 Princípios)

1. **Tamanho base:** 16px no desktop. Mobile: `max(14, 14)px` — não reduza abaixo de 14px
2. **Escala modular:** todos os tamanhos como `16 × 1.333^n` — nenhum valor arbitrário
3. **Largura de coluna:** `max-width: 65ch` para parágrafos de corpo; nunca mais que 75ch
4. **Alinhamento:** esquerda para todo texto corrido; centralizado apenas em hero headline e métricas isoladas
5. **Entrelinha:** 1.6 para body; 1.1–1.2 para títulos acima de 28px
6. **Kerning:** `-0.02em` em h1/h2; `-0.03em` no display; `+0.05em` em labels uppercase de categoria
7. **Hierarquia:** máximo 3 níveis tipográficos visíveis por tela (ex: h2 + body + label)
8. **Cor tipográfica:** use `#26CCAA` (verde-teal) para palavras-chave em títulos de seção, não para parágrafos inteiros
9. **Espaço em branco:** padding mínimo 24px em cards; 48–80px entre seções no desktop
10. **Separadores:** prefer cards como agrupadores visuais; evite linhas horizontais soltas
11. **Ritmo:** todo espaçamento em múltiplos de 4px — 4, 8, 12, 16, 24, 32, 48, 64, 96
12. **Peso:** 400 para corpo; 500 para destaques em texto; 600 para subtítulos e labels; 700 para h1/h2; 900 reservado para display e métricas numéricas grandes

---

### 3. Espaçamento e Layout

#### 3.1 Escala Base-4 (10 tokens)

| Token | px | Tailwind | Uso |
|-------|----|----------|-----|
| `--space-1` | 4px | `p-1` | Gap entre ícone e texto |
| `--space-2` | 8px | `p-2` | Gap interno de badge/chip |
| `--space-3` | 12px | `p-3` | Padding pequeno de botão sm |
| `--space-4` | 16px | `p-4` | Padding padrão de botão |
| `--space-5` | 20px | `p-5` | Spacing médio entre elementos |
| `--space-6` | 24px | `p-6` | Card padding mínimo |
| `--space-8` | 32px | `p-8` | Seção pequena / gap entre cards |
| `--space-12` | 48px | `p-12` | Seção média / padding de nav |
| `--space-16` | 64px | `p-16` | Seção grande |
| `--space-24` | 96px | `p-24` | Hero / seções de impacto |

#### 3.2 Border Radius (6 tokens + pill)

| Token | px | Tailwind | Uso |
|-------|----|----------|-----|
| `--radius-xs` | 2px | `rounded-sm` | Tags fiscais, chips de status |
| `--radius-sm` | 4px | `rounded` | Inputs, badges menores |
| `--radius-md` | 6px | `rounded-md` | Botões padrão |
| `--radius-lg` | 8px | `rounded-lg` | Cards de serviço |
| `--radius-xl` | 12px | `rounded-xl` | Modais, painéis de dashboard |
| `--radius-2xl` | 16px | `rounded-2xl` | Seções hero de destaque |
| `--radius-pill` | 9999px | `rounded-full` | Avatares de equipe, toggles |

#### 3.3 Grid da Landing Page
```
Container:  max-w-7xl mx-auto px-6 lg:px-8
Seções:     py-24 lg:py-32
Features:   grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8
2 colunas:  grid grid-cols-1 lg:grid-cols-2 gap-12 items-center
```

---

### 4. Componentes FlyonUI

#### 4.1 Button
```html
<!-- Primary (CTA principal — verde-teal) -->
<button class="btn btn-primary">Quero entender meus números</button>

<!-- Secondary (ação de suporte — azul-marinho outline) -->
<button class="btn btn-outline" style="border-color: #1E2D52; color: #1E2D52">Conhecer a DeMarchi</button>

<!-- Ghost (ações terciárias) -->
<button class="btn btn-ghost">Saiba mais</button>

<!-- Loading state -->
<button class="btn btn-primary">
  <span class="loading loading-spinner"></span>
  Enviando...
</button>
```
Personalização: `btn-sm` / `btn-lg`. `btn-primary` herda `--color-primary: #26CCAA` do tema.

#### 4.2 Badge
```html
<span class="badge badge-success">Contabilidade Consultiva</span>
<span class="badge badge-info">Dashboard em tempo real</span>
<span class="badge badge-warning">Prazo fiscal próximo</span>
<span class="badge badge-ghost">38 anos de experiência</span>
```

#### 4.3 Card de Serviço
```html
<div class="card bg-base-100 shadow-sm border border-base-300 hover:shadow-md transition-shadow">
  <div class="card-body">
    <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
      <!-- ícone lucide-react em text-primary -->
    </div>
    <h3 class="card-title text-[#1E2D52]">Contabilidade Consultiva</h3>
    <p class="text-base-content/65">Relatório mensal em linguagem clara com seus indicadores principais.</p>
  </div>
</div>
```

#### 4.4 Input / Form (Formulário de Contato)
```html
<div class="form-control w-full">
  <label class="label">
    <span class="label-text font-medium">Nome da empresa</span>
  </label>
  <input type="text" class="input input-bordered w-full focus:border-primary" placeholder="Ex: Minha Empresa Ltda" />
</div>
```

#### 4.5 Stat (Métrica de Prova Social)
```html
<div class="stats bg-[#1E2D52] shadow-none">
  <div class="stat">
    <div class="stat-title text-white/60">Anos de experiência</div>
    <div class="stat-value text-[#26CCAA]">38</div>
    <div class="stat-desc text-white/50">Fundada em 1987, Caxias do Sul</div>
  </div>
</div>
```

#### 4.6 Accordion FAQ
```html
<div class="collapse collapse-arrow bg-base-100 border border-base-300 mb-2">
  <input type="radio" name="faq-demarchi" />
  <div class="collapse-title font-medium text-[#1E2D52]">
    Já tenho um contador. Por que mudar para a DeMarchi?
  </div>
  <div class="collapse-content text-base-content/70">
    <p>Depende do que você espera do seu contador. Se você só precisa das obrigações cumpridas, qualquer escritório serve. Se você quer entender se seu negócio está lucrando e por quê, a DeMarchi entrega um relatório mensal consultivo em linguagem clara — não um balancete técnico que fica na gaveta.</p>
  </div>
</div>
```

#### 4.7 Navbar
```html
<nav class="navbar bg-white border-b border-base-300 sticky top-0 z-50">
  <div class="navbar-start">
    <!-- Logo DeMarchi SVG ou img -->
    <img src="/logo-demarchi.svg" alt="DeMarchi Contabilidade" class="h-8" />
  </div>
  <div class="navbar-center hidden lg:flex">
    <ul class="menu menu-horizontal gap-1 text-[#1E2D52]">
      <li><a class="hover:text-primary">Serviços</a></li>
      <li><a class="hover:text-primary">Como funciona</a></li>
      <li><a class="hover:text-primary">Sobre</a></li>
      <li><a class="hover:text-primary">Contato</a></li>
    </ul>
  </div>
  <div class="navbar-end gap-2">
    <button class="btn btn-ghost btn-sm text-[#1E2D52]">Entrar</button>
    <button class="btn btn-primary btn-sm">Quero entender meus números</button>
  </div>
</nav>
```

#### 4.8 Alert
```html
<!-- Prazo fiscal próximo -->
<div class="alert bg-[#1E2D52]/5 border border-[#1E2D52]/20">
  <span class="text-[#1E2D52] font-medium">📅 SPED vence em 3 dias — seu time está avisado?</span>
</div>
```

#### 4.9 Modal
```html
<dialog id="modal-contato" class="modal">
  <div class="modal-box max-w-md">
    <h3 class="text-lg font-bold text-[#1E2D52]">Fale com a DeMarchi</h3>
    <p class="py-2 text-base-content/70 text-sm">Preencha abaixo e retornamos em até 1 dia útil.</p>
    <!-- form fields -->
    <div class="modal-action">
      <button class="btn btn-ghost" onclick="modal_contato.close()">Cancelar</button>
      <button class="btn btn-primary">Enviar mensagem</button>
    </div>
  </div>
</dialog>
```

#### 4.10 Table (ex: lista de obrigações)
```html
<div class="overflow-x-auto">
  <table class="table table-zebra">
    <thead class="bg-[#1E2D52] text-white">
      <tr><th>Obrigação</th><th>Vencimento</th><th>Status</th></tr>
    </thead>
    <tbody>
      <tr>
        <td class="font-medium">SPED Contábil</td>
        <td>31/05/2026</td>
        <td><span class="badge badge-success">Em dia</span></td>
      </tr>
    </tbody>
  </table>
</div>
```

---

### 5. Motion

#### 5.1 Durações

| Token | ms | Uso |
|-------|----|-----|
| `--duration-fast` | 100ms | Feedback de hover em botões |
| `--duration-base` | 150ms | Transições de estado padrão |
| `--duration-slow` | 250ms | Abertura de accordion/FAQ |
| `--duration-enter` | 300ms | Entrada de modais |
| `--duration-page` | 400ms | Transições de seção |

#### 5.2 Easings

| Token | Cubic-bezier | Uso |
|-------|-------------|-----|
| `--ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Cards e elementos entrando |
| `--ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Tooltips e overlays saindo |
| `--ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | Transições de tab, accordion |

#### 5.3 Classes Tailwind de Animação
```css
/* Fade in ao fazer scroll */
.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Pulse suave no CTA */
.animate-cta-pulse {
  animation: ctaPulse 2.5s ease-in-out infinite;
}
@keyframes ctaPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(38, 204, 170, 0.4); }
  50%       { box-shadow: 0 0 0 8px rgba(38, 204, 170, 0); }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

### 6. Guardrails de Qualidade (15 regras)

**NUNCA:**
1. NUNCA usar texto verde `#26CCAA` em tamanho abaixo de 18px sobre branco — contraste insuficiente WCAG AA
2. NUNCA usar fundo azul-marinho `#1E2D52` com texto da mesma família sem verificar contraste
3. NUNCA colocar mais de 3 CTAs verdes na mesma viewport — dilui o peso da ação
4. NUNCA misturar os 3 tons de verde (`#0f4d40`, `#1B8C76`, `#26CCAA`) no mesmo card
5. NUNCA usar espaçamento ímpar ou não-múltiplo de 4px
6. NUNCA centralizar texto corrido com mais de 3 linhas
7. NUNCA usar animações simultâneas em mais de 2 elementos na mesma tela

**SEMPRE:**
8. SEMPRE usar `#1E2D52` para títulos principais (h1, h2) — transmite autoridade institucional
9. SEMPRE aplicar `max-w-[65ch]` em parágrafos de corpo para legibilidade
10. SEMPRE usar o símbolo "DM" como favicon e ícone de app
11. SEMPRE manter navbar sticky com fundo branco e borda `border-b border-base-300`
12. SEMPRE incluir o número de anos (38 anos) quando mencionar experiência — dado concreto > adjetivo
13. SEMPRE garantir que o CTA primário (verde) tenha contraste ≥ 4.5:1 com o texto sobreposto
14. SEMPRE tratar seções com fundo `#1E2D52` como exceção de alto impacto, não padrão recorrente
15. SEMPRE incluir `prefers-reduced-motion` para usuários com epilepsia ou sensibilidade a movimento

---

### 7. Arquivo globals.css

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Marca DeMarchi */
  --color-primary: #26CCAA;
  --color-primary-dark: #1B8C76;
  --color-secondary: #1E2D52;
  --color-secondary-mid: #273A6A;
  --color-accent: #0099F4;

  /* Superfícies (light) */
  --color-bg-base: #FFFFFF;
  --color-bg-subtle: #F4F6F9;
  --color-bg-surface: #E8ECF2;
  --color-bg-raised: #D8DDE8;

  /* Tipografia */
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Escala modular */
  --fs-display: 50px;
  --fs-h1: 38px;
  --fs-h2: 28px;
  --fs-h3: 23px;
  --fs-h4: 21px;
  --fs-body: 16px;
  --fs-small: 12px;
  --fs-label: 10px;

  /* Espaçamento */
  --space-1: 4px; --space-2: 8px; --space-3: 12px;
  --space-4: 16px; --space-5: 20px; --space-6: 24px;
  --space-8: 32px; --space-12: 48px; --space-16: 64px;
  --space-24: 96px;

  /* Motion */
  --duration-fast: 100ms;
  --duration-base: 150ms;
  --duration-slow: 250ms;
  --duration-enter: 300ms;
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
}

[data-theme="demarchi"] {
  --color-primary: #26CCAA;
  --color-primary-content: #FFFFFF;
  --color-secondary: #1E2D52;
  --color-secondary-content: #FFFFFF;
  --color-base-100: #FFFFFF;
  --color-base-200: #F4F6F9;
  --color-base-300: #E8ECF2;
  --color-base-content: #1A1A2E;
  --color-neutral: #273A6A;
  --color-neutral-content: #FFFFFF;
  --color-info: #0099F4;
  --color-success: #26CCAA;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
}

@layer base {
  body {
    font-family: var(--font-sans);
    font-size: var(--fs-body);
    line-height: 1.6;
    color: #1A1A2E;
    background-color: var(--color-bg-base);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2 { color: #1E2D52; letter-spacing: -0.02em; }
  h3, h4 { color: #1E2D52; }

  p { max-width: 65ch; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

### 8. tailwind.config.ts

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#26CCAA',
          dark: '#1B8C76',
          light: '#5DD9BC',
        },
        secondary: {
          DEFAULT: '#1E2D52',
          mid: '#273A6A',
          light: '#3A4F7A',
        },
        accent: '#0099F4',
        surface: {
          base: '#FFFFFF',
          subtle: '#F4F6F9',
          card: '#E8ECF2',
          raised: '#D8DDE8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'display': ['50px', { lineHeight: '1.1', letterSpacing: '-0.03em', fontWeight: '900' }],
        'h1': ['38px', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h2': ['28px', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
        'h3': ['23px', { lineHeight: '1.35', fontWeight: '600' }],
        'h4': ['21px', { lineHeight: '1.4', fontWeight: '500' }],
      },
      spacing: {
        '18': '72px',
        '22': '88px',
      },
      borderRadius: {
        'xs': '2px',
        'pill': '9999px',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'cta-pulse': 'ctaPulse 2.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        ctaPulse: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(38, 204, 170, 0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(38, 204, 170, 0)' },
        },
      },
    },
  },
  plugins: [require('flyonui'), require('flyonui/plugin')],
  flyonui: {
    themes: [
      {
        demarchi: {
          primary: '#26CCAA',
          'primary-content': '#FFFFFF',
          secondary: '#1E2D52',
          'secondary-content': '#FFFFFF',
          accent: '#0099F4',
          neutral: '#273A6A',
          'base-100': '#FFFFFF',
          'base-200': '#F4F6F9',
          'base-300': '#E8ECF2',
          'base-content': '#1A1A2E',
          info: '#0099F4',
          success: '#26CCAA',
          warning: '#F59E0B',
          error: '#EF4444',
        },
      },
    ],
  },
}

export default config
```

---

## PARTE 2 — Landing Page Estruturada

### 9. Estrutura das Seções

#### 9.1 Navbar

**Sticky, branca, com sombra sutil ao fazer scroll.**

```
[Logo DeMarchi] ←→ [Serviços] [Como funciona] [Sobre] [Contato] ←→ [Entrar] [Quero entender meus números →]
```

Background: `bg-white border-b border-base-300`
Logo: arquivo `/public/logo-demarchi.svg`
CTA botão: `btn btn-primary btn-sm` com `#26CCAA`

---

#### 9.2 Hero

**Objetivo:** Comunicar em 5 segundos quem a DeMarchi atende e o que resolve.

**Headline (display, azul-marinho):**
> Seus números contábeis precisam ser entendidos, não apenas arquivados.

**Subheadline (body, texto médio):**
> A DeMarchi é um escritório contábil que entrega relatórios consultivos em linguagem clara, dashboard em tempo real e 38 anos de experiência — para que você tome decisões baseadas em dados, não em intuição.

**CTAs:**
```html
<button class="btn btn-primary btn-lg animate-cta-pulse">Quero entender meus números</button>
<button class="btn btn-outline btn-lg" style="border-color: #1E2D52; color: #1E2D52">Conhecer a DeMarchi</button>
```

**Elemento visual:** Mockup do dashboard contábil em tela de notebook/tablet, ou ilustração vetorial abstrata de gráficos + ícone DM.

**Layout:** 2 colunas no desktop — copy à esquerda, visual à direita. Mobile: empilhado, visual embaixo.

**Fundo:** `bg-white` com gradiente sutil `from-[#F4F6F9] to-white` da seção hero.

**Ref 21st.dev:** `21st.dev/hero`

---

#### 9.3 Problema

**Objetivo:** Fazer o empresário pensar "é exatamente isso que acontece comigo."

**Headline:**
> Você sabe se o seu negócio está realmente lucrando?

**3 cenários concretos do dia a dia:**

```
📊  "Recebi o balancete, mas não entendo o que significa para o meu caixa."
⏳  "Só descubro que tem um problema fiscal quando já virou multa."
📁  "Meu contador resolve as obrigações, mas não me ajuda a decidir nada."
```

**Estilo:** Cards com fundo `bg-[#F4F6F9]`, ícone Lucide + problema em 1 frase. Sem CTA nesta seção.

**Ref 21st.dev:** `21st.dev/features`

---

#### 9.4 Solução / Como Funciona

**Objetivo:** Mostrar o mecanismo simples da DeMarchi.

**Headline:**
> Do balancete ao relatório que você realmente vai usar — em 3 a 5 dias.

**Subheadline:**
> A DeMarchi transforma seus dados contábeis em análise estratégica com contexto do seu negócio.

**4 passos numerados:**

```
1. Fechamento contábil →  Sua equipe entrega o balancete finalizado no sistema Domínio
2. Análise consultiva  →  Cruzamos os dados com o contexto do seu negócio no dashboard
3. Relatório em 3–5 dias →  Você recebe um relatório claro com indicadores, EBITDA e pautas de reunião
4. Acompanhamento mensal →  Reunião de revisão, ajustes de estratégia e dashboard sempre atualizado
```

**Estilo:** Stepper horizontal no desktop, vertical no mobile. Números em `#26CCAA`, texto em `#1E2D52`.

**Ref 21st.dev:** `21st.dev/how-it-works`
**Componentes:** `steps steps-horizontal` FlyonUI

---

#### 9.5 Features / Diferenciais

**Objetivo:** Detalhar o que torna a DeMarchi diferente de um escritório contábil convencional.

**Headline:**
> Contabilidade que faz parte da sua estratégia, não do seu arquivo morto.

**Grid de 6 feature cards (3×2 no desktop):**

| Ícone | Título | Descrição |
|-------|--------|-----------|
| `BarChart3` | Relatório Consultivo Mensal | Indicadores de lucratividade, EBITDA e prazos médios em linguagem clara — não um balancete técnico. |
| `Monitor` | Dashboard em Tempo Real | Acompanhe a saúde financeira da sua empresa a qualquer hora, de qualquer dispositivo. |
| `Zap` | Tecnologia e Automação | Processos fiscais e contábeis automatizados para reduzir burocracia e erros manuais. |
| `Heart` | Atendimento Humanizado | Equipe dedicada que conhece o seu negócio pelo nome e responde com agilidade. |
| `Shield` | 38 Anos de Experiência | Fundada em 1987, com histórico sólido em empresas de múltiplos setores e estados. |
| `Layers` | Solução Integrada | Contabilidade, fiscal e RH em um único escritório — sem fragmentação de fornecedores. |

**Ref 21st.dev:** `21st.dev/features`
**Componentes:** Grid `lg:grid-cols-3` de `card bg-base-100 border border-base-300 hover:shadow-md`

---

#### 9.6 Prova Social / Métricas

**Objetivo:** Dados concretos para quebrar ceticismo.

**Layout:** Fundo `bg-[#1E2D52]`, 3 stats em destaque, depoimento abaixo.

**3 métricas principais:**

```
38 anos          |  3–5 dias          |  3 áreas
de história      |  por relatório     |  em um escritório
Fundados em 1987 |  entregue          |  Contábil · Fiscal · RH
Caxias do Sul    |  consultivo        |  sem fragmentação
```

**Números:** `text-[#26CCAA] font-black text-display`
**Títulos das métricas:** `text-white/60`
**Contexto:** `text-white/50`

**Depoimento placeholder:**
> "Antes eu só recebia papeis que não entendia. Agora tenho um relatório que uso na reunião com meus sócios toda semana." — *Empresário, setor de serviços, RS*

**Ref 21st.dev:** `21st.dev/testimonials`
**Componentes:** `stats` FlyonUI com tema invertido

---

#### 9.7 Serviços / Planos

**Objetivo:** Apresentar a amplitude dos serviços sem intimidar com preço.

**Headline:**
> Qual é o nível de suporte que o seu negócio precisa?

**Subheadline:**
> Todos os planos incluem cumprimento de obrigações fiscais, contábeis e de RH. O que muda é a profundidade da análise consultiva.

**3 cards de serviço:**

```
[Essencial]          [Consultivo ⭐ Mais contratado]    [Estratégico]
Obrigações em dia    Tudo do Essencial +                Tudo do Consultivo +
Fiscal e folha       Relatório consultivo mensal        Automação de processos
Atendimento padrão   Dashboard em tempo real            Integração total G-Suite
                     Reunião mensal de revisão          Parceria próxima de gestão
[Falar com consultor] [Falar com consultor]             [Falar com consultor]
```

**Card central destacado:** `border-2 border-primary shadow-lg` + badge `Mais contratado` em `badge-primary`

**Nota:** Como os preços são sob consulta, o CTA de cada card é "Falar com consultor" direcionando para formulário de contato.

**Ref 21st.dev:** `21st.dev/pricing`

---

#### 9.8 FAQ

**Objetivo:** Eliminar as 6 objeções principais antes do CTA final.

**Headline:**
> Perguntas que todo empresário faz antes de contratar

**6 perguntas com respostas diretas:**

**1. Já tenho um contador. Por que mudar para a DeMarchi?**
Depende do que você espera do seu contador. Se basta cumprir as obrigações, qualquer escritório resolve. Se você quer entender se seu negócio está lucrando e por quê, a DeMarchi entrega relatório consultivo mensal com contexto do seu negócio — não apenas um balancete técnico.

**2. Meu negócio é pequeno demais para precisar de contabilidade consultiva?**
Não existe empresa pequena demais para tomar boas decisões. Na verdade, empresas em crescimento são as que mais precisam de visibilidade sobre seus números — antes que um problema pequeno vire uma crise.

**3. Como funciona o dashboard? Preciso instalar alguma coisa?**
Não. O dashboard é acessado via navegador ou dispositivo móvel, sem instalação. Você recebe acesso e visualiza seus indicadores contábeis em tempo real, atualizados pelo seu time da DeMarchi.

**4. Vocês entendem o meu segmento específico?**
A DeMarchi atua em múltiplos setores e estados. O processo de onboarding inclui uma entrevista de contexto justamente para que o relatório consultivo faça sentido para o seu tipo de negócio, não seja genérico.

**5. Quanto tempo leva para migrar de escritório contábil?**
Em média, a transição leva de 30 a 60 dias, dependendo do volume de dados históricos. Nossa equipe conduz todo o processo de migração — você não precisa fazer nada além de autorizar a transferência de documentos.

**6. E se eu tiver dúvidas fora do horário comercial?**
Para urgências fiscais e contábeis com prazo, nossa equipe tem canal prioritário. Para dúvidas gerais, respondemos no próximo dia útil. Nosso objetivo é que você raramente precise acionar suporte emergencial — porque o acompanhamento mensal previne surpresas.

**Ref 21st.dev:** `21st.dev/faq`
**Componentes:** `collapse collapse-arrow bg-base-100 border border-base-300`

---

#### 9.9 CTA Final

**Objetivo:** Última chance de conversão. Ângulo diferente do hero — foco na consequência de não agir.

**Fundo:** `bg-[#1E2D52]` — seção de alto impacto visual

**Headline (branco, display):**
> Cada mês sem relatório consultivo é um mês tomando decisões no escuro.

**Subheadline (branco/70):**
> A DeMarchi tem 38 anos de experiência para transformar seus dados contábeis em clareza estratégica. Fale com um consultor e veja como funciona para o seu negócio.

**CTA:**
```html
<button class="btn btn-primary btn-lg animate-cta-pulse">Quero entender meus números</button>
<p class="text-white/40 text-sm mt-3">Sem compromisso · Retornamos em até 1 dia útil · Atendimento humanizado</p>
```

**Ref 21st.dev:** `21st.dev/cta`

---

#### 9.10 Footer

**Objetivo:** Credibilidade legal, navegação secundária e contato.

**Layout:** Grid 4 colunas no desktop

```
[Logo DeMarchi]                [Serviços]           [Empresa]            [Contato]
Contabilidade consultiva       Contabilidade         Sobre nós            📍 Rua Afonso Arinos, 44
com tecnologia e               Fiscal                Equipe               Rio Branco, Caxias do Sul
atendimento humano.            Recursos Humanos      Carreiras            CEP 95084-010
                               Dashboard             Blog                 📞 54 3222.5106 / 3228.2184
                                                                          ✉ contato@demarchicontabil.com.br

© 2026 DeMarchi Contabilidade · Todos os direitos reservados · Termos de Uso · Política de Privacidade · LGPD
```

**Estilo:** Fundo `bg-[#F4F6F9]`, borda superior `border-t border-base-300`
**Links secundários:** `text-base-content/50 hover:text-primary`

**Ref 21st.dev:** `21st.dev/footer`

---

### 10. Arquivo layout.tsx — Estrutura Base Next.js

```tsx
// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DeMarchi Contabilidade — Contabilidade consultiva com tecnologia e atendimento humano',
  description: 'Escritório contábil fundado em 1987 em Caxias do Sul. Relatório consultivo mensal, dashboard em tempo real e solução integrada em contabilidade, fiscal e RH.',
  openGraph: {
    title: 'DeMarchi Contabilidade',
    description: 'Contabilidade consultiva com relatório mensal, dashboard em tempo real e 38 anos de experiência.',
    type: 'website',
    locale: 'pt_BR',
  },
  icons: {
    icon: '/favicon-dm.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" data-theme="demarchi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-white text-[#1A1A2E]">
        {children}
      </body>
    </html>
  )
}
```

---

## Checklist de Validação

**Design System**
- [ ] Paleta com escala de superfícies derivada + mapeamento FlyonUI tokens (sem `VAL_*` restantes)
- [ ] Escala tipográfica 9 níveis calculados via `16 × 1.333^n`
- [ ] Avaliação da fonte Inter nos 7 critérios
- [ ] Espaçamento base-4 com 10 tokens (nenhum valor ímpar)
- [ ] Border radius com 6 tokens + pill

**Implementação**
- [ ] `tailwind.config.ts` com tema FlyonUI `demarchi` completo
- [ ] `globals.css` com `:root`, `[data-theme="demarchi"]` e `@layer base`
- [ ] 10 componentes FlyonUI documentados com cores DeMarchi
- [ ] Motion: durações, easings, keyframes + reduced-motion
- [ ] 15 guardrails NUNCA/SEMPRE adaptados à paleta

**Landing Page**
- [ ] 10 seções com copy pronto em PT-BR
- [ ] Tom consultivo, direto e empoderador em todo o copy
- [ ] Dados concretos usados: 38 anos, 1987, 3–5 dias, Caxias do Sul, 3 áreas
- [ ] Nenhuma headline começa com "Bem-vindo" ou usa superlativação
- [ ] `layout.tsx` com `data-theme="demarchi"`, metadata completo e import Inter

**Qualidade**
- [ ] Contraste WCAG AA verificado: texto branco sobre `#26CCAA` (3.0:1 — usar apenas em botão grande), texto `#1E2D52` sobre branco (13.9:1 ✓)
- [ ] Nenhum espaçamento ímpar ou arbitrário
- [ ] `prefers-reduced-motion` implementado
- [ ] Links de referência 21st.dev no formato `21st.dev/[categoria]`
- [ ] Contato real incluído: contato@demarchicontabil.com.br | 54 3222.5106

---

*Prompt Mestre DeMarchi Contabilidade v2.0 — Adaptado de prompt-mestre-generico.md*
*Cores oficiais: #26CCAA (verde-teal) · #1E2D52 (azul-marinho) · #1B8C76 (verde escuro) · #273A6A (azul médio)*
*Fundada em 1987 · Caxias do Sul, RS · demarchicontabil.com.br*
