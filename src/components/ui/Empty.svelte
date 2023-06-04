<script lang="ts">
  import Button from "./Button.svelte";

  export let title: string = "";
  export let desc: string = "";
  export let action: any = null;
  export let image: string = "";
  export let icon: any = null;
  export let click = null;
</script>

<div class="min-h-full max-w-sm mx-auto px-2 pt-5 pb-2 flex flex-col">
  <main
    class="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-2 sm:px-6 lg:px-8"
  >
    {#if image || icon}
      <div class="flex-shrink-0 flex justify-center">
        {#if image}
          <img class="h-20 w-auto" src={image} alt="" />
        {:else if icon}
          <svelte:component
            this={icon}
            class="dark:text-slate-200 text-slate-700"
            size="30"
          />
        {/if}
      </div>
    {/if}
    <div class="py-4">
      <div
        class="text-center max-w-md mx-auto flex flex-col items-center justify-center"
      >
        <h1
          class="my-3 font-semibold text-slate-700 dark:text-slate-200 tracking-tight text-[14.5]"
        >
          {title}
        </h1>
        <p
          class="mt-0 text-[14px] leading-7 font-medium text-slate-500 dark:text-slate-400"
        >
          {desc}
        </p>
        {#if action}
          <div class="mt-3">
            <Button click={() => action.click()}>{action.title}</Button>
          </div>
        {/if}
      </div>
    </div>
  </main>
</div>
