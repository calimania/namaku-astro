import { RouterProvider, createRouter } from "@tanstack/react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen";
import type { Store } from "../markket";

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  context: {
    queryClient,
    store: {} as Store,
  }
} as any);

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

export function Dashboard() {
  return (
    <div className="">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </div>
  );
}
