import React from "react";
import { Button, Dialog, Portal } from "react-native-paper";

import { useDisclosure } from "@/hooks/use-disclosure";
import { formatSentenceCase } from "@/utils/format";

type AppDialogProps = {
  title?: string;
  body: React.ReactNode;
  triggerButton: React.ReactElement;
  cancelButtonText?: string;
  confirmButtonText?: string;
  confirmButtonFn?: () => void;
};

export const AppDialog: React.FC<AppDialogProps> = ({
  title,
  body,
  triggerButton,
  confirmButtonText = "Close",
  confirmButtonFn,
}) => {
  const { isOpen, open, close } = useDisclosure();

  const onConfirm = () => {
    if (confirmButtonFn) {
      confirmButtonFn();
    }
    close();
  };

  return (
    <>
      {React.cloneElement(triggerButton, { onFocus: open, onPress: open })}
      <Portal>
        <Dialog visible={isOpen} onDismiss={close}>
          {title && <Dialog.Title>{formatSentenceCase(title)}</Dialog.Title>}
          <Dialog.Content style={{ minHeight: 2, maxHeight: 500 }}>{body}</Dialog.Content>
          <Dialog.Actions>
            <Button onPress={onConfirm}>{confirmButtonText}</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};
