import { useEffect } from "react";
import { Button, Dialog, Portal, Text } from "react-native-paper";

import { useDisclosure } from "@/hooks/use-disclosure";

import { useConfirmationDialog } from "./confirmation-dialog-store";

export const ConfirmationDialog = () => {
  const { confirmationDialog, dismissConfirmationDialog } = useConfirmationDialog();
  const { isOpen, open, close } = useDisclosure();

  useEffect(() => {
    if (confirmationDialog) {
      open();
    } else {
      close();
    }
  }, [confirmationDialog, open, close]);

  if (!confirmationDialog) return null;

  const {
    type,
    title,
    body,
    cancelButtonText = "Cancel",
    confirmButtonText = "Confirm",
    confirmButtonFn,
  } = confirmationDialog;

  const icon =
    type === "info"
      ? "information"
      : type === "warning"
        ? "alert-octagon"
        : type === "success"
          ? "check-circle"
          : "alert";

  const onConfirm = () => {
    confirmButtonFn();
    dismissConfirmationDialog();
  };

  return (
    <>
      <Portal>
        <Dialog visible={isOpen} onDismiss={dismissConfirmationDialog}>
          {type && <Dialog.Icon icon={icon} />}
          <Dialog.Title style={{ alignSelf: "center" }}>{title}</Dialog.Title>
          <Dialog.Content style={{ alignSelf: "center" }}>
            <Text variant="bodyMedium">{body}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={dismissConfirmationDialog}>{cancelButtonText}</Button>
            <Button onPress={onConfirm}>{confirmButtonText}</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};