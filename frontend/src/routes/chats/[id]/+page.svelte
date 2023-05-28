<script>
  import Chat from "@/components/others/Chat.svelte";
  import DocumentPreview from "@/components/others/DocumentPreview.svelte";
  import { hideSidebar, setHideSidebar } from "@/stores/layout";

  const handleCallapse = () => {
    setHideSidebar($hideSidebar.hideSidebar);
  };
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

<div
  class="w-full flex border-t border-slate-300 border-b items-center h-screen"
>
  <DocumentPreview
    {handleCallapse}
    {currentDoc}
    hideSidebar={$hideSidebar.hideSidebar}
  />
  <Chat />
</div>
