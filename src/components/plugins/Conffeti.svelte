<script>
  import { confetti } from "@neoconfetti/svelte";
  import { tick } from "svelte";

  let isVisible = false;
</script>

<button
  on:click={async () => {
    isVisible = false;
    await tick();
    isVisible = true;
  }}
>
  Show confetti
</button>
{#if isVisible}
  <div>
    <div use:confetti />
  </div>
{/if}

<style>
  :global(body) {
    overflow: hidden;
  }

  div {
    display: flex;
    justify-content: center;
  }
</style>
