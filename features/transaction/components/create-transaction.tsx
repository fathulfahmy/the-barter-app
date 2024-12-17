import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Checkbox, Text } from "react-native-paper";

import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";

import { KeyboardWrapper, LoadingStateScreen } from "@/components/screens";
import { AppList } from "@/components/ui";
import { Buttons } from "@/components/ui/button";
import { FormError, FormInput } from "@/components/ui/form";
import { useUser } from "@/lib/auth/auth";

import { createTransactionInputSchema, useCreateTransaction } from "../api/create-transaction";

export const CreateTransaction = ({ barter_service_id }: { barter_service_id: string }) => {
  const userQuery = useUser();
  const enabledServices = userQuery.data?.barter_services?.filter((item) => item.status === "enabled");

  const [checked, setChecked] = useState<string[]>([]);

  const createTransactionMutation = useCreateTransaction({
    mutationConfig: {
      onSuccess: () => {
        router.dismissAll();
      },
    },
  });

  const defaultValues = {
    barter_service_id,
    amount: 0,
    barter_service_ids: [] as string[],
  };

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createTransactionInputSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = handleSubmit((values) => {
    createTransactionMutation.mutate({ data: values });
  });

  const handleServiceSelect = (id: string) => {
    setChecked((prev) => {
      const serviceIds = prev.includes(id) ? prev.filter((ids) => ids !== id) : [...prev, id];

      setValue("barter_service_ids", serviceIds);
      return serviceIds;
    });
  };

  if (userQuery.isLoading) {
    return <LoadingStateScreen />;
  }

  return (
    <>
      <KeyboardWrapper contentContainerStyle={styles.container}>
        <FormInput
          control={control}
          label="Amount (RM)"
          name="amount"
          errors={errors.amount?.message}
          inputMode="decimal"
        />

        <View style={styles.services}>
          <Text variant="labelLarge">Services</Text>
          <FormError messages={errors.barter_service_ids?.message} />

          <Controller
            control={control}
            name="barter_service_ids"
            render={() => (
              <AppList
                data={enabledServices}
                extraData={checked}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <Checkbox.Item
                    label={item.title}
                    status={checked.includes(item.id) ? "checked" : "unchecked"}
                    onPress={() => handleServiceSelect(item.id)}
                  />
                )}
                estimatedItemSize={15}
              />
            )}
          />
        </View>
      </KeyboardWrapper>

      <Buttons
        variant="bottom"
        buttons={[
          { label: "Cancel", mode: "outlined", onPress: () => router.back() },
          {
            label: "Request",
            mode: "contained",
            onPress: onSubmit,
            disabled: createTransactionMutation.isPending,
            loading: createTransactionMutation.isPending,
          },
        ]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 32,
    padding: 16,
  },
  services: {
    flex: 1,
    gap: 8,
  },
});
