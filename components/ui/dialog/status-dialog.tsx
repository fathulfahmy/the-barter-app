import React, { useEffect } from "react";
import { Button, Dialog, Portal, Text } from "react-native-paper";

import { useDisclosure } from "@/hooks/use-disclosure";
import { formatSentenceCase } from "@/utils/format";

import { useStatusDialog } from "./status-dialog-store";

export const StatusDialog = () => {
  const { statusDialog, dismissStatusDialog } = useStatusDialog();
  const { isOpen, open, close } = useDisclosure();

  useEffect(() => {
    if (statusDialog) {
      open();
    } else {
      close();
    }
  }, [statusDialog, open, close]);

  if (!statusDialog) return null;

  const { type, title, body } = statusDialog;

  const icon =
    type === "info" ? "information" : type === "warning" ? "alert" : type === "success" ? "check-circle" : "alert";

  return (
    <>
      <Portal>
        <Dialog visible={isOpen} onDismiss={dismissStatusDialog}>
          {type && <Dialog.Icon icon={icon} size={64} />}
          {title && <Dialog.Title style={{ textAlign: "center" }}>{formatSentenceCase(title)}</Dialog.Title>}
          {body && (
            <Dialog.Content style={{ alignSelf: "center" }}>
              <Text variant="bodyMedium">{formatSentenceCase(body)}</Text>
            </Dialog.Content>
          )}
          <Dialog.Actions>
            <Button onPress={dismissStatusDialog}>Close</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};
