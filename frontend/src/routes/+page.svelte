<script>
  import { goto } from "$app/navigation";
  import Button from "@/components/ui/Button.svelte";
  import Google from "@/components/vectors/Google.svelte";
</script>

<svelte:head>
  <title>Doculizer</title>
  <meta name="description" content="Chat with your documents." />
</svelte:head>

<div class="w-full h-screen bg-slate-100">
  <div
    class="max-w-2xl py-36 mx-auto flex flex-col justify-center items-center gap-4"
  >
    <h4 class="font-semibold text-2xl leading-7 text-center">
      Chat with documents. Get instant answers with cited sources.
    </h4>
    <p class="font-medium text-[14px] text-slate-600 leading-7 text-center">
      ChatDOC is a ChatGPT-based file-reading assistant that can quickly
      extract, locate, and summarize information from documents.
    </p>
    <Button
      click={() => {
        goto("/chats");
      }}
      customClass="!bg-white"
      variant="default"
      leftIcon={Google}>Continue With Google</Button
    >
    <p class="text-[13.5px] text-slate-500 font-medium leading-7">
      By signing in, you agree to our
      <a class="text-primary" href="/terms">Terms of Service</a>
    </p>
  </div>
</div>
