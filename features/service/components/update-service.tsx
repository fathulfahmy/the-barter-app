import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Image, Keyboard, ScrollView, StyleSheet, View } from "react-native";
import { HelperText, IconButton, RadioButton } from "react-native-paper";

import { zodResolver } from "@hookform/resolvers/zod";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";

import { LoadingStateScreen } from "@/components/screens";
import { AppFlashList } from "@/components/ui";
import { GroupedButtons } from "@/components/ui/button";
import { AppDialog } from "@/components/ui/dialog";
import { AppTextInput, FieldWrapper } from "@/components/ui/form";
import { useCategories } from "@/features/category/api/get-categories";
import { useAppTheme } from "@/lib/react-native-paper";
import { Category, Media } from "@/types/api";
import { getImagePickerResult } from "@/utils/image-picker";

import { useService } from "../api/get-service";
import { updateServiceInputSchema, useUpdateService } from "../api/update-service";

export const UpdateService = ({ barter_service_id }: { barter_service_id: string }) => {
  const { colors } = useAppTheme();
  const serviceQuery = useService({ barter_service_id });
  const categoriesQuery = useCategories();
  const service = serviceQuery.data?.data;
  const categories = categoriesQuery.data?.data;

  const [category, setCategory] = useState({
    id: service?.barter_category?.id ?? "",
    name: service?.barter_category?.name ?? "",
  });
  const [images, setImages] = useState<string[]>(service?.images.map((img) => img.uri) ?? []);
  const [files, setFiles] = useState<Media[]>(service?.images ?? []);

  const updateServiceMutation = useUpdateService({
    mutationConfig: {
      onSuccess: () => {
        router.dismissAll();
      },
    },
  });

  const defaultValues = {
    title: "",
    description: "",
    barter_category_id: "",
    min_price: 0,
    max_price: 0,
    price_unit: "unit",
    images: [] as Media[],
  };

  const values = {
    title: service?.title ?? "",
    description: service?.description ?? "",
    barter_category_id: service?.barter_category?.id ?? "",
    min_price: service?.min_price ?? 0,
    max_price: service?.max_price ?? 0,
    price_unit: service?.price_unit ?? "unit",
    images: service?.images ?? [],
  };

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateServiceInputSchema),
    defaultValues,
    values,
    mode: "onChange",
  });

  const [min_price, max_price, price_unit] = watch(["min_price", "max_price", "price_unit"]);

  useEffect(() => {
    if (service?.barter_category) {
      setCategory({
        id: service.barter_category.id,
        name: service.barter_category.name,
      });
    }

    if (service?.images) {
      setImages(service.images.map((img) => img.uri));
    }
  }, [service]);

  const handlePickImages = async ({ useCamera = false }: { useCamera?: boolean } = {}) => {
    const permission = useCamera
      ? await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert(`${useCamera ? "Camera permission is required" : "Library permission is required"}`);
      return;
    }

    const result = await getImagePickerResult({
      useCamera,
      options: {
        mediaTypes: ["images"],
        allowsMultipleSelection: true,
        aspect: [1, 1],
      },
    });

    if (!result.canceled) {
      const newFiles: Media[] = result.assets.map((asset) => ({
        uri: asset.uri,
        name: asset.fileName || `image_${Date.now()}.jpg`,
        type: asset.type || "image/jpeg",
      }));
      const updatedFiles = [...files, ...newFiles].slice(0, 5);
      setFiles(updatedFiles);
      setValue("images", updatedFiles);

      const newImages = result.assets.map((asset) => asset.uri);
      const updatedImages = [...images, ...newImages].slice(0, 5);

      setImages(updatedImages);
    }
  };

  const handleRemoveImages = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    setValue("images", updatedFiles);

    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  const handleCategorySelect = (item: Category) => {
    setCategory({ id: item.id, name: item.name });
    setValue("barter_category_id", item.id);
  };

  const onSubmit = handleSubmit((values) => updateServiceMutation.mutate({ barter_service_id, data: values }));

  if (serviceQuery.isLoading || categoriesQuery.isLoading) {
    return <LoadingStateScreen />;
  }

  return (
    <>
      <View style={{ flex: 1, gap: 16, padding: 16 }}>
        <AppTextInput control={control} label="Title" name="title" errors={errors.title?.message} />

        <AppTextInput control={control} label="Description" name="description" errors={errors.description?.message} />

        <AppDialog
          renderTriggerButton={(open) => (
            <AppTextInput
              control={control}
              label="Category"
              name="barter_category_id"
              errors={errors.barter_category_id?.message}
              value={category.name}
              editable={false}
              onPress={() => {
                Keyboard.dismiss();
                open();
              }}
            />
          )}
          title="Select category"
          body={
            <AppFlashList
              data={categories}
              extraData={category}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <RadioButton.Item
                  label={item.name}
                  value={item.id}
                  status={category.id === item.id ? "checked" : "unchecked"}
                  onPress={() => handleCategorySelect(item)}
                />
              )}
              estimatedItemSize={15}
            />
          }
        />

        <FieldWrapper
          label="Price Range"
          errors={[errors.min_price?.message ?? "", errors.max_price?.message ?? "", errors.price_unit?.message ?? ""]}
        >
          <View style={styles.priceInputContainer}>
            <AppTextInput
              control={control}
              label="Min (RM)"
              name="min_price"
              inputMode="decimal"
              style={styles.priceInput}
            />

            <AppTextInput
              control={control}
              label="Max (RM)"
              name="max_price"
              inputMode="decimal"
              style={styles.priceInput}
            />
            <AppTextInput control={control} label="Price Unit" name="price_unit" style={styles.priceInput} />
          </View>
          <HelperText type="info">{`RM${min_price} - RM${max_price} per ${price_unit}`}</HelperText>
        </FieldWrapper>

        {images.length < 5 && (
          <GroupedButtons
            buttons={[
              {
                label: "Take Photos",
                mode: "contained-tonal",
                onPress: () => handlePickImages({ useCamera: true }),
              },
              {
                label: "Choose Photos",
                mode: "contained-tonal",
                onPress: () => handlePickImages(),
              },
            ]}
          />
        )}

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.imageScrollView}>
          {images.map((image, index) => (
            <View key={index}>
              <Image source={{ uri: image }} style={styles.image} />
              <IconButton
                icon="minus"
                size={16}
                style={[styles.removeImageButton]}
                containerColor={colors.error}
                iconColor={colors.onError}
                onPress={() => handleRemoveImages(index)}
              />
            </View>
          ))}
        </ScrollView>
      </View>

      <GroupedButtons
        variant="bottom"
        buttons={[
          { label: "Cancel", mode: "outlined", onPress: () => router.back() },
          {
            label: "Save",
            mode: "contained",
            onPress: onSubmit,
            disabled: updateServiceMutation.isPending,
          },
        ]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  priceInputContainer: {
    flexDirection: "row",
    gap: 8,
  },
  priceInput: {
    flex: 1,
    minWidth: 0,
  },

  image: {
    width: 100,
    height: 100,
  },
  imageScrollView: {
    gap: 4,
  },
  removeImageButton: {
    position: "absolute",
    top: 0,
    right: 0,
  },
});
