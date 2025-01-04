import React from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Divider } from "react-native-paper";

import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";

import { KeyboardWrapper } from "@/components/screens";
import { Buttons } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form";
import { RatingInput } from "@/components/ui/form/rating-input";
import { Invoice } from "@/features/invoice/components/invoice";

import { createReviewInputSchema, useCreateReview } from "../api/create-review";

export const CreateReview = ({ barter_transaction_id }: { barter_transaction_id: string }) => {
  /* ======================================== MUTATIONS */
  const createReviewMutation = useCreateReview({
    mutationConfig: {
      onSuccess: () => {
        router.dismissAll();
      },
    },
  });

  /* ======================================== FORM */
  const defaultValues = {
    barter_transaction_id,
    description: "",
    rating: 5,
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createReviewInputSchema),
    defaultValues,
    mode: "onChange",
  });

  /* ======================================== FUNCTIONS */
  const onSubmit = handleSubmit((values) => createReviewMutation.mutate({ data: values }));

  /* ======================================== RETURNS */
  return (
    <>
      <KeyboardWrapper>
        <View style={styles.container}>
          <FormInput
            control={control}
            label="Description"
            name="description"
            errors={errors.description?.message}
            multiline
          />
          <RatingInput control={control} label="Rating" name="rating" errors={errors.rating?.message} />
        </View>

        <Divider />

        <Invoice barter_transaction_id={barter_transaction_id} />
      </KeyboardWrapper>

      <Buttons
        variant="bottom"
        buttons={[
          { label: "Cancel", mode: "outlined", onPress: () => router.back() },
          {
            label: "Save",
            mode: "contained",
            onPress: onSubmit,
            disabled: createReviewMutation.isPending,
            loading: createReviewMutation.isPending,
          },
        ]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
});
