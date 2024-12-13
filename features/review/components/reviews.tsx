import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";

import { LoadingStateScreen } from "@/components/screens";
import { AppFlashList, AvatarWithName, RatingStars, Spacer } from "@/components/ui";
import { useRefreshByUser } from "@/hooks/use-refresh-by-user";
import { useAppTheme } from "@/lib/react-native-paper";
import { formatInvoiceItems } from "@/utils/format";

import { useInfiniteReviews } from "../api/get-reviews";

export const Reviews = ({ barter_service_id }: { barter_service_id?: string }) => {
  const { colors } = useAppTheme();

  const reviewsQuery = useInfiniteReviews({
    ...(barter_service_id && { barter_service_id }),
  });

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(reviewsQuery.refetch);

  if (reviewsQuery.isLoading) {
    return <LoadingStateScreen />;
  }

  const reviews = reviewsQuery.data?.pages.flatMap((page) => page.data.data);

  return (
    <AppFlashList
      data={reviews}
      renderItem={({ item }) => (
        <Card>
          <Card.Content style={styles.card}>
            <View style={styles.cardHeader}>
              <AvatarWithName user={item.author} />
            </View>

            <View style={styles.cardInvoice}>
              <Text variant="titleMedium">{formatInvoiceItems(item.barter_transaction?.barter_invoice)}</Text>
              <Text
                variant="bodyMedium"
                style={{ color: colors.secondary }}
              >{`For ${item.barter_service?.title}`}</Text>
            </View>

            <View style={styles.cardReview}>
              <RatingStars rating={item.rating} />
              <Text variant="bodyMedium">{item.description}</Text>
            </View>
          </Card.Content>
        </Card>
      )}
      estimatedItemSize={15}
      onEndReached={() => {
        reviewsQuery.hasNextPage && reviewsQuery.fetchNextPage();
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
  cardInvoice: {
    gap: 2,
  },
  cardReview: {
    gap: 2,
  },
});
