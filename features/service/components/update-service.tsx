import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Keyboard, StyleSheet, View } from "react-native";
import { Button, HelperText, IconButton, RadioButton, TextInput } from "react-native-paper";

import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";

import { KeyboardWrapper, LoadingStateScreen } from "@/components/screens";
import { AppList, Gallery } from "@/components/ui";
import { Buttons } from "@/components/ui/button";
import { AppDialog, useStatusDialog } from "@/components/ui/dialog";
import { FormField, FormInput } from "@/components/ui/form";
import { useCategories } from "@/features/category/api/get-categories";
import { getImagePickerMultipleFile, getImagePickerPermission, getImagePickerResult } from "@/lib/image-picker";
import { useAppTheme } from "@/lib/react-native-paper";
import { Category, Media } from "@/types/api";

import { useService } from "../api/get-service";
import { updateServiceInputSchema, useUpdateService } from "../api/update-service";

export const UpdateService = ({ barter_service_id }: { barter_service_id: string }) => {
  /* ======================================== STATES */
  const [category, setCategory] = useState({ id: "", name: "" });

  /* ======================================== HOOKS */
  const { colors } = useAppTheme();

  /* ======================================== QUERIES */
  const serviceQuery = useService({ barter_service_id });
  const service = serviceQuery.data?.data;

  const [images, setImages] = useState<string[]>(service?.images.map((img) => img.uri) ?? []);
  const [files, setFiles] = useState<(File | Media)[]>(service?.images ?? []);

  useEffect(() => {
    if (service?.barter_category) {
      setCategory({
        id: service.barter_category.id,
        name: service.barter_category.name,
      });
    }

    if (service?.images) {
      setImages(service.images.map((img) => img.uri));
      setFiles(service.images);
    }
  }, [service]);

  const categoriesQuery = useCategories();
  const categories = categoriesQuery.data?.data;

  /* ======================================== MUTATIONS */
  const updateServiceMutation = useUpdateService({
    mutationConfig: {
      onSuccess: () => {
        router.dismissAll();

        useStatusDialog.getState().setStatusDialog({
          type: "success",
          title: "Service updated",
        });
      },
    },
  });

  /* ======================================== FORM */
  const values = {
    title: service?.title ?? "",
    description: service?.description ?? "",
    barter_category_id: service?.barter_category?.id ?? "",
    min_price: service?.min_price ?? 0,
    max_price: service?.max_price ?? 0,
    price_unit: service?.price_unit ?? "unit",
    images: service?.images ?? ([] as (File | Media)[]),
  };

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateServiceInputSchema),
    values,
    mode: "onChange",
  });

  const [min_price, max_price, price_unit] = watch(["min_price", "max_price", "price_unit"]);

  /* ======================================== FUNCTIONS */
  const handlePickImages = async ({ useCamera = false }: { useCamera?: boolean } = {}) => {
    await getImagePickerPermission(useCamera);

    const result = await getImagePickerResult({
      useCamera,
      options: {
        mediaTypes: ["images"],
        allowsMultipleSelection: true,
        selectionLimit: 5 - images.length,
        aspect: [1, 1],
      },
    });

    if (!result.canceled) {
      const newFiles = getImagePickerMultipleFile(result);
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

  /* ======================================== RETURNS */
  if (serviceQuery.isLoading || categoriesQuery.isLoading) {
    return <LoadingStateScreen />;
  }

  return (
    <>
      <KeyboardWrapper>
        <View style={styles.form}>
          <FormInput control={control} label="Title" name="title" errors={errors.title?.message} />

          <FormInput
            control={control}
            label="Description"
            name="description"
            errors={errors.description?.message}
            multiline
          />

          <AppDialog
            renderTriggerButton={(open) => (
              <FormInput
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
              <AppList
                data={categories}
                extraData={category}
                renderItem={({ item }) => (
                  <RadioButton.Item
                    label={item.name}
                    value={item.id}
                    status={category.id == item.id ? "checked" : "unchecked"}
                    onPress={() => handleCategorySelect(item)}
                  />
                )}
              />
            }
          />

          <FormField
            label="Price Range"
            errors={[
              errors.min_price?.message ?? "",
              errors.max_price?.message ?? "",
              errors.price_unit?.message ?? "",
            ]}
          >
            <View style={styles.priceContainer}>
              <FormInput
                control={control}
                label="Min (RM)"
                name="min_price"
                defaultValue={service?.min_price.toFixed(2)}
                inputMode="decimal"
                left={<TextInput.Affix text="RM " />}
                style={styles.price}
              />

              <FormInput
                control={control}
                label="Max (RM)"
                name="max_price"
                defaultValue={service?.max_price.toFixed(2)}
                inputMode="decimal"
                left={<TextInput.Affix text="RM " />}
                style={styles.price}
              />
              <FormInput control={control} label="Price Unit" name="price_unit" style={styles.price} />
            </View>
            <HelperText type="info">{`RM${min_price} - RM${max_price} per ${price_unit}`}</HelperText>
          </FormField>

          <Button
            mode="contained-tonal"
            icon="upload-multiple"
            onPress={() => handlePickImages()}
            disabled={images.length >= 5}
          >
            {`Upload photos (${images.length}/5)`}
          </Button>
        </View>

        <Gallery
          uris={images}
          contentContainerStyle={styles.gallery}
          overlayContainerStyle={styles.removeImageButton}
          renderOverlay={(index) => (
            <IconButton
              icon="close"
              size={16}
              containerColor={colors.secondary}
              iconColor={colors.onSecondary}
              onPress={() => handleRemoveImages(index)}
            />
          )}
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
            disabled: updateServiceMutation.isPending,
            loading: updateServiceMutation.isPending,
          },
        ]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  form: {
    gap: 16,
    padding: 16,
  },

  priceContainer: {
    flexDirection: "row",
    gap: 8,
  },
  price: {
    flex: 1,
  },

  gallery: {
    padding: 16,
    paddingTop: 0,
  },
  removeImageButton: {
    top: 0,
    right: 0,
  },
});
