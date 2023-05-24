<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import CloseButton from "./CloseButton.svelte";
  import Loader from "./Loader.svelte";

  export let message: string;
  export let title: string;
  export let loading: boolean = false;
  export let variant: string = "default";
  export let dismissible: boolean = false;

  const dispatch = createEventDispatcher();
</script>

<div>
  <div
    class="dark:bg-slate-900 backdrop-blur-sm dark:bg-opacity-80 gap-6 shadow-md border dark:border-slate-800 border-slate-200 m-2 bg-white min-w-[400px] sm:min-w-full relative flex items-center justify-between py-3 px-3 rounded-[2px]"
  >
    <div class="flex gap-3 self-stretch">
      {#if loading}
        <div class="flex items-center justify-center mr-2">
          <Loader />
        </div>
      {:else}
        <div class="flex items-center justify-center">
          {#if variant === "default"}
            <div class="h-full bg-primary w-[5] rounded-md" />
          {/if}
          {#if variant === "danger"}
            <div class="flex items-center justify-center mr-2">
              <div
                class="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-x"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
            </div>
          {/if}
          {#if variant === "success"}
            <div class="flex items-center justify-center mr-2">
              <div
                class="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center"
              >
                <svg
                  class="icon icon-tabler icon-tabler-check"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                >
                  <desc>
                    Download more icon variants from
                    https://tabler-icons.io/i/check
                  </desc>
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 12l5 5l10 -10" />
                </svg>
              </div>
            </div>
          {/if}
        </div>
      {/if}

      <div class="flex flex-col items-start gap-[6px]">
        <h4 class="dark:text-white text-slate-800 font-medium text-[13.5px]">
          {title}
        </h4>
        <p
          class="dark:text-slate-400 first-letter:capitalize text-slate-500 font-normal text-[13px]"
        >
          {message}
        </p>
      </div>
    </div>
    {#if dismissible}
      <CloseButton click={() => dispatch("close")} />
    {/if}
  </div>
</div>
