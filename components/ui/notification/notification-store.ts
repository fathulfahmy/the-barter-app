import { create } from "zustand";

export type NotificationProps = {
  type: "info" | "warning" | "success" | "error";
  messages: string | string[];
} | null;

type NotificationStore = {
  notification: NotificationProps;
  setNotification: (notification: NotificationProps) => void;
  dismissNotification: () => void;
};

export const useNotification = create<NotificationStore>((set) => ({
  notification: null,
  setNotification: (notification) => set({ notification }),
  dismissNotification: () => set({ notification: null }),
}));
