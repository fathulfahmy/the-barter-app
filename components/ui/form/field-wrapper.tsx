import * as React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import { Error } from "./error";

type FieldWrapperProps = {
  label?: string;
  children: React.ReactNode;
  errors?: string | string[];
};

export type FieldWrapperPassThroughProps = Omit<FieldWrapperProps, "children">;

export const FieldWrapper = (props: FieldWrapperProps) => {
  const { label, errors, children } = props;
  return (
    <View>
      <Text variant="labelLarge" style={{ marginBottom: 8 }}>
        {label}
      </Text>
      {children}
      {Array.isArray(errors) ? (
        errors.map((error, index) => <Error key={index} errorMessage={error} />)
      ) : (
        <Error errorMessage={errors} />
      )}
    </View>
  );
};
