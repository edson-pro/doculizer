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

  const messagesFether = ({ queryKey }) => {
    const id = queryKey[1];
    const q = client
      .collection("messages")
      .where("chat_id", "==", id)
      .orderBy("created_at", "desc");
    return q.get().then((e: any) => e.reverse());
  };

  $: chatsResult = useQuery({
    queryKey: ["chats", $page.params.id],
    queryFn: fetcher,
    enabled: user && !authLoading,
    refetchOnWindowFocus: false,
    retry: false,
    keepPreviousData: true,
  });

  $: messagesQk = ["chats", currentDoc.id, "messages"];

  $: messagesResults = useQuery({
    queryKey: messagesQk,
    queryFn: messagesFether,
    enabled: Boolean(currentDoc?.id),
    refetchOnWindowFocus: false,
    retry: false,
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

  let messages = [];
</script>

<svelte:head>
  <title>
    {currentDoc?.title || "Doculize"}
  </title>
</svelte:head>

<div
  class="w-full flex border-t dark:border-slate-700 border-slate-300 border-b items-center h-screen"
>
  <DocumentPreview
    {messagesQk}
    error={$chatsResult.error}
    loading={$chatsResult.isLoading}
    {currentDoc}
  />

  <Chat
    {messagesQk}
    chat={currentDoc}
    {user}
    messages={$messagesResults.data || []}
    loadingMessages={$messagesResults?.isLoading}
  />
</div>
