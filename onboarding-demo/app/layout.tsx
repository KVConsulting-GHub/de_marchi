import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "DeMarchi · Onboarding [DEMO]",
  description: "Versão demo com dados fictícios — sem APIs externas.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" data-theme="demarchi">
      <body>{children}</body>
    </html>
  );
}
