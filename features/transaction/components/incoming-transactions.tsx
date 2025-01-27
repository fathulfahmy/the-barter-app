import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Searchbar, Text } from "react-native-paper";

import { useIsFocused } from "@react-navigation/native";

import { AppList, Spacer } from "@/components/ui";
import { AvatarWithName } from "@/components/ui/avatar";
import { Buttons } from "@/components/ui/button";
import { useConfirmationDialog } from "@/components/ui/dialog";
import { useDebounce } from "@/hooks/use-debounce";
import { useRefreshByUser } from "@/hooks/use-refresh-by-user";
import { useStreamChat } from "@/hooks/use-stream-chat";
import { useAppTheme } from "@/lib/react-native-paper";
import { TransactionStatus } from "@/types/api";
import { formatDate, formatInvoiceItems, formatStripSuffix } from "@/utils/format";

import { useInfiniteTransactions } from "../api/get-transactions";
import { useUpdateTransaction } from "../api/update-transaction";
import { IncomingTransactionsSkeleton } from "../skeleton/incoming-transactions";
import { TransactionMenu } from "./transaction-menu";

export const IncomingTransactions = ({ barter_service_id }: { barter_service_id?: string }) => {
  /* ======================================== STATES */
  const [searchQuery, setSearchQuery] = React.useState("");

  /* ======================================== HOOKS */
  const { colors } = useAppTheme();
  const isFocused = useIsFocused();
  const channel = useStreamChat();
  const debouncedQuery = useDebounce(searchQuery, 500);

  /* ======================================== QUERIES */
  const transactionsQuery = useInfiniteTransactions({
    mode: "incoming",
    ...(barter_service_id && { barter_service_id }),
    search: debouncedQuery,
    // FIXME: pusher not working on expo go (pusher-websocket-react-native)
    queryConfig: {
      refetchInterval: isFocused ? 3000 : false,
    },
  });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(transactionsQuery.refetch);
  const transactions = transactionsQuery.data?.pages?.flatMap((page) => page?.data?.data ?? []) ?? [];

  /* ======================================== MUTATIONS */
  const updateTransactionMutation = useUpdateTransaction({
    mutationConfig: {
      onSuccess: () => {
        transactionsQuery.refetch();
      },
    },
  });

  /* ======================================== FUNCTIONS */
  const handleUpdate = ({
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

  /* ======================================== RETURNS */
  return (
    <>
      {/* ======================================== TOP BAR */}
      <View style={styles.topBar}>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
          inputStyle={styles.searchbarInput}
        />
      </View>

      {/* ======================================== LIST */}
      {transactionsQuery.isLoading ? (
        <IncomingTransactionsSkeleton />
      ) : (
        <AppList
          data={transactions}
          renderItem={({ item }) => {
            const otherUser = item.other_user;
            const title = formatInvoiceItems(item.barter_invoice);
            const subtitle = item.barter_service?.title;

            return (
              <Card>
                <Card.Content>
                  <View style={styles.header}>
                    <Text variant="bodyMedium" style={{ color: colors.secondary }}>
                      {formatDate(item.updated_at)}
                    </Text>
                    <TransactionMenu item={item} barter_service_id={barter_service_id} />
                  </View>

                  <View style={styles.body}>
                    <AvatarWithName user={otherUser} />
                  </View>

                  <View style={styles.body}>
                    <Text variant="titleMedium">{title}</Text>
                    <Text variant="bodyMedium" style={{ color: colors.secondary }}>
                      For {subtitle}
                    </Text>
                  </View>

                  <View style={styles.buttonGroup}>
                    <Buttons
                      buttons={[
                        {
                          label: "Chat",
                          mode: "outlined",
                          onPress: () => channel.createAndRedirect(otherUser?.id),
                        },
                      ]}
                    />

                    <Buttons
                      buttons={[
                        {
                          label: "Reject",
                          mode: "contained",
                          textColor: colors.onRed,
                          style: { backgroundColor: colors.red },
                          onPress: () => handleUpdate({ status: "rejected", barter_transaction_id: item.id }),
                          disabled: updateTransactionMutation.isPending,
                        },
                        {
                          label: "Accept",
                          mode: "contained",
                          onPress: () => handleUpdate({ status: "accepted", barter_transaction_id: item.id }),
                          disabled: updateTransactionMutation.isPending,
                        },
                      ]}
                    />
                  </View>
                </Card.Content>
              </Card>
            );
          }}
          onEndReached={() => {
            transactionsQuery.hasNextPage && transactionsQuery.fetchNextPage();
          }}
          onRefresh={refetchByUser}
          refreshing={isRefetchingByUser}
          ItemSeparatorComponent={() => <Spacer y={8} />}
          containerStyle={{ flex: 1 }}
          contentContainerStyle={{ padding: 16, paddingTop: 8 }}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  searchbar: {
    flex: 1,
    height: 40,
  },
  searchbarInput: {
    minHeight: 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 4,
  },
  body: {
    gap: 2,
    paddingBottom: 16,
  },
  buttonGroup: {
    gap: 4,
  },
});
