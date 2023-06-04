<script lang="ts">
  import Button from "../ui/Button.svelte";
  import Modal from "../ui/Modal.svelte";

  export let close;
  export let open;
  export let payload;
</script>

<Modal size="md" {open} {close} title={payload.title}>
  <div slot="body">
    <p
      class="leading-7 text-[13.5px] text-slate-500 text-left mb-2 font-medium"
    >
      {payload.desc}
    </p>
  </div>
  <div slot="footer">
    <div class="flex items-center justify-end w-full gap-2">
      <Button
        size="sm"
        click={(e) => {
          close();
        }}
        variant="default">Cancel</Button
      >
      <Button
        loading={payload.loading}
        click={(e) => {
          payload.confirm();
        }}
        color="danger"
        size="sm">Yes, Confirm</Button
      >
    </div>
  </div>
</Modal>
