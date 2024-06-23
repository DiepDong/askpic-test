import { create } from "zustand";

const useProjectsState = create((set) => ({
  projects: null,
  setProjects: (projects) => set({ projects }),
  addProject: (project) =>
    set((state) => ({ projects: [...state.projects, project] })),
  shared: null,
  setShared: (shared) => set({ shared }),
  trash: null,
  setTrash: (trash) => set({ trash }),
}));

export default useProjectsState;
