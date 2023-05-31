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
  import { page } from "$app/stores";

  import { uiState, setUiState } from "@/stores/layout";
  import { useQuery, useQueryClient } from "@sveltestack/svelte-query";
  import client from "@/lib/client";
  import { auth } from "@/stores/auth";
  import PdfViewer from "./PdfViewer.svelte";
  import DocxPreview from "./DocxPreview.svelte";
  import Skeleton from "../ui/Skeleton.svelte";
  import CircleSpinner from "../ui/CircleSpinner.svelte";
  import Markdown from "../vectors/documents/Markdown.svelte";
  import { chatsQueryKey } from "@/stores/queryKeys";
  import { addToast } from "@/stores/toast";
  import { goto } from "$app/navigation";
  import Empty from "../ui/Empty.svelte";

  const handleCallapse = () => {
    setUiState({ ...$uiState, hideSidebar: false });
  };

  $: hideSidebar = $uiState.hideSidebar;

  export let currentDoc;
  export let messagesQk;

  let currentIntersection = 1;

  export let loading;

  export let error;
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

  const queryClient = useQueryClient();

  let showMenu = false;

  const actions = [
    {
      title: "Clear History ",
      icon: ClockIcon,
      click: () => {
        modals.open("confirm", {
          confirm: () => {
            modals.update("confirm", { loading: true });
            return client
              .collection("messages")
              .where("chat_id", "==", currentDoc.id)
              .delete()
              .then((e) => {
                queryClient.invalidateQueries(messagesQk);
                setTimeout(() => {
                  modals.update("confirm", { loading: false });
                  modals.close();
                  addToast({
                    message: "Chat convesation was deleted successfully",
                    type: "success",
                    title: "Deleted succesfully",
                  });
                  console.log("Delete Document");
                }, 500);
              });
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
            modals.update("confirm", { loading: true });
            return client
              .collection("chats")
              .doc(currentDoc.id)
              .delete()
              .then((e) => {
                queryClient.invalidateQueries($chatsQueryKey);
                goto("/chats");
                setTimeout(() => {
                  modals.update("confirm", { loading: false });
                  modals.close();
                  addToast({
                    message: "Chat document was deleted successfully",
                    type: "success",
                    title: "Deleted succesfully",
                  });
                  console.log("Delete Document");
                }, 500);
              });
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

      {#if loading}
        <div>
          <Skeleton customClass="h-7 w-7" />
        </div>
      {:else}
        <svelte:component
          this={currentDoc?.type === "pdf"
            ? Pdf
            : currentDoc?.type === "docx" || currentDoc?.type === "google-docs"
            ? Docx
            : currentDoc?.type === "markdown"
            ? Markdown
            : FileIcon}
        />
      {/if}
      {#if loading}
        <Skeleton customClass="h-4 w-[120px]" />
      {:else}
        <div class="flex items-center gap-2">
          <h4 class="font-semibold capitalize text-[13px]">
            {error ? error : currentDoc?.title}
          </h4>
          {#if currentDoc}
            <span
              class="text-[10px] uppercase font-semibold py-[2px] rounded-full px-2 {currentDoc.type ===
              'pdf'
                ? 'bg-red-100 text-red-500 '
                : currentDoc?.type === 'docx' ||
                  currentDoc?.type === 'google-docs'
                ? 'bg-blue-100 text-blue-500 '
                : currentDoc.type === 'markdown'
                ? 'bg-[#179fe5] bg-opacity-20 text-blue-500 '
                : ''}"
            >
              {error ? "" : `.${currentDoc?.extension}`}
            </span>
          {/if}
        </div>
      {/if}
    </div>
    <!-- <a
      on:click={() => {
        [
          {
            role: "user",
            created_at: new Date(),
            content:
              "What are the intellectual property rights assigned to Unit U+2467 GmbH or its customers in relation to the work results of an Employee working on projects for Ape Unit and its related entities?",
          },
          {
            role: "system",
            created_at: new Date(),
            content:
              "The intellectual property rights connected to the work results of an Employee when working on projects of Ape Unit and its related companies or customers are assigned to Unit U+2467 GmbH or to its customers - depending on the regulations in the contracts between Unit U+2467 GmbH and its customers.",
          },
          {
            role: "user",
            created_at: new Date(),
            content: "what is the length of the contract",
          },
          {
            role: "system",
            created_at: new Date(),
            content:
              "The length of the contract is one year, from March 1st, 2023, to February 29th, 2024, with a probationary period of six months.",
          },
          {
            role: "user",
            created_at: new Date(),
            content:
              "What are the intellectual property rights assigned to Unit U+2467 GmbH or its customers in relation to the work results of an Employee working on projects for Ape Unit and its related entities?",
          },
          {
            role: "system",
            created_at: new Date(),
            content:
              "The intellectual property rights connected to the work results of an Employee when working on projects of Ape Unit and its related companies or customers are assigned to Unit U+2467 GmbH or to its customers - depending on the regulations in the contracts between Unit U+2467 GmbH and its customers.",
          },
        ].forEach((e) => {
          return client
            .collection("messages")
            .create({
              ...e,
              chat_id: 34,
              user_id: "f00e76e2-df7f-437c-883a-d739af279cb3",
            })
            .then((e) => {
              console.log("done");
            });
        });
      }}>dd</a
    > -->
    <!-- {JSON.stringify($chatsResult)} -->
    <!-- svelte-ignore a11y-missing-attribute -->
    <div class="">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <a
        on:click={() => {
          if (currentDoc && !error) {
            showMenu = true;
          }
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
    class="scrollbar scrollbar-thin- scrollbar-w-1 scrollbar-corner-slate-600 scrollbar-thumb-rounded scrollbar-thumb-slate-400 scrollbar-track-white flex-1 overflow-y-scroll relative pb-3 bg-opacity-50 bg-slate-200"
  >
    <div class="w-full h-full mb-2 border-r border-slate-300 p-4">
      {#if loading || error}
        <div
          class="w-full flex items-center justify-center max-w-[630px] mx-auto h-[650px] my-3 first:mt-0 border overflow-hidden border-slate-300 bg-white rounded-[3px]"
        >
          {#if error}
            <Empty
              image="/images/empty.svg"
              title={"Something went wrong"}
              desc={error}
            />
          {:else}
            <CircleSpinner />
          {/if}
        </div>
      {/if}

      {#if currentDoc}
        {#if currentDoc?.type === "pdf"}
          <PdfViewer url={currentDoc.file} onLoaded={handleLoad} />
        {:else if currentDoc?.type === "markdown"}
          <MarkdownViewier url={currentDoc.file} />
        {:else if currentDoc?.type === "docx" || currentDoc.type === "google docs"}
          <DocxPreview url={currentDoc.file} />
        {:else}
          <p />
        {/if}
      {/if}
      <div class="h-[10px]" />
    </div>
  </div>
</div>
