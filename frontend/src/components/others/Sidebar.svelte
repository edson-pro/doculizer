<script lang="ts">
  // @ts-nocheck
  import {
    ClockIcon,
    FileIcon,
    GridIcon,
    LogOutIcon,
    MoreHorizontalIcon,
    MoreVerticalIcon,
    PlusIcon,
    RefreshCcwIcon,
    SearchIcon,
    SettingsIcon,
    Trash2Icon,
    UploadCloudIcon,
  } from "svelte-feather-icons";
  import Pdf from "../vectors/documents/Pdf.svelte";
  import Docx from "../vectors/documents/Docx.svelte";
  import Avatar from "../ui/Avatar.svelte";
  import { clickOutside } from "../../directives/clickOutside";
  import { scale } from "svelte/transition";
  import { linear } from "svelte/easing";
  import * as modals from "@/stores/modals";
  import Menu from "./Menu.svelte";

  export let hideSidebar;
  export let handleCallapse;

  let showProfileDropdown = false;

  const chats = [
    {
      type: "pdf",
      title: "Developer contract",
      status: "processed",
      pages: 4,
      createAt: new Date().toLocaleDateString("en-US", {
        day: "2-digit",
        year: "numeric",
        month: "short",
      }),
    },
    {
      type: "pdf",
      title: "Brockain 2 proposal",
      status: "processed",
      pages: 5,
      createAt: new Date("11/02/2021").toLocaleDateString("en-US", {
        day: "2-digit",
        year: "numeric",
        month: "short",
      }),
    },
    {
      type: "docx",
      title: "Senior position assesment",
      status: "processed",
      pages: 5,
      createAt: new Date("11/02/2021").toLocaleDateString("en-US", {
        day: "2-digit",
        year: "numeric",
        month: "short",
      }),
    },
  ];

  const chatActions = [
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

  const actions = [
    {
      title: "Clear conversations",
      icon: Trash2Icon,
      click: () => {
        modals.open("confirm", {
          confirm: () => {
            console.log("Delete conversations");
          },
          title: "Delete all conversations",
          desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque vertenetur quod eius.",
        });
      },
    },
    { title: "Settings", icon: SettingsIcon },
    {
      title: "Logout",
      icon: LogOutIcon,
      click: () => {
        modals.open("confirm", {
          confirm: () => {
            console.log("Logout");
          },
          title: "Logout your account",
          desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque vertenetur quod eius.",
        });
      },
    },
  ];

  let activeActionChat = undefined;
</script>

<div
  class="{hideSidebar
    ? ' w-[50px]'
    : ' w-[400px]'} h-screen bg-white border-t border-b flex flex-col border-r border-slate-300"
