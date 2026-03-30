import { Sidebar } from "@/components/ui/Sidebar";
import { DemoBanner } from "@/components/ui/DemoBanner";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#F4F6F9" }}>
      <Sidebar />
      <div className="flex-1 flex flex-col ml-60 min-w-0">
        <DemoBanner />
        {children}
      </div>
    </div>
  );
}
