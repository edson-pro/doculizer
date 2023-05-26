<!-- PDFViewer.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import PdfPage from "./PdfPage.svelte";

  let pdfDocument;
  let totalPages = 0;
  export let onLoaded: any;

  onMount(async () => {
    const pdfjsLib = await import("pdfjs-dist/build/pdf");
    const pdfjsWorker = await import("pdfjs-dist/build/pdf.worker.entry");
    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
    const url = "/doc.pdf";
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
      class="w-full h-[650px] my-3 first:mt-0 border overflow-hidden border-slate-300 bg-white rounded-[3px]"
    />
  {/if}
</div>
