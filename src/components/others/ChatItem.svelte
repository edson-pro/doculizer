<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import {
    ClockIcon,
    FileIcon,
    LogInIcon,
    MoreVerticalIcon,
    RefreshCcwIcon,
    Trash2Icon,
  } from "svelte-feather-icons";
  import Docx from "../vectors/documents/Docx.svelte";
  import Markdown from "../vectors/documents/Markdown.svelte";
  import Pdf from "../vectors/documents/Pdf.svelte";
  import Menu from "./Menu.svelte";
  import * as modals from "@/stores/modals";
  import client from "@/lib/client";
  import { useQueryClient } from "@sveltestack/svelte-query";
  import { chatsQueryKey } from "@/stores/queryKeys";
  import { addToast } from "@/stores/toast";

  function truncateString(str) {
    const maxLength = 28;
    if (str.length <= maxLength) {
      return str;
    }

    const midpoint = Math.floor(maxLength / 2);
    const firstHalf = str.slice(0, midpoint - 1);
    const secondHalf = str.slice(-midpoint + 2);

    return `${firstHalf}...${secondHalf}`;
  }
  let showActions = false;

  export let chat;
  export let hideSidebar;

  const queryClient = useQueryClient();

  $: messagesQk = ["chats", chat.id, "messages"];

  const chatActions = [
    {
      title: "Clear History ",
      icon: ClockIcon,
      click: () => {
        modals.open("confirm", {
          confirm: () => {
            modals.update("confirm", { loading: true });
            return client
              .collection("messages")
              .where("chat_id", "==", chat.id)
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
          desc: " Take control of your conversations and clear the slate with a single click.",
        });
      },
    },
    {
      title: "Open document",
      icon: LogInIcon,
      click: () => {
        goto(`/chats/${chat.id}`);
      },
    },
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
              .doc(chat.id)
              .delete()
              .then((e) => {
                queryClient.invalidateQueries($chatsQueryKey);
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
          title: "Delete this Document.",
          desc: "Swiftly remove this document with a single click.",
        });
      },
    },
  ];
</script>

<!-- svelte-ignore missing-declaration -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="relative">
  {#if showActions}
    <Menu
      items={chatActions}
      close={() => {
        showActions = false;
      }}
    />
  {/if}
  <!-- svelte-ignore a11y-missing-attribute -->
  <a
    on:click={() => {
      goto(`/chats/${chat.id}`);
    }}
    class={`${
      `/chats/${chat.id}` === $page.url.pathname
        ? "dark:bg-slate-800 dark:bg-opacity-60 bg-slate-200 bg-opacity-50 "
        : ""
    } flex dark:hover:bg-slate-800 hover:bg-slate-200 ${
      hideSidebar ? "px-2" : "px-3"
    } relative cursor-pointer hover:bg-opacity-50 py-2 my-[6px] first-of-type:mt-0 justify-between w-full items-center gap-3`}
  >
    {#if `/chats/${chat.id}` === $page.url.pathname}
      <div class="w-[3px] absolute left-0 h-full rounded-r-lg bg-primary" />
    {/if}
    <div class="flex items-center gap-3">
      <div
        class={`${
          hideSidebar ? "h-8 w-8" : "h-10 w-10"
        } flex items-center rounded-[3px] justify-center ${
          chat.type === "pdf"
            ? "bg-red-100 dark:bg-red-500 dark:bg-opacity-20 dark:border-red-500 dark:border-opacity-25 border-red-200 border "
            : chat.type === "docx" || chat.type === "google-docs"
            ? "bg-blue-100 dark:bg-blue-700 dark:bg-opacity-20 dark:border-blue-500 dark:border-opacity-40 border-blue-200 border "
            : chat.type === "markdown"
            ? "bg-[#179fe5] bg-opacity-20 dark:border-blue-500 dark:border-opacity-30 border-blue-200 border "
            : ""
        }`}
      >
        <svelte:component
          this={chat.type === "pdf"
            ? Pdf
            : chat.type === "docx" || chat.type === "google-docs"
            ? Docx
            : chat.type === "markdown"
            ? Markdown
            : FileIcon}
        />
      </div>
      {#if !hideSidebar}
        <div class="flex flex-col gap-[6px]">
          <h4
            class="text-[12.5px] dark:text-slate-100 truncate font-semibold text-slate-800 capitalize"
          >
            {truncateString(chat.title)}
          </h4>
          <p
            class="text-[11.8px] dark:text-slate-400 flex gap-2 items-center font-medium text-slate-500"
          >
            <span class="capitalize">
              {chat.type}
            </span>
            <span class="font-bold">-</span>
            <span>
              {chat.created_at}
            </span>
          </p>
        </div>
      {/if}
    </div>
    {#if !hideSidebar}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-missing-attribute -->
      <a
        on:click={(e) => {
          e.stopPropagation();
          showActions = true;
        }}
        class="h-7 cursor-pointer w-7 -mr-1 flex items-center justify-center rounded-[3px] dark:hover:bg-slate-700 hover:bg-slate-200"
      >
        <MoreVerticalIcon
          class="dark:text-slate-300 text-slate-700"
          size="14"
        />
      </a>
    {/if}
  </a>
</div>
