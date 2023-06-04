<script lang="ts">
  import { onMount } from "svelte";

  export let currentPage;
  export let pdfDocument;

  async function renderPage() {
    const page = await pdfDocument.getPage(currentPage);

    var resolution = 1.02; // for example
    var container = document.getElementById("pdf-container"); //Container of the body
    var wrapper = document.getElementById("wrapper"); //render your pdf inside a div called wrapper
    var canvas: any = document.getElementById(`pdfCanvas-${currentPage}`);
    var context = canvas.getContext("2d");
    const pageWidthScale = container.clientWidth / page.view[2];
    const pageHeightScale = container.clientHeight / page.view[3];

    var scales = { 1: 3.5, 2: 4 },
      defaultScale = 4,
      scale = scales[window.devicePixelRatio] || defaultScale;

    var viewport = page.getViewport({
      scale: 3.2 * (window.devicePixelRatio || 1),
    });

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    var displayWidth = Math.min(pageWidthScale, pageHeightScale);
    canvas.style.width = `${(viewport.width * displayWidth) / scale}px`;
    canvas.style.height = `${(viewport.height * displayWidth) / scale}px`;
    canvas.style.transform = `scale(1.18) translateX(-5px)`;

    // Render PDF page into canvas context
    var renderContext = {
      canvasContext: context,
      viewport: viewport,
      transform: [resolution, 0, 0, resolution, 0, 0], // force it bigger size
    };

    await page.render(renderContext);
  }

  onMount(() => {
    renderPage();
  });
</script>

<div>
  <div
    id="pdf-container"
    class="w-full max-w-[630px] mx-auto h-[950px] my-3 first:mt-0 border overflow-hidden border-slate-300 bg-white rounded-[3px]"
  >
    <div id="wrapper" class=" py-10 overflow-hidden">
      <canvas id={`pdfCanvas-${currentPage}`} />
    </div>
  </div>
  <div data-page={currentPage} id="doc-page" class="h-[5px]" />
</div>