>
  <div class="px-2 py-2 w-full border-b border-slate-300">
    <div class="flex items-center w-full justify-between gap-2">
      <a href="#">
        <img
          class="h-8 w-8 rounded-[3px]"
          src="https://play-lh.googleusercontent.com/bvaTHCfTJohpSWFgjXouNkNsVFnC5ssfdaurQzCvPnzBtflEwOEi5vq2vopY4Miv4lI"
          alt=""
        />
      </a>
      {#if !hideSidebar}
        <div class="flex items-center gap-2">
          <GridIcon size="18" />
          <span class="font-semibold text-[13.5px]"> Documents </span>
        </div>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-missing-attribute -->
        <a
          on:click={() => {
            handleCallapse();
          }}
          class="h-8 w-8 cursor-pointer flex items-center justify-center rounded-[3px] hover:bg-slate-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="tabler-icon tabler-icon-arrow-bar-left"
            ><path d="M4 12l10 0" /><path d="M4 12l4 4" /><path
              d="M4 12l4 -4"
            /><path d="M20 4l0 16" /></svg
          >
        </a>
      {/if}
    </div>
  </div>
  <div class="flex h-full justify-between flex-col">
    <div
      class="flex border {hideSidebar
        ? 'cursor-pointer  px-2 py-2'
        : ' px-3 py-[8px]'} mx-2 my-2 border-slate-200 bg-opacity-30 items-center gap-1 bg-slate-200 rounded-[3px]"
    >
      <SearchIcon size="15" class="text-slate-700" />
      {#if !hideSidebar}
        <input
          type="text"
          placeholder="Search here.."
          class=" bg-transparent px-2 w-full font-medium text-slate-600 text-[13px] outline-none"
          name=""
          id=""
        />
      {/if}
    </div>
    <div class="flex-1 flex flex-col border-t border-slate-200 h-full">
      <div class="px-0 h-full">
        {#each chats as chat, i}
          <div
            class={`${
              i === 0 ? "bg-slate-200 bg-opacity-50 " : ""
            } flex hover:bg-slate-200 ${
              hideSidebar ? "px-2" : "px-3"
            } relative relative cursor-pointer hover:bg-opacity-50 py-2 my-[6px] first-of-type:mt-0 justify-between w-full items-center gap-3`}
          >
            {#if activeActionChat === i}
              <Menu
                items={chatActions}
                close={() => {
                  activeActionChat = undefined;
                }}
              />
            {/if}
            {#if i === 0}
              <div
                class="w-[3px] absolute left-0 h-full rounded-r-lg bg-primary"
              />
            {/if}
            <div class="flex items-center gap-2">
              <div
                class={`${
                  hideSidebar ? "h-8 w-8" : "h-10 w-10"
                } flex items-center rounded-[3px] justify-center ${
                  chat.type === "pdf"
                    ? "bg-red-100 border-red-200 border "
                    : chat.type === "docx"
                    ? "bg-blue-100 border-blue-200 border "
                    : ""
                }`}
              >
                <svelte:component
                  this={chat.type === "pdf"
                    ? Pdf
                    : chat.type === "docx"
                    ? Docx
                    : FileIcon}
                />
              </div>
              {#if !hideSidebar}
                <div class="flex flex-col gap-[6px]">
                  <h4
                    class="text-[12.5px] truncate font-semibold text-slate-800 capitalize"
                  >
                    {chat.title}
                  </h4>
                  <p
                    class="text-[11.8px] flex gap-2 items-center font-medium text-slate-500"
                  >
                    <span>
                      {chat.pages} pages
                    </span>
                    <span class="font-bold">-</span>
                    <span>
                      {chat.createAt}
                    </span>
                  </p>
                </div>
              {/if}
            </div>
            {#if !hideSidebar}
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <!-- svelte-ignore a11y-missing-attribute -->
              <a
                on:click={() => {
                  activeActionChat = i;
                }}
                class="h-7 cursor-pointer w-7 -mr-1 flex items-center justify-center rounded-[3px] hover:bg-slate-200"
              >
                <MoreVerticalIcon class="text-slate-700" size="14" />
              </a>
            {/if}
          </div>
        {/each}
      </div>
      <div
        class="bg-slate-100 cursor-pointer flex {!hideSidebar
          ? 'm-3 py-5'
          : 'm-2 py-2'} text-center border border-slate-300 border-dashed rounded-[3px] flex-col justify-center items-center gap-3"
      >
        <UploadCloudIcon
          class="text-slate-600"
          size={!hideSidebar ? "20" : "16"}
        />
        {#if !hideSidebar}
          <a
            href=""
            class="flex items-center gap-2 text-[13px] font-semibold text-primary"
          >
            <PlusIcon strokeWidth={3} size="14" />
            <span>Create New chat</span>
          </a>
          <p class="text-[13px] capitalize text-slate-500 font-medium">
            Upload documents here.
          </p>
        {/if}
      </div>
    </div>
    <div class="border-t relative border-slate-200 pt-0">
      <div
        class="{!hideSidebar
          ? 'px-3  justify-between'
          : 'justify-center'} w-full flex items-center mx-[6px]- py-[6px] cursor-pointer rounded-[3px]- hover:bg-slate-200 hover:bg-opacity-30 hover:border-slate-200- border border-transparent"
      >
        {#if showProfileDropdown}
          <!-- svelte-ignore missing-declaration -->
          <!-- svelte-ignore missing-declaration -->
          <div
            use:clickOutside
            on:click_outside={() => {
              showProfileDropdown = false;
            }}
            transition:scale={{
              duration: 100,
              delay: 0,
              opacity: 0,
              start: 0.95,
              easing: linear,
            }}
            class="absolute rounded-[3px] p-1 left-1 bottom-14 border border-slate-200 shadow-sm bg-white w-[97%] mx-auto"
          >
            <ul>
              {#each actions as action}
                <li>
                  <!-- svelte-ignore a11y-click-events-have-key-events -->
                  <!-- svelte-ignore a11y-missing-attribute -->
                  <a
                    on:click={(e) => {
                      showProfileDropdown = false;
                      action.click();
                    }}
                    class="flex cursor-pointer hover:bg-slate-100 rounded-[3px] my-1 items-center gap-2 py-2 px-2"
                  >
                    <svelte:component
                      this={action.icon}
                      class="text-slate-600"
                      size={"16"}
                    />
                    <span
                      class="text-[13px] text-slate-600 font-medium capitalize"
                    >
                      {action.title}
                    </span>
                  </a>
                </li>
              {/each}
            </ul>
          </div>
        {/if}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
          on:click={(e) => {
            if (!hideSidebar) {
              showProfileDropdown = true;
            }
          }}
          class="flex justify-center items-center gap-3"
        >
          <div>
            <Avatar size={!hideSidebar ? "xs" : "sm"} name="Ntwali Edson" />
          </div>
          {#if !hideSidebar}
            <div>
              <p class="font-medium text-[13.5px] capitalize text-slate-700">
                Ntwali edson
              </p>
            </div>
          {/if}
        </div>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        {#if !hideSidebar}
          <!-- svelte-ignore a11y-missing-attribute -->
          <a
            on:click={(e) => {
              showProfileDropdown = !showProfileDropdown;
            }}
            class="h-8 w-8 cursor-pointer flex items-center justify-center rounded-[3px] hover:bg-slate-200"
          >
            <MoreHorizontalIcon class="text-slate-600" size="16" />
          </a>
        {/if}
      </div>
    </div>
  </div>
</div>
