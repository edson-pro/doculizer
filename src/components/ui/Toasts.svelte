<script lang="ts">
  import { toasts, dismissToast } from "@/stores/toast";
  import Notification from "./Notification.svelte";
  import { fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";
</script>

{#if $toasts}
  <section
    class="bottom-0 w-fit ml-auto fixed p-1 left-0 right-0 items-end w-full- flex justify-center flex-col z-[1000]"
  >
    {#each $toasts as toast (toast.id)}
      <div
        transition:fly={{
          delay: 250,
          duration: 300,
          x: 500,
          y: 0,
          opacity: 0.5,
          easing: quintOut,
        }}
      >
        <Notification
          variant={toast.type}
          dismissible={true}
          on:close={() => dismissToast(toast.id)}
          title={toast.title}
          message={toast.message}
        />
      </div>
    {/each}
  </section>
{/if}
