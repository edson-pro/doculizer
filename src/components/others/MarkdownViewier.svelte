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
    <article id="wrapper" class="preview-typo">
      {#if isLoading}
        <div class="h-[600px] w-full flex justify-center items-center">
          <CircleSpinner />
        </div>
      {:else}
        <SvelteMarkdown source={data} renderers={{ code: CodePreview }} />
      {/if}
    </article>
  </div>
  <div id="doc-page" class="h-[5px]" />
</div>
