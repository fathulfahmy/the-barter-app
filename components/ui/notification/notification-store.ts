import { create } from "zustand";

export type NotificationData = {
  type: "info" | "warning" | "success" | "error";
  messages: string;
} | null;

type NotificationStore = {
  notification: NotificationData;
  addNotification: (notification: NotificationData) => void;
  dismissNotification: () => void;
};

export const useNotification = create<NotificationStore>((set) => ({
  notification: null,
  addNotification: (notification) => set({ notification }),
  dismissNotification: () => set({ notification: null }),
}));
