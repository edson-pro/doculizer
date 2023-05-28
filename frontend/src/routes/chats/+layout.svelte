<script>
  import Sidebar from "@/components/others/Sidebar.svelte";
  import { hideSidebar, setHideSidebar } from "@/stores/layout";

  const handleCallapse = () => {
    setHideSidebar($hideSidebar.hideSidebar);
  };
</script>

<section class="flex w-full">
  <Sidebar {handleCallapse} hideSidebar={$hideSidebar.hideSidebar} />
  <slot />
</section>
