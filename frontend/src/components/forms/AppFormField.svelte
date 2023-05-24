<script lang="ts">
  import Input from "../ui/Input.svelte";

  export let placeholder = "";
  export let label = "";
  export let value = "";
</script>

<div>
  <Input {...{ placeholder, label }} bind:value {...$$restProps} />
</div>
