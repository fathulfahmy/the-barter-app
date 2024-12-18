import React, { useState } from "react";
import { ScrollView } from "react-native";
import { StyleSheet } from "react-native";

import { useStripe } from "@stripe/stripe-react-native";
import { router } from "expo-router";

import { LoadingStateScreen } from "@/components/screens";
import { Buttons } from "@/components/ui/button";
import { useConfirmationDialog, useStatusDialog } from "@/components/ui/dialog";
import { FormInput } from "@/components/ui/form";
import { paymentSheetParams } from "@/features/stripe/api/get-payment-sheet-params";
import { useUser } from "@/lib/auth/auth";
import { formatInvoiceItems } from "@/utils/format";

import { useTransaction } from "../api/get-transaction";
import { useUpdateTransaction } from "../api/update-transactions";

export const CreatePayment = ({ barter_transaction_id }: { barter_transaction_id: string }) => {
  const userQuery = useUser();
  const user = userQuery.data;

  const transactionQuery = useTransaction({ barter_transaction_id });
  const transaction = transactionQuery.data?.data;

  const role: "acquirer" | "provider" = user?.id === transaction?.barter_acquirer?.id ? "acquirer" : "provider";

  const amount = role === "acquirer" ? (transaction?.barter_invoice?.amount ?? 0) : 0;
  const receiver = role === "acquirer" ? transaction?.barter_provider?.name : user?.name;
  const acquired =
    role === "acquirer" ? formatInvoiceItems(transaction?.barter_invoice) : transaction?.barter_service?.title;
  const bartered =
    role === "acquirer" ? transaction?.barter_service?.title : formatInvoiceItems(transaction?.barter_invoice);

  const updateTransactionMutation = useUpdateTransaction({
    mutationConfig: {
      onSuccess: () => {
        router.replace("/my_barters/history");
      },
    },
  });

  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  const initializePaymentSheet = async () => {
    const { data } = await paymentSheetParams({ data: { amount } });
    const { payment_intent, ephemeral_key, customer } = data;

    // Use Mock payment data: https://docs.stripe.com/payments/accept-a-payment?platform=react-native&ui=payment-sheet#react-native-test
    const { error } = await initPaymentSheet({
      merchantDisplayName: "The Barter App",
      customerId: customer,
      customerEphemeralKeySecret: ephemeral_key,
      paymentIntentClientSecret: payment_intent,
    });

    if (error) {
      useStatusDialog.getState().setStatusDialog({
        type: "error",
        title: "Payment error",
        body: error.message,
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    useConfirmationDialog.getState().setConfirmationDialog({
      type: "warning",
      title: "Complete barter?",
      confirmButtonFn: async () => {
        if (role === "acquirer" && amount > 0) {
          setLoading(true);

          const initialized = await initializePaymentSheet();

          if (!initialized) {
            setLoading(false);
            return;
          }

          const { error } = await presentPaymentSheet();

          if (error) {
            setLoading(false);
            useStatusDialog.getState().setStatusDialog({
              type: "error",
              title: "Payment error",
              body: error.message,
            });
            return;
          }
        }
        setLoading(false);
        updateTransactionMutation.mutate({
          barter_transaction_id,
          data: {
            status: "completed",
          },
        });
      },
    });
  };

  if (userQuery.isLoading || transactionQuery.isLoading) {
    return <LoadingStateScreen />;
  }

  return (
    <>
      <ScrollView contentContainerStyle={styles.form}>
        <FormInput label="To" value={receiver} editable={false} />
        <FormInput label="Acquired" value={acquired} editable={false} />
        <FormInput label="Bartered for" value={bartered} editable={false} />
      </ScrollView>
      <Buttons
        variant="bottom"
        buttons={[
          { label: "Cancel", mode: "outlined", onPress: () => router.back() },
          { label: "Confirm", mode: "contained", onPress: handleSubmit, disabled: loading, loading: loading },
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
  services: {
    flex: 1,
    gap: 8,
  },
});
