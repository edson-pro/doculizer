<script lang="ts">
  import SvelteMarkdown from "svelte-markdown";
  import Avatar from "../ui/Avatar.svelte";
  import CodePreview from "./CodePreview.svelte";
  import CircleSpinner from "../ui/CircleSpinner.svelte";

  export let messages;
  export let loading;
  export let onSuggest;

  const suggestions = [
    "What are the intellectual property rights assigned to Unit U+2467 GmbH.",
    "How does the Employer handle the release of an Employee from work after termination.",
    "What is the monthly gross remuneration for a Software Developer at Unit U+2467 GmbH.",
    "What are the confidentiality agreements that an Employee must adhere to with respect to Ape Unit, KB21.",
  ];
</script>

<div
  class="scrollbar scrollbar-thin- scrollbar-w-1 scrollbar-corner-slate-600 scrollbar-thumb-rounded scrollbar-thin- scrollbar-thumb-slate-400 scrollbar-track-white flex-1 overflow-y-scroll relative pb-3 bg-opacity-50 p-4- h-full"
>
  {#if loading}
    <div class="h-full w-full flex items-center justify-center">
      <CircleSpinner />
    </div>
  {/if}
  {#each messages as chat}
    <div
      class={`flex p-4 gap-4 items-start ${
        chat.role === "user" ? "bg-slate-100" : ""
      }`}
    >
      <div>
        {#if chat.role === "user"}
          <Avatar name="Ntwali edson" />
        {/if}
        {#if chat.role === "system"}
          <div
            class="w-8 h-8 flex items-center justify-center rounded-[3px] bg-primary"
          >
            <svg
              height="20px"
              width="20px"
              viewBox="0 0 24 24"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              class="fill-white"
              ><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              /><g id="SVGRepo_iconCarrier">
                <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                <title>ic_fluent_bot_24_regular</title>
                <desc>Created with Sketch.</desc>
                <g
                  id="🔍-Product-Icons"
                  stroke="none"
                  stroke-width="1"
                  fill-rule="evenodd"
                >
                  <g id="ic_fluent_bot_24_regular" fill-rule="nonzero">
                    <path
                      d="M17.7530511,13.999921 C18.9956918,13.999921 20.0030511,15.0072804 20.0030511,16.249921 L20.0030511,17.1550008 C20.0030511,18.2486786 19.5255957,19.2878579 18.6957793,20.0002733 C17.1303315,21.344244 14.8899962,22.0010712 12,22.0010712 C9.11050247,22.0010712 6.87168436,21.3444691 5.30881727,20.0007885 C4.48019625,19.2883988 4.00354153,18.2500002 4.00354153,17.1572408 L4.00354153,16.249921 C4.00354153,15.0072804 5.01090084,13.999921 6.25354153,13.999921 L17.7530511,13.999921 Z M17.7530511,15.499921 L6.25354153,15.499921 C5.83932796,15.499921 5.50354153,15.8357075 5.50354153,16.249921 L5.50354153,17.1572408 C5.50354153,17.8128951 5.78953221,18.4359296 6.28670709,18.8633654 C7.5447918,19.9450082 9.44080155,20.5010712 12,20.5010712 C14.5599799,20.5010712 16.4578003,19.9446634 17.7186879,18.8621641 C18.2165778,18.4347149 18.5030511,17.8112072 18.5030511,17.1550005 L18.5030511,16.249921 C18.5030511,15.8357075 18.1672647,15.499921 17.7530511,15.499921 Z M11.8985607,2.00734093 L12.0003312,2.00049432 C12.380027,2.00049432 12.6938222,2.2826482 12.7434846,2.64872376 L12.7503312,2.75049432 L12.7495415,3.49949432 L16.25,3.5 C17.4926407,3.5 18.5,4.50735931 18.5,5.75 L18.5,10.254591 C18.5,11.4972317 17.4926407,12.504591 16.25,12.504591 L7.75,12.504591 C6.50735931,12.504591 5.5,11.4972317 5.5,10.254591 L5.5,5.75 C5.5,4.50735931 6.50735931,3.5 7.75,3.5 L11.2495415,3.49949432 L11.2503312,2.75049432 C11.2503312,2.37079855 11.5324851,2.05700336 11.8985607,2.00734093 L12.0003312,2.00049432 L11.8985607,2.00734093 Z M16.25,5 L7.75,5 C7.33578644,5 7,5.33578644 7,5.75 L7,10.254591 C7,10.6688046 7.33578644,11.004591 7.75,11.004591 L16.25,11.004591 C16.6642136,11.004591 17,10.6688046 17,10.254591 L17,5.75 C17,5.33578644 16.6642136,5 16.25,5 Z M9.74928905,6.5 C10.4392523,6.5 10.9985781,7.05932576 10.9985781,7.74928905 C10.9985781,8.43925235 10.4392523,8.99857811 9.74928905,8.99857811 C9.05932576,8.99857811 8.5,8.43925235 8.5,7.74928905 C8.5,7.05932576 9.05932576,6.5 9.74928905,6.5 Z M14.2420255,6.5 C14.9319888,6.5 15.4913145,7.05932576 15.4913145,7.74928905 C15.4913145,8.43925235 14.9319888,8.99857811 14.2420255,8.99857811 C13.5520622,8.99857811 12.9927364,8.43925235 12.9927364,7.74928905 C12.9927364,7.05932576 13.5520622,6.5 14.2420255,6.5 Z"
                      id="🎨-Color"
                    />
                  </g>
                </g>
              </g></svg
            >
          </div>
        {/if}
      </div>
      <div>
        {#if chat.role === "user"}
          <p
            class="text-[13px] font-medium text-slate-700 text-opacity-95 leading-8"
          >
            {chat.content}
          </p>
        {/if}
        {#if chat.role === "system"}
          <div
            id="wrapper"
            class="p-5- -mt-1 font-medium prose-headings:mb-3 prose-p:mb-3 prose-p:text-slate-500 prose-code:!text-[13.5px] prose-code:!leading-7 prose-code:!rounded-[3px] prose-code:!p-[10px] prose-code:!my-4 prose-strong:text-slate-800 prose-strong:!font-semibold overflow-hidden prose-slate prose-sm prose-h1:text-[15px] prose-p:text-[13px] prose-h1:font-semibold prose-p:leading-8 prose lg:prose-xl"
          >
            <SvelteMarkdown
              source={chat.content}
              renderers={{ code: CodePreview }}
            />
          </div>
        {/if}
      </div>
    </div>
  {/each}
  {#if !messages.length && !loading}
    <div class="flex-1 h-full bg-blue-200-">
      <div class="px-3 h-full my-3">
        <div class="flex px-4 h-full justify-center flex-col">
          <div
            class="flex mb-2 -mt-12 flex-col gap-3 justify-center items-center"
          >
            <svg
              height="36"
              width="36"
              class="fill-primary stroke-primary"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              ><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              /><g id="SVGRepo_iconCarrier">
                <title />
                <g id="idea">
                  <path
                    d="M16.52,3.66A7,7,0,0,0,5,9.17a9.49,9.49,0,0,0,3,6.24c.51.58,1,1.18,1,1.49v2.38A2.72,2.72,0,0,0,11.72,22h.56A2.72,2.72,0,0,0,15,19.28V16.9c0-.31.53-.91,1-1.49A9.43,9.43,0,0,0,19,9,7,7,0,0,0,16.52,3.66ZM12.28,21h-.56A1.72,1.72,0,0,1,10,19.28V18h4v1.28A1.72,1.72,0,0,1,12.28,21Zm3-6.25c-.73.81-1.3,1.46-1.3,2.15V17H10v-.1c0-.69-.57-1.34-1.3-2.15A8.63,8.63,0,0,1,6,9.15a6,6,0,0,1,5-6.06A6,6,0,0,1,18,9C18,11.7,16.44,13.46,15.3,14.75Z"
                  /> <path d="M21.5,8h-1a.5.5,0,0,0,0,1h1a.5.5,0,0,0,0-1Z" />
                  <path
                    d="M4,8.5A.5.5,0,0,0,3.5,8h-1a.5.5,0,0,0,0,1h1A.5.5,0,0,0,4,8.5Z"
                  />
                  <path
                    d="M3.85,2.15a.49.49,0,0,0-.7.7l1,1a.48.48,0,0,0,.7,0,.48.48,0,0,0,0-.7Z"
                  />
                  <path
                    d="M19.5,4a.47.47,0,0,0,.35-.15l1-1a.49.49,0,0,0-.7-.7l-1,1a.48.48,0,0,0,0,.7A.47.47,0,0,0,19.5,4Z"
                  />
                  <path
                    d="M19.85,13.15a.49.49,0,0,0-.7.7l1,1a.48.48,0,0,0,.7,0,.48.48,0,0,0,0-.7Z"
                  />
                  <path
                    d="M4.15,13.15l-1,1a.48.48,0,0,0,0,.7.48.48,0,0,0,.7,0l1-1a.49.49,0,0,0-.7-.7Z"
                  />
                  <path
                    d="M13.15,7.15l-3,3a.47.47,0,0,0-.11.54.5.5,0,0,0,.46.31h1.79l-1.14,1.15a.48.48,0,0,0,0,.7.48.48,0,0,0,.7,0l2-2a.47.47,0,0,0,.11-.54A.5.5,0,0,0,13.5,10H11.71l2.14-2.15a.49.49,0,0,0-.7-.7Z"
                  />
                </g>
              </g></svg
            >
            <h4
              class="text-center font-medium text-[13px] text-slate-500 leading-7 mx-auto max-w-xs"
            >
              Ask me anything about the document, or just click one of the
              options below:
            </h4>
          </div>
          <div class="flex my-3 max-w-lg mx-auto mx-4 flex-col gap-3">
            {#each suggestions as suggestion}
              <!-- svelte-ignore a11y-click-events-have-key-events -->
              <!-- svelte-ignore a11y-missing-attribute -->
              <a
                on:click={() => {
                  onSuggest(suggestion);
                }}
                class="bg-blue-50 cursor-pointer border-l-[3px] border-l-primary bg-opacity-30 border border-slate-200 text-slate-600 font-medium text-[12.5px] px-3 py-[6px] rounded-[3px] leading-7"
              >
                <div />
                <p>{suggestion}</p>
              </a>
            {/each}
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>
