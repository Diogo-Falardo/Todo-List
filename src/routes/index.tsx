import { createFileRoute } from "@tanstack/react-router";
import { Authenticate } from "../components/authenticate";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <h1 className="text-primary text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black">
            Welcome to anky dashboard (builted on top of ptero API)
          </h1>
          <Button
            className="text-secondary"
            variant={"link"}
            onClick={() => {
              window.open(
                "https://github.com/Diogo-Falardo/Anky-dashboard",
                "_blank",
              );
            }}
          >
            github
          </Button>
        </div>
        <div className="flex justify-center items-center w-full">
          <Card className="max-w-sm md:max-w-md w-full border border-primary p-5">
            <Authenticate />
          </Card>
        </div>
      </div>
    </div>
  );
}
