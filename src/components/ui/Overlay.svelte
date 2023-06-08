<script lang="ts">
  import { fade as fadeT } from "svelte/transition";
  export let blur = false;
  export let dark = false;
  export let fade = false;
  export let zIndex = 100;
  export let click: any = null;
  export let customClass = "";
</script>

<div
  transition:fadeT={fade
    ? { delay: 0, duration: 200 }
    : { delay: 0, duration: 0 }}
  style:zIndex
  on:keydown
  on:click={click}
  class="
      absolute select-none h-full w-full flex justify-center items-center bg-opacity-20 {dark
    ? 'bg-black'
    : 'dark:bg-slate-900 dark:bg-opacity-75 bg-slate-200 '} inset-0 transition-opacity
      {blur ? `backdrop-blur-sm ` : ''}
      {customClass}
    "
/>
