<script lang="ts">
  import { ChevronDownIcon, GlobeIcon, XIcon } from "svelte-feather-icons";
  import Select from "svelte-select";
  import Loader from "./Loader.svelte";
  export let label;
  export let disabled = false;
  export let placeholder = "";
  export let value = null;
  export let options: any[] = [];
  export let icon: any;

  $: globalLabelClass =
    "block mb-2  dark:text-slate-200 text-[14px] font-medium dark:text-slate-300 text-slate-700" +
    ` ${disabled ? "pointer-events-none opacity-70" : ""}`;
</script>

<div class="flex items-start w-full flex-col">
  {#if label}
    <label for="input" class={globalLabelClass}>{label}</label>
  {/if}
  <Select
    closeListOnChange={false}
    {value}
    on:change={(e) => {
      value = e.detail;
    }}
    {placeholder}
    inputStyles="cursor:pointer;font-size:14px;font-weight:500"
    items={options}
    class=" !bg-slate-100 dark:!bg-slate-900 !border !border-slate-300 dark:!border-slate-800 !border-opacity-75 !rounded-[4px] !text-[14.5px] !cursor-pointer"
  >
    <div slot="prepend" class="">
      {#if icon}
        <svelte:component
          this={icon}
          class="mr-3 text-slate-500 dark:text-slate-400 h-4 w-4"
        />
      {/if}
    </div>
    <div slot="selection" let:selection>
      {selection}
    </div>
    <!-- index only available when multiple -->
    <div slot="clear-icon">
      <XIcon />
    </div>
    <div slot="multi-clear-icon">
      <XIcon />
    </div>
    <div slot="loading-icon">
      <Loader />
    </div>
    <div slot="chevron-icon">
      <ChevronDownIcon />
    </div>
    <div slot="list-prepend">
      <div class="bg-red-500 flex flex-col">
        <slot />
      </div>
    </div>
    <div
      class="bg-slate-100 bg-opacity-80 dark:bg-slate-900 dark:bg-opacity-90 backdrop-blur-sm p-[5px] border-slate-300 dark:border-slate-800 border gap-2 flex flex-col"
      slot="list"
      let:filteredItems
    >
      {#each filteredItems as item}
        <a
          href="#"
          class="px-3 flex items-center gap-1 cursor-pointer py-[10px] text-sm hover:bg-slate-300 dark:hover:bg-slate-800 dark:hover:bg-opacity-50 rounded-[3px] "
        >
          {#if item.icon}
            <svelte:component
              this={icon}
              class="mr-3 text-slate-500 dark:text-slate-400 h-4 w-4"
            />
          {/if}
          <span class="text-slate-500 dark:text-slate-400">{item.label}</span>
        </a>
      {/each}
    </div>
    <div slot="list-append" />
    <div slot="item" let:item let:index />
    <div slot="required" let:value />
    <!-- Remember you can also use `svelte:fragment` to avoid a container DOM element. -->
    <div slot="empty">
      <span>empty</span>
    </div>
  </Select>
</div>
