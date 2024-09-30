import { create } from "zustand";

export const useRepos = create((set) => ({
  repos: [],
  addRepo: (name) => set((state) => ({ repos: [...state.repos, name] })),
}));
