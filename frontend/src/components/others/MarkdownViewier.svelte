<script lang="ts">
  import SvelteMarkdown from "svelte-markdown";
  import CodePreview from "./CodePreview.svelte";
  import { onMount } from "svelte";

  let isLoading = true;
  let data = "";

  onMount(async () => {
    try {
      // Replace this with your actual data fetching logic
      data = await fetch(
        "https://exrlobuxamfvfkfjnmbi.supabase.co/storage/v1/object/public/documents/documents/doc-sample.md"
      ).then((response) => response.text());

      isLoading = false;
    } catch (error) {
      console.error(error);
      // Handle any error that occurred during data fetching
    }
  });
</script>

<div>
  <div
    id="pdf-container"
    class="w-full max-w-[630px] mx-auto h-fit my-3 first:mt-0 border overflow-hidden border-slate-300 bg-white rounded-[3px]"
  >
    <div
      id="wrapper"
      class="p-7 prose-headings:mb-3 prose-p:mb-3 prose-p:text-slate-600 prose-code:!text-[13.5px] prose-code:!leading-7 prose-code:!rounded-[3px] prose-code:!p-[10px] prose-code:!my-4 prose-strong:text-slate-800 prose-strong:!font-semibold overflow-hidden prose-slate prose-sm prose-h1:text-[15px] prose-p:text-[13px] prose-h1:font-semibold prose-p:leading-8 prose lg:prose-xl"
    >
      {#if isLoading}
        <div class="text-[13px] font-medium text-slate-600 h-[800px]">
          Loading...
        </div>
      {:else}
        <SvelteMarkdown source={data} renderers={{ code: CodePreview }} />
      {/if}
    </div>
  </div>
  <div id="doc-page" class="h-[5px]" />
</div>
