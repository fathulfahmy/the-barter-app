import React from "react";
import { Menu, MenuProps } from "react-native-paper";

import { useDisclosure } from "@/hooks/use-disclosure";

type AppMenuProps = Omit<MenuProps, "visible" | "anchor" | "theme"> & {
  renderAnchor: (open: () => void, toggle: () => void) => React.ReactNode;
  children: React.ReactNode;
};

export const AppMenu: React.FC<AppMenuProps> = ({ renderAnchor, children, ...props }) => {
  const { isOpen, open, close, toggle } = useDisclosure();

  const anchor = renderAnchor(open, toggle);

  return (
    <Menu visible={isOpen} onDismiss={close} anchor={anchor} {...props}>
      {children}
    </Menu>
  );
};
