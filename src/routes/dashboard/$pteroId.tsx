import Cookies from "js-cookie";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";

export const Route = createFileRoute("/dashboard/$pteroId")({
  component: RouteComponent,
});
function RouteComponent() {
  const { pteroId } = Route.useParams();
  const userId = Cookies.get("user");
  if (!userId) throw new Error("You need to login first!");

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <DashboardSidebar userId={userId} variant="inset" />
      <SidebarInset>
        <DashboardHeader pteroId={pteroId} />
        <main className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex w-full justify-between">
              <Outlet />
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
