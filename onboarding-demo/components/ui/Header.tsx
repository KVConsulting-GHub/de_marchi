"use client";

import { Search, Bell } from "lucide-react";

interface HeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function Header({ title, subtitle, actions }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-base-300 px-8 py-4 flex items-center gap-4">
      {/* Título */}
      <div className="flex-1 min-w-0">
        <h1 className="text-xl font-semibold truncate" style={{ color: "#1E2D52" }}>
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm mt-0.5" style={{ color: "rgba(26,26,46,0.55)" }}>
            {subtitle}
          </p>
        )}
      </div>

      {/* Busca */}
      <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg border border-base-300 bg-base-100 w-56">
        <Search size={15} style={{ color: "rgba(26,26,46,0.4)" }} />
        <input
          type="text"
          placeholder="Buscar cliente..."
          className="flex-1 bg-transparent outline-none text-sm"
          style={{ color: "#1A1A2E" }}
        />
      </div>

      {/* Notificações */}
      <button className="relative w-9 h-9 flex items-center justify-center rounded-lg border border-base-300 hover:bg-base-200 transition-colors">
        <Bell size={17} style={{ color: "#1E2D52" }} />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
          style={{ backgroundColor: "#26CCAA" }} />
      </button>

      {/* Ações customizadas */}
      {actions}
    </header>
  );
}
