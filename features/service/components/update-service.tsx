import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Keyboard, StyleSheet, View } from "react-native";
import { HelperText, RadioButton } from "react-native-paper";

import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";

import { LoadingStateScreen } from "@/components/screens";
import { AppFlashList } from "@/components/ui";
import { GroupedButtons } from "@/components/ui/button";
import { AppDialog } from "@/components/ui/dialog";
import { AppTextInput, FieldWrapper } from "@/components/ui/form";
import { useCategories } from "@/features/category/api/get-categories";
import { Category } from "@/types/api";

import { useService } from "../api/get-service";
import { updateServiceInputSchema, useUpdateService } from "../api/update-service";

export const UpdateService = ({ barter_service_id }: { barter_service_id: string }) => {
  const serviceQuery = useService({ barter_service_id });
  const categoriesQuery = useCategories();
  const service = serviceQuery.data?.data;
  const categories = categoriesQuery.data?.data;

  const [category, setCategory] = useState({
    id: service?.barter_category?.id ?? "",
    name: service?.barter_category?.name ?? "",
  });

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
  };

  const values = {
    title: service?.title ?? "",
    description: service?.description ?? "",
    barter_category_id: service?.barter_category?.id ?? "",
    min_price: service?.min_price ?? 0,
    max_price: service?.max_price ?? 0,
    price_unit: service?.price_unit ?? "unit",
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
  }, [service]);

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
});
