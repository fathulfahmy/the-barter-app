import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { Checkbox, Text } from "react-native-paper";

import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";

import { AppFlashList } from "@/components/ui";
import { BottomActionButtons } from "@/components/ui/button";
import { AppTextInput, Error } from "@/components/ui/form";
import { useUser } from "@/lib/auth/auth";

import { createBarterRequestInputSchema, useCreateBarterRequest } from "../api/create-barter-request";

export const CreateBarterRequest = ({ barterServiceId }: { barterServiceId: string }) => {
  const { data } = useUser();
  const enabledBarterServices = data?.barter_services?.filter((item) => item.status === "enabled");

  const [checked, setChecked] = useState<string[]>([]);

  const createBarterRequestMutation = useCreateBarterRequest({
    mutationConfig: {
      onSuccess: () => {
        router.dismissAll();
      },
    },
  });

  const defaultValues = {
    barter_service_id: barterServiceId,
    amount: 0,
    barter_service_ids: [] as string[],
  };

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createBarterRequestInputSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = handleSubmit((values) => {
    createBarterRequestMutation.mutate({ data: values });
  });

  const handleServiceSelect = (id: string) => {
    setChecked((prev) => {
      const barterServiceIds = prev.includes(id) ? prev.filter((ids) => ids !== id) : [...prev, id];

      setValue("barter_service_ids", barterServiceIds);
      return barterServiceIds;
    });
  };

  return (
    <>
      <View style={{ flex: 1, gap: 32, padding: 16 }}>
        <AppTextInput
          control={control}
          label="Amount"
          name="amount"
          errors={errors.amount?.message}
          inputMode="decimal"
        />

        <View style={{ flex: 1, gap: 8 }}>
          <Text variant="labelLarge">Services</Text>
          <Error messages={errors.barter_service_ids?.message} />

          <Controller
            control={control}
            name="barter_service_ids"
            render={() => (
              <AppFlashList
                data={enabledBarterServices}
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
      </View>

      <BottomActionButtons
        buttons={[
          { label: "Cancel", mode: "outlined", onPress: () => router.back() },
          {
            label: "Request",
            mode: "contained",
            onPress: onSubmit,
            disabled: createBarterRequestMutation.isPending,
          },
        ]}
      />
    </>
  );
};
