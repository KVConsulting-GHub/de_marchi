export function DemoBanner() {
  return (
    <div
      className="flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold"
      style={{
        backgroundColor: "#F59E0B",
        color: "#1A1A2E",
      }}
    >
      <span>⚡</span>
      <span>MODO DEMO — dados fictícios, sem conexão com APIs. Todas as ações funcionam em memória.</span>
    </div>
  );
}
