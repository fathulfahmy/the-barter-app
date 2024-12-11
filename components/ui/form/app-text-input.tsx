import * as React from "react";
import { Control, Controller } from "react-hook-form";
import { TextStyle } from "react-native";
import { TextInput, TextInputProps } from "react-native-paper";

import { FieldWrapper, FieldWrapperPassThroughProps } from "./field-wrapper";

export type InputProps = {
  control: Control<any>;
  name: string;
  textInputStyle?: TextStyle;
} & Omit<TextInputProps, "style"> &
  FieldWrapperPassThroughProps;

export const AppTextInput = ({ label, errors, control, name, style, textInputStyle, ...props }: InputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <FieldWrapper label={label} errors={errors} style={style}>
          <TextInput onBlur={onBlur} onChangeText={onChange} value={value} style={textInputStyle} {...props} />
        </FieldWrapper>
      )}
    />
  );
};
