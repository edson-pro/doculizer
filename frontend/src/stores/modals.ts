import { writable } from "svelte/store";

const createModalStore = () => {
  const { subscribe, set } = writable<any>();
  return {
    subscribe,
    open: (id: string, payload) => set({ id: id, payload }),
    close: () => set(undefined),
    show: { subscribe },
  };
};
const { show, open, close } = createModalStore();

export { show, open, close };
