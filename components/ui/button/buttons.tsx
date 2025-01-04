import React from "react";
import { StyleProp, StyleSheet, View, ViewProps, ViewStyle } from "react-native";
import { Button, ButtonProps } from "react-native-paper";

import { useAppTheme } from "@/lib/react-native-paper";

type ActionButtons = Omit<ButtonProps, "children"> & {
  label: string;
};

type ButtonsProps = Omit<ViewProps, "style"> & {
  buttons: ActionButtons[];
  vertical?: boolean;
  variant?: "default" | "bottom" | "top";
  style?: StyleProp<ViewStyle>;
};

export const Buttons: React.FC<ButtonsProps> = ({
  buttons,
  vertical = false,
  variant = "default",
  style,
  ...props
}) => {
  const { colors } = useAppTheme();

  const containerStyle = [
    variant === "top" ? styles.top : {},
    variant === "bottom" ? styles.bottom : {},
    vertical ? styles.verticalContainer : styles.horizontalContainer,
    styles.container,
    {
      borderTopColor: colors.outlineVariant,
    },
    style,
  ];

  return (
    <View {...props} style={containerStyle}>
      {buttons.map((button, index) => (
        <Button {...button} key={index} style={[vertical ? {} : styles.horizontalButton, button.style]}>
          {button.label}
        </Button>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  verticalContainer: {
    flexDirection: "column",
  },
  horizontalContainer: {
    flexDirection: "row",
    width: "100%",
  },
  top: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 0.2,
    zIndex: 1,
  },
  bottom: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderTopWidth: 0.2,
    zIndex: 1,
  },
  horizontalButton: {
    flex: 1,
  },
});
