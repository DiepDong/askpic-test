import { create } from "zustand";

const useGlobalState = create((set) => ({
  user: null,
  theme: "light",
  setTheme: (theme) => set({ theme }),
}));

export default useGlobalState;
