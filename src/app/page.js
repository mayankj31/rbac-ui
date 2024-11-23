// src/app/page.js
import RBACDashboard from "@/components/ui/dashboard/rbac-dashboard";

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8">
      <RBACDashboard />
    </main>
  );
}