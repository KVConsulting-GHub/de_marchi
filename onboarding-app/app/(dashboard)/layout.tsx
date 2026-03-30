"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { Sidebar } from "@/components/ui/Sidebar";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser]       = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) {
        router.replace("/login");
      } else {
        setUser(u);
      }
      setLoading(false);
    });
    return unsub;
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F4F6F9" }}>
        <Loader2 size={28} className="animate-spin" style={{ color: "#26CCAA" }} />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#F4F6F9" }}>
      <Sidebar
        userName={user.displayName ?? undefined}
        userEmail={user.email ?? undefined}
        userPhoto={user.photoURL ?? undefined}
      />
      <div className="flex-1 flex flex-col ml-60 min-w-0">
        {children}
      </div>
    </div>
  );
}
