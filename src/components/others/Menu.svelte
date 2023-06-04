<script>
  import { scale } from "svelte/transition";

  import { clickOutside } from "../../directives/clickOutside";
  import { linear } from "svelte/easing";

  export let close;
  export let items;
</script>

<div
  use:clickOutside
  on:click_outside={() => {
    close();
  }}
  transition:scale={{
    duration: 100,
    delay: 0,
    opacity: 0,
    start: 0.95,
    easing: linear,
  }}
  class="absolute z-20 w-[240px] top-[52px] shadow-md rounded-[3px] p-1 right-[12px] border dark:border-slate-700 border-slate-200 dark:bg-slate-900 bg-white"
>
  <ul>
    {#each items as action}
      <li>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-missing-attribute -->
        <a
          on:click={(e) => {
            close();
            action.click();
          }}
          class="{action.variant === 'danger'
            ? 'text-red-500 dark:hover:bg-red-500 dark:hover:bg-opacity-10 hover:bg-red-100 '
            : 'text-slate-600 dark:text-slate-300 dark:hover:bg-slate-800 hover:bg-slate-100 '} flex cursor-pointer rounded-[3px] my-1 items-center gap-3 py-2 px-3"
        >
          <svelte:component this={action.icon} size={"15"} />
          <span class="text-[13px] font-medium capitalize">
            {action.title}
          </span>
        </a>
      </li>
    {/each}
  </ul>
</div>
