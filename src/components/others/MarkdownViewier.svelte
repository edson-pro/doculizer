<script lang="ts">
  import SvelteMarkdown from "svelte-markdown";
  import CodePreview from "./CodePreview.svelte";
  import CircleSpinner from "../ui/CircleSpinner.svelte";
  import { auth } from "@/stores/auth";
  import { useQuery } from "@sveltestack/svelte-query";
  import { page } from "$app/stores";

  export let url;

  $: user = $auth.user;
  $: authLoading = $auth.loading;

  const fetcher = async () => {
    const res = await fetch(url).then((response) => response.text());
    return res;
  };

  $: docResult = useQuery({
    queryKey: ["chats", $page.params.id, "file"],
    queryFn: fetcher,
    enabled: user && !authLoading,
    refetchOnWindowFocus: false,
    retry: false,
  });

  $: data = $docResult.data;
  $: isLoading = $docResult.status === "loading";
</script>

<div>
  <div
    id="pdf-container"
    class="w-full max-w-[630px] mx-auto h-fit my-3 first:mt-0 border overflow-hidden dark:border-slate-700 border-slate-300 dark:bg-slate-900 bg-white rounded-[3px]"
  >
    <div
      id="wrapper"
      class="p-7 dark:prose-headings:text-slate-100 dark:prose-strong:text-slate-200 dark:prose-invert prose-h3:font-medium prose-h3:text-[14px] prose-h2:font-semibold prose-h2:text-[15px] prose-h2:first-letter:capitalize prose-headings:mb-3 prose-p:mb-3 dark:prose-p:text-slate-400 prose-p:text-slate-600 prose-code:!text-[13.5px] prose-code:!leading-7 prose-code:!rounded-[3px] prose-code:!p-[10px] prose-code:!my-4 prose-strong:text-slate-800 prose-strong:!font-semibold overflow-hidden prose-slate prose-sm prose-h1:text-[15px] prose-p:text-[13px] prose-h1:font-semibold prose-p:leading-8 prose lg:prose-xl"
    >
      {#if isLoading}
        <div class="h-[600px] w-full flex justify-center items-center">
          <CircleSpinner />
        </div>
      {:else}
        <SvelteMarkdown source={data} renderers={{ code: CodePreview }} />
      {/if}
    </div>
  </div>
  <div id="doc-page" class="h-[5px]" />
</div>
