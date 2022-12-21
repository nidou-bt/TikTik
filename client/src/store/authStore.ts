import create from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { IUser } from "../types/type";
import { BASE_URL } from "@/utils/constants";

interface IUseAuth {
  userProfile: IUser | null;
  allUsers: null | Array<IUser>,
  addUser: (user: IUser) => void;
  removeUser: () => void;
  fetchAllUsers: () => void;
}

const authStore = (set: any): IUseAuth => ({
  userProfile: null,
  allUsers: null,
  addUser: (user: IUser) => set({ userProfile: user }),
  removeUser: () => set({ userProfile: null }),
  fetchAllUsers: async () => {
    const { data } = await axios.get(`${BASE_URL}/api/users`);
    set({ allUsers: data.data})
  },
});

const useAuthStore = create<IUseAuth>()(
  persist(authStore, {
    name: "auth",
  })
);

export default useAuthStore;
