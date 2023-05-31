<script>
  import { goto } from "$app/navigation";
  import Sidebar from "@/components/others/Sidebar.svelte";
  import { auth } from "@/stores/auth";
  import { afterUpdate } from "svelte";

  $: user = $auth.user;
  $: loading = $auth.loading;

  afterUpdate(() => {
    if (!user && !loading) {
      goto("/");
    }
  });
</script>

<section class="flex w-full">
  <Sidebar />
  <slot />
</section>
