import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Checkbox, Divider, Text, TextInput } from "react-native-paper";

import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";

import { KeyboardWrapper, LoadingStateScreen } from "@/components/screens";
import { AppList } from "@/components/ui";
import { Buttons } from "@/components/ui/button";
import { FormError, FormInput } from "@/components/ui/form";
import { useService } from "@/features/service/api/get-service";
import { useUser } from "@/lib/auth/auth";

import { createTransactionInputSchema, useCreateTransaction } from "../api/create-transaction";

export const CreateTransaction = ({ barter_service_id }: { barter_service_id: string }) => {
  /* ======================================== STATES */
  const [mode, setMode] = useState<string | null>("");

  /* ======================================== QUERIES */
  const userQuery = useUser();
  const user = userQuery.data;

  const serviceQuery = useService({ barter_service_id });
  const service = serviceQuery.data?.data;

  /* ======================================== MUTATIONS */
  const createTransactionMutation = useCreateTransaction({
    mutationConfig: {
      onSuccess: () => {
        router.dismissAll();
      },
    },
  });

  /* ======================================== FORM */
  const defaultValues = {
    barter_service_id,
    amount: 0,
    barter_service_ids: [] as string[],
  };

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createTransactionInputSchema),
    defaultValues,
    mode: "onChange",
  });

  const checked = watch("barter_service_ids", []);

  /* ======================================== FUNCTIONS */
  const toggleCheck = (id: string, checked: string[]) => {
    const updated = checked.includes(id) ? checked.filter((checkedIds) => checkedIds !== id) : [...checked, id];
    setValue("barter_service_ids", updated);
  };

  const onSubmit = handleSubmit((values) => {
    createTransactionMutation.mutate({ data: values });
  });

  /* ======================================== RETURNS */
  if (userQuery.isLoading || serviceQuery.isLoading) {
    return <LoadingStateScreen />;
  }

  return (
    <>
      <KeyboardWrapper>
        <View style={styles.container}>
          <FormInput label="Service provider" value={service?.barter_provider?.name} editable={false} multiline />
          <FormInput label="Service" value={service?.title} editable={false} multiline />
        </View>

        <Divider />

        {!mode && (
          <Buttons
            vertical
            buttons={[
              {
                label: "Pay with service",
                mode: mode == "service" ? "contained" : "contained-tonal",
                onPress: () => setMode("service"),
              },
              {
                label: "Pay with cash",
                mode: mode == "cash" ? "contained" : "contained-tonal",
                onPress: () => setMode("cash"),
              },
              {
                label: "Pay with service and cash",
                mode: mode == "mixed" ? "contained" : "contained-tonal",
                onPress: () => setMode("mixed"),
              },
              {
                label: "Get it for free",
                mode: mode == "free" ? "contained" : "contained-tonal",
                onPress: () => setMode("free"),
              },
            ]}
            style={{ padding: 16 }}
          />
        )}

        {(mode === "cash" || mode === "mixed") && (
          <View style={styles.container}>
            <FormInput
              control={control}
              label="Enter amount to barter"
              name="amount"
              errors={errors.amount?.message}
              inputMode="decimal"
              left={<TextInput.Affix text="RM " />}
            />
          </View>
        )}

        {(mode === "service" || mode === "mixed") && (
          <View style={styles.container}>
            <View style={styles.services}>
              <Text variant="labelLarge">Select service(s) to barter</Text>
              <FormError messages={errors.barter_service_ids?.message} />

              <Controller
                control={control}
                name="barter_service_ids"
                render={() => (
                  <AppList
                    data={user?.barter_services?.filter((service) => service.status === "enabled")}
                    renderItem={({ item }) => (
                      <Checkbox.Item
                        label={item.title}
                        status={checked.includes(item.id) ? "checked" : "unchecked"}
                        onPress={() => toggleCheck(item.id, checked)}
                      />
                    )}
                  />
                )}
              />
            </View>
          </View>
        )}
      </KeyboardWrapper>

      <Buttons
        variant="bottom"
        buttons={[
          {
            label: !mode ? "Cancel" : "Back",
            mode: "outlined",
            onPress: () => {
              if (!mode) {
                router.back();
              }
              setMode(null);
              reset();
            },
          },
          {
            label: "Request",
            mode: "contained",
            onPress: onSubmit,
            disabled: !mode || createTransactionMutation.isPending,
            loading: createTransactionMutation.isPending,
          },
        ]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
    padding: 16,
  },
  services: {
    gap: 4,
  },
});
