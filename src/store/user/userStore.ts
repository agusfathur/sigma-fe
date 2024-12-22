/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import axiosJWT from "@/lib/authJWT";
import { User, UserCreate, UserUpdate } from "./user.types";

interface UserState {
  user: User[];
  fetchUser: () => Promise<void>;
  insertUser: (user: UserCreate) => Promise<any>;
  updateUser: (user: UserUpdate) => Promise<any>;
  deleteUser: (id: string) => Promise<any>;
  UserById: (id: string) => User | undefined;
  isModalEditOpen: boolean;
  setIsModalEditOpen: (isModalEditOpen: boolean) => void;
  isModalDeleteOpen: boolean;
  setIsModalDeleteOpen: (isModalDeleteOpen: boolean) => void;
  isModalDetailOpen: boolean;
  setIsModalDetailOpen: (isModalKoordinatOpen: boolean) => void;
  isModalFilterOpen: boolean;
  setIsModalFilterOpen: (isModalFilterOpen: boolean) => void;
  userData: User | undefined;
  setUserData: (userData: User | undefined) => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: [] as User[],
  fetchUser: async () => {
    try {
      const res = await axiosJWT.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user?role=admin&role=super_admin`,
      );

      set({ user: res.data.data });
    } catch (error) {
      console.log(error);
    }
  },
  insertUser: async (user: UserCreate) => {
    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("username", user.username);
    formData.append("password", user.password);
    formData.append("role", user.role);
    formData.append("image", user.image);

    const create = await axiosJWT.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return create.data;
  },
  updateUser: async (user: UserUpdate) => {
    const formData = new FormData();
    if (user.name) formData.append("name", user.name);
    if (user.email) formData.append("email", user.email);
    if (user.username) formData.append("username", user.username);
    if (user.password) formData.append("password", user.password);
    if (user.role) formData.append("role", user.role);
    if (user.image) formData.append("image", user.image);

    const create = await axiosJWT.put(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/${user.id_user}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return create.data;
  },

  deleteUser: async (id: string) => {
    try {
      const destroy = await axiosJWT.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/${id}`,
      );
      return destroy.data;
    } catch (error) {
      console.log(error);
    }
  },
  UserById: (id: string) => {
    return get().user.find((user) => user.id_user === id);
  },
  isModalEditOpen: false,
  setIsModalEditOpen: (isModalEditOpen: boolean) => set({ isModalEditOpen }),
  isModalDeleteOpen: false,
  setIsModalDeleteOpen: (isModalDeleteOpen: boolean) =>
    set({ isModalDeleteOpen }),
  isModalDetailOpen: false,
  setIsModalDetailOpen: (isModalDetailOpen: boolean) =>
    set({ isModalDetailOpen }),
  isModalFilterOpen: false,
  setIsModalFilterOpen: (isModalFilterOpen: boolean) =>
    set({ isModalFilterOpen }),
  userData: {} as User | undefined,
  setUserData: (userData: User | undefined) => set({ userData }),
}));
