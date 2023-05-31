<script lang="ts">
  import { MessageSquareIcon } from "svelte-feather-icons";
  import ChatList from "./chatList.svelte";
  import * as modals from "@/stores/modals";
  import CircleSpinner from "../ui/CircleSpinner.svelte";
  import client from "@/lib/client";
  import { useQueryClient } from "@sveltestack/svelte-query";
  import { addToast } from "@/stores/toast";

  export let loadingMessages;
  export let messages = [];
  export let user;
  export let chat;
  export let messagesQk;

  let history = [];

  let streaming = false;

  let loading = false;

  const queryClient = useQueryClient();

  const setMessages = (newMsgs) => {
    queryClient.setQueryData(messagesQk, newMsgs);
  };

  const handleClear = () => {
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
      desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque vertenetur quod eius.",
    });
  };

  let message = "";

  let streamingMessage = "";

  const storeMessages = async (messages) => {
    for (let index = 0; index < messages.length; index++) {
      const msg = messages[index];
      await client.collection("messages").create({
        role: msg.role,
        content: msg.content,
        user_id: user.id,
        chat_id: chat.id,
      });
    }
  };

  const handleSubmit = async ({ message: incomingMessage }) => {
    console.log(incomingMessage);
    if (incomingMessage) {
      setMessages([...messages, { content: incomingMessage, role: "user" }]);
      const question = incomingMessage.trim();
      streamingMessage = "";
      loading = true;
      message = "";

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          history,
        }),
      });

      const stream: any = res.body;
      const reader = stream.getReader();

      loading = false;
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done || value === "[DONE]") {
            console.log("done");
            const sytemAnswer = {
              role: "system",
              content: streamingMessage,
            };
            const userQuestion = {
              role: "user",
              content: question,
            };
            streamingMessage = "";

            setMessages([...messages, sytemAnswer]);
            await storeMessages([userQuestion, sytemAnswer]);

            break;
          }
          const decodedValue: any = new TextDecoder().decode(value);
          if (decodedValue === "[DONE]") {
            continue;
          }
          streamingMessage = streamingMessage + decodedValue;
        }
      } catch (error) {
        console.error(error);
      } finally {
        reader.releaseLock();
        console.log("finaly");
      }
    }
  };

  $: chatMessages = streamingMessage
    ? [...messages, { role: "system", content: streamingMessage }]
    : messages;

  $: console.log("streaming ---", streamingMessage);
</script>

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
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-missing-attribute -->
    <a
      class="h-7 w-7 cursor-pointer -mr-[6px] flex items-center justify-center rounded-[3px] hover:bg-slate-100"
      on:click={() => {
        handleClear();
      }}
      ><svg
        class="fill-slate-700"
        height="15"
        width="15"
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

  <ChatList
    onSuggest={(message) => {
      handleSubmit({ message });
    }}
    loading={loadingMessages}
    messages={chatMessages}
  />

  <div
    class="px-3 border-t border-slate-300 bg-slate-100 bg-opacity-60 pt-[10px] pb-1"
  >
    <form
      on:submit|preventDefault={() => handleSubmit({ message })}
      class="flex px-[10px] py-3 bg-white border-opacity-50 border-primary items-center border border-slate-300- rounded-[3px]"
    >
      <input
        bind:value={message}
        type="text"
        disabled={loading || Boolean(streamingMessage)}
        placeholder="Ask me anyhting about this document.."
        class="w-full px-1 text-slate-700 placeholder:text-slate-500 text-[13px] font-medium outline-none bg-transparent"
      />
      {#if loading}
        <CircleSpinner />
      {:else if streaming}
        <a href="">
          <svg
            height="21"
            width="21"
            class="stroke-red-500"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            ><g id="SVGRepo_bgCarrier" stroke-width="0" /><g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            /><g id="SVGRepo_iconCarrier">
              <g id="Media / Stop">
                <path
                  id="Vector"
                  d="M5 8.2002V15.8002C5 16.9203 5 17.4796 5.21799 17.9074C5.40973 18.2837 5.71547 18.5905 6.0918 18.7822C6.5192 19 7.07899 19 8.19691 19H15.8036C16.9215 19 17.4805 19 17.9079 18.7822C18.2842 18.5905 18.5905 18.2837 18.7822 17.9074C19 17.48 19 16.921 19 15.8031V8.19691C19 7.07899 19 6.5192 18.7822 6.0918C18.5905 5.71547 18.2842 5.40973 17.9079 5.21799C17.4801 5 16.9203 5 15.8002 5H8.2002C7.08009 5 6.51962 5 6.0918 5.21799C5.71547 5.40973 5.40973 5.71547 5.21799 6.0918C5 6.51962 5 7.08009 5 8.2002Z"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
            </g></svg
          >
        </a>
      {:else}
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
      {/if}
    </form>
    <p class="text-[12.5px] text-center text-slate-500 py-2 font-medium">
      Free Research Preview. Doculizer may produce inaccurate response.
    </p>
  </div>
</div>
