import { useForm } from "@tanstack/react-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

export const Authenticate = () => {
  const loginForm = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerForm = useForm({
    defaultValues: {
      email: "",
      password: "",
      passwordRepeat: "",
    },
  });

  return (
    <Tabs defaultValue="login">
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
          <Checkbox /> <span className="ml-2">Remember me</span>
          <TabsTrigger value="register">Create an account</TabsTrigger>
        </div>
        <div className="w-full flex justify-center items-center">
          <Button>Login</Button>
        </div>
      </TabsContent>
      <TabsContent value="register">
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
          </FieldGroup>
        </form>
        <div className="w-full flex justify-start ">
          <TabsTrigger value="login">already have an account?</TabsTrigger>
        </div>
        <div className="w-full flex justify-center items-center">
          <Button>Register</Button>
        </div>
      </TabsContent>
    </Tabs>
  );
};
