import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { Text } from "react-native-paper";

import { FormError } from "./form-error";

type FormFieldProps = {
  label?: string;
  children: React.ReactNode;
  errors?: string | string[] | null;
  style?: StyleProp<ViewStyle>;
};

export type FormFieldPassThroughProps = Omit<FormFieldProps, "children">;

export const FormField: React.FC<FormFieldProps> = ({ label, errors, children, style }) => {
  return (
    <View style={style}>
      {label ? (
        <Text variant="labelLarge" style={{ marginBottom: 8 }}>
          {label}
        </Text>
      ) : null}
      {children}
      <FormError messages={errors} />
    </View>
  );
};
