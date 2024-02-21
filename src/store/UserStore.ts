import { User } from "@/type/user";
import { create } from "zustand";

interface UserState{
    current_user:User | {};
    setUser:(user:User)=>void;
}

export const useUserStore = create<UserState>((set) => ({
   current_user : {},
   setUser: (users:User) => set({current_user:users})
}))
    