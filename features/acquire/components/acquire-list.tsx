import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";

import { router } from "expo-router";

import { EmptyStateScreen, LoadingStateScreen } from "@/components/screens";
import { AppFlashList, AvatarWithName, Spacer } from "@/components/ui";
import { RatingChip } from "@/components/ui/chip";
import { useRefreshByUser } from "@/hooks/use-refresh-by-user";
import { useAppTheme } from "@/lib/react-native-paper";
import { formatBarterServicePrice } from "@/utils/format";

import { useInfiniteAcquireList } from "../api/get-acquire-list";

export const AcquireList = () => {
  const { colors } = useAppTheme();

  const acquireListQuery = useInfiniteAcquireList();

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(acquireListQuery.refetch);

  if (acquireListQuery.isLoading) {
    return <LoadingStateScreen />;
  }

  const barterServices = acquireListQuery.data?.pages.flatMap((page) => page.data.data);

  return (
    <AppFlashList
      data={barterServices}
      renderItem={({ item }) => (
        <Card onPress={() => router.push(`/acquire/${item.id}`)}>
          <Card.Content style={styles.card}>
            <View style={styles.cardHeader}>
              <AvatarWithName user={item.barter_provider} />
              <RatingChip rating={item.rating}></RatingChip>
            </View>

            <View style={styles.cardBody}>
              <Text variant="titleMedium">{item.title}</Text>
              <Text variant="bodyMedium" style={{ color: colors.secondary }}>
                {formatBarterServicePrice(item)}
              </Text>
            </View>

            <Text variant="bodyMedium" style={{ color: colors.primary }}>
              {item.completed_count} barters fulfilled
            </Text>
          </Card.Content>
        </Card>
      )}
      estimatedItemSize={15}
      onEndReached={() => {
        acquireListQuery.hasNextPage && acquireListQuery.fetchNextPage();
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
