import React from "react";
import { useForm } from "react-hook-form";
import { Platform, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";

import { KeyboardWrapper } from "@/components/screens";
import { Buttons } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form";
import { useDisclosure } from "@/hooks/use-disclosure";
import { loginInputSchema, useLogin } from "@/lib/auth/auth";

export const LoginForm = () => {
  /* ======================================== STATES */
  const { isOpen: passwordVisible, toggle: togglePasswordVisibility } = useDisclosure(false);

  /* ======================================== MUTATIONS */
  const login = useLogin({ onSuccess: () => router.replace("/(tabs)") });

  /* ======================================== FORM */
  const defaultValues =
    Platform.OS === "ios"
      ? {
          email: "user1@demo.com",
          password: "password",
        }
      : {
          email: "user2@demo.com",
          password: "password",
        };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginInputSchema),
    defaultValues,
    mode: "onChange",
  });

  /* ======================================== FUNCTIONS */
  const onSubmit = handleSubmit((values) => login.mutate(values));

  /* ======================================== RETURNS */
  return (
    <>
      <KeyboardWrapper contentContainerStyle={styles.form}>
        <FormInput control={control} label="Email" name="email" errors={errors.email?.message} inputMode="email" />
        <FormInput
          control={control}
          label="Password"
          name="password"
          errors={errors.password?.message}
          secureTextEntry={!passwordVisible}
          right={<TextInput.Icon icon={passwordVisible ? "eye" : "eye-off"} onPress={togglePasswordVisibility} />}
        />
      </KeyboardWrapper>

      <Buttons
        vertical
        buttons={[
          { label: "Don't have an account? Register", onPress: () => router.replace("/register") },
          { label: "Login", mode: "contained", onPress: onSubmit, disabled: login.isPending, loading: login.isPending },
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
