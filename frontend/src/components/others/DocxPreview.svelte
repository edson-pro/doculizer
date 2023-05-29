<script lang="ts">
  import { onMount } from "svelte";
  import mammoth from "mammoth/mammoth.browser";
  import CircleSpinner from "../ui/CircleSpinner.svelte";
  import { afterUpdate } from "svelte";

  let isLoading = true;
  let htmlContent: string | undefined = "";
  export let url;

  // afterUpdate(() => {
  //   console.log("propValue changed:", url);
  // });

  afterUpdate(async () => {
    try {
      // Simulating an API call or file fetching
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Replace this with your actual file fetching logic
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

      htmlContent = res;
      isLoading = false;
    } catch (error) {
      console.error(error);
      // Handle any error that occurred during file fetching or conversion
    }
  });
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
