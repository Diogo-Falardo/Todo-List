import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

const page = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <Tabs defaultValue="signin" className="w-full max-w-sm">
        <TabsList className="w-full grid grid-cols-2 mb-4">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>

        <TabsContent value="signin">
          {/* login */}
          <Card className="flex flex-col gap-3 p-6 bg-neutral-900 border-neutral-800 text-neutral-50">
            <div>
              <h3 className="mb-1 text-sm font-medium">Email</h3>
              <Input placeholder="email@example.com" type="email" />
            </div>

            <div>
              <h3 className="mb-1 text-sm font-medium">Password</h3>
              <Input placeholder="********" type="password" />
            </div>

            <a className="text-right text-xs text-neutral-400 hover:text-neutral-200 cursor-pointer">
              Forgot your password?
            </a>

            <Button variant="special" className="mt-2">
              Login
            </Button>

            <a className="mt-2.5 text-sm text-center text-neutral-400">
              Don't have an account?{" "}
              <span className="text-neutral-100 underline-offset-4 hover:underline cursor-pointer">
                Sign Up
              </span>
            </a>
          </Card>
        </TabsContent>

        <TabsContent value="signup">
          <Card className="flex flex-col gap-3 p-6 bg-neutral-900 border-neutral-800 text-neutral-50">
            <div>
              <h3 className="mb-1 text-sm font-medium">Email</h3>
              <Input placeholder="email@example.com" type="email" />
            </div>

            <div>
              <h3 className="mb-1 text-sm font-medium">Password</h3>
              <Input placeholder="********" type="password" />
            </div>

            <div>
              <h3 className="mb-1 text-sm font-medium">Repeat password</h3>
              <Input placeholder="********" type="password" />
            </div>

            <Button variant="special" className="mt-2">
              Register
            </Button>

            <a className="mt-2.5 text-sm text-center text-neutral-400">
              Already have an account?{" "}
              <span className="text-neutral-100 underline-offset-4 hover:underline cursor-pointer">
                Sign In
              </span>
            </a>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
