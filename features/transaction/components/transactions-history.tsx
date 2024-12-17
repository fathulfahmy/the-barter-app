import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";

import { LoadingStateScreen } from "@/components/screens";
import { AppList, RatingStars, Spacer } from "@/components/ui";
import { AvatarWithName } from "@/components/ui/avatar";
import { useRefreshByUser } from "@/hooks/use-refresh-by-user";
import { useUser } from "@/lib/auth/auth";
import { useAppTheme } from "@/lib/react-native-paper";
import { Transaction } from "@/types/api";
import { formatInvoiceItems, formatSentenceCase } from "@/utils/format";

import { useInfiniteTransactions } from "../api/get-transactions";

export const TransactionsHistory = ({ barter_service_id }: { barter_service_id?: string }) => {
  const userQuery = useUser();

  const transactionsQuery = useInfiniteTransactions({
    mode: "history",
    ...(barter_service_id && { barter_service_id }),
  });

  const user = userQuery.data;
  const barter_transactions = transactionsQuery.data?.pages.flatMap((page) => page.data.data);

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(transactionsQuery.refetch);

  if (transactionsQuery.isLoading) {
    return <LoadingStateScreen />;
  }

  if (userQuery.isLoading || transactionsQuery.isLoading) {
    return <LoadingStateScreen />;
  }

  const TransactionCard = ({ item, role }: { item: Transaction; role: "acquirer" | "provider" }) => {
    const { colors } = useAppTheme();
    const user = role === "acquirer" ? item.barter_acquirer : item.barter_provider;
    const review = item.barter_reviews?.find(
      (review) => review.author_id === (role === "acquirer" ? item.barter_acquirer_id : item.barter_provider_id),
    );

    return (
      <Card>
        <Card.Content style={styles.card}>
          <View style={styles.header}>
            <AvatarWithName user={user} />
          </View>

          <View style={styles.invoice}>
            <Text variant="titleMedium">
              {role === "acquirer" ? formatInvoiceItems(item.barter_invoice) : item.barter_service?.title}
            </Text>
            <Text
              variant="bodyMedium"
              style={{ color: colors.secondary }}
            >{`For ${role === "acquirer" ? item.barter_service?.title : formatInvoiceItems(item.barter_invoice)}`}</Text>
          </View>

          {review && (
            <View style={styles.review}>
              <RatingStars rating={review.rating} />
              <Text variant="bodyMedium">{review.description}</Text>
            </View>
          )}

          <Button
            mode={item.status === "completed" ? "contained" : "contained-tonal"}
            onPress={() => item.status === "completed" && console.log("View Invoice")}
          >
            {item.status === "completed" ? "View Invoice" : formatSentenceCase(item.status)}
          </Button>
        </Card.Content>
      </Card>
    );
  };

  return (
    <AppList
      data={barter_transactions}
      renderItem={({ item }) => (
        <TransactionCard item={item} role={user?.id === item.barter_acquirer_id ? "acquirer" : "provider"} />
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
  invoice: {
    gap: 2,
  },
  review: {
    gap: 2,
  },
});
