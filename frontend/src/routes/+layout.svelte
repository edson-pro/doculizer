<script>
  import ModalManager from "@/components/modals/ModalManager.svelte";
  import { setCurrentUser } from "@/stores/auth";
  import { auth as authStore } from "@/stores/auth";
  import { setContext } from "svelte";
  import { browser } from "$app/environment";
  import "./styles.css";
  import client from "@/lib/client";
  import { onMount } from "svelte";
  import { QueryClient, QueryClientProvider } from "@sveltestack/svelte-query";
  import Toasts from "@/components/ui/Toasts.svelte";

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        enabled: browser,
      },
    },
  });
  onMount(() => {
    if (browser) {
      const subscription = client
        .auth()
        .onAuthChange((user) => setCurrentUser(user));
      return () => subscription.unsubscribe();
    }
  });

  setContext("auth", authStore);
</script>

<Toasts />

<QueryClientProvider client={queryClient}>
  <ModalManager />
  <div class="app">
    <main>
      <slot />
    </main>
  </div>
</QueryClientProvider>
