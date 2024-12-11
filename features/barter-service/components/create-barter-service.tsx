import { useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { HelperText, RadioButton } from "react-native-paper";

import { zodResolver } from "@hookform/resolvers/zod";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";

import { BottomActionButtons } from "@/components/ui/button";
import { AppDialog, useStatusDialog } from "@/components/ui/dialog";
import { AppTextInput, FieldWrapper } from "@/components/ui/form";
import { useBarterCategories } from "@/features/barter-category/api/get-barter-categories";
import { BarterCategory } from "@/types/api";

import { createBarterServiceInputSchema, useCreateBarterService } from "../api/create-barter-service";

export const CreateBarterService = () => {
  const [checked, setChecked] = useState({
    id: "",
    name: "",
  });

  const barterCategoriesQuery = useBarterCategories();

  const createBarterServiceMutation = useCreateBarterService({
    mutationConfig: {
      onSuccess: () => {
        router.dismissAll();
        useStatusDialog.getState().setStatusDialog({
          type: "success",
          title: "Service created",
        });
      },
    },
  });

  const barterCategories = barterCategoriesQuery.data?.data;

  const defaultValues = {
    title: "",
    description: "",
    barter_category_id: "",
    min_price: 0,
    max_price: 0,
    price_unit: "unit",
  };

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createBarterServiceInputSchema),
    defaultValues,
    mode: "onChange",
  });

  const [min_price, max_price, price_unit] = watch(["min_price", "max_price", "price_unit"]);

  const handleCategorySelect = (item: BarterCategory) => {
    setChecked({ id: item.id, name: item.name });
    setValue("barter_category_id", item.id);
  };

  const onSubmit = handleSubmit((values) => createBarterServiceMutation.mutate({ data: values }));

  return (
    <>
      <View style={{ flex: 1, gap: 16, padding: 16 }}>
        <AppTextInput control={control} label="Title" name="title" errors={errors.title?.message} />

        <AppTextInput control={control} label="Description" name="description" errors={errors.description?.message} />

        <AppDialog
          triggerButton={
            <AppTextInput
              control={control}
              label="Category"
              name="barter_category_id"
              errors={errors.barter_category_id?.message}
              value={checked.name}
            />
          }
          title="Select category"
          body={
            <FlashList
              data={barterCategories}
              extraData={checked}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <RadioButton.Item
                  label={item.name}
                  value={item.id}
                  status={checked.id === item.id ? "checked" : "unchecked"}
                  onPress={() => handleCategorySelect(item)}
                />
              )}
            />
          }
        />

        <FieldWrapper
          label="Price Range"
          errors={[errors.min_price?.message ?? "", errors.max_price?.message ?? "", errors.price_unit?.message ?? ""]}
        >
          <View style={styles.priceInputContainer}>
            <AppTextInput control={control} label="Min (RM)" name="min_price" style={styles.priceInput} />

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

      <BottomActionButtons
        buttons={[
          { label: "Cancel", mode: "outlined", onPress: () => router.back() },
          {
            label: "Add",
            mode: "contained",
            onPress: onSubmit,
            disabled: createBarterServiceMutation.isPending,
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
    marginBottom: 8,
  },

  priceInput: {
    flex: 1,
    minWidth: 0,
  },
});
