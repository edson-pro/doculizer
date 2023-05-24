<script lang="ts">
  export let label: string = "";
  export let title: string = "";
  export let subTitle: string = "";
  export let checked: boolean = false;
</script>

<label
  for={label || title}
  class="flex cursor-pointer justify-between w-full my-0 select-none items-start"
>
  {#if (title || subTitle) && !label}
    <div class="flex flex-col mr-10">
      {#if title}
        <span
          class="text-[13px] capitalize mb-2 text-slate-700 dark:text-slate-200 font-medium"
        >
          {title}
        </span>
      {/if}

      {#if subTitle}
        <span class="text-[13px] text-slate-500 font-medium dark:text-slate-500"
          >{subTitle}</span
        >
      {/if}
    </div>
  {/if}

  <div class="relative">
    <input
      {...$$props}
      bind:checked
      type="checkbox"
      id={label || title}
      class="sr-only peer"
    />
    <div
      class="box peer-checked:bg-primary bg-slate-300 dark:bg-slate-700 block h-5 w-9 rounded-full"
    />
    <div
      class="dot peer-checked:translate-x-4 absolute left-1 top-1 flex h-3 w-3 items-center justify-center rounded-full bg-white transition"
    />
  </div>

  {#if label}
    <label
      for={"label || title"}
      class="text-sm cursor-pointer text-slate-700 dark:text-slate-300 flex ml-3"
    >
      {label}
    </label>
  {/if}
</label>
