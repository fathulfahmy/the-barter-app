import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Keyboard, StyleSheet } from "react-native";
import { View } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { DatePickerModal, TimePickerModal } from "react-native-paper-dates";
import { CalendarDate } from "react-native-paper-dates/lib/typescript/Date/Calendar";

import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";

import { KeyboardWrapper } from "@/components/screens";
import { Buttons } from "@/components/ui/button";
import { FormField, FormInput } from "@/components/ui/form";
import { useDisclosure } from "@/hooks/use-disclosure";
import { useAppTheme } from "@/lib/react-native-paper";
import { filterEmptyValues } from "@/utils/form";
import { formatDateTime } from "@/utils/format";

import { createRemarkInputSchema, useCreateRemark } from "../api/create-remark";

export const CreateRemark = ({ barter_transaction_id }: { barter_transaction_id: string }) => {
  /* ======================================== STATES */
  const [date, setDate] = useState<CalendarDate>(undefined);

  /* ======================================== HOOKS */
  const { fonts, colors } = useAppTheme();
  const { isOpen: isDatePickerOpen, open: openDatePicker, close: closeDatePicker } = useDisclosure();
  const { isOpen: isTimePickerOpen, open: openTimePicker, close: closeTimePicker } = useDisclosure();

  /* ======================================== MUTATIONS */
  const createRemarkMutation = useCreateRemark({
    mutationConfig: {
      onSuccess: () => {
        router.dismissAll();
      },
    },
  });

  /* ======================================== FORM */
  const defaultValues = {
    barter_transaction_id,
    datetime: undefined as CalendarDate,
    address: "",
    deliverables: ["", ""],
    note: "",
  };

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createRemarkInputSchema),
    defaultValues,
    mode: "onChange",
  });

  const [datetime, deliverables] = watch(["datetime", "deliverables"]);

  /* ======================================== FUNCTIONS */
  const addDeliverable = () => {
    setValue("deliverables", [...deliverables, ""]);
  };

  const removeDeliverable = (index: number) => {
    const updated = deliverables.filter((_, i) => i !== index);
    setValue("deliverables", updated);
  };

  const handleDateConfirm = React.useCallback(
    ({ date }: any) => {
      closeDatePicker();
      openTimePicker();

      setDate(new Date(date));
    },
    [closeDatePicker, openTimePicker, setDate],
  );

  const handleTimeConfirm = React.useCallback(
    ({ hours, minutes }: any) => {
      closeTimePicker();

      if (date) {
        const combined = new Date(date);
        combined.setHours(hours);
        combined.setMinutes(minutes);
        setValue("datetime", combined);
      }
    },
    [date, closeTimePicker, setValue],
  );

  const onSubmit = handleSubmit((values) => {
    const filtered = filterEmptyValues(values);
    createRemarkMutation.mutate({
      data: {
        ...filtered,
        barter_transaction_id,
      },
    });
  });

  /* ======================================== RETURNS */
  return (
    <>
      <KeyboardWrapper contentContainerStyle={styles.container}>
        <FormInput
          control={control}
          label="Date/Time"
          name="datetime"
          errors={errors.datetime?.message}
          value={formatDateTime(datetime) ?? undefined}
          editable={false}
          onPress={() => {
            Keyboard.dismiss();
            openDatePicker();
          }}
        />

        <DatePickerModal
          locale="en"
          mode="single"
          visible={isDatePickerOpen}
          onDismiss={closeDatePicker}
          date={date}
          onConfirm={handleDateConfirm}
          presentationStyle="pageSheet"
        />

        <TimePickerModal
          locale="en"
          visible={isTimePickerOpen}
          onDismiss={closeTimePicker}
          onConfirm={handleTimeConfirm}
        />

        <FormInput control={control} label="Address" name="address" errors={errors.address?.message} multiline />

        <FormField label="Deliverables" errors={errors.deliverables?.message}>
          {deliverables.map((_, index) => (
            <View key={`deliverables.${index}`} style={styles.deliverableContainer}>
              <FormInput control={control} name={`deliverables.${index}`} style={styles.deliverable} multiline />
              {deliverables.length > 1 ? (
                <IconButton
                  icon="minus"
                  mode="contained"
                  size={fonts.bodyLarge.fontSize}
                  containerColor={colors.secondary}
                  iconColor={colors.onSecondary}
                  onPress={() => removeDeliverable(index)}
                />
              ) : null}
            </View>
          ))}
          <Button mode="contained-tonal" onPress={addDeliverable}>
            Add another deliverable
          </Button>
        </FormField>

        <FormInput control={control} label="Note" name="note" errors={errors.address?.message} multiline />
      </KeyboardWrapper>

      <Buttons
        variant="bottom"
        buttons={[
          { label: "Cancel", mode: "outlined", onPress: () => router.back() },
          {
            label: "Add",
            mode: "contained",
            onPress: onSubmit,
            disabled: createRemarkMutation.isPending,
            loading: createRemarkMutation.isPending,
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
  deliverableContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingBottom: 8,
  },
  deliverable: {
    flex: 1,
  },
});
