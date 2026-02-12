# Todo List app

### **_Full Stack experimental project_**

## Stack

        Tanstack
        Drizzle with MySql
        Shadcn

## Route - index.tsx

### loader + createServerFn

        export const Route = createFileRoute('/')({
                component: App,
                loader: () => {
                return loader()
                },
        })

#### Loader grabs info before the page load in this case it was used a function:

        const loader = createServerFn({
                method: 'GET',
                }).handler(() => {
                return db.query.todos.findMany()
        })

### **createServerFn - The Client-Server Bridge**

#### **Info:**

Its the primary mechanism in Tanstack Start for creating a secure and type-safe bridge between your client-side code and your server side it allows you to call a server function from your client as if it were a local function, while TanStack handles the underlying API requests, serialization and security

#### When you define a createServerFn, you are actually creating two things:

- A Client-Side Function: This is what createServerFn returns. It's a lightweight, client-safe function that you can import and call from your components or hooks. When called, it triggers a network request to your server.
- A Server-Side Endpoint: TanStack automatically creates an API endpoint on your server that corresponds to this function. The logic you define inside the .handler() will execute exclusively on this server endpoint.

### **method:**

        - GET : only get info
        - POST: mutations or actions

### **inputValidator**

#### **Info:**

When building a bridge between the client and the server as createServerFn does, you must assume that the data comming from the client is untrustworthy. A malicious user could try to send malformed data to crash your server or exploit a vulnerability. This is the security guard!

The inputValidator is a method you chain onto createServerFn to define the exact shape and type of data you expect to receive from the client. It acts as a gatekeeper.

Modes of Validating the data (best way i would say):  
Schema Definition: Providing a schema. The schema is a formal definition of the expected data.

### **handler**

        - Method where you define the actual server-side logic.
        - The code inside this function will never be sent to the user´s browser
        - ONLY ON THE SERVER so:
        - its safe to put sensitive code here (querys,api keys)

#### **More :**

1. **_Security:_** it prevents you from exposing sensitive logir or credentials to the client
2. **_Simplicity:_** it allows you to write code that feels like its running in one palce, even thought it spans the client and server. Tanstack handles all the complex stuff.
3. **_Direct Data Access:_** it eliminates the need to manualy create a separated API endpoint.

### **useLoaderData**

        Hook, delivers the data from the loader into the component
        Route.useLoaderData()

#### **READ ERROR FIRST**

### **useServerFn**

        Mutation Shorcut

While you can (and often should) create custom hooks for your mutations using useMutation for maximum control, Tanstack start offers a convenient hook called useServerFn for quickly wiring up server actions in your components

Its basicly a pre-packed useMutation

# ERRORS FACED

## TRYING TO RENDER A SERVER SIDE FUNCTION IN THE CLIENT

**CORE PROBLEM:** The client-server boundary

**_The Server Bundle_**: this is the code that runs on your server (eg: a Node.js enviroment). It has access to the database, the file system, and secret env variables

**_The Client Bundle_**: this is the javascript that gets sent to and runs in the users web browser. It has access to browser APIs like window and document, but it has no access to your server´s database or secrets

The error actualy occurs when we try to import something: FILE containing server-only code (like a query) into a component that is part of the client bundle. the build tool sees this and stops you, BECAUSE: its a massive security risk and would couse the browser to crash.

createServerFn is the bridge, but it doesnt erase the boundary. The .handler() part of createServerFn stays on the server, but the function itself that createServerFn returns is designed to be called from the client.

**_BEST PRACTICE:_** **File Separation Pattern**

To effectively manage the client-server boundary and prevent bundling server-only code on the client, adopt a structured file organization. A common and robust pattern involves separating your logic into three distinct types of files for each feature or data domain (e.g., `todos`).

1.  **`todos.server.ts` - The Server Fortress**

    This file is exclusively for code that must only run on the server. The build tool is specifically configured to prevent any code from `*.server.ts` files from ever ending up in the client bundle.
    - **What goes here:**
      - Direct database access and queries (e.g., using Drizzle ORM).
      - Functions that contain sensitive logic or access environment variables and secrets.
      - Any Node.js-specific APIs or libraries.

2.  **`todos.functions.ts` - The Bridge**

    This file acts as the secure bridge between your client and server. It imports functions from your `.server.ts` file and wraps them in `createServerFn`. This is the only place where your server-only code is referenced for client-side interaction.
    - **What goes here:**
      - All your `createServerFn` definitions.
      - Input validation schemas (e.g., using Zod) for the data sent from the client.
      - The `.handler()` for each server function, which calls the actual database logic from `todos.server.ts`.

3.  **`todos.hooks.ts` - The Client-Side Consumer**

    This file contains the client-side code that consumes the server functions. It provides custom React hooks that make it easy to call your server logic from your components, manage state, and handle data fetching, caching, and mutations.
    - **What goes here:**
      - Custom hooks (e.g., `useGetTodos`, `useAddTodo`) that use hooks like `useQuery` or `useMutation` from TanStack Query.
      - The `queryFn` or `mutationFn` within these hooks will call the server functions defined in `todos.functions.ts`.
      - This abstracts the data-fetching logic away from your UI components, keeping them clean and focused on presentation.

By following this pattern, you create a clear and secure architecture. Your components call a simple hook, the hook calls a `createServerFn` bridge function, and that bridge securely executes the required logic on the server without ever exposing it to the client.
