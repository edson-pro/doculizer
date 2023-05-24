<script lang="ts">
  import { ChevronRightIcon } from "svelte-feather-icons";

  export let items: any = [];
</script>

<div class="flex gap-[6px]">
  {#each items as item, i}
    <div class=" gap-1 flex items-center">
      <a
        class={`text-[13px] truncate active:scale-95 transition-all cursor-pointer rounded-[2px] font-medium ${
          i === 0 ? "pl-0" : ""
        } px-2 py-[5px] ${
          i === items.length - 1
            ? "text-slate-500 dark:text-slate-400 pointer-events-none"
            : "hover:bg-slate-200- capitalize dark:hover:bg-slate-800 hover:text-slate-800 text-slate-700 dark:text-slate-300"
        } `}
        href={item.href}
      >
        <span>{item.title}</span>
      </a>
      {#if i !== items.length - 1}
        <ChevronRightIcon
          class="text-slate-600 dark:text-slate-200"
          size="14"
        />
      {/if}
    </div>
  {/each}
</div>
