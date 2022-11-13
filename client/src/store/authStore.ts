import create from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { IUser } from "../types/type";

interface IUseAuth {
  userProfile: IUser | null;
  addUser: (user: IUser) => void;
  removeUser: () => void;
}

const authStore = (set: any): IUseAuth => ({
  userProfile: null,
  addUser: (user: IUser) => set({ userProfile: user }),
  removeUser: () => set({ userProfile: null }),
});

const useAuthStore = create<IUseAuth>()(
  persist(authStore, {
    name: "auth",
  })
);

export default useAuthStore;
