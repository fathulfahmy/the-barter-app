import React from "react";
import { StyleProp, StyleSheet, View, ViewProps, ViewStyle } from "react-native";
import { Button, ButtonProps } from "react-native-paper";

import { useAppTheme } from "@/lib/react-native-paper";

type ActionButtons = Omit<ButtonProps, "children"> & {
  label: string;
};

type GroupedButtonsProps = ViewProps & {
  buttons: ActionButtons[];
  vertical?: boolean;
  variant?: "default" | "bottom";
  style?: StyleProp<ViewStyle>;
};

export const GroupedButtons: React.FC<GroupedButtonsProps> = ({
  buttons,
  vertical = false,
  variant = "default",
  style,
  ...props
}) => {
  const { colors } = useAppTheme();

  const containerStyle = [
    variant === "bottom" ? styles.bottom : {},
    vertical ? styles.verticalContainer : styles.horizontalContainer,
    styles.container,
    {
      borderTopColor: colors.outlineVariant,
    },
    style,
  ];

  return (
    <View style={containerStyle} {...props}>
      {buttons.map((button, index) => (
        <Button key={index} style={[vertical ? {} : styles.horizontalButton, button.style]} {...button}>
          {button.label}
        </Button>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  verticalContainer: {
    flexDirection: "column",
  },
  horizontalContainer: {
    flexDirection: "row",
    width: "100%",
  },
  bottom: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderTopWidth: 0.2,
  },
  horizontalButton: {
    flex: 1,
  },
});
