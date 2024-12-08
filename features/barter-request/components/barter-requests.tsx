import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";

import { FlashList } from "@shopify/flash-list";

import { EmptyStateScreen, LoadingStateScreen } from "@/components/screens";
import { AvatarWithName, Spacer } from "@/components/ui";
import { useRefreshByUser } from "@/hooks/use-refresh-by-user";
import { useAppTheme } from "@/lib/react-native-paper";
import { formatBarterInvoiceItems } from "@/utils/format";

import { useInfiniteBarterRequests } from "../api/get-barter-requests";

export const BarterRequests = ({ barterServiceId }: { barterServiceId: string }) => {
  const barterRequestsQuery = useInfiniteBarterRequests({
    barterServiceId,
  });
  const { colors } = useAppTheme();

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(barterRequestsQuery.refetch);

  if (barterRequestsQuery.isLoading) {
    return <LoadingStateScreen />;
  }

  const barter_requests = barterRequestsQuery.data?.pages.flatMap((page) => page.data.data);

  return (
    <FlashList
      data={barter_requests}
      renderItem={({ item }) => (
        <Card>
          <Card.Content style={styles.card}>
            <View style={styles.cardHeader}>
              <AvatarWithName user={item.barter_acquirer} />
            </View>
            <View style={styles.cardBody}>
              <Text variant="titleMedium">{formatBarterInvoiceItems(item.barter_invoice)}</Text>
              <Text
                variant="bodyMedium"
                style={{ color: colors.secondary }}
              >{`For ${item.barter_service?.title}`}</Text>
            </View>
          </Card.Content>
        </Card>
      )}
      estimatedItemSize={15}
      onEndReached={() => {
        barterRequestsQuery.hasNextPage && barterRequestsQuery.fetchNextPage();
      }}
      onRefresh={refetchByUser}
      refreshing={isRefetchingByUser}
      ItemSeparatorComponent={() => <Spacer y={8} />}
      ListEmptyComponent={<EmptyStateScreen />}
      contentContainerStyle={{ padding: 16 }}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
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
