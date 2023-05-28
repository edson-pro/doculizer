<script lang="ts">
  import {
    ChevronLeftIcon,
    ChevronRightIcon,
    ClockIcon,
    FileIcon,
    ListIcon,
    MoreVerticalIcon,
    RefreshCcwIcon,
    Trash2Icon,
    XIcon,
  } from "svelte-feather-icons";
  import Docx from "../vectors/documents/Docx.svelte";
  import Pdf from "../vectors/documents/Pdf.svelte";
  import MarkdownViewier from "./MarkdownViewier.svelte";
  import { onMount } from "svelte";
  import Menu from "./Menu.svelte";
  import * as modals from "@/stores/modals";

  export let hideSidebar;
  export let currentDoc;
  export let handleCallapse;

  let currentIntersection = 1;

  let scrollPercentage;

  let documentScroll;

  function parseScroll() {
    const totalScrollableDistance =
      documentScroll.scrollHeight - documentScroll.clientHeight;
    scrollPercentage =
      (documentScroll.scrollTop / totalScrollableDistance) * 100;
  }

  const handleLoad = (e) => {
    // Select the elements you want to observe
    const elements = document.querySelectorAll("#doc-page");

    elements.forEach((element) => {
      observer.observe(element);
    });
  };

  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        currentIntersection = Number(entry.target.dataset.page);
      }
    });
  };

  let observer;

  onMount(() => {
    observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.3, // Adjust the threshold as needed
    });
    return () => {
      observer.disconnect();
    };
  });

  const pages = [1, 2, 3, 4];

  let showMenu = false;

  const actions = [
    {
      title: "Clear History ",
      icon: ClockIcon,
      click: () => {
        modals.open("confirm", {
          confirm: () => {
            console.log("Delete Chat history");
          },
          title: "Delete all chat history",
          desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque vertenetur quod eius.",
        });
      },
    },
    { title: "Re-process document", icon: RefreshCcwIcon },
    {
      title: "Delete Document",
      icon: Trash2Icon,
      variant: "danger",
      click: () => {
        modals.open("confirm", {
          confirm: () => {
            console.log("Delete Document");
          },
          title: "Delete this Document",
          desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque vertenetur quod eius.",
        });
      },
    },
  ];
</script>

<div class="w-[55%] relative flex flex-col border-r h-full border-slate-300">
  <div
    class="flex bg-white relative items-center px-4 justify-between border-b border-slate-300 py-[10.5px]"
  >
    <div class="flex gap-3 items-center">
      {#if hideSidebar}
        <a
          on:click={() => {
            handleCallapse();
          }}
          href="#"
          class="h-7 w-7 mr-3 flex items-center justify-center rounded-[3px] hover:bg-slate-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="tabler-icon tabler-icon-arrow-bar-right"
            ><path d="M20 12l-10 0" /><path d="M20 12l-4 4" /><path
              d="M20 12l-4 -4"
            /><path d="M4 4l0 16" /></svg
          >
        </a>
      {/if}
      <svelte:component
        this={currentDoc.type === "pdf"
          ? Pdf
          : currentDoc.type === "docx"
          ? Docx
          : FileIcon}
      />
      <div class="flex items-center gap-2">
        <h4 class="font-semibold capitalize text-[13px]">
          {currentDoc.title}
        </h4>
        <span
          class="text-[10px] font-semibold text-blue-400 bg-blue-100 py-[2px] rounded-full px-2"
        >
          .DOCX
        </span>
      </div>
    </div>
    <!-- svelte-ignore a11y-missing-attribute -->
    <div class="">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <a
        on:click={() => {
          showMenu = true;
        }}
        class="h-7 w-7 cursor-pointer -mr-[6px] flex items-center justify-center rounded-[3px] hover:bg-slate-100"
      >
        <MoreVerticalIcon class="text-slate-700" size="15" />
      </a>
      {#if showMenu}
        <Menu
          items={actions}
          close={() => {
            showMenu = false;
          }}
        />
      {/if}
    </div>
  </div>
  <div
    style="width: {scrollPercentage}%;"
    class="h-[3px] rounded-sm z-50 bg-primary absolute top-[49px]"
  />
  <div class="w-full z-50 absolute bottom-0 px-3 h-[55px]">
    <div
      class="w-[80%] mx-auto h-[45px]- py-2 shadow-md bg-opacity-80 backdrop-blur-sm rounded-[3px] bg-white border border-slate-300"
    >
      <div class="flex items-center px-2 w-full justify-between">
        <a
          class="h-7 w-7 -mr-[6px] flex items-center justify-center rounded-[3px] hover:bg-slate-200"
          href=""
        >
          <ListIcon class="text-slate-600" size="20" />
        </a>
        <div class="flex items-center gap-3">
          <a href="">
            <ChevronLeftIcon
              strokeWidth={2.5}
              size="16"
              class="text-slate-500"
            />
          </a>
          <div
            class="text-[12px] flex items-center gap-3 font-semibold text-slate-500"
          >
            <span
              class="h-7 w-9 rounded-[3px] flex justify-center items-center text-primary border border-indigo-300 bg-indigo-100"
              >{currentIntersection}</span
            >
            <span>/</span>
            <span class="cursor-pointer">{pages.length}</span>
          </div>
          <a href="">
            <ChevronRightIcon
              strokeWidth={2.5}
              size="16"
              class="text-slate-500"
            />
          </a>
        </div>
        <a
          class="h-7 w-7 flex items-center justify-center rounded-[3px] hover:bg-slate-200"
          href=""
        >
          <XIcon strokeWidth={2.5} size="16" class="text-slate-500" />
        </a>
      </div>
    </div>
  </div>
  <div
    on:scroll={parseScroll}
    bind:this={documentScroll}
    class="scrollbar- scrollbar-corner-slate-600 scrollbar-thumb-rounded scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-white flex-1 overflow-y-scroll relative pb-3 bg-opacity-50 bg-slate-200"
  >
    <div class="w-full h-full mb-2 border-r border-slate-300 p-4">
      <!-- <PdfViewer onLoaded={handleLoad} /> -->
      <MarkdownViewier />
      <!-- <DocxPreview /> -->
      <div class="h-[10px]" />
    </div>
  </div>
</div>
