<script lang="ts">
  import Button from "../ui/Button.svelte";
  export let fullWidth = false;
</script>

<Button {fullWidth} type="submit">
  <slot />
</Button>
