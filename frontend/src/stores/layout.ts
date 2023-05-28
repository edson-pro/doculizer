import { writable } from "svelte/store";

const createLayoutStore = () => {
  const { subscribe, set } = writable<any>({ hideSidebar: false });
  return {
    subscribe,
    setHideSidebar: (e) => {
      set({ hideSidebar: e });
    },
    hideSidebar: { subscribe },
  };
};
const { setHideSidebar, hideSidebar } = createLayoutStore();

export { setHideSidebar, hideSidebar };
