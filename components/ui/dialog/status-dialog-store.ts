import { create } from "zustand";

export type StatusDialogProps = {
  type?: "info" | "warning" | "success" | "error";
  title?: string;
  body?: string;
} | null;

type StatusDialogStore = {
  statusDialog: StatusDialogProps;
  setStatusDialog: (statusDialog: StatusDialogProps) => void;
  dismissStatusDialog: () => void;
};

export const useStatusDialog = create<StatusDialogStore>((set) => ({
  statusDialog: null,
  setStatusDialog: (statusDialog) => set({ statusDialog }),
  dismissStatusDialog: () => set({ statusDialog: null }),
}));
