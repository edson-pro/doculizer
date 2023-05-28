<script>
  import {
    ChevronLeftIcon,
    ChevronRightIcon,
    FileIcon,
    GridIcon,
    ListIcon,
    MessageSquareIcon,
    MoreHorizontalIcon,
    MoreVerticalIcon,
    PlusCircleIcon,
    PlusIcon,
    SearchIcon,
    UploadCloudIcon,
    XIcon,
  } from "svelte-feather-icons";
  import Avatar from "../components/ui/Avatar.svelte";
  import Pdf from "../components/vectors/documents/Pdf.svelte";
  import Docx from "../components/vectors/documents/Docx.svelte";
  import { onMount } from "svelte";
  import PdfViewer from "../components/others/PdfViewer.svelte";
  import MarkdownViewier from "../components/others/MarkdownViewier.svelte";
  import DocxPreview from "../components/others/DocxPreview.svelte";
  import ChatList from "../components/others/chatList.svelte";
  import Sidebar from "../components/others/Sidebar.svelte";
  import DocumentPreview from "../components/others/DocumentPreview.svelte";

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

  const currentDoc = {
    type: "docx",
    title: "Senior position assesment",
    status: "processed",
    pages: 5,
    createAt: new Date("11/02/2021").toLocaleDateString("en-US", {
      day: "2-digit",
      year: "numeric",
      month: "short",
    }),
  };

  const suggestions = [
    "What are the intellectual property rights assigned to Unit U+2467 GmbH.",
    "How does the Employer handle the release of an Employee from work after termination.",
    "What is the monthly gross remuneration for a Software Developer at Unit U+2467 GmbH.",
    "What are the confidentiality agreements that an Employee must adhere to with respect to Ape Unit, KB21.",
  ];

  let hideSidebar = false;
</script>

<svelte:head>
  <title>Doculizer</title>
  <meta name="description" content="Chat with your documents." />
</svelte:head>

