<script lang="ts">
  import mammoth from "mammoth/mammoth.browser";
  import CircleSpinner from "../ui/CircleSpinner.svelte";
  import { useQuery } from "@sveltestack/svelte-query";
  import { page } from "$app/stores";
  import { auth } from "@/stores/auth";

  export let url;

  $: user = $auth.user;
  $: authLoading = $auth.loading;

  const fetcher = async () => {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    const res = await mammoth
      .convertToHtml({ arrayBuffer: buffer })
      .then(function (resultObject) {
        return resultObject.value;
      })
      .catch((e) => {
        console.log(e);
        return "";
      });

    return res;
  };

  $: docResult = useQuery({
    queryKey: ["chats", $page.params.id, url],
    queryFn: fetcher,
    enabled: user && !authLoading,
    refetchOnWindowFocus: false,
    retry: false,
  });

  $: htmlContent = $docResult.data;
  $: isLoading = $docResult.status === "loading";
</script>

<div>
  <div
    id="pdf-container"
    class="w-full max-w-[630px] mx-auto h-fit my-3 first:mt-0 border overflow-hidden border-slate-300 bg-white rounded-[3px]"
  >
    <!-- <CodePreview code="" /> -->
    <div
      id="wrapper"
      class="p-5 prose-headings:mb-3 prose-p:mb-3 prose-p:text-slate-600 prose-code:!text-[13.5px] prose-code:!leading-7 prose-code:!rounded-[3px] prose-code:!p-[10px] prose-code:!my-4 prose-strong:text-slate-800 prose-strong:!font-semibold overflow-hidden prose-slate prose-sm prose-h1:text-[15px] prose-p:text-[13px] prose-h1:font-semibold prose-p:leading-8 prose lg:prose-xl"
    >
      {#if isLoading}
        <div class="h-[620px] w-full flex justify-center items-center">
          <CircleSpinner />
        </div>
      {:else}
        <div>
          {@html htmlContent}
        </div>
      {/if}
    </div>
  </div>
  <div id="doc-page" class="h-[5px]" />
</div>

<style>
  .docx-preview {
    /* Add styles for the rendered HTML content */
  }
</style>
