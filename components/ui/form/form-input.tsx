import React from "react";
import { Control, Controller } from "react-hook-form";
import { Pressable, StyleProp, TextStyle } from "react-native";
import { TextInput, TextInputProps } from "react-native-paper";

import { FormField, FormFieldPassThroughProps } from "./form-field";

export type InputProps = {
  control?: Control<any>;
  name?: string;
  textInputStyle?: StyleProp<TextStyle>;
} & Omit<TextInputProps, "style"> &
  FormFieldPassThroughProps;

export const FormInput = ({ label, errors, control, name, style, textInputStyle, onPress, ...props }: InputProps) => {
  if (control && name) {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormField label={label} errors={errors} style={style}>
            <Pressable onPress={onPress}>
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={!!errors}
                style={textInputStyle}
                returnKeyType="done"
                onPress={onPress}
                {...props}
              />
            </Pressable>
          </FormField>
        )}
      />
    );
  } else if (label) {
    return (
      <FormField label={label} errors={errors} style={style}>
        <Pressable onPress={onPress}>
          <TextInput error={!!errors} style={textInputStyle} returnKeyType="done" onPress={onPress} {...props} />
        </Pressable>
      </FormField>
    );
  } else {
    return (
      <Pressable onPress={onPress} style={style}>
        <TextInput error={!!errors} style={textInputStyle} returnKeyType="done" onPress={onPress} {...props} />
      </Pressable>
    );
  }
};
