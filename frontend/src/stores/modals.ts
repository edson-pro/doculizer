import { writable } from 'svelte/store';

const createModalStore = () => {
  const { subscribe, set } = writable<string | undefined>();

  return {
    subscribe,
    open: (id: string) => set(id),
    close: () => set(undefined),
    show: { subscribe }
  };
};
const { show, open, close } = createModalStore();

export { show, open, close };
