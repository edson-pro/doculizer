<script lang="ts">
  import { show, close } from '@/stores/modals';
  import SearchModal from './SearchModal.svelte';

  const modals = [
    {
      name: 'search',
      component: SearchModal
    }
  ];
</script>

{#each modals as modal}
  {#if $show == modal.name}
    <svelte:component
      this={modal.component}
      close={() => {
        close();
      }}
    />
  {/if}
{/each}
