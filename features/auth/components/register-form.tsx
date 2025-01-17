import React from "react";
import { useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";

import { KeyboardWrapper } from "@/components/screens";
import { Buttons } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form";
import { useDisclosure } from "@/hooks/use-disclosure";
import { registerInputSchema, useRegister } from "@/lib/auth/auth";

export const RegisterForm = () => {
  /* ======================================== STATES */
  const { isOpen: passwordVisible, toggle: togglePasswordVisible } = useDisclosure(false);
  const { isOpen: passwordConfirmVisible, toggle: togglePasswordConfirmVisible } = useDisclosure(false);

  /* ======================================== MUTATIONS */
  const register = useRegister();

  /* ======================================== FORM */
  const defaultValues = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerInputSchema),
    defaultValues,
    mode: "onChange",
  });

  /* ======================================== FUNCTIONS */
  const onSubmit = handleSubmit((values) => register.mutate(values));

  /* ======================================== RETURNS */
  return (
    <>
      <KeyboardWrapper contentContainerStyle={styles.form}>
        <FormInput control={control} label="Name" name="name" errors={errors.name?.message} inputMode="text" />
        <FormInput control={control} label="Email" name="email" errors={errors.email?.message} inputMode="email" />
        <FormInput
          control={control}
          label="Password"
          name="password"
          errors={errors.password?.message}
          secureTextEntry={!passwordVisible}
          right={<TextInput.Icon icon={passwordVisible ? "eye" : "eye-off"} onPress={togglePasswordVisible} />}
        />
        <FormInput
          control={control}
          label="Confirm Password"
          name="password_confirmation"
          errors={errors.password_confirmation?.message}
          secureTextEntry={!passwordConfirmVisible}
          right={
            <TextInput.Icon icon={passwordConfirmVisible ? "eye" : "eye-off"} onPress={togglePasswordConfirmVisible} />
          }
        />
      </KeyboardWrapper>

      <Buttons
        vertical
        buttons={[
          { label: "Already have an account? Login", onPress: () => router.replace("/login") },
          {
            label: "Register",
            mode: "contained",
            onPress: onSubmit,
            disabled: register.isPending,
            loading: register.isPending,
          },
        ]}
        style={styles.buttons}
      />
    </>
  );
};

const styles = StyleSheet.create({
  form: {
    gap: 16,
    padding: 16,
  },
  buttons: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});
