<script lang="ts">
  import { show, close } from "@/stores/modals";
  import ConfirmModal from "./ConfirmModal.svelte";

  const modals = [
    {
      name: "confirm",
      component: ConfirmModal,
    },
  ];
</script>

{#each modals as modal}
  {#if $show?.id == modal.name}
    <svelte:component
      this={modal.component}
      payload={$show?.payload}
      open={true}
      close={() => {
        close();
      }}
    />
  {/if}
{/each}
