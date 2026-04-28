import Cookies from "js-cookie";
import { useForm } from "@tanstack/react-form";
import { Tabs, TabsContent } from "./ui/tabs";
import { Input } from "./ui/input";
import { Field, FieldError, FieldGroup } from "./ui/field";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";
import { z } from "zod";
import { useLogin, useRegister } from "@/api/authentication";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(6)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!%*?&]).{6,}$/),
});

const registerSchema = loginSchema
  .pick({
    email: true,
    password: true,
  })
  .extend({
    passwordRepeat: z.string(),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    message: "Passwords do not match",
    path: ["passwordRepeat"],
  });

export const Authenticate = () => {
  const [tab, setTab] = useState("login");
  const [checkRememberUser, setCheckRememberUser] = useState<boolean>(false);

  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const loginForm = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(`
        Email sent : ${value.email}
        Password sent: ${value.password}
        `);

      loginMutation.mutate(value, {
        onSuccess: async (userId) => {
          console.log(userId);
          if (!checkRememberUser) {
            Cookies.set("user", userId);
          } else {
            Cookies.set("user", userId, { expires: 1 });
          }

          toast.success("Welcome Back");

          const sleep = (ms: number) =>
            new Promise((resolve) => setTimeout(resolve, ms));
          await sleep(500);
          window.location.reload();
        },
        onError: (error) => {
          console.log(error);
          toast.error(error.message);
        },
      });
    },
  });

  const registerForm = useForm({
    defaultValues: {
      email: "",
      password: "",
      passwordRepeat: "",
    },
    validators: {
      onSubmit: registerSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(`
        Email sent : ${value.email}
        Password sent: ${value.password}
        `);

      registerMutation.mutate(value, {
        onSuccess: () => {
          setTab("login");
          toast.success("User created! You can now login.");
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
      <TabsContent value="login" className="flex flex-col gap-5">
        <div className="flex w-full items-center justify-center">
          <h1>Login</h1>
        </div>
        <form
          id="login-form"
          onSubmit={(e) => {
            (e.preventDefault(), loginForm.handleSubmit());
          }}
        >
          <FieldGroup>
            <loginForm.Field
              name="email"
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
                      placeholder="email"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <loginForm.Field
              name="password"
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
                      placeholder="password"
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
        <div className="w-full flex justify-between items-center ">
          <div className="flex gap-2 items-center">
            <Checkbox
              checked={checkRememberUser}
              onCheckedChange={(val) => setCheckRememberUser(val === true)}
            />
            <span>Remember me</span>
          </div>
          <Button variant={"link"} onClick={() => setTab("register")}>
            Create an account
          </Button>
        </div>
        <div className="w-full flex justify-center items-center">
          <Button type="submit" form="login-form">
            Login
          </Button>
        </div>
      </TabsContent>
      <TabsContent value="register" className="flex flex-col gap-5">
        <div className="flex w-full items-center justify-center">
          <h1>Register</h1>
        </div>
        <form
          id="register-form"
          onSubmit={(e) => {
            (e.preventDefault(), registerForm.handleSubmit());
          }}
        >
          <FieldGroup>
            <registerForm.Field
              name="email"
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
                      placeholder="email"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <registerForm.Field
              name="password"
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
                      placeholder="password"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <registerForm.Field
              name="passwordRepeat"
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
                      placeholder="reapeat password"
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
        <div className="w-full flex justify-start ">
          <Button variant={"link"} onClick={() => setTab("login")}>
            Already have an account?
          </Button>
        </div>
        <div className="w-full flex justify-center items-center">
          <Button type="submit" form="register-form">
            Register
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  );
};
