<script lang="ts">
  import TextArea from "../ui/TextArea.svelte";

  export let placeholder = "";
  export let label = "";
  export let value = "";
</script>

<div>
  <TextArea {...{ placeholder, label }} bind:value {...$$restProps} />
</div>