<section class="flex w-full">
  <Sidebar
    handeCallapse={() => {
      hideSidebar = !hideSidebar;
    }}
    {chats}
    {hideSidebar}
  />
  <div
    class="w-full flex border-t border-slate-300 border-b items-center h-screen"
  >
    <DocumentPreview {currentDoc} {hideSidebar} />
    <div class="w-[45%] bg-white flex h-full flex-col">
      <div
        class="flex items-center px-4 justify-between border-b border-slate-300 py-[10.5px]"
      >
        <div class="flex gap-3 items-center">
          <div class="flex items-center text-slate-800 gap-2">
            <MessageSquareIcon strokeWidth={2.5} size="16" />
            <h4 class="font-semibold capitalize text-[13px]">Chat.</h4>
          </div>
        </div>
        <a
          class="h-7 w-7 -mr-[6px] flex items-center justify-center rounded-[3px] hover:bg-slate-100"
          href=""
          ><svg
            class="fill-slate-700"
            height="17"
            width="17"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            ><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            /><g id="SVGRepo_iconCarrier">
              <path
                d="M13.9907,1.31133017e-07 C14.8816,1.31133017e-07 15.3277,1.07714 14.6978,1.70711 L13.8556,2.54922 C14.421,3.15654 14.8904,3.85028 15.2448,4.60695 C15.8028,5.79836 16.0583,7.109 15.9888,8.42277 C15.9193,9.73654 15.5268,11.0129 14.8462,12.1388 C14.1656,13.2646 13.2178,14.2053 12.0868,14.8773 C10.9558,15.5494 9.67655,15.9322 8.3623,15.9918 C7.04804,16.0514 5.73937,15.7859 4.55221,15.2189 C3.36505,14.652 2.33604,13.8009 1.55634,12.7413 C0.776635,11.6816 0.270299,10.446 0.0821822,9.14392 C0.00321229,8.59731 0.382309,8.09018 0.928918,8.01121 C1.47553,7.93224 1.98266,8.31133 2.06163,8.85794 C2.20272,9.83451 2.58247,10.7612 3.16725,11.556 C3.75203,12.3507 4.52378,12.989 5.41415,13.4142 C6.30452,13.8394 7.28602,14.0385 8.27172,13.9939 C9.25741,13.9492 10.2169,13.6621 11.0651,13.158 C11.9133,12.6539 12.6242,11.9485 13.1346,11.1041 C13.6451,10.2597 13.9395,9.30241 13.9916,8.31708 C14.0437,7.33175 13.8521,6.34877 13.4336,5.45521 C13.178,4.90949 12.8426,4.40741 12.4402,3.96464 L11.7071,4.69779 C11.0771,5.32776 9.99996,4.88159 9.99996,3.99069 L9.99996,1.31133017e-07 L13.9907,1.31133017e-07 Z M1.499979,4 C2.05226,4 2.499979,4.44772 2.499979,5 C2.499979,5.55229 2.05226,6 1.499979,6 C0.947694,6 0.499979,5.55228 0.499979,5 C0.499979,4.44772 0.947694,4 1.499979,4 Z M3.74998,1.25 C4.30226,1.25 4.74998,1.69772 4.74998,2.25 C4.74998,2.80229 4.30226,3.25 3.74998,3.25 C3.19769,3.25 2.74998,2.80228 2.74998,2.25 C2.74998,1.69772 3.19769,1.25 3.74998,1.25 Z M6.99998,0 C7.55226,0 7.99998,0.447716 7.99998,1 C7.99998,1.55229 7.55226,2 6.99998,2 C6.44769,2 5.99998,1.55229 5.99998,1 C5.99998,0.447716 6.44769,0 6.99998,0 Z"
              />
            </g></svg
          >
        </a>
      </div>
      <!-- <div class="flex-1 h-full bg-blue-200-">
        <div class="px-3 h-full my-3">
          <div class="flex h-full justify-center flex-col">
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
                <a
                  href="#"
                  class="bg-blue-50 cursor-pointer border-l-[3px] border-l-primary bg-opacity-30 border border-slate-200 text-slate-600 font-medium text-[12.5px] px-3 py-[6px] rounded-[3px] leading-7"
                >
                  <div />
                  <p>{suggestion}</p>
                </a>
              {/each}
            </div>
          </div>
        </div>
      </div> -->
      <ChatList />
      <div
        class="px-3 border-t border-slate-300 bg-slate-100 bg-opacity-60 pt-[10px] pb-1"
      >
        <form
          class="flex px-[10px] py-3 bg-white border-opacity-50 border-primary items-center border border-slate-300- rounded-[3px]"
        >
          <input
            type="text"
            placeholder="Ask me anyhting about this document.."
            class="w-full px-1 text-slate-700 placeholder:text-slate-500 text-[13px] font-medium outline-none bg-transparent"
            name=""
            id=""
          />
          <a href="#" type="submit">
            <svg
              height="21"
              width="21"
              class="stroke-primary"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              ><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              /><g id="SVGRepo_iconCarrier">
                <path
                  d="M10.5004 11.9998H5.00043M4.91577 12.2913L2.58085 19.266C2.39742 19.8139 2.3057 20.0879 2.37152 20.2566C2.42868 20.4031 2.55144 20.5142 2.70292 20.5565C2.87736 20.6052 3.14083 20.4866 3.66776 20.2495L20.3792 12.7293C20.8936 12.4979 21.1507 12.3822 21.2302 12.2214C21.2993 12.0817 21.2993 11.9179 21.2302 11.7782C21.1507 11.6174 20.8936 11.5017 20.3792 11.2703L3.66193 3.74751C3.13659 3.51111 2.87392 3.39291 2.69966 3.4414C2.54832 3.48351 2.42556 3.59429 2.36821 3.74054C2.30216 3.90893 2.3929 4.18231 2.57437 4.72906L4.91642 11.7853C4.94759 11.8792 4.96317 11.9262 4.96933 11.9742C4.97479 12.0168 4.97473 12.0599 4.96916 12.1025C4.96289 12.1506 4.94718 12.1975 4.91577 12.2913Z"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g></svg
            >
          </a>
        </form>
        <p class="text-[12.5px] text-center text-slate-500 py-2 font-medium">
          Free Research Preview. Doculizer may produce inaccurate response.
        </p>
      </div>
    </div>
  </div>
</section>
