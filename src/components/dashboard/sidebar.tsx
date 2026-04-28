import { useQueryClient } from "@tanstack/react-query";
import { useUserInfo } from "@/api/users";
import { useParams, useRouter } from "@tanstack/react-router";
import Cookies from "js-cookie";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../ui/sidebar";
import { Button } from "../ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import {
  ChevronRightIcon,
  LogOutIcon,
  ShieldUserIcon,
  UserKeyIcon,
} from "lucide-react";
import { Separator } from "../ui/separator";

export const DashboardSidebar = ({
  userId,
  ...props
}: { userId: string } & React.ComponentProps<typeof Sidebar>) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { pteroId } = useParams({ strict: false });

  const { data: userInfo, isLoading, isError } = useUserInfo(userId);

  if (isError) {
    throw new Error("Could not load the user! Please try again later.");
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader className="bg-secondary rounded-lg ring ring-input">
        <div className="flex justify-between items-center">
          <h1>AnkyDashboard </h1>
          <Button
            variant={"link"}
            onClick={() =>
              window.open(
                "https://github.com/Diogo-Falardo/Anky-dashboard",
                "_blank",
              )
            }
          >
            github
          </Button>
        </div>
        <Separator />
        <div className="flex justify-between items-center">
          <h1>Pteros API </h1>
          <Button
            variant={"link"}
            onClick={() =>
              window.open(
                "https://github.com/Diogo-Falardo/Pteros-Business-Management-API-Multi-Tool",
                "_blank",
              )
            }
          >
            github
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* Staff Management Group */}
        <SidebarGroup>
          <SidebarGroupLabel>Staff Management</SidebarGroupLabel>
          <SidebarMenu>
            <Collapsible className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  {/* Staff Management Functionality Panel */}
                  <SidebarMenuButton
                    onClick={() => {
                      if (pteroId) {
                        router.navigate({
                          to: "/dashboard/$pteroId/staffManagement",
                          params: { pteroId },
                        });
                      }
                    }}
                  >
                    <ShieldUserIcon />
                    <span>Staff Managent Dashboard</span>
                    <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {/* Create a new Role */}
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <div>
                          <UserKeyIcon />
                          <span className="ml-2">Create a new Role</span>
                        </div>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <p>Loading user....</p>
          </div>
        ) : (
          userInfo && (
            <div className="flex justify-between items-center">
              <p>{userInfo}</p>
              <LogOutIcon
                className="text-red-700"
                onClick={() => {
                  queryClient.invalidateQueries({
                    queryKey: ["users", userId],
                  });
                  Cookies.remove("user");
                  router.navigate({ to: "/" });
                }}
              />
            </div>
          )
        )}
      </SidebarFooter>
    </Sidebar>
  );
};
