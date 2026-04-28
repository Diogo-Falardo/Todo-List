import {
  useGetPteroStaffList,
  type staffMemberListInfo,
} from "@/api/pteros/pteros";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { UsersIcon } from "lucide-react";
import { Card } from "../ui/card";
import { Fragment } from "react/jsx-runtime";

export const PterosMembers = ({ pteroId }: { pteroId: string }) => {
  const {
    data: pteroStaffMembers,
    isLoading: pteroStaffMemberIsLoading,
    isError: pteroStaffMemberIsError,
  } = useGetPteroStaffList(pteroId);

  if (pteroStaffMemberIsLoading) {
    return (
      <div className="flex justify-center items-center">
        Loading staff Members
      </div>
    );
  }

  if (pteroStaffMemberIsError) {
    return (
      <div className="flex justify-center items-center">
        Error loading staff Members
      </div>
    );
  }

  // we want to organize member by
  // roles and by role hierarchy
  let organizedStaffMembers: Array<staffMemberListInfo> = [];

  if (pteroStaffMembers) {
    organizedStaffMembers = [...pteroStaffMembers]
      .filter((staff) => staff.hierarchy >= 2)
      .sort((r1, r2) => r2.hierarchy - r1.hierarchy);
  }

  console.log(organizedStaffMembers);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={"icon"} variant={"ghost"}>
          <UsersIcon />
        </Button>
      </SheetTrigger>
      <SheetContent showCloseButton={false} className="">
        <SheetHeader className="py-2 px-6">
          <SheetTitle>Staff Members List</SheetTitle>
          <SheetDescription>The list of staff members</SheetDescription>
        </SheetHeader>

        {pteroStaffMembers && (
          <div className="py-2 px-6 flex flex-col gap-5">
            {/* this should be render by hierarchy */}
            <div className="flex justify-end">
              <h1 className="uppercase text-base font-bold tracking-normal text-neutral-950 ">
                Owners
              </h1>
            </div>
            <div className="flex flex-col gap-2">
              {pteroStaffMembers.length > 0 &&
                pteroStaffMembers
                  .filter((s) => s.role === "Owner")
                  .map((m) => (
                    <p key={m.userId} className="text-end text-sm">
                      {m.email}
                    </p>
                  ))}
            </div>

            {[...new Set(organizedStaffMembers.map((s) => s.role))].map(
              (role) => (
                <Fragment key={role}>
                  <div className="flex justify-end">
                    <h1 className="uppercase text-base font-bold tracking-normal text-neutral-800">
                      {role}
                    </h1>
                  </div>
                  <div className="flex flex-col gap-2">
                    {organizedStaffMembers
                      .filter((s) => s.role === role)
                      .map((m) => (
                        <p key={m.userId} className="text-end text-sm">
                          {m.email}
                        </p>
                      ))}
                  </div>
                </Fragment>
              ),
            )}

            <div className="flex justify-end">
              <h1 className="uppercase text-base font-bold tracking-normal text-neutral-400">
                Viewers
              </h1>
            </div>
            <div className="flex flex-col gap-2">
              {pteroStaffMembers.length > 0 &&
                pteroStaffMembers
                  .filter((s) => s.role === "Viewer")
                  .map((m) => (
                    <p key={m.userId} className="text-end text-sm">
                      {m.email}
                    </p>
                  ))}
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
