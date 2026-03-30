"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClipboardList, Users, BarChart2, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/onboarding", label: "Onboarding",   icon: ClipboardList },
  { href: "/clientes",   label: "Clientes",     icon: Users },
  { href: "/relatorios", label: "Relatórios",   icon: BarChart2 },
  { href: "/config",     label: "Configurações",icon: Settings },
];

interface SidebarProps {
  userName?: string;
  userEmail?: string;
}

export function Sidebar({ userName = "Felipe De Marchi", userEmail = "felipe@demarchi.com.br" }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 flex flex-col z-40"
      style={{ backgroundColor: "#1E2D52" }}>

      {/* Logo */}
      <div className="px-6 py-6 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: "#26CCAA" }}>
            <span className="text-white font-black text-sm">DM</span>
          </div>
          <div>
            <p className="text-white font-semibold text-sm leading-tight">DeMarchi</p>
            <p className="text-xs leading-tight" style={{ color: "#26CCAA" }}>Contabilidade</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-widest"
          style={{ color: "rgba(255,255,255,0.35)" }}>
          Menu
        </p>
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link key={href} href={href}
              className={cn("sidebar-nav-item animate-slide-in", active && "active")}>
              <Icon size={18} strokeWidth={1.75} />
              <span>{label}</span>
              {href === "/onboarding" && (
                <span className="ml-auto text-xs rounded-full px-2 py-0.5 font-semibold"
                  style={{ backgroundColor: active ? "rgba(255,255,255,0.2)" : "#26CCAA", color: "#fff" }}>
                  3
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="px-3 py-4 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="flex items-center gap-3 px-3 py-2 mb-1">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
            style={{ backgroundColor: "#273A6A" }}>
            {userName[0]?.toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">{userName}</p>
            <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.45)" }}>{userEmail}</p>
          </div>
        </div>
        <div className="sidebar-nav-item opacity-40 cursor-not-allowed select-none">
          <LogOut size={16} strokeWidth={1.75} />
          <span>Sair</span>
          <span className="ml-auto text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>demo</span>
        </div>
      </div>
    </aside>
  );
}
