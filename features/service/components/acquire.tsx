import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";

import { router } from "expo-router";

import { AppList, Spacer } from "@/components/ui";
import { AvatarWithName } from "@/components/ui/avatar";
import { RatingChip } from "@/components/ui/chip";
import { useRefreshByUser } from "@/hooks/use-refresh-by-user";
import { useAppTheme } from "@/lib/react-native-paper";
import { formatServicePrice } from "@/utils/format";

import { useInfiniteServices } from "../api/get-services";
import { AcquireSkeleton } from "../skeleton/acquire";

export const Acquire = () => {
  const { colors } = useAppTheme();

  //======================================== QUERIES
  const servicesQuery = useInfiniteServices({
    mode: "acquire",
    queryConfig: {
      refetchOnWindowFocus: false,
    },
  });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(servicesQuery.refetch);
  const services = servicesQuery.data?.pages.flatMap((page) => page.data.data);

  //======================================== RETURNS
  if (servicesQuery.isLoading) {
    return <AcquireSkeleton />;
  }

  return (
    <AppList
      data={services}
      renderItem={({ item }) => (
        <Card onPress={() => router.push(`/acquire/${item.id}`)}>
          <Card.Content style={styles.card}>
            <View style={styles.header}>
              <AvatarWithName user={item.barter_provider} />
              <RatingChip rating={item.rating}></RatingChip>
            </View>

            <View style={styles.body}>
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
      onEndReached={() => {
        servicesQuery.hasNextPage && servicesQuery.fetchNextPage();
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
  card: {
    gap: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  body: {
    gap: 2,
  },
});
