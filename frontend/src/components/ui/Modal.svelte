<script lang="ts">
  import Button from "./Button.svelte";
  import CloseButton from "./CloseButton.svelte";
  import Overlay from "./Overlay.svelte";
  import { scale } from "svelte/transition";
  import { linear } from "svelte/easing";
  export let size = "lg";
  export let open: boolean = false;
  export let title: string = "";
  export let showDividers: boolean = false;
  export let close: any = null;
  export let noPadding: boolean = false;
  export let noBackground: boolean = false;
  export let top: boolean = false;

  $: sizeClass = {
    xs: "max-w-[320px]",
    sm: "max-w-[380px]",
    md: "max-w-[520px]",
    lg: "max-w-[620px]",
    xl: "max-w-[780px]",
  }[size];

  const handleClose = () => {
    close();
  };
  function handleKeydown(event: any) {
    if (event.code === "Escape" && open) {
      event.preventDefault();
      close();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if open}
  <div class="fixed z-[51] inset-0 overflow-y-hidden">
    <div
      class="flex items-start justify-center overflow-hidden min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <Overlay fade click={handleClose} dark={true} blur />
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true">&#8203;</span
      >

      <div
        transition:scale={{
          duration: 150,
          delay: 0,
          opacity: 0,
          start: 0.95,
          easing: linear,
        }}
        class=" {noBackground
          ? ''
          : 'dark:bg-slate-900 bg-white shadow-xl'} relative inline-block rounded-[3px] transform transition-all my-8 align-middle w-full
                {sizeClass}
              "
      >
        <slot name="header">
          {#if title}
            <div
              class="{showDividers ? 'border-b px-4  py-3' : 'px-5  py-3'}
                       rounded-t-md border-slate-100 dark:border-slate-800
                    "
            >
              <div class="flex justify-between items-center">
                <h4
                  class="font-semibold dark:font-medium text-[14px] text-slate-800 dark:text-slate-200"
                >
                  {title}
                </h4>
                <CloseButton click={() => handleClose()} />
              </div>
            </div>
          {/if}
        </slot>

        <div class={noPadding ? "" : "px-4 py-2"} id="modalDescription">
          <slot name="body">
            <div
              class="h-[100px] w-full flex text-sm capitalize font-medium text-slate-400 justify-center items-center"
            >
              this is the body
            </div>
          </slot>
        </div>

        <div
          class="{showDividers ? 'border-t ' : ''} {noPadding
            ? ''
            : ' px-4 py-2 '}
                 border-slate-200 dark:border-slate-800
                "
        >
          <slot name="footer">
            <div class="w-full flex items-center justify-end">
              <Button size={"sm"} click={handleClose}>Close Modal</Button>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </div>
{/if}
