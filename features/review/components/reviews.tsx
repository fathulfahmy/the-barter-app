import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";

import { LoadingStateScreen } from "@/components/screens";
import { AppList, RatingStars, Spacer } from "@/components/ui";
import { AvatarWithName } from "@/components/ui/avatar";
import { useRefreshByUser } from "@/hooks/use-refresh-by-user";
import { useAppTheme } from "@/lib/react-native-paper";
import { formatInvoiceItems } from "@/utils/format";

import { useInfiniteReviews } from "../api/get-reviews";

export const Reviews = ({ barter_service_id }: { barter_service_id?: string }) => {
  /* ======================================== HOOKS */
  const { colors } = useAppTheme();

  /* ======================================== QUERIES */
  const reviewsQuery = useInfiniteReviews({
    ...(barter_service_id && { barter_service_id }),
  });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(reviewsQuery.refetch);
  const reviews = reviewsQuery.data?.pages?.flatMap((page) => page.data?.data || []) || [];

  /* ======================================== RETURNS */
  if (reviewsQuery.isLoading) {
    return <LoadingStateScreen />;
  }

  return (
    <AppList
      data={reviews}
      renderItem={({ item }) => (
        <Card>
          <Card.Content style={styles.card}>
            <AvatarWithName user={item.author} />

            <View style={styles.body}>
              <Text variant="titleMedium">{formatInvoiceItems(item.barter_transaction?.barter_invoice)}</Text>
              <Text
                variant="bodyMedium"
                style={{ color: colors.secondary }}
              >{`For ${item.barter_transaction?.barter_service?.title}`}</Text>
            </View>

            <View style={styles.body}>
              <RatingStars rating={item.rating} />
              <Text variant="bodyMedium">{item.description}</Text>
            </View>
          </Card.Content>
        </Card>
      )}
      onEndReached={() => {
        reviewsQuery.hasNextPage && reviewsQuery.fetchNextPage();
      }}
      onRefresh={refetchByUser}
      refreshing={isRefetchingByUser}
      ItemSeparatorComponent={() => <Spacer y={8} />}
      contentContainerStyle={{ padding: 16 }}
      containerStyle={{ flex: 1 }}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    gap: 16,
  },
  body: {
    gap: 2,
  },
});
