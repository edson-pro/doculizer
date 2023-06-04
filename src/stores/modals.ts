import { writable } from "svelte/store";

const createModalStore = () => {
  const { subscribe, set, update } = writable<any>();
  return {
    subscribe,
    open: (id: string, payload) => set({ id: id, payload }),
    update: (id: string, payload) =>
      update((e) => {
        const data = { ...e, payload: { ...e.payload, ...payload } };
        console.log(data);
        return data;
      }),
    close: () => set(undefined),
    show: { subscribe },
  };
};
const { show, open, close, update } = createModalStore();

export { show, open, close, update };
