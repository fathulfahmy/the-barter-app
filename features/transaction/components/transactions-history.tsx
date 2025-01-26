import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";

import { useIsFocused } from "@react-navigation/native";
import { router } from "expo-router";

import { AppList, RatingStars, Spacer } from "@/components/ui";
import { AvatarWithName } from "@/components/ui/avatar";
import { useRefreshByUser } from "@/hooks/use-refresh-by-user";
import { useStreamChat } from "@/hooks/use-stream-chat";
import { useUser } from "@/lib/auth/auth";
import { useAppTheme } from "@/lib/react-native-paper";
import { formatInvoiceItems, formatSentenceCase } from "@/utils/format";

import { useInfiniteTransactions } from "../api/get-transactions";
import { TransactionsHistorySkeleton } from "../skeleton/transactions-history";
import { MenuWrapper } from "./menu-wrapper";

export const TransactionsHistory = ({ barter_service_id }: { barter_service_id?: string }) => {
  /* ======================================== HOOKS */
  const { colors } = useAppTheme();
  const isFocused = useIsFocused();
  const channel = useStreamChat();

  /* ======================================== QUERIES */
  const userQuery = useUser();
  const user = userQuery.data;

  const transactionsQuery = useInfiniteTransactions({
    mode: "history",
    ...(barter_service_id && { barter_service_id }),
    // FIXME: pusher not working on expo go (pusher-websocket-react-native)
    queryConfig: {
      refetchInterval: isFocused ? 3000 : false,
    },
  });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(transactionsQuery.refetch);
  const transactions = transactionsQuery.data?.pages?.flatMap((page) => page?.data?.data ?? []) ?? [];

  /* ======================================== FUNCTIONS */
  const handleInvoice = (barter_transaction_id: string) => {
    if (barter_service_id) {
      router.push(`/provide/transaction/${barter_transaction_id}/invoice`);
    } else {
      router.push(`/my_barters/transaction/${barter_transaction_id}/invoice`);
    }
  };

  /* ======================================== RETURNS */
  if (userQuery.isLoading || transactionsQuery.isLoading) {
    return <TransactionsHistorySkeleton />;
  }

  return (
    <AppList
      data={transactions}
      renderItem={({ item }) => {
        const isUserAcquirer = user?.id === item.barter_acquirer_id;
        const isCompleted = item.status === "completed";
        const otherUser = item.other_user;
        const title = isUserAcquirer ? item.barter_service?.title : formatInvoiceItems(item.barter_invoice);
        const subtitle = isUserAcquirer ? formatInvoiceItems(item.barter_invoice) : item.barter_service?.title;
        const review = item.barter_reviews?.find((review) => review.reviewer_id == user?.id);

        return (
          <Card>
            <Card.Content>
              <View style={styles.header}>
                <AvatarWithName user={otherUser} />
                <MenuWrapper item={item} barter_service_id={barter_service_id} />
              </View>

              <View style={styles.body}>
                <Text variant="titleMedium">{title}</Text>
                <Text variant="bodyMedium" style={{ color: colors.secondary }}>
                  For {subtitle}
                </Text>
              </View>

              <Spacer y={16} />

              {isCompleted && review ? (
                <>
                  <View style={styles.body}>
                    <RatingStars rating={review.rating} />
                    <Text variant="bodyMedium">{review.description}</Text>
                  </View>

                  <Spacer y={16} />
                </>
              ) : null}

              <View style={styles.buttonGroup}>
                <Button mode="outlined" onPress={() => channel.createAndRedirect(otherUser?.id)}>
                  Chat
                </Button>

                {isCompleted ? (
                  <Button mode="contained" onPress={() => handleInvoice(item.id)}>
                    View invoice
                  </Button>
                ) : null}

                {!isCompleted ? (
                  <Button mode="contained" textColor={colors.onRed} style={{ backgroundColor: colors.red }}>
                    {formatSentenceCase(item.status)}
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
      contentContainerStyle={{ padding: 16 }}
    />
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  body: {
    gap: 2,
  },
  buttonGroup: {
    gap: 4,
  },
});
