<script lang="ts">
  import { page } from "$app/stores";
  import Chat from "@/components/others/Chat.svelte";
  import DocumentPreview from "@/components/others/DocumentPreview.svelte";
  import client from "@/lib/client";
  import { auth } from "@/stores/auth";
  import { useQuery } from "@sveltestack/svelte-query";

  $: user = $auth.user;
  $: authLoading = $auth.loading;

  const fetcher = ({ queryKey }) => {
    const id = queryKey[1];
    const q = client.collection("chats").doc(id);
    return q.get().then((e: any) => ({
      ...e,
      created_at: new Date(e?.created_at).toLocaleDateString("en-US", {
        day: "2-digit",
        year: "numeric",
        month: "short",
      }),
    }));
  };

  $: chatsResult = useQuery({
    queryKey: ["chats", $page.params.id],
    queryFn: fetcher,
    enabled: user && !authLoading,
    keepPreviousData: true,
  });

  function getFileExtension(fileType) {
    if (fileType === "pdf") {
      return "pdf";
    }
    if (fileType === "markdown") {
      return "md";
    }
    if (fileType === "docx" || fileType === "google docs") {
      return "docx";
    }

    return null; // Invalid file type
  }
  $: currentDoc = {
    ...$chatsResult?.data,
    extension: getFileExtension($chatsResult?.data?.type),
    createAt: new Date($chatsResult?.data?.created_at).toLocaleDateString(
      "en-US",
      {
        day: "2-digit",
        year: "numeric",
        month: "short",
      }
    ),
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
  <DocumentPreview loading={$chatsResult.isLoading} {currentDoc} />
  <Chat />
</div>
