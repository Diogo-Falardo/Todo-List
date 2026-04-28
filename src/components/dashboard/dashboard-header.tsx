import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { PterosMembers } from "./pteros-members";

export function DashboardHeader({ pteroId }: { pteroId: string }) {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-8"
        />
        <div className="ml-auto flex items-center gap-2">
          {/* staff members */}
          <PterosMembers pteroId={pteroId} />
        </div>
      </div>
    </header>
  );
}
