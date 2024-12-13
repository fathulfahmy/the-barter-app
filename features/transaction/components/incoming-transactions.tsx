import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";

import { router } from "expo-router";

import { LoadingStateScreen } from "@/components/screens";
import { AppFlashList, AvatarWithName, Spacer } from "@/components/ui";
import { useConfirmationDialog } from "@/components/ui/dialog";
import { useRefreshByUser } from "@/hooks/use-refresh-by-user";
import { useAppTheme } from "@/lib/react-native-paper";
import { TransactionStatus } from "@/types/api";
import { formatInvoiceItems, formatStripSuffix } from "@/utils/format";

import { useInfiniteTransactions } from "../api/get-transactions";
import { useUpdateTransaction } from "../api/update-transactions";

export const IncomingTransactions = ({ barter_service_id }: { barter_service_id?: string }) => {
  const { colors } = useAppTheme();

  const transactionsQuery = useInfiniteTransactions({
    mode: "incoming",
    ...(barter_service_id && { barter_service_id }),
  });

  const updateTransactionMutation = useUpdateTransaction({
    mutationConfig: {
      onSuccess: () => {
        transactionsQuery.refetch();
      },
    },
  });

  const handleSubmit = ({
    barter_transaction_id,
    status,
  }: {
    barter_transaction_id: string;
    status: TransactionStatus;
  }) => {
    useConfirmationDialog.getState().setConfirmationDialog({
      type: "warning",
      title: `${formatStripSuffix(status, "ed")} barter?`,
      confirmButtonFn: () => {
        updateTransactionMutation.mutate({
          barter_transaction_id,
          data: {
            status,
          },
        });
      },
    });
  };

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(transactionsQuery.refetch);

  if (transactionsQuery.isLoading) {
    return <LoadingStateScreen />;
  }

  const barter_transactions = transactionsQuery.data?.pages.flatMap((page) => page.data.data);

  return (
    <AppFlashList
      data={barter_transactions}
      renderItem={({ item }) => (
        <Card>
          <Card.Content style={styles.card}>
            <View style={styles.cardHeader}>
              <AvatarWithName user={item.barter_acquirer} />
            </View>

            <View style={styles.cardBody}>
              <Text variant="titleMedium">{formatInvoiceItems(item.barter_invoice)}</Text>
              <Text
                variant="bodyMedium"
                style={{ color: colors.secondary }}
              >{`For ${item.barter_service?.title}`}</Text>
            </View>

            <View style={{ gap: 4 }}>
              <Button mode="contained" onPress={() => router.push(`/chat/${item.barter_acquirer_id}`)}>
                Chat
              </Button>

              <View style={{ flexDirection: "row", gap: 4 }}>
                <Button
                  mode="contained"
                  textColor={colors.onRed}
                  style={{ flex: 1, backgroundColor: colors.red }}
                  onPress={() => handleSubmit({ status: "rejected", barter_transaction_id: item.id })}
                  disabled={updateTransactionMutation.isPending}
                >
                  Reject
                </Button>
                <Button
                  mode="contained"
                  textColor={colors.onGreen}
                  style={{ flex: 1, backgroundColor: colors.green }}
                  onPress={() => handleSubmit({ status: "accepted", barter_transaction_id: item.id })}
                  disabled={updateTransactionMutation.isPending}
                >
                  Accept
                </Button>
              </View>
            </View>
          </Card.Content>
        </Card>
      )}
      estimatedItemSize={15}
      onEndReached={() => {
        transactionsQuery.hasNextPage && transactionsQuery.fetchNextPage();
      }}
      onRefresh={refetchByUser}
      refreshing={isRefetchingByUser}
      ItemSeparatorComponent={() => <Spacer y={8} />}
      contentContainerStyle={{ padding: 16 }}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    gap: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardBody: {
    gap: 2,
  },
});
