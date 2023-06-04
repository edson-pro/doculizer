import { writable } from "svelte/store";

export interface User {
  id: string;
  email: string;
  username: string;
  photo: string;
}
interface Auth {
  user: User | undefined;
  loading?: boolean;
}
export const auth = writable<Auth | null>({ loading: true, user: undefined });

export const setCurrentUser = (e: User) => {
  auth.set({ user: e, loading: false });
};

export const logout = () => {
  auth.set({ user: undefined, loading: false });
};
