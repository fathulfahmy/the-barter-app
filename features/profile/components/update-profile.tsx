import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Avatar, TextInput } from "react-native-paper";

import { zodResolver } from "@hookform/resolvers/zod";
import { CameraType } from "expo-image-picker";
import { router } from "expo-router";

import { KeyboardWrapper, LoadingStateScreen } from "@/components/screens";
import { Buttons } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form";
import { useDisclosure } from "@/hooks/use-disclosure";
import { useUser } from "@/lib/auth/auth";
import { getImagePickerFile, getImagePickerPermission, getImagePickerResult } from "@/lib/image-picker";
import { Media } from "@/types/api";
import { filterEmptyValues } from "@/utils/form";

import { updateProfileInputSchema, useUpdateProfile } from "../api/update-profile";

const UpdateProfile = ({ user_id }: { user_id: string }) => {
  const userQuery = useUser();
  const user = userQuery.data;

  const { isOpen: passwordVisible, toggle: togglePasswordVisible } = useDisclosure(false);
  const { isOpen: passwordConfirmVisible, toggle: togglePasswordConfirmVisible } = useDisclosure(false);

  const [image, setImage] = useState<string>(user?.avatar?.uri ?? "");

  const updateProfileMutation = useUpdateProfile({
    mutationConfig: {
      onSuccess: () => {
        router.dismissAll();
      },
    },
  });

  const values = {
    name: user?.name ?? "",
    avatar: user?.avatar ?? ({} as File | Media),
    email: user?.email ?? "",
    password: "",
    password_confirmation: "",
  };

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateProfileInputSchema),
    values,
    mode: "onChange",
  });

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

  const onSubmit = handleSubmit((values) => {
    updateProfileMutation.mutate({
      user_id,
      data: filterEmptyValues(values),
    });
  });

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
              { label: "Take a photo", mode: "contained-tonal", onPress: () => handlePickImage({ useCamera: true }) },
              { label: "Choose a photo", mode: "contained-tonal", onPress: () => handlePickImage() },
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