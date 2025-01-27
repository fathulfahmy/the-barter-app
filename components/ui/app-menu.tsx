import React from "react";
import { IconButton, Menu } from "react-native-paper";

import { useDisclosure } from "@/hooks/use-disclosure";

export const AppMenu = ({ renderMenuItem }: { renderMenuItem?: (close: () => void) => React.ReactNode }) => {
  const { isOpen, open, close } = useDisclosure();

  return (
    <Menu
      visible={isOpen}
      onDismiss={close}
      anchor={<IconButton icon="dots-horizontal" onPress={open} style={{ margin: 0 }} />}
    >
      {renderMenuItem ? renderMenuItem(close) : null}
    </Menu>
  );
};
