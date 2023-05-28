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
  class="absolute z-20 w-[240px] top-[52px] shadow-md rounded-[3px] p-1 right-[12px] border border-slate-200 bg-white"
>
  <ul>
    {#each items as action}
      <li>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-missing-attribute -->
        <a
          on:click={(e) => {
            close();
          }}
          class="flex cursor-pointer hover:bg-slate-100 rounded-[3px] my-1 items-center gap-2 py-2 px-2"
        >
          <svelte:component
            this={action.icon}
            class="text-slate-600"
            size={"16"}
          />
          <span class="text-[13px] text-slate-600 font-medium capitalize">
            {action.title}
          </span>
        </a>
      </li>
    {/each}
  </ul>
</div>
