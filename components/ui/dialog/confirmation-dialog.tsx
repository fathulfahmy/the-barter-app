import React, { useEffect } from "react";
import { Button, Dialog, Portal, Text } from "react-native-paper";

import { useDisclosure } from "@/hooks/use-disclosure";
import { formatSentenceCase } from "@/utils/format";

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
    type === "info" ? "information" : type === "warning" ? "alert" : type === "success" ? "check-circle" : "alert";

  const handleConfirm = () => {
    confirmButtonFn();
    dismissConfirmationDialog();
  };

  return (
    <>
      <Portal>
        <Dialog visible={isOpen} onDismiss={dismissConfirmationDialog}>
          {type ? <Dialog.Icon icon={icon} size={64} /> : null}
          {title ? <Dialog.Title style={{ textAlign: "center" }}>{formatSentenceCase(title)}</Dialog.Title> : null}
          {body ? (
            <Dialog.Content style={{ alignSelf: "center" }}>
              <Text variant="bodyMedium">{formatSentenceCase(body)}</Text>
            </Dialog.Content>
          ) : null}
          <Dialog.Actions>
            <Button onPress={dismissConfirmationDialog}>{cancelButtonText}</Button>
            <Button onPress={handleConfirm}>{confirmButtonText}</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};
