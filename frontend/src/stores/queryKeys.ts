import { writable } from "svelte/store";

export const chatsQueryKey = writable(["chats", { search: "" }]);
