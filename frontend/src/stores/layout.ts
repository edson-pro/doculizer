import { writable } from "svelte/store";

const createLayoutStore = () => {
  const { subscribe, set, update } = writable<any>({ hideSidebar: false });
  return {
    subscribe,
    setUiState: (e) => {
      console.log(e);
      set(e);
    },
    uiState: { subscribe },
  };
};
const { uiState, setUiState } = createLayoutStore();

export { uiState, setUiState };
