import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "DeMarchi · Onboarding de Clientes",
  description: "Dashboard interno para acompanhamento do onboarding de novos clientes.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='6' fill='%2326CCAA'/><text x='50%' y='54%' dominant-baseline='middle' text-anchor='middle' font-family='Inter' font-weight='900' font-size='14' fill='white'>DM</text></svg>",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" data-theme="demarchi">
      <body>{children}</body>
    </html>
  );
}
