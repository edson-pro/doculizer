<script lang="ts">
  import { onMount } from "svelte";

  export let currentPage;
  export let pdfDocument;

  async function renderPage() {
    const page = await pdfDocument.getPage(currentPage);

    const viewport = page.getViewport({ scale: 1 });
    const canvas: any = document.getElementById(`pdfCanvas-${currentPage}`);
    const context = canvas.getContext("2d");
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };

    await page.render(renderContext);
  }

  onMount(() => {
    renderPage();
  });
</script>

<div>
  <div
    class="w-full h-fit my-3 first:mt-0 border overflow-hidden border-slate-300 bg-white rounded-[3px]"
  >
    <canvas id={`pdfCanvas-${currentPage}`} />
  </div>
  <div data-page={currentPage} id="doc-page" class="h-[20px]" />
</div>
