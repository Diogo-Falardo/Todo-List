import { NewRoleComponent } from "@/components/dashboard/staff_management/components/newRole-component";
import { PermissionsToRoleComponent } from "@/components/dashboard/staff_management/components/permissionsToRole-component";
import { createFileRoute } from "@tanstack/react-router";
import Cookies from "js-cookie";

export const Route = createFileRoute("/dashboard/$pteroId/staffManagement")({
  component: RouteComponent,
});

function RouteComponent() {
  const { pteroId } = Route.useParams();
  const userId = Cookies.get("user");
  if (!userId) {
    throw new Error("loggin first!");
  }
  return (
    <div className="flex flex-col w-full">
      <div className="grid grid-cols-1 sm:grid-cols-3 px-5 gap-2 p-2 w-full">
        <NewRoleComponent userId={userId} pteroId={pteroId} />
        <PermissionsToRoleComponent userId={userId} pteroId={pteroId} />
      </div>
    </div>
  );
}
