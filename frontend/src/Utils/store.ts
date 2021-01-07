import create from "zustand";
import { persist } from "zustand/middleware";

type tokenState = {
  token: string;
  setToken: (newToken: string) => void;
};

type authState = {
  isAuthenticated: boolean;
  setAuthed: (value: boolean) => void;
};

type msgState = {
  msg: string;
  setMsg: (msg: string) => void;
};

export const useAuthToken = create<tokenState>(
  persist(
    (set) => ({
      token: "",
      setToken: (newToken) => set((state) => ({ token: newToken })),
    }),
    {
      name: "token",
      storage: localStorage,
    }
  )
);

export const useAuth = create<authState>(
  persist(
    (set) => ({
      isAuthenticated: false,
      setAuthed: (isAuthenticated) => set({ isAuthenticated }),
    }),
    {
      name: "isAuthenticated",
      storage: localStorage,
    }
  )
);

export const useMessages = create<msgState>(
  persist(
    (set) => ({
      msg: "",
      setMsg: (msg) => set({ msg }),
    }),
    {
      name: "messages",
      storage: localStorage,
    }
  )
);
