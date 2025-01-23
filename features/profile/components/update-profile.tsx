import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Keyboard, StyleSheet, View } from "react-native";
import { Avatar, RadioButton, TextInput } from "react-native-paper";

import { useActionSheet } from "@expo/react-native-action-sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { CameraType } from "expo-image-picker";
import { router } from "expo-router";

import { KeyboardWrapper, LoadingStateScreen } from "@/components/screens";
import { AppList } from "@/components/ui";
import { Buttons } from "@/components/ui/button";
import { AppDialog } from "@/components/ui/dialog";
import { FormInput } from "@/components/ui/form";
import { useDisclosure } from "@/hooks/use-disclosure";
import { useUser } from "@/lib/auth/auth";
import { getImagePickerFile, getImagePickerPermission, getImagePickerResult } from "@/lib/image-picker";
import { Media } from "@/types/api";
import { filterEmptyValues } from "@/utils/form";

import { updateProfileInputSchema, useUpdateProfile } from "../api/update-profile";

const UpdateProfile = () => {
  /* ======================================== STATES */
  const { isOpen: passwordVisible, toggle: togglePasswordVisible } = useDisclosure(false);
  const { isOpen: passwordConfirmVisible, toggle: togglePasswordConfirmVisible } = useDisclosure(false);

  /* ======================================== HOOKS */
  const { showActionSheetWithOptions } = useActionSheet();

  /* ======================================== QUERIES */
  const userQuery = useUser();
  const user = userQuery.data;
  const [image, setImage] = useState<string>(user?.avatar?.uri ?? "");

  /* ======================================== MUTATIONS */
  const updateProfileMutation = useUpdateProfile({
    mutationConfig: {
      onSuccess: () => {
        router.dismissAll();
      },
    },
  });

  /* ======================================== FORM */
  const values = {
    name: user?.name ?? "",
    avatar: user?.avatar ?? ({} as File | Media),
    email: user?.email ?? "",
    password: "",
    password_confirmation: "",
    bank_name: user?.bank_name ?? "",
    bank_account_number: user?.bank_account_number ?? "",
  };

  const {
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateProfileInputSchema),
    values,
    mode: "onChange",
  });

  const [bank_name] = watch(["bank_name"]);

  /* ======================================== FUNCTIONS */
  const handlePickImage = async ({ useCamera = false }: { useCamera?: boolean } = {}) => {
    await getImagePickerPermission(useCamera);

    const result = await getImagePickerResult({
      useCamera,
      options: {
        mediaTypes: ["images"],
        aspect: [1, 1],
        allowsEditing: true,
        cameraType: CameraType.front,
      },
    });

    const asset = result.assets?.[0];

    if (!result.canceled && asset) {
      const pickedFile = getImagePickerFile(result);

      if (pickedFile) {
        setValue("avatar", pickedFile);
        setImage(asset.uri);
      }
    }
  };

  const handleBankNameSelect = (item: string) => {
    setValue("bank_name", item);
  };

  const onSubmit = handleSubmit((values) => {
    if (!user) return;

    updateProfileMutation.mutate({
      user_id: user.id,
      data: filterEmptyValues(values),
    });
  });

  /* ======================================== RETURNS */
  if (userQuery.isLoading) {
    return <LoadingStateScreen />;
  }

  return (
    <>
      <KeyboardWrapper contentContainerStyle={styles.form}>
        <View style={styles.avatar}>
          {image && <Avatar.Image source={{ uri: image }} size={96} />}
          <Buttons
            buttons={[
              {
                label: "Upload a photo",
                mode: "contained-tonal",
                icon: "upload",
                onPress: () =>
                  showActionSheetWithOptions(
                    {
                      cancelButtonIndex: 2,
                      destructiveButtonIndex: 2,
                      options: ["Photo Library", "Camera", "Cancel"],
                    },
                    (buttonIndex) => {
                      switch (buttonIndex) {
                        case 0:
                          handlePickImage();
                          break;
                        case 1:
                          handlePickImage({ useCamera: true });
                          break;
                        default:
                          break;
                      }
                    },
                  ),
              },
            ]}
          />
        </View>

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
        variant="bottom"
        buttons={[
          { label: "Cancel", mode: "outlined", onPress: () => router.back() },
          {
            label: "Save",
            mode: "contained",
            onPress: onSubmit,
            disabled: updateProfileMutation.isPending,
            loading: updateProfileMutation.isPending,
          },
        ]}
      />
    </>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  form: {
    gap: 16,
    padding: 16,
  },
  avatar: {
    alignItems: "center",
    gap: 8,
  },
});
