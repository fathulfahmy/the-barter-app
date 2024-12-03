import * as React from "react";
import { Control, Controller } from "react-hook-form";
import { TextInput, TextInputProps } from "react-native-paper";

import { FieldWrapper, FieldWrapperPassThroughProps } from "./field-wrapper";

export type InputProps = TextInputProps &
  FieldWrapperPassThroughProps & {
    control: Control<any>;
    name: string;
  };

export const Input = ({ label, errors, control, name, ...props }: InputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <FieldWrapper label={label} errors={errors}>
          <TextInput onBlur={onBlur} onChangeText={onChange} value={value} {...props} />
        </FieldWrapper>
      )}
    />
  );
};
