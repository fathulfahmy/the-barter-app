import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, IconButton, Menu, Text } from "react-native-paper";

import { useIsFocused } from "@react-navigation/native";
import { router } from "expo-router";

import { AppList, Spacer } from "@/components/ui";
import { AppChip } from "@/components/ui/chip";
import { useUpdateService } from "@/features/service/api/update-service";
import { useDisclosure } from "@/hooks/use-disclosure";
import { useRefreshByUser } from "@/hooks/use-refresh-by-user";
import { useAppTheme } from "@/lib/react-native-paper";
import { Service, ServiceStatus } from "@/types/api";
import { formatServicePrice } from "@/utils/format";

import { useInfiniteServices } from "../api/get-services";
import { ProvideSkeleton } from "../skeleton/provide";

export const Provide = () => {
  const { colors } = useAppTheme();
  const isFocused = useIsFocused();

  /* ======================================== QUERIES */
  const servicesQuery = useInfiniteServices({
    mode: "provide",
    // FIXME: pusher not working on expo go (pusher-websocket-react-native)
    queryConfig: {
      refetchInterval: isFocused ? 2000 : false,
    },
  });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(servicesQuery.refetch);
  const services = servicesQuery.data?.pages.flatMap((page) => page.data.data);

  /* ======================================== MUTATIONS */
  const updateServiceMutation = useUpdateService({
    mutationConfig: {
      onSuccess: () => {
        servicesQuery.refetch();
      },
    },
  });

  /* ======================================== FUNCTIONS */
  const handleSubmit = ({ barter_service_id, status }: { barter_service_id: string; status: ServiceStatus }) => {
    updateServiceMutation.mutate({
      barter_service_id,
      data: {
        status,
      },
    });
  };

  /* ======================================== COMPONENTS */
  const MenuWrapper = ({ item }: { item: Service }) => {
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
        {/* TODO: MENU ITEM - delete service */}
      </Menu>
    );
  };

  /* ======================================== RETURNS */
  if (servicesQuery.isLoading) {
    return <ProvideSkeleton />;
  }

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
                textStyle={item.status === "disabled" && { color: colors.onSurfaceDisabled }}
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
