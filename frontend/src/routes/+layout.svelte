<script>
  import ModalManager from "@/components/modals/ModalManager.svelte";
  import "./styles.css";
</script>

<ModalManager />
<div class="app">
  <main>
    <slot />
  </main>
</div>
