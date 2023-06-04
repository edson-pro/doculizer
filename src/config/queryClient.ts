import { browser } from "$app/environment";
import { QueryClient } from "@sveltestack/svelte-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      enabled: browser,
    },
  },
});

export default queryClient;
