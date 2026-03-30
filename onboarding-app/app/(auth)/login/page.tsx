"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase/client";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/onboarding");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro ao autenticar";
      setError(msg.includes("popup") ? "Popup bloqueado. Tente novamente." : "Acesso restrito a contas DeMarchi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "#F4F6F9" }}
    >
      <div className="w-full max-w-sm">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-base-300 overflow-hidden">
          {/* Header */}
          <div className="px-8 py-8 text-center" style={{ backgroundColor: "#1E2D52" }}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: "#26CCAA" }}>
              <span className="text-white font-black text-xl">DM</span>
            </div>
            <h1 className="text-white font-bold text-xl">DeMarchi</h1>
            <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.6)" }}>
              Contabilidade Consultiva
            </p>
          </div>

          {/* Formulário */}
          <div className="px-8 py-8">
            <p className="text-sm text-center mb-6" style={{ color: "rgba(26,26,46,0.65)" }}>
              Acesse com sua conta corporativa Google
              <br />
              <span className="font-medium" style={{ color: "#1E2D52" }}>
                @demarchi.com.br
              </span>
            </p>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg border-2 font-semibold text-sm transition-all duration-150 hover:bg-base-100"
              style={{ borderColor: "#E8ECF2", color: "#1E2D52" }}
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" style={{ color: "#26CCAA" }} />
              ) : (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                  <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/>
                  <path d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                  <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
                </svg>
              )}
              {loading ? "Autenticando..." : "Entrar com Google"}
            </button>

            {error && (
              <p className="mt-4 text-xs text-center" style={{ color: "#EF4444" }}>
                {error}
              </p>
            )}
          </div>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: "rgba(26,26,46,0.4)" }}>
          DeMarchi Contabilidade · 38 anos de história · Caxias do Sul
        </p>
      </div>
    </main>
  );
}
