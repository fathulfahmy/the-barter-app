import React from "react";
import { useForm } from "react-hook-form";
import { Keyboard, StyleSheet } from "react-native";
import { RadioButton, TextInput } from "react-native-paper";

import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";

import { KeyboardWrapper } from "@/components/screens";
import { AppList } from "@/components/ui";
import { Buttons } from "@/components/ui/button";
import { AppDialog } from "@/components/ui/dialog";
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
    bank_name: "",
    bank_account_number: "",
  };

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerInputSchema),
    defaultValues,
    mode: "onChange",
  });

  const [bank_name] = watch(["bank_name"]);

  /* ======================================== FUNCTIONS */
  const onSubmit = handleSubmit((values) => register.mutate(values));

  const handleBankNameSelect = (item: string) => {
    setValue("bank_name", item);
  };

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
        <AppDialog
          renderTriggerButton={(open) => (
            <FormInput
              control={control}
              label="Bank name"
              name="bank_name"
              errors={errors.bank_name?.message}
              value={bank_name}
              editable={false}
              onPress={() => {
                Keyboard.dismiss();
                open();
              }}
            />
          )}
          title="Select bank"
          body={
            <AppList
              data={[
                "Affin Bank",
                "Agro Bank",
                "Alliance Bank",
                "Ambank",
                "Bank Islam",
                "Bank Muamalat",
                "Bank Rakyat",
                "Bank Simpanan Malaysia",
                "CIMB Bank",
                "Hong Leong Bank",
                "HSBC Bank",
                "Maybank",
                "OCBC Bank",
                "Public Bank",
                "RHB Bank",
                "Standard Chartered Bank",
                "United Overseas Bank",
              ]}
              extraData={bank_name}
              renderItem={({ item }) => (
                <RadioButton.Item
                  label={item}
                  value={item}
                  status={bank_name == item ? "checked" : "unchecked"}
                  onPress={() => handleBankNameSelect(item)}
                />
              )}
              containerStyle={{ flex: 1 }}
            />
          }
        />
        <FormInput
          control={control}
          label="Bank account number"
          name="bank_account_number"
          errors={errors.bank_account_number?.message}
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
