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
    class="w-full max-w-[630px] mx-auto h-fit my-3 first:mt-0 border overflow-hidden dark:border-slate-700 border-slate-300 dark:bg-slate-900 bg-white rounded-[3px]"
  >
    <div id="wrapper" class="preview-typo">
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
