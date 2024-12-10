import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, View } from "react-native";
import { Checkbox, Text } from "react-native-paper";

import { zodResolver } from "@hookform/resolvers/zod";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";

import { BottomActionButtons } from "@/components/ui/button";
import { useStatusDialog } from "@/components/ui/dialog";
import { AppTextInput, Error } from "@/components/ui/form";
import { useUser } from "@/lib/auth/auth";

import { createBarterRequestInputSchema, useCreateBarterRequest } from "../api/create-barter-request";

export const CreateBarterRequest = ({ barterServiceId }: { barterServiceId: string }) => {
  const { data } = useUser();
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const createBarterRequestMutation = useCreateBarterRequest({
    mutationConfig: {
      onSuccess: () => {
        router.dismissAll();
        useStatusDialog.getState().setStatusDialog({
          type: "success",
          title: "Request Sent",
        });
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

  const toggleCheckbox = (id: string) => {
    setChecked((prevChecked) => {
      const updatedChecked = { ...prevChecked, [id]: !prevChecked[id] };

      const barterServiceIds = Object.keys(updatedChecked)
        .filter((key) => updatedChecked[key])
        .map((key) => key);

      setValue("barter_service_ids", barterServiceIds);
      return updatedChecked;
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
              <View style={{ flex: 1 }}>
                <FlashList
                  data={data?.barter_services?.filter((item) => item.status === "enabled")}
                  extraData={checked}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <Pressable onPress={() => toggleCheckbox(item.id)}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 4,
                          paddingVertical: 8,
                        }}
                      >
                        <Checkbox.Android status={checked[item.id] ? "checked" : "unchecked"} />
                        <Text variant="bodyLarge">{item.title}</Text>
                      </View>
                    </Pressable>
                  )}
                />
              </View>
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
            loading: createBarterRequestMutation.isPending,
            disabled: createBarterRequestMutation.isPending,
          },
        ]}
      />
    </>
  );
};
