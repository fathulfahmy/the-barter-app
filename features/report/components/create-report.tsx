import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { RadioButton, Text } from "react-native-paper";

import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";

import { KeyboardWrapper, LoadingStateScreen } from "@/components/screens";
import { AppList } from "@/components/ui";
import { Buttons } from "@/components/ui/button";
import { FormError } from "@/components/ui/form";
import { Reason, ReportModelName } from "@/types/api";
import { formatSentenceCase } from "@/utils/format";

import { createReportInputSchema, useCreateReport } from "../api/create-report";
import { useReasons } from "../api/get-reasons";

type CreateReportProps = {
  model_id: string;
  model_name: ReportModelName;
};

export const CreateReport: React.FC<CreateReportProps> = ({ model_id, model_name }) => {
  /* ======================================== STATES */
  const [reason, setReason] = useState({ id: "", name: "" });

  /* ======================================== QUERIES */
  const reasonsQuery = useReasons();
  const reasons = reasonsQuery.data?.data;

  /* ======================================== MUTATIONS */
  const createReportMutation = useCreateReport();

  /* ======================================== FORM */
  const defaultValues = {
    user_report_reason_id: "",
    model_id,
    model_name,
  };

  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createReportInputSchema),
    defaultValues,
    mode: "onChange",
  });

  /* ======================================== FUNCTIONS */
  const handleReasonSelect = (item: Reason) => {
    setReason({ id: item.id, name: item.name });
    setValue("user_report_reason_id", item.id);
  };

  const onSubmit = handleSubmit((values) => createReportMutation.mutate({ data: values }));

  /* ======================================== RETURNS */
  if (reasonsQuery.isLoading) {
    return <LoadingStateScreen />;
  }

  return (
    <>
      <KeyboardWrapper>
        <View style={styles.form}>
          <Text variant="displaySmall">{formatSentenceCase(`Report ${model_name}`)}</Text>
          <View style={styles.content}>
            <Text variant="labelLarge">Select reason</Text>
            <FormError messages={errors.user_report_reason_id?.message} />
            <AppList
              data={reasons}
              extraData={reason}
              renderItem={({ item }) => (
                <RadioButton.Item
                  label={item.name}
                  value={item.id}
                  status={reason.id == item.id ? "checked" : "unchecked"}
                  onPress={() => handleReasonSelect(item)}
                />
              )}
              containerStyle={{ flex: 1 }}
            />
          </View>
        </View>
      </KeyboardWrapper>
      <Buttons
        variant="bottom"
        buttons={[
          { label: "Cancel", mode: "outlined", onPress: () => router.back() },
          {
            label: "Confirm",
            mode: "contained",
            onPress: onSubmit,
            disabled: createReportMutation.isPending,
            loading: createReportMutation.isPending,
          },
        ]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  form: {
    gap: 32,
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  content: {
    gap: 4,
  },
});
