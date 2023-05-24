<script lang="ts">
  // @ts-nocheck
  import { CheckIcon, SearchIcon, XIcon } from "svelte-feather-icons";
  import { clickOutside } from "@/directives/clickOutside";
  import { scale } from "svelte/transition";
  import { linear } from "svelte/easing";
  import { createEventDispatcher } from "svelte";
  import Overlay from "./Overlay.svelte";

  const dispatch = createEventDispatcher();

  export let options: string[] | any[] = [];
  export let value: string | any = "";
  export let classes = "";
  export let open = false;
  export let label = "";
  export let close: () => void = () => {};

  $: optionsToDipslay = searchValue
    ? options
        .filter((option: any) => {
          return option.label.toLowerCase().includes(searchValue.toLowerCase());
        })
        .map((option: any) => {
          return {
            value: option.value,
            label: option.label,
            prefix: option.prefix,
          };
        })
    : options.map((option: any) => {
        return {
          value: option.value,
          label: option.label,
          prefix: option.prefix,
        };
      });

  let searchValue = "";

  let activeEnterIndex = 0;
  function handleKeydown(event: any) {
    // check if is arrow down or up
    if (event.code === "ArrowDown") {
      event.preventDefault();
      // check if the activeEnterIndex is less than the optionsToDipslay length
      if (activeEnterIndex < optionsToDipslay.length - 1) {
        // increment the activeEnterIndex
        activeEnterIndex++;
      } else {
        activeEnterIndex = 0;
      }
    } else if (event.code === "ArrowUp") {
      event.preventDefault();
      // check if the activeEnterIndex is greater than 0
      if (activeEnterIndex > 0) {
        // decrement the activeEnterIndex
        activeEnterIndex--;
      } else {
        activeEnterIndex = optionsToDipslay.length - 1;
      }
    } else if (event.code === "Enter") {
      dispatch("change", optionsToDipslay[activeEnterIndex]);
      searchValue = "";
    }
  }

  $: outerWidth = 0;
</script>

<svelte:window bind:outerWidth on:keydown={handleKeydown} />

{#if open}
  <!-- <div class="h-full top-0 w-full left-0 fixed z-[100]"> -->
  <Overlay
    click={() => {
      close();
    }}
    customClass="!fixed hidden sm:block !z-[51] "
    blur
  />
  <!-- </div> -->
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
    {...$$restProps}
    class="{classes} sm:w-full sm:px-2 shadow-2xl sm:z-[52] sm:fixed absolute top-12 right-0 z-30 overflow-hidden w-[280px]"
  >
    <div class="bg-white shadow-2xl border border-slate-200 rounded-[3px]">
      <div class=" px-3 py-[6px] bg-slate-50">
        <span class="text-[12.5px] text-slate-600 font-medium capitalize"
          >{label}</span
        >
      </div>

      <div class="py-[6px] border-b px-2 border-t border-slate-200">
        <div
          class="border relative overflow-hidden flex items-center gap-2 px-2 py-[8px] rounded-[3px] border-slate-200 focus-within:border-primary"
        >
          <SearchIcon size="15" class="text-slate-500" />
          <input
            bind:value={searchValue}
            type="text"
            autofocus={outerWidth > 500 ? true : false}
            class="text-[13px] outline-none font-medium text-slate-500"
            placeholder="Type to search"
          />
          {#if searchValue}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-missing-attribute -->
            <a
              on:click={() => {
                searchValue = "";
              }}
              class="absolute right-3 top-[10px] text-slate-500 cursor-pointer"
            >
              <XIcon size="16" />
            </a>
          {/if}
        </div>
      </div>
      <div class="flex h-[250px] px-2 py-2 overflow-y-auto flex-col gap-1">
        {#each optionsToDipslay as option, i}
          <!-- svelte-ignore a11y-missing-attribute -->
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <a
            on:click={() => {
              searchValue = "";

              dispatch("change", option);
            }}
            class="text-[13px] {JSON.stringify(value.value) ===
            JSON.stringify(option.value)
              ? 'bg-indigo-100 text-primary'
              : 'text-slate-500 hover:bg-slate-100 '} {activeEnterIndex === i &&
            value.value !== option.value
              ? 'bg-slate-50'
              : ''} flex items-center gap-2 py-2 cursor-pointer capitalize px-2 rounded-[3px] font-medium"
          >
            <div class="flex items-center gap-2">
              {#if option.prefix}
                <img class="h-4 w-4" src={option.prefix} />
              {/if}
              <span>{option.label}</span>
            </div>
            {#if value.value === option.value}
              <span class="ml-auto text-primary">
                <CheckIcon size="15" />
              </span>
            {/if}
          </a>
        {/each}
        {#if optionsToDipslay.length === 0}
          <div class="text-[13px] py-10 text-slate-500 font-medium text-center">
            No options found
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}
