import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";

import { EmptyStateScreen, LoadingStateScreen } from "@/components/screens";
import { AppFlashList, AvatarWithName, Spacer } from "@/components/ui";
import { useRefreshByUser } from "@/hooks/use-refresh-by-user";
import { useAppTheme } from "@/lib/react-native-paper";
import { formatBarterInvoiceItems } from "@/utils/format";

import { useInfiniteBarterRecords } from "../api/get-barter-records";

export const BarterRecords = ({ barterServiceId }: { barterServiceId: string }) => {
  const { colors } = useAppTheme();

  const barterRecordsQuery = useInfiniteBarterRecords({ barterServiceId });

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(barterRecordsQuery.refetch);

  if (barterRecordsQuery.isLoading) {
    return <LoadingStateScreen />;
  }

  const barterRecords = barterRecordsQuery.data?.pages.flatMap((page) => page.data.data);

  return (
    <AppFlashList
      data={barterRecords}
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
        barterRecordsQuery.hasNextPage && barterRecordsQuery.fetchNextPage();
      }}
      onRefresh={refetchByUser}
      refreshing={isRefetchingByUser}
      ItemSeparatorComponent={() => <Spacer y={8} />}
      ListEmptyComponent={<EmptyStateScreen />}
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
