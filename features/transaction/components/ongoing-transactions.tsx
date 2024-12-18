import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";

import { router } from "expo-router";

import { LoadingStateScreen } from "@/components/screens";
import { AppList, Spacer } from "@/components/ui";
import { AvatarWithName } from "@/components/ui/avatar";
import { useConfirmationDialog } from "@/components/ui/dialog";
import { useRefreshByUser } from "@/hooks/use-refresh-by-user";
import { useAppTheme } from "@/lib/react-native-paper";
import { formatInvoiceItems } from "@/utils/format";

import { useInfiniteTransactions } from "../api/get-transactions";
import { useUpdateTransaction } from "../api/update-transactions";

export const OngoingTransactions = ({ barter_service_id }: { barter_service_id?: string }) => {
  const { colors } = useAppTheme();

  const transactionsQuery = useInfiniteTransactions({
    mode: "ongoing",
    ...(barter_service_id && { barter_service_id }),
  });

  const updateTransactionMutation = useUpdateTransaction({
    mutationConfig: {
      onSuccess: () => {
        transactionsQuery.refetch();
      },
    },
  });

  const handleCancel = (barter_transaction_id: string) => {
    useConfirmationDialog.getState().setConfirmationDialog({
      type: "warning",
      title: "Cancel barter?",
      confirmButtonFn: () => {
        updateTransactionMutation.mutate({
          barter_transaction_id,
          data: {
            status: "cancelled",
          },
        });
      },
    });
  };

  const handleComplete = (barter_transaction_id: string) => {
    if (barter_service_id) {
      router.push(`/provide/${barter_transaction_id}/payment`);
    } else {
      router.push(`/my_barters/${barter_transaction_id}/payment`);
    }
  };

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(transactionsQuery.refetch);

  if (transactionsQuery.isLoading) {
    return <LoadingStateScreen />;
  }

  const barter_transactions = transactionsQuery.data?.pages.flatMap((page) => page.data.data);

  return (
    <AppList
      data={barter_transactions}
      renderItem={({ item }) => (
        <Card>
          <Card.Content style={styles.card}>
            <View style={styles.header}>
              <AvatarWithName user={item.barter_acquirer} />
            </View>

            <View style={styles.body}>
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
                  onPress={() => handleCancel(item.id)}
                  disabled={updateTransactionMutation.isPending}
                >
                  Cancel
                </Button>
                <Button
                  mode="contained"
                  textColor={colors.onGreen}
                  style={{ flex: 1, backgroundColor: colors.green }}
                  onPress={() => handleComplete(item.id)}
                  disabled={updateTransactionMutation.isPending}
                >
                  Complete
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  body: {
    gap: 2,
  },
});
