import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { Button, ButtonProps } from "react-native-paper";

import { useAppTheme } from "@/lib/react-native-paper";

type ActionButtons = Omit<ButtonProps, "children"> & {
  label: string;
};

type BottomActionButtonsProps = ViewProps & {
  buttons: ActionButtons[];
};

export const BottomActionButtons: React.FC<BottomActionButtonsProps> = ({ buttons, style, ...props }) => {
  const { colors } = useAppTheme();

  const containerStyle = [
    styles.container,
    {
      borderTopColor: colors.outlineVariant,
    },
    style,
  ];

  return (
    <View style={containerStyle} {...props}>
      {buttons.map((button, index) => (
        <Button key={index} style={[styles.button, button.style]} {...button}>
          {button.label}
        </Button>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderTopWidth: 0.2,
  },
  button: {
    flex: 1,
  },
});
