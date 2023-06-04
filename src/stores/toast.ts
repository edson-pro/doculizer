import { writable } from "svelte/store";

export const toasts = writable([]);

export const addToast = (toast) => {
  const id = Math.floor(Math.random() * 10000);

  console.log("addToast", toast);
  const defaults = {
    id,
    type: "primary",
    dismissible: true,
    timeout: 4000,
  };

  toasts.update((all) => [...all, { ...defaults, ...toast }]);

  setTimeout(() => dismissToast(id), toast.timeout || defaults.timeout);
};

export const dismissToast = (id) => {
  toasts.update((all) => all.filter((t) => t.id !== id));
};
