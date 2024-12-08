import { create } from "zustand";

export type ConfirmationDialogProps = {
  type?: "info" | "warning" | "success" | "error";
  title?: string;
  body?: string;
  cancelButtonText?: string;
  confirmButtonText?: string;
  confirmButtonFn: () => void;
} | null;

type ConfirmationDialogStore = {
  confirmationDialog: ConfirmationDialogProps;
  setConfirmationDialog: (confirmationDialog: ConfirmationDialogProps) => void;
  dismissConfirmationDialog: () => void;
};

export const useConfirmationDialog = create<ConfirmationDialogStore>((set) => ({
  confirmationDialog: null,
  setConfirmationDialog: (confirmationDialog) => set({ confirmationDialog }),
  dismissConfirmationDialog: () => set({ confirmationDialog: null }),
}));
