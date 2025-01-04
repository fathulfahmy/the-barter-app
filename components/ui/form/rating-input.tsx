import React from "react";
import { Control, Controller } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { IconButton } from "react-native-paper";

import { FormField } from "@/components/ui/form/form-field";
import { useAppTheme } from "@/lib/react-native-paper";

type RatingInputProps = {
  control: Control<any>;
  name: string;
  label?: string;
  errors?: string | undefined;
  size?: number;
  color?: string;
};

export const RatingInput: React.FC<RatingInputProps> = ({ control, name, label, errors, size, color }) => {
  const { colors } = useAppTheme();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <FormField label={label} errors={errors}>
          <View style={styles.container}>
            {Array.from({ length: 5 }).map((_, index) => (
              <IconButton
                key={index}
                icon={index < value ? "star" : "star-outline"}
                iconColor={color ?? colors.yellow}
                onBlur={onBlur}
                onPress={() => onChange(index + 1)}
                size={size}
              />
            ))}
          </View>
        </FormField>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
