import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";

import { Link } from "expo-router";

import { EmptyStateScreen, LoadingStateScreen } from "@/components/screens";
import { AppFlashList, Spacer } from "@/components/ui";
import { AppChip } from "@/components/ui/chip";
import { useRefreshByUser } from "@/hooks/use-refresh-by-user";
import { useAppTheme } from "@/lib/react-native-paper";
import { formatBarterServicePrice } from "@/utils/format";

import { useInfiniteProvideList } from "../api/get-provide-list";

export const ProvideList = () => {
  const { colors } = useAppTheme();

  const provideListQuery = useInfiniteProvideList();

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(provideListQuery.refetch);

  if (provideListQuery.isLoading) {
    return <LoadingStateScreen />;
  }

  const barterServices = provideListQuery.data?.pages.flatMap((page) => page.data.data);

  return (
    <AppFlashList
      data={barterServices}
      renderItem={({ item }) => (
        <Link href={`/provide/${item.id}/requests`} asChild>
          <Card>
            <Card.Content style={styles.card}>
              <View style={styles.cardHeader}>
                <AppChip>{item.barter_category?.name}</AppChip>
              </View>

              <View style={styles.cardBody}>
                <Text variant="titleMedium">{item.title}</Text>
                <Text variant="bodyMedium" style={{ color: colors.secondary }}>
                  {formatBarterServicePrice(item)}
                </Text>
              </View>

              <Text variant="bodyMedium" style={{ color: colors.primary }}>
                {item.pending_count} pending requests
              </Text>
            </Card.Content>
          </Card>
        </Link>
      )}
      estimatedItemSize={15}
      onEndReached={() => {
        provideListQuery.hasNextPage && provideListQuery.fetchNextPage();
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
