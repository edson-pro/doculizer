<script>
  import Chat from "@/components/others/Chat.svelte";
  import DocumentPreview from "@/components/others/DocumentPreview.svelte";

  const currentDoc = {
    type: "docx",
    title: "Senior position assesment",
    status: "processed",
    pages: 5,
    createAt: new Date("11/02/2021").toLocaleDateString("en-US", {
      day: "2-digit",
      year: "numeric",
      month: "short",
    }),
  };
</script>

<svelte:head>
  <title>
    {currentDoc.title}
  </title>
</svelte:head>

<div
  class="w-full flex border-t border-slate-300 border-b items-center h-screen"
>
  <DocumentPreview {currentDoc} />
  <Chat />
</div>
