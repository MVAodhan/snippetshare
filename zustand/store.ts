import { create } from "zustand";

export const useRepos = create((set) => ({
  repos: [],
  addRepo: (name: unknown) =>
    set((state: { repos: [] }) => ({ repos: [...state.repos, name] })),
}));
