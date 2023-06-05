<script lang="ts">
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
    SunIcon,
    Trash2Icon,
    UploadCloudIcon,
    XIcon,
  } from "svelte-feather-icons";
  import Pdf from "../vectors/documents/Pdf.svelte";
  import Docx from "../vectors/documents/Docx.svelte";
  import Markdown from "../vectors/documents/Markdown.svelte";
  import Avatar from "../ui/Avatar.svelte";
  import { clickOutside } from "../../directives/clickOutside";
  import { scale } from "svelte/transition";
  import { linear } from "svelte/easing";
  import * as modals from "@/stores/modals";
  import Menu from "./Menu.svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  import { uiState, setUiState } from "@/stores/layout";
  import LoadingOverlay from "../ui/LoadingOverlay.svelte";
  import { auth, logout } from "@/stores/auth";
  import Skeleton from "../ui/Skeleton.svelte";
  import client from "@/lib/client";
  import { useQuery, useQueryClient } from "@sveltestack/svelte-query";
  import Chat from "./Chat.svelte";
  import CircleSpinner from "../ui/CircleSpinner.svelte";
  import { chatsQueryKey } from "@/stores/queryKeys";
  import createChat from "@/utils/createChat";
  import { addToast } from "@/stores/toast";
  import ChatItem from "./ChatItem.svelte";
  import Switch from "../ui/Switch.svelte";
  import { getThemeStore } from "@/lib/theme/context";

  const handleCallapse = () => {
    setUiState({ ...$uiState, hideSidebar: true });
  };

  $: hideSidebar = $uiState.hideSidebar;

  // export let hideSidebar;
  // export let handleCallapse;

  let showProfileDropdown = false;

  interface Chat {
    id: number;
    type: string;
    title: string;
    status: string;
    pages: number;
    create_at: string;
  }

  const actions = [
    {
      title: "Delete all documents",
      icon: Trash2Icon,
      click: () => {
        modals.open("confirm", {
          confirm: () => {
            modals.update("confirm", { loading: true });
            return client
              .collection("chats")
              .where("user_id", "==", user?.id)
              .delete()
              .then((e) => {
                queryClient.invalidateQueries($chatsQueryKey);
                setTimeout(() => {
                  modals.update("confirm", { loading: false });
                  modals.close();
                  addToast({
                    message: "All document chats was deleted",
                    type: "success",
                    title: "Deleted succesfully",
                  });
                  console.log("Deleted Documents");
                }, 500);
              });
          },
          title: "Delete all documents",
          desc: "Delete your files and start fresh by deleting all documents in one go.",
        });
      },
    },
    { title: "Dark mode", icon: SunIcon, onSwitch: () => {} },
    {
      title: "Logout",
      icon: LogOutIcon,
      click: () => {
        modals.open("confirm", {
          confirm: () => {
            modals.update("confirm", { loading: true });
            setTimeout(() => {
              return client
                .auth()
                .logout()
                .then((e) => {
                  modals.close();
                  goto("/");
                  modals.update("confirm", { loading: false });
                  logout();
                });
            }, 2000);
          },
          title: "Logout your account.",
          desc: "Sign out instantly for enhanced security.",
        });
      },
    },
  ];

  let inputRef;

  $: user = $auth.user;
  $: authLoading = $auth.loading;

  const fetcher = ({ queryKey }) => {
    const filters = queryKey[1];
    const q = client.collection("chats").where("user_id", "==", user?.id);

    if (filters?.search) q.search("title", filters?.search);

    return q
      .limit(7)
      .get()
      .then((e: any) =>
        e.map((e) => {
          return {
            ...e,
            created_at: new Date(e?.created_at).toLocaleDateString("en-US", {
              day: "2-digit",
              year: "numeric",
              month: "short",
            }),
          };
        })
      );
  };

  let searchText = "";

  let timer;

  const debounce = (v) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      searchText = v;
    }, 1000);
  };

  $: queryKeys = ["chats", { search: searchText }];

  $: chatsQueryKey.set(queryKeys);

  $: chatsResult = useQuery({
    queryKey: ["chats", { search: searchText }],
    queryFn: fetcher,
    enabled: Boolean(user) && !authLoading,
    keepPreviousData: true,
  });
  let uploadingFile = false;

  const queryClient = useQueryClient();

  const handleChange = async (e) => {
    uploadingFile = true;
    const file = e.target.files[0];

    return createChat({ file, user })
      .then((data) => {
        uploadingFile = false;
        addToast({
          title: "Chat created success",
          message: "You can start chatting with your file.",
          type: "success",
        });
        queryClient.invalidateQueries($chatsQueryKey);
        setTimeout(() => {
          goto(`/chats/${data?.id}`);
        }, 1000);
      })
      .catch((e) => {
        uploadingFile = false;
        addToast({
          title: e.message,
          type: "danger",
        });
        console.log(e);
      });
  };

  $: chats = $chatsResult?.data || [];

  const theme: any = getThemeStore();

  $: currentTheme = $theme;
