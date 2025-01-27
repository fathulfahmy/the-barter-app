import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Menu, Searchbar, Text } from "react-native-paper";

import { useIsFocused } from "@react-navigation/native";
import { router } from "expo-router";

import { AppList, Spacer, TextWithIcon } from "@/components/ui";
import { AvatarWithName } from "@/components/ui/avatar";
import { useDebounce } from "@/hooks/use-debounce";
import { useRefreshByUser } from "@/hooks/use-refresh-by-user";
import { useStreamChat } from "@/hooks/use-stream-chat";
import { useUser } from "@/lib/auth/auth";
import { useAppTheme } from "@/lib/react-native-paper";
import { Transaction } from "@/types/api";
import { formatDate, formatDateTime, formatInvoiceItems } from "@/utils/format";

import { useInfiniteTransactions } from "../api/get-transactions";
import { OngoingTransactionsSkeleton } from "../skeleton/ongoing-transactions";
import { TransactionMenu } from "./transaction-menu";

export const OngoingTransactions = ({ barter_service_id }: { barter_service_id?: string }) => {
  /* ======================================== STATES */
  const [searchQuery, setSearchQuery] = React.useState("");

  /* ======================================== HOOKS */
  const { colors } = useAppTheme();
  const isFocused = useIsFocused();
  const channel = useStreamChat();
  const debouncedQuery = useDebounce(searchQuery, 500);

  /* ======================================== QUERIES */
  const userQuery = useUser();
  const user = userQuery.data;

  const transactionsQuery = useInfiniteTransactions({
    mode: "ongoing",
    ...(barter_service_id && { barter_service_id }),
    search: debouncedQuery,
    // FIXME: pusher not working on expo go (pusher-websocket-react-native)
    queryConfig: {
      refetchInterval: isFocused ? 3000 : false,
    },
  });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(transactionsQuery.refetch);
  const transactions = transactionsQuery.data?.pages?.flatMap((page) => page?.data?.data ?? []) ?? [];

  /* ======================================== FUNCTIONS */
  const handleComplete = (barter_transaction_id: string) => {
    if (barter_service_id) {
      router.push(`/provide/transaction/${barter_transaction_id}/payment`);
    } else {
      router.push(`/my_barters/transaction/${barter_transaction_id}/payment`);
    }
  };

  const handleReview = (barter_transaction_id: string) => {
    if (barter_service_id) {
      router.push(`/provide/transaction/${barter_transaction_id}/review`);
    } else {
      router.push(`/my_barters/transaction/${barter_transaction_id}/review`);
    }
  };

  const handleRemark = (item: Transaction) => {
    const remark = item.barter_remarks?.find((remark) => remark.user_id == user?.id);

    if (remark) {
      if (barter_service_id) {
        router.push(`/provide/remark/${remark.id}/edit`);
      } else {
        router.push(`/my_barters/remark/${remark.id}/edit`);
      }
    } else {
      if (barter_service_id) {
        router.push(`/provide/transaction/${item.id}/remark`);
      } else {
        router.push(`/my_barters/transaction/${item.id}/remark`);
      }
    }
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
      {userQuery.isLoading || transactionsQuery.isLoading ? (
        <OngoingTransactionsSkeleton />
      ) : (
        <AppList
          data={transactions}
          renderItem={({ item }) => {
            const isUserAcquirer = user?.id === item.barter_acquirer_id;
            const isUserAwaiting = user?.id == item.awaiting_user_id;
            const isOngoing = item.status === "accepted" || item.status === "awaiting_completed";
            const isCompleted = item.status === "completed";
            const otherUser = item.other_user;
            const title = isUserAcquirer ? item.barter_service?.title : formatInvoiceItems(item.barter_invoice);
            const subtitle = isUserAcquirer ? formatInvoiceItems(item.barter_invoice) : item.barter_service?.title;
            const review = item.barter_reviews?.find((review) => review.reviewer_id == user?.id);
            const remark = item.barter_remarks?.find((remark) => remark.user_id == user?.id);

            return (
              <Card>
                <Card.Content>
                  <View style={styles.header}>
                    <Text variant="bodyMedium" style={{ color: colors.secondary }}>
                      {formatDate(item.updated_at)}
                    </Text>
                    <TransactionMenu
                      item={item}
                      barter_service_id={barter_service_id}
                      renderMenuItem={(close) => (
                        <>
                          {isOngoing ? (
                            <Menu.Item
                              title="Remark"
                              onPress={() => {
                                handleRemark(item);
                                close();
                              }}
                            />
                          ) : null}
                        </>
                      )}
                    />
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

                  {isOngoing && remark?.id ? (
                    <View style={styles.remark}>
                      <TextWithIcon icon="calendar-clock" label={formatDateTime(remark.datetime)} />

                      <TextWithIcon icon="map-marker" label={remark.address} />

                      {remark.deliverables ? (
                        <>
                          <TextWithIcon icon="clipboard-text" label="Deliverables" />

                          <View style={styles.remarkList}>
                            {remark.deliverables.map((deliverable, index) => (
                              <View style={styles.remarkBody} key={`deliverable-${index + 1}`}>
                                <Text variant="bodyMedium">{index + 1}.</Text>
                                <Text variant="bodyMedium">{deliverable}</Text>
                              </View>
                            ))}
                          </View>
                        </>
                      ) : null}

                      <TextWithIcon icon="note-text" label={remark.note} />
                    </View>
                  ) : null}

                  <View style={styles.buttonGroup}>
                    <Button mode="outlined" onPress={() => channel.createAndRedirect(otherUser?.id)}>
                      Chat
                    </Button>

                    {isOngoing ? (
                      <Button mode="contained" onPress={() => handleComplete(item.id)} disabled={isUserAwaiting}>
                        {isUserAwaiting ? "Awaiting other user to complete" : "Complete"}
                      </Button>
                    ) : null}

                    {isCompleted && !review ? (
                      <Button
                        mode="contained"
                        textColor={colors.onYellow}
                        style={{ backgroundColor: colors.yellow }}
                        onPress={() => handleReview(item.id)}
                      >
                        Write a review
                      </Button>
                    ) : null}
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
  remark: {
    gap: 8,
    paddingBottom: 16,
  },
  remarkBody: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
  },
  remarkList: {
    gap: 4,
  },
  buttonGroup: {
    gap: 4,
  },
});
