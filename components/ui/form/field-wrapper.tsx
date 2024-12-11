import * as React from "react";
import { View, ViewStyle } from "react-native";
import { Text } from "react-native-paper";

import { Error } from "./error";

type FieldWrapperProps = {
  label?: string;
  children: React.ReactNode;
  errors?: string | string[] | null;
  style?: ViewStyle;
};

export type FieldWrapperPassThroughProps = Omit<FieldWrapperProps, "children">;

export const FieldWrapper = ({ label, errors, children, style }: FieldWrapperProps) => {
  return (
    <View style={style}>
      <Text variant="labelLarge" style={{ marginBottom: 8 }}>
        {label}
      </Text>
      {children}
      <Error messages={errors} />
    </View>
  );
};
