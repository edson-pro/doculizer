<script lang="ts">
  import SvelteMarkdown from "svelte-markdown";
  import CodePreview from "./CodePreview.svelte";
  import { afterUpdate, onMount } from "svelte";
  import CircleSpinner from "../ui/CircleSpinner.svelte";

  let isLoading = true;
  let data = "";
  export let url;

  afterUpdate(() => {
    console.log("propValue changed:", url);
  });

  onMount(async () => {
    try {
      // Replace this with your actual data fetching logic
      data = await fetch(url).then((response) => response.text());

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
