<!-- PDFViewer.svelte -->
<script lang="ts">
  import PdfPage from "./PdfPage.svelte";
  import { afterUpdate } from "svelte";
  import CircleSpinner from "../ui/CircleSpinner.svelte";

  let pdfDocument;
  let totalPages = 0;
  export let onLoaded: any;
  export let url;

  afterUpdate(async () => {
    const pdfjsLib = await import("pdfjs-dist/build/pdf");
    const pdfjsWorker = await import("pdfjs-dist/build/pdf.worker.entry");
    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
    const loadingTask = pdfjsLib.getDocument(url);
    pdfDocument = await loadingTask.promise;
    totalPages = pdfDocument.numPages;
    setTimeout(() => {
      onLoaded(pdfDocument);
    }, 1000);
  });
</script>

<div>
  {#if pdfDocument}
    {#each Array(totalPages)
      .fill(null)
      .map((_, i) => i + 1) as page}
      <PdfPage {pdfDocument} currentPage={page} />
    {/each}
  {:else}
    <div
      class="w-full h-[650px] flex items-center justify-center my-3 first:mt-0 border overflow-hidden border-slate-300 bg-white rounded-[3px]"
    >
      <CircleSpinner />
    </div>
  {/if}
</div>
