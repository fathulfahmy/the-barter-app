import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { Avatar, TextInput } from "react-native-paper";

import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";

import { LoadingStateScreen } from "@/components/screens";
import { GroupedButtons } from "@/components/ui/button";
import { AppTextInput } from "@/components/ui/form";
import { useDisclosure } from "@/hooks/use-disclosure";
import { useUser } from "@/lib/auth/auth";
import { filterEmptyValues } from "@/utils/form";
import { getImagePickerBase64Image, getImagePickerResult } from "@/utils/image-picker";

import { updateProfileInputSchema, useUpdateProfile } from "../api/update-profile";

const UpdateProfile = ({ user_id }: { user_id: string }) => {
  const userQuery = useUser();
  const user = userQuery.data;

  const { isOpen: passwordVisible, toggle: togglePasswordVisible } = useDisclosure(false);
  const { isOpen: passwordConfirmVisible, toggle: togglePasswordConfirmVisible } = useDisclosure(false);
  const [image, setImage] = useState<string | null>(user?.avatar ?? null);

  const updateProfileMutation = useUpdateProfile({
    mutationConfig: {
      onSuccess: () => {
        router.dismissAll();
      },
    },
  });

  const defaultValues = {
    name: "",
    avatar: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  const values = {
    name: user?.name ?? "",
    avatar: "",
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
    defaultValues,
    values,
    mode: "onChange",
  });

  const handlePickImage = async ({ useCamera = false }: { useCamera?: boolean } = {}) => {
    const result = await getImagePickerResult({
      useCamera,
      options: {
        mediaTypes: ["images"],
        aspect: [1, 1],
      },
    });

    if (!result.canceled && result.assets?.[0]) {
      const asset = result.assets[0];
      const base64 = getImagePickerBase64Image(asset);

      setImage(base64);
      setValue("avatar", base64);
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
      <View style={{ flex: 1, gap: 16, padding: 16 }}>
        <View style={{ alignItems: "center", gap: 8 }}>
          {image && <Avatar.Image source={{ uri: image }} size={96} />}
          <GroupedButtons
            buttons={[
              { label: "Take a photo", mode: "contained-tonal", onPress: () => handlePickImage() },
              { label: "Choose a photo", mode: "contained-tonal", onPress: () => handlePickImage({ useCamera: true }) },
            ]}
          />
        </View>

        <AppTextInput control={control} label="Name" name="name" errors={errors.name?.message} inputMode="text" />
        <AppTextInput control={control} label="Email" name="email" errors={errors.email?.message} inputMode="email" />
        <AppTextInput
          control={control}
          label="Password"
          name="password"
          errors={errors.password?.message}
          secureTextEntry={!passwordVisible}
          right={<TextInput.Icon icon={passwordVisible ? "eye" : "eye-off"} onPress={togglePasswordVisible} />}
        />
        <AppTextInput
          control={control}
          label="Confirm Password"
          name="password_confirmation"
          errors={errors.password_confirmation?.message}
          secureTextEntry={!passwordConfirmVisible}
          right={
            <TextInput.Icon icon={passwordConfirmVisible ? "eye" : "eye-off"} onPress={togglePasswordConfirmVisible} />
          }
        />
      </View>

      <GroupedButtons
        variant="bottom"
        buttons={[
          { label: "Cancel", mode: "outlined", onPress: () => router.back() },
          {
            label: "Save",
            mode: "contained",
            onPress: onSubmit,
            disabled: updateProfileMutation.isPending,
          },
        ]}
      />
    </>
  );
};

export default UpdateProfile;
