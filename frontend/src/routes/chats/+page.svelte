<script>
  import Loader from "@/components/ui/Loader.svelte";
  import {
    FileIcon,
    Link2Icon,
    LinkIcon,
    UploadCloudIcon,
    UploadIcon,
  } from "svelte-feather-icons";

  const providers = [
    {
      name: "Google docs",
      icon: "/images/google-docs.png",
    },
    { name: "Microsoft docx", icon: "/images/ms-word.png" },
    { name: "Notion pages", icon: "/images/notion.svg" },
  ];

  let loadingLink = false;
  let uploadingFile = false;
</script>

<div class="w-full border-t border-slate-300 border-b h-screen">
  <div class="bg-white p-3 max-w-xl my-32 mx-auto border border-slate-200">
    <div class=" p-3">
      <div class="flex items-center justify-center gap-3 flex-col">
        <div class="border border-slate-200 rounded-[3px] w-fit">
          <div
            class="bg-slate-50 border-white border-4 flex justify-center items-center rounded-[3px] w-[150px] h-20"
          >
            {#if uploadingFile}
              <Loader />
            {:else}
              <UploadCloudIcon class="text-slate-500" />
            {/if}
          </div>
        </div>
        <h4 class="font-semibold mt-2 text-sm to-slate-700 leading-7">
          Drag and drop files here to chat with
        </h4>
        <p class="text-[13px] font-medium text-slate-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
    </div>

    <div class="relative flex py-5 items-center">
      <div class="flex-grow border-t border-gray-200" />
      <span
        class="flex-shrink font-medium mx-4 text-[13px] capitalize text-gray-500"
        >or connet to</span
      >
      <div class="flex-grow border-t border-gray-200" />
    </div>
    <div class="flex items-center p-4 justify-center gap-4">
      {#each providers as provider}
        <a
          href=""
          class="h-12 cursor-default hover:bg-slate-100 w-12 flex justify-center items-center border border-slate-200 rounded-[3px]"
        >
          <img class="h-7 w-6 object-contain" src={provider.icon} alt="" />
        </a>
      {/each}
    </div>

    <div
      class="flex border mt-3 border-primary px-3 py-3 rounded-[3px] items-center"
    >
      <LinkIcon size="16" class="text-slate-600 mx-1" />
      <input
        class="flex-1 text-[13.3px] text-slate-600 font-medium px-2 outline-none"
        type="text"
        placeholder="Upload file by pasting URL here."
        name=""
        id=""
      />
      {#if loadingLink}
        <Loader />
      {:else}
        <UploadIcon strokeWidth={3} class="text-primary" size="16" />
      {/if}
    </div>
  </div>
</div>
