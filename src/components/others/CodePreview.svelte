<script>
  import { HighlightAuto } from "svelte-highlight";
  import typescript from "svelte-highlight/languages/typescript";
  import atomOneDark from "svelte-highlight/styles/atom-one-dark";

  export let text;
</script>

<svelte:head>
  {@html atomOneDark}
</svelte:head>

<div>
  <HighlightAuto code={text} />
</div>
