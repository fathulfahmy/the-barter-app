import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Divider } from "react-native-paper";

import { useStripe } from "@stripe/stripe-react-native";
import { router } from "expo-router";

import { Buttons } from "@/components/ui/button";
import { useConfirmationDialog, useStatusDialog } from "@/components/ui/dialog";
import { FormInput } from "@/components/ui/form";
import { Invoice } from "@/features/invoice/components/invoice";
import { getPaymentSheetParams } from "@/features/stripe/api/get-payment-sheet-params";
import { useUser } from "@/lib/auth/auth";
import { formatEllipses, formatInvoiceItems } from "@/utils/format";

import { useTransaction } from "../api/get-transaction";
import { useUpdateTransaction } from "../api/update-transaction";

export const CreatePayment = ({ barter_transaction_id }: { barter_transaction_id: string }) => {
  /* ======================================== STATES */
  const [loading, setLoading] = useState(false);

  /* ======================================== HOOKS */
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  /* ======================================== QUERIES */
  const userQuery = useUser();
  const user = userQuery.data;

  const transactionQuery = useTransaction({ barter_transaction_id });
  const transaction = transactionQuery.data?.data;

  const isUserAcquirer = user?.id == transaction?.barter_acquirer?.id;
  const payWith = isUserAcquirer ? formatInvoiceItems(transaction?.barter_invoice) : transaction?.barter_service?.title;
  const amount = isUserAcquirer ? (transaction?.barter_invoice?.amount ?? 0) : 0;

  /* ======================================== MUTATIONS */
  const updateTransactionMutation = useUpdateTransaction({
    mutationConfig: {
      onSuccess: () => {
        router.dismissAll();
      },
    },
  });

  /* ======================================== FUNCTIONS */
  const initializePaymentSheet = async () => {
    const { data } = await getPaymentSheetParams({ data: { amount } });
    const { payment_intent, ephemeral_key, customer } = data;

    // Use Mock payment data: https://docs.stripe.com/payments/accept-a-payment?platform=react-native&ui=payment-sheet#react-native-test
    const { error } = await initPaymentSheet({
      merchantDisplayName: "The Barter App",
      customerId: customer,
      customerEphemeralKeySecret: ephemeral_key,
      paymentIntentClientSecret: payment_intent,
      primaryButtonLabel: formatEllipses(payWith, 30),
      defaultBillingDetails: {
        name: user?.name,
        email: user?.email,
        address: {
          country: "MY",
        },
      },
      returnURL: "thebarterapp://acquire",
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
        if (isUserAcquirer && amount > 0) {
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

  /* ======================================== RETURNS */
  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <FormInput label="Pay with" value={payWith} editable={false} multiline />
        </View>

        <Divider />

        <Invoice barter_transaction_id={barter_transaction_id} />
      </ScrollView>
      <Buttons
        variant="bottom"
        buttons={[
          { label: "Cancel", mode: "outlined", onPress: () => router.back() },
          { label: "Pay", mode: "contained", onPress: handleSubmit, disabled: loading, loading: loading },
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
