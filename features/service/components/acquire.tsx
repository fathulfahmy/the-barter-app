import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";

import { router } from "expo-router";

import { LoadingStateScreen } from "@/components/screens";
import { AppFlashList, AvatarWithName, Spacer } from "@/components/ui";
import { RatingChip } from "@/components/ui/chip";
import { useRefreshByUser } from "@/hooks/use-refresh-by-user";
import { useAppTheme } from "@/lib/react-native-paper";
import { formatServicePrice } from "@/utils/format";

import { useInfiniteServices } from "../api/get-services";

export const Acquire = () => {
  const { colors } = useAppTheme();

  const servicesQuery = useInfiniteServices({ mode: "acquire" });

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(servicesQuery.refetch);

  if (servicesQuery.isLoading) {
    return <LoadingStateScreen />;
  }

  const services = servicesQuery.data?.pages.flatMap((page) => page.data.data);

  return (
    <AppFlashList
      data={services}
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
                {formatServicePrice(item)}
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
        servicesQuery.hasNextPage && servicesQuery.fetchNextPage();
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
  cardBody: {
    gap: 2,
  },
});
