<script>
  import Highlight from "svelte-highlight";
  import typescript from "svelte-highlight/languages/typescript";
  import "svelte-highlight/styles/atom-one-dark.css";

  export let text;
</script>

<div>
  <Highlight language={typescript} code={text} />
</div>
