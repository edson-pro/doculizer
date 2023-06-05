<script lang="ts">
  import CircleSpinner from "@/components/ui/CircleSpinner.svelte";
  import Loader from "@/components/ui/Loader.svelte";
  import { addToast } from "@/stores/toast";
  import { LinkIcon, UploadCloudIcon, UploadIcon } from "svelte-feather-icons";
  import { auth } from "@/stores/auth";
  import client from "@/lib/client";
  import { chatsQueryKey } from "@/stores/queryKeys";
  import { useQueryClient } from "@sveltestack/svelte-query";
  import { goto } from "$app/navigation";
  import createChat from "@/utils/createChat";

  const providers = [
    {
      name: "Google docs",
      icon: "/images/google-docs.png",
    },
    { name: "Microsoft docx", icon: "/images/ms-word.png" },
    // { name: "Notion pages", icon: "/images/notion.svg" },
  ];

  let loadingLink = false;
  let uploadingFile = false;

  const queryClient = useQueryClient();

  $: user = $auth.user;

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
          goto(`/chats/${data.id}`);
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

  let url = "";

  let fileInput;

  async function validateAndExtractFileName(url) {
    if (url) {
      // Check if the link matches a known cloud document pattern
      const googleDocsPattern = /^https:\/\/docs\.google\.com\/(?:document)\//;
      const microsoftDocsPattern = /^https:\/\/1drv\.ms\/w\/(.*)$/;
      const notionPattern = /^(https?:\/\/)?([\w-]+)\.notion\.site\/(.*)$/;
      if (
        googleDocsPattern.test(url) ||
        microsoftDocsPattern.test(url) ||
        notionPattern.test(url)
      ) {
        loadingLink = true;
        // Send the URL to the upload-cloud-docs endpoint
        const uploadURL = "/api/upload-cloud-docs";
        let type = "";
        if (googleDocsPattern.test(url)) {
          type = "google-docs";
        } else if (microsoftDocsPattern.test(url)) {
          type = "ms-word";
        } else if (notionPattern.test(url)) {
          type = "notion";
        }
        try {
          const response = await fetch(uploadURL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ url, type }),
          });

          if (!response.ok) {
            loadingLink = false;

            throw Error("Cloud document upload failed");
            return null;
          }

          // Extract file name from the response if needed
          const { fileName } = await response.json();

          loadingLink = false;

          return { fileName, fileType: type };
        } catch (error) {
          addToast({
            title: error.message,
            type: "danger",
          });
          loadingLink = false;
          return null;
        }
      } else {
        try {
          loadingLink = true;
          const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
          if (!urlRegex.test(url)) {
            throw Error("Invalid URL");
          }
          const filename = url.substring(url.lastIndexOf("/") + 1);
          const fileExtension = filename
            .substring(filename.lastIndexOf(".") + 1)
            .toLowerCase();
          if (
            fileExtension !== "docx" &&
            fileExtension !== "pdf" &&
            fileExtension !== "md"
          ) {
            throw Error("Invalid file type");
          }
          const response = await fetch(url, { method: "HEAD" });
          if (!response.ok) {
            throw Error("URL does not exist or could not be accessed");
          }
          let fileType;
          if (fileExtension === "docx") {
            fileType = "docx";
          } else if (fileExtension === "pdf") {
            fileType = "pdf";
          } else if (fileExtension === "md") {
            fileType = "markdown";
          }
          const chat: any = await client.collection("chats").create({
            user_id: user.id,
            title: filename,
            type: fileType,
            file: url,
            pages: 1,
            status: "processing",
          });
          addToast({
            title: "Chat created success",
            message: "You can start chatting with your file.",
            type: "success",
          });
          queryClient.invalidateQueries($chatsQueryKey);
          setTimeout(() => {
            goto(`/chats/${chat.id}`);
            loadingLink = false;
          }, 1000);
          return filename;
        } catch (error) {
          addToast({
            title: error.message,
            type: "danger",
          });
          loadingLink = false;
        }
      }
    }
  }
</script>

<svelte:head>
  <title>
    {"Doculize"}
  </title>
</svelte:head>

<div
  class="w-full border-t dark:bg-slate-900 dark:border-slate-800 border-slate-300 border-b h-screen"
>
  <div
    class="{!user
      ? 'pointer-events-none opacity-75'
      : ''} bg-white dark:bg-slate-800 dark:bg-opacity-30 dark:border-slate-700 rounded-[3px] bg-opacity-50 p-3 max-w-xl my-32 mx-auto border border-slate-200"
  >
    <div class=" p-3">
      <div class="flex items-center justify-center gap-3 flex-col">
        <div
          class="border dark:border-slate-600 border-slate-200 rounded-[3px] w-fit"
        >
          <input
            on:change={handleChange}
            bind:this={fileInput}
            type="file"
            class="hidden"
            disabled={!user}
          />
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div
            on:click={(e) => {
              fileInput.click();
            }}
            class="bg-slate-50 dark:bg-slate-800 dark:bg-opacity-50 cursor-pointer border-white dark:border-opacity-40 dark:border-slate-700 border-4 flex justify-center items-center rounded-[3px] w-[150px] h-20"
          >
            {#if uploadingFile}
              <CircleSpinner />
            {:else}
              <UploadCloudIcon class="text-slate-500 dark:text-slate-300" />
            {/if}
          </div>
        </div>
        <h4
          class="font-semibold mt-2 dark:text-slate-200 text-sm text-slate-700 leading-7"
        >
          Drag and drop files here to chat with.
        </h4>
        <p class="text-[13px] dark:text-slate-400 font-medium text-slate-500">
          Effortlessly exchange files in the chat by dragging and dropping them
          here.
        </p>
      </div>
    </div>

    <div class="relative flex py-5 items-center">
      <div class="flex-grow border-t dark:border-gray-700 border-gray-200" />
      <span
        class="flex-shrink font-medium mx-4 text-[13px] capitalize text-gray-500"
        >or connet to</span
      >
      <div class="flex-grow border-t dark:border-gray-700 border-gray-200" />
    </div>
    <div class="flex items-center p-4 justify-center gap-4">
      {#each providers as provider}
        <a
          href=""
          class="h-12 cursor-default pointer-events-none hover:bg-slate-100 w-12 flex justify-center items-center border dark:border-slate-700 border-slate-200 rounded-[3px]"
        >
          <img class="h-7 w-6 object-contain" src={provider.icon} alt="" />
        </a>
      {/each}
    </div>

    <form
      on:submit={(e) => {
        e.preventDefault();
        validateAndExtractFileName(url);
      }}
      class="flex border dark:bg-slate-700 dark:bg-opacity-20 mt-3 dark:border-opacity-40 border-primary px-3 py-3 rounded-[3px] items-center"
    >
      <LinkIcon size="16" class="text-slate-600 mx-1" />
      <input
        bind:value={url}
        class="flex-1 text-[13.3px] bg-transparent dark:text-slate-400 dark:placeholder:text-slate-500 text-slate-600 font-medium px-2 outline-none"
        type="text"
        placeholder="Upload file by pasting URL here."
      />
      {#if loadingLink}
        <Loader />
      {:else}
        <!-- svelte-ignore a11y-missing-attribute -->
        <a type="submit" class="cursor-pointer">
          <UploadIcon strokeWidth={3} class="text-primary" size="16" />
        </a>
      {/if}
    </form>
    <p class="text-[12px] text-center text-slate-400 py-2 font-medium">
      You can provide a Google doc link,Notion page and Microsoft docs.
    </p>
  </div>
</div>