</script>

<div
  class="{hideSidebar
    ? ' w-[50px]'
    : ' w-[400px]'} h-screen dark:bg-slate-900 bg-white border-t border-b flex flex-col border-r dark:border-slate-700 dark:bg-opacity-50 border-slate-300"
>
  <div
    class="px-2 py-2 w-full border-b dark:border-slate-700 dark:bg-opacity-50 border-slate-300"
  >
    <div class="flex items-center w-full justify-between gap-2">
      <a href="/chats">
        <img class="h-8 w-8 rounded-[3px]" src="/images/logo.png" alt="" />
      </a>
      {#if !hideSidebar}
        <a
          href="/chats"
          class="flex dark:text-slate-100 text-slate-900 items-center gap-2"
        >
          <GridIcon size="18" />
          <span class="font-semibold text-[13.5px]"> Documents </span>
        </a>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-missing-attribute -->
        <a
          on:click={() => {
            handleCallapse();
          }}
          class="h-8 w-8 cursor-pointer flex items-center justify-center rounded-[3px] dark:text-slate-200 dark:hover:bg-slate-800 hover:bg-slate-200"
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
        : ' px-3 py-[8px]'} mx-2 my-2 focus-within:border-primary focus-within:dark:border-primary dark:border-slate-700 dark:border-opacity-40 border-slate-200 bg-opacity-30 items-center gap-1 dark:bg-opacity-50 dark:bg-slate-800 bg-slate-200 rounded-[3px]"
    >
      <SearchIcon size="15" class="dark:text-slate-300 text-slate-700" />
      {#if !hideSidebar}
        <input
          on:keyup={({ target: { value } }) => debounce(value)}
          value={searchText}
          type="text"
          placeholder="Search here.."
          class=" bg-transparent px-2 w-full font-medium dark:text-slate-400 dark:placeholder:text-slate-400 text-slate-600 text-[13px] outline-none"
        />
      {/if}
      {#if $chatsResult.isFetching && $chatsResult.data}
        <CircleSpinner />
      {/if}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      {#if searchText && $chatsResult.status === "success"}
        <!-- svelte-ignore a11y-missing-attribute -->
        <a
          on:click={(e) => {
            searchText = "";
          }}
          class="cursor-pointer"
        >
          <XIcon size="14" class="text-slate-600" />
        </a>
      {/if}
    </div>
    <div
      class="flex-1 flex flex-col border-t dark:border-slate-700 dark:bg-opacity-50 border-slate-200 h-full"
    >
      <div class="px-0 w-full h-full">
        {#if $chatsResult.status === "loading"}
          <div class="h-[200px] w-full flex items-center justify-center">
            <CircleSpinner />
          </div>
        {/if}
        {#if $chatsResult.status === "success" && chats.length === 0}
          <div
            class="h-[300px] gap-3 flex flex-col w-full items-center justify-center"
          >
            <img
              class="w-[120px] select-none"
              draggable="false"
              src="/images/empty.svg"
              alt=""
            />
            <p
              class="text-center max-w-[230px] leading-7 dark:text-slate-400 text-slate-500 text-[13px] font-medium"
            >
              There are currently no documents, Please <a
                on:click={() => {
                  inputRef.click();
                }}
                class="text-primary text-opacity-80 font-semibold"
                href="">Click here to upload.</a
              >
            </p>
          </div>
        {/if}

        {#each chats as chat, i}
          <ChatItem {chat} {hideSidebar} />
        {/each}
      </div>

      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        on:click={() => inputRef.click()}
        class="{!user
          ? 'pointer-events-none opacity-50'
          : ''} bg-slate-100 relative cursor-pointer flex {!hideSidebar
          ? 'm-3 py-5'
          : 'm-2 py-2'} text-center border dark:border-slate-700 dark:bg-opacity-50 dark:bg-slate-800 border-slate-300 border-dashed rounded-[3px] flex-col justify-center items-center gap-3"
      >
        {#if uploadingFile}
          <LoadingOverlay />
        {/if}
        <input
          bind:this={inputRef}
          on:change={handleChange}
          type="file"
          class="hidden"
          name=""
          id=""
        />
        <UploadCloudIcon
          class="text-slate-600 dark:text-slate-300"
          size={!hideSidebar ? "20" : "16"}
        />
        {#if !hideSidebar}
          <!-- svelte-ignore a11y-invalid-attribute -->
          <!-- svelte-ignore a11y-missing-attribute -->
          <a
            on:click={(e) => {
              inputRef.click();
            }}
            class="flex items-center gap-2 text-[13px] font-semibold text-primary"
          >
            <PlusIcon strokeWidth={3} size="14" />
            <span>Create New chat</span>
          </a>
          <p
            class="text-[13px] dark:text-slate-300 capitalize text-slate-500 font-medium"
          >
            click to Upload a document.
          </p>
        {/if}
      </div>
    </div>
    <div
      class="border-t dark:border-slate-700 dark:bg-opacity-30 relative border-slate-200 pt-0"
    >
      <div
        class="{!hideSidebar
          ? 'px-3  justify-between'
          : 'justify-center'} w-full flex items-center mx-[6px]- py-[6px] cursor-pointer rounded-[3px]- dark:hover:bg-slate-800 dark:hover:bg-opacity-40 hover:bg-slate-200 hover:bg-opacity-30 hover:border-slate-200- border border-transparent"
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
            class="absolute rounded-[3px] p-1 left-1 bottom-14 border dark:border-slate-700 dark:bg-opacity border-slate-200 shadow-sm dark:bg-slate-900 bg-white w-[97%] mx-auto"
          >
            <ul>
              {#each actions as action}
                <li class="w-full">
                  <!-- svelte-ignore a11y-click-events-have-key-events -->
                  <!-- svelte-ignore a11y-missing-attribute -->
                  <a
                    on:click={(e) => {
                      if (action.click) {
                        showProfileDropdown = false;
                        action.click();
                      } else {
                        if (action.onSwitch) {
                          theme.setTheme(
                            currentTheme === "dark" ? "light" : "dark"
                          );
                        }
                      }
                    }}
                    class="flex cursor-pointer justify-between w-full dark:hover:bg-slate-800 hover:bg-slate-100 rounded-[3px] my-1 items-center gap-2 py-2 px-2"
                  >
                    <div class="flex items-center flex-1 w-full gap-2">
                      <svelte:component
                        this={action.icon}
                        class="dark:text-slate-400 text-slate-600"
                        size={"16"}
                      />
                      <span
                        class="text-[13px] dark:text-slate-300 text-slate-600 font-medium capitalize"
                      >
                        {action.title}
                      </span>
                    </div>

                    <div>
                      {#if action.onSwitch}
                        <Switch
                          checked={currentTheme === "dark"}
                          on:change={(e) => {
                            theme.setTheme(
                              currentTheme === "dark" ? "light" : "dark"
                            );
                          }}
                        />
                      {/if}
                    </div>
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
              if (user) {
                showProfileDropdown = true;
              }
            }
          }}
          class="flex flex-1 justify-center items-center gap-3"
        >
          <div>
            {#if user}
              <Avatar
                src={user?.photo}
                size={!hideSidebar ? "xs" : "sm"}
                name={user?.username}
              />
            {:else}
              <Skeleton customClass="h-7 w-7" />
            {/if}
          </div>
          {#if !hideSidebar}
            <div class="w-full">
              {#if user}
                <p
                  class="font-medium dark:text-slate-200 text-[13.5px] capitalize text-slate-700"
                >
                  {user?.username}
                </p>
              {:else}
                <Skeleton customClass="h-4 w-[70%]" />
              {/if}
            </div>
          {/if}
        </div>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        {#if !hideSidebar}
          <!-- svelte-ignore a11y-missing-attribute -->
          <a
            on:click={(e) => {
              if (user) {
                showProfileDropdown = !showProfileDropdown;
              }
            }}
            class="h-8 w-8 cursor-pointer flex items-center justify-center rounded-[3px] dark:hover:bg-slate-800 hover:bg-slate-200"
          >
            <MoreHorizontalIcon
              class="dark:text-slate-300 text-slate-600"
              size="16"
            />
          </a>
        {/if}
      </div>
    </div>
  </div>
</div>
