import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, IconButton, Menu, Text } from "react-native-paper";

import { router } from "expo-router";

import { LoadingStateScreen } from "@/components/screens";
import { AppList, Spacer } from "@/components/ui";
import { AppChip } from "@/components/ui/chip";
import { useUpdateService } from "@/features/service/api/update-service";
import { useDisclosure } from "@/hooks/use-disclosure";
import { useRefreshByUser } from "@/hooks/use-refresh-by-user";
import { useAppTheme } from "@/lib/react-native-paper";
import { alwaysRefetchQueryConfig } from "@/lib/react-query";
import { ServiceStatus } from "@/types/api";
import { formatServicePrice } from "@/utils/format";

import { useInfiniteServices } from "../api/get-services";

export const Provide = () => {
  const { colors } = useAppTheme();

  const servicesQuery = useInfiniteServices({
    mode: "provide",
    queryConfig: {
      ...alwaysRefetchQueryConfig,
    },
  });

  const updateServiceMutation = useUpdateService({
    mutationConfig: {
      onSuccess: () => {
        servicesQuery.refetch();
      },
    },
  });

  const handleSubmit = ({ barter_service_id, status }: { barter_service_id: string; status: ServiceStatus }) => {
    updateServiceMutation.mutate({
      barter_service_id,
      data: {
        status,
      },
    });
  };

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(servicesQuery.refetch);

  if (servicesQuery.isLoading) {
    return <LoadingStateScreen />;
  }

  const services = servicesQuery.data?.pages.flatMap((page) => page.data.data);

  const MenuWrapper = ({ item }: { item: any }) => {
    const { isOpen, open, close } = useDisclosure();

    return (
      <Menu
        visible={isOpen}
        onDismiss={close}
        anchor={<IconButton icon="dots-horizontal" onPress={open} style={{ margin: 0 }} />}
      >
        <Menu.Item
          title="Edit"
          onPress={() => {
            router.push(`/provide/${item.id}/edit`);
            close();
          }}
        />
        <Menu.Item
          title={item.status === "enabled" ? "Disable" : "Enable"}
          onPress={() =>
            handleSubmit({
              status: item.status === "enabled" ? "disabled" : "enabled",
              barter_service_id: item.id,
            })
          }
        />
      </Menu>
    );
  };

  return (
    <AppList
      data={services}
      renderItem={({ item }) => (
        <Card onPress={() => router.push(`/provide/${item.id}/incoming`)}>
          <Card.Content>
            <View style={styles.header}>
              <AppChip
                style={
                  item.status === "disabled" && {
                    backgroundColor: colors.surfaceDisabled,
                  }
                }
                textStyle={item.status === "disabled" && { color: colors.secondary }}
              >
                {item.barter_category?.name}
              </AppChip>
              <MenuWrapper item={item} />
            </View>

            <View style={styles.body}>
              <Text variant="titleMedium" style={item.status === "disabled" && { color: colors.secondary }}>
                {item.title}
              </Text>
              <Text variant="bodyMedium" style={{ color: colors.secondary }}>
                {formatServicePrice(item)}
              </Text>
            </View>

            <Text
              variant="bodyMedium"
              style={{ color: item.status === "disabled" ? colors.secondary : colors.primary }}
            >
              {item.pending_count} pending requests
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  body: {
    gap: 2,
    marginBottom: 16,
  },
});
