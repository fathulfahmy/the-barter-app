import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card, Divider, Text } from "react-native-paper";

import { AppList, Spacer } from "@/components/ui";
import { useTransaction } from "@/features/transaction/api/get-transaction";
import { useAppTheme } from "@/lib/react-native-paper";
import { formatCurrency, formatDateTime, formatTransactionId } from "@/utils/format";

import { InvoiceSkeleton } from "../skeleton/invoice";

export const Invoice = ({ barter_transaction_id }: { barter_transaction_id: string }) => {
  /* ======================================== HOOKS */
  const { colors } = useAppTheme();

  /* ======================================== QUERIES */
  const transactionQuery = useTransaction({ barter_transaction_id });
  const transaction = transactionQuery.data?.data;

  /* ======================================== RETURNS */
  if (transactionQuery.isLoading) {
    return <InvoiceSkeleton />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* ======================================== HEADER */}
      <Card style={{ backgroundColor: colors.surfaceVariant }}>
        <Card.Content style={styles.card}>
          <Text variant="displaySmall">Invoice</Text>
          <View style={styles.content}>
            <Text variant="titleMedium">
              ID:
              <Text variant="titleMedium"> {formatTransactionId(transaction?.id)}</Text>
            </Text>
            <Text variant="bodyMedium" style={{ color: colors.secondary }}>
              {formatDateTime(transaction?.barter_invoice?.updated_at)}
            </Text>
          </View>
        </Card.Content>
      </Card>

      {/* ======================================== PROVIDER */}
      <Card style={{ backgroundColor: colors.surface }}>
        <Card.Content style={styles.card}>
          <Text variant="titleMedium" style={{ color: colors.primary }}>
            Provider details
          </Text>

          <View style={styles.content}>
            <Text variant="bodyMedium" style={{ color: colors.secondary }}>
              Name
            </Text>
            <Text variant="bodyLarge">{transaction?.barter_provider?.name}</Text>
          </View>

          <View style={styles.content}>
            <Text variant="bodyMedium" style={{ color: colors.secondary }}>
              Service
            </Text>
            <Text variant="bodyLarge">{transaction?.barter_service?.title}</Text>
          </View>

          <Divider />

          {/* ======================================== ACQUIRER */}
          <Text variant="titleMedium" style={{ color: colors.primary }}>
            Acquirer details
          </Text>

          <View style={styles.content}>
            <Text variant="bodyMedium" style={{ color: colors.secondary }}>
              Name
            </Text>
            <Text variant="bodyLarge">{transaction?.barter_acquirer?.name}</Text>
          </View>

          {transaction?.barter_invoice?.amount && (
            <View style={styles.content}>
              <Text variant="bodyMedium" style={{ color: colors.secondary }}>
                Amount
              </Text>
              <Text variant="bodyLarge">{formatCurrency(transaction.barter_invoice.amount)}</Text>
            </View>
          )}

          {transaction?.barter_invoice?.barter_services && (
            <View style={styles.content}>
              <Text variant="bodyMedium" style={{ color: colors.secondary }}>
                Services
              </Text>
              <AppList
                data={transaction?.barter_invoice?.barter_services.map((service) => service.title)}
                renderItem={({ item }) => (
                  <>
                    <Text variant="bodyLarge">{item}</Text>
                  </>
                )}
                ItemSeparatorComponent={() => <Spacer y={4} />}
              />
            </View>
          )}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 8,
  },
  card: {
    gap: 16,
  },
  content: {
    gap: 4,
  },
});
