import React from "react";
import { Dimensions } from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";

import { useDisclosure } from "@/hooks/use-disclosure";
import { formatSentenceCase } from "@/utils/format";

type AppDialogProps = {
  title?: string;
  body: React.ReactElement;
  renderTriggerButton: (open: () => void) => React.ReactElement;
  cancelButtonText?: string;
  confirmButtonText?: string;
  confirmButtonFn?: () => void;
  withScrollView?: boolean;
};

export const AppDialog: React.FC<AppDialogProps> = ({
  title,
  body,
  renderTriggerButton,
  confirmButtonText = "Done",
  confirmButtonFn,
  withScrollView = true,
}) => {
  const { isOpen, open, close } = useDisclosure();

  const handleConfirm = () => {
    if (confirmButtonFn) {
      confirmButtonFn();
    }
    close();
  };

  return (
    <>
      {renderTriggerButton(open)}
      <Portal>
        <Dialog visible={isOpen} onDismiss={close}>
          {title ? <Dialog.Title>{formatSentenceCase(title)}</Dialog.Title> : null}
          {withScrollView ? (
            <Dialog.ScrollArea style={{ height: 0.5 * Dimensions.get("window").height }}>{body}</Dialog.ScrollArea>
          ) : (
            <Dialog.Content>{body}</Dialog.Content>
          )}
          <Dialog.Actions>
            <Button onPress={handleConfirm}>{confirmButtonText}</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};
