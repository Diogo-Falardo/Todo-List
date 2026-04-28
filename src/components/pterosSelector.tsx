import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Tabs, TabsContent } from "./ui/tabs";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import {
  useJoinPtero,
  usePteroCreate,
  usePterosList,
} from "@/api/pteros/pteros";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { Field, FieldError, FieldGroup } from "./ui/field";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { useRouter } from "@tanstack/react-router";

const createPteroSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Ptero name is required" })
    .max(255, { message: "Ptero name has a max of 255 characters" }),
});

const inviteLinkSchema = z.object({
  inviteLink: z.uuid(),
});

export const PterosSelector = ({ userId }: { userId: string }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [tab, setTab] = useState("pteros");

  const { data: pteros, isLoading, isError } = usePterosList(userId);
  const createPteroMutation = usePteroCreate(userId);
  const joinPteroMutation = useJoinPtero(userId);

  const createPteroForm = useForm({
    defaultValues: {
      name: "",
    },
    validators: {
      onSubmit: createPteroSchema,
    },
    onSubmit: async ({ value }) => {
      createPteroMutation.mutate(value, {
        onSuccess: (pteroId) => {
          queryClient.invalidateQueries({ queryKey: ["pteros"] });
          console.log("pteroId: " + pteroId);
          toast.success("New ptero was created: " + value.name);
          setTab("pteros");
        },
        onError: (error) => {
          console.log(error);
          toast.error(error.message);
        },
      });
    },
  });

  const joinPteroForm = useForm({
    defaultValues: {
      inviteLink: "",
    },
    validators: {
      onSubmit: inviteLinkSchema,
    },
    onSubmit: async ({ value }) => {
      joinPteroMutation.mutate(value, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["pteros"] });
          toast.success("New ptero was added to the list!");
          setTab("pteros");
        },
        onError: (error) => {
          console.log(error);
          toast.error(error.message);
        },
      });
    },
  });

  return (
    <Tabs value={tab} onValueChange={setTab}>
      <TabsContent value="pteros" className="flex flex-col gap-5">
        <div className="flex flex-col w-full items-center justify-center">
          <h1>Pteros</h1>
          <div className="flex w-full justify-between items-center gap-2">
            <p>your pteros list</p>
            {pteros && (
              <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-semibold bg-secondary ring-primary ring text-secondary-foreground">
                {pteros.length}
              </span>
            )}
          </div>
        </div>
        {isError ? (
          <Card className="h-48">
            <div className="flex h-full w-full items-center justify-center">
              <p>Error loading your pteros! Please try again later.</p>
            </div>
          </Card>
        ) : isLoading ? (
          <Card className="h-48">
            <div className="flex h-full w-full items-center justify-center">
              <p>Loading your pteros! Wait a momment.</p>
            </div>
          </Card>
        ) : pteros && pteros.length === 0 ? (
          <Card className="h-48">
            <div className="flex h-full w-full items-center justify-center">
              <p>You dont have any pteros yet! Join One or Create one.</p>
            </div>
          </Card>
        ) : (
          <Card className="h-44 py-1">
            <ScrollArea className="flex w-full h-full">
              <div className="flex flex-col gap-2.5 py-px px-1">
                {pteros &&
                  pteros.length > 0 &&
                  pteros.map((p) => (
                    <Card
                      onClick={() =>
                        router.navigate({
                          to: "/dashboard/$pteroId",
                          params: { pteroId: p.id },
                        })
                      }
                      key={p.id}
                      className="flex items-center justify-center bg-secondary ring-primary"
                    >
                      <h1>{p.name}</h1>
                    </Card>
                  ))}
                <ScrollBar />
              </div>
            </ScrollArea>
          </Card>
        )}

        <div className="flex items-center justify-between w-full">
          <Button onClick={() => setTab("create")} variant={"ghost"}>
            Create a ptero
          </Button>
          <Button onClick={() => setTab("join")} variant={"ghost"}>
            Join a ptero
          </Button>
        </div>
      </TabsContent>
      <TabsContent value="create" className="flex flex-col gap-5">
        <div className="flex flex-col w-full items-center justify-center">
          <h1>Ptero Creator</h1>
        </div>
        <form
          id="create-ptero-form"
          onSubmit={(e) => {
            (e.preventDefault(), createPteroForm.handleSubmit());
          }}
        >
          <FieldGroup>
            <createPteroForm.Field
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="ex.: Pterodactylus"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>

        <div className="flex items-center justify-between w-full">
          <Button onClick={() => setTab("pteros")} variant={"ghost"}>
            Ptero list
          </Button>
          <Button onClick={() => setTab("join")} variant={"ghost"}>
            Join a ptero
          </Button>
        </div>

        <div className="w-full flex justify-center items-center">
          <Button type="submit" form="create-ptero-form">
            Create new ptero
          </Button>
        </div>
      </TabsContent>
      <TabsContent value="join" className="flex flex-col gap-5">
        <div className="flex flex-col w-full items-center justify-center">
          <h1>Join Ptero</h1>
        </div>
        <form
          id="join-ptero-form"
          onSubmit={(e) => {
            (e.preventDefault(), joinPteroForm.handleSubmit());
          }}
        >
          <FieldGroup>
            <joinPteroForm.Field
              name="inviteLink"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="ex.: 64c1d9a6-ae60-4614-8985-325ea3ad07f3"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>

        <div className="flex items-center justify-between w-full">
          <Button onClick={() => setTab("pteros")} variant={"ghost"}>
            Ptero list
          </Button>
          <Button onClick={() => setTab("create")} variant={"ghost"}>
            Crete a ptero
          </Button>
        </div>

        <div className="w-full flex justify-center items-center">
          <Button type="submit" form="join-ptero-form">
            Join ptero
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  );
};
