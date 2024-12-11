import * as React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { Text } from "react-native-paper";

import { Error } from "./error";

type FieldWrapperProps = {
  label?: string;
  children: React.ReactNode;
  errors?: string | string[] | null;
  style?: StyleProp<ViewStyle>;
};

export type FieldWrapperPassThroughProps = Omit<FieldWrapperProps, "children">;

export const FieldWrapper: React.FC<FieldWrapperProps> = ({ label, errors, children, style }) => {
  return (
    <View style={style}>
      {label && (
        <Text variant="labelLarge" style={{ marginBottom: 8 }}>
          {label}
        </Text>
      )}
      {children}
      <Error messages={errors} />
    </View>
  );
};
