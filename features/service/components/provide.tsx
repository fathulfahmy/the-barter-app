import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Card, IconButton, Menu, Text } from "react-native-paper";

import { useIsFocused } from "@react-navigation/native";
import { router } from "expo-router";

import { AppList, Spacer } from "@/components/ui";
import { AppChip, RatingChip } from "@/components/ui/chip";
import { useConfirmationDialog } from "@/components/ui/dialog";
import { useUpdateService } from "@/features/service/api/update-service";
import { useDisclosure } from "@/hooks/use-disclosure";
import { useRefreshByUser } from "@/hooks/use-refresh-by-user";
import { useAppTheme } from "@/lib/react-native-paper";
import { Service, ServiceStatus } from "@/types/api";
import { formatServicePrice } from "@/utils/format";

import { useDeleteService } from "../api/delete-service";
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
      refetchInterval: isFocused ? 3000 : false,
    },
  });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(servicesQuery.refetch);
  const services = servicesQuery.data?.pages?.flatMap((page) => page?.data?.data ?? []) ?? [];

  /* ======================================== MUTATIONS */
  const updateServiceMutation = useUpdateService({
    mutationConfig: {
      onSuccess: () => {
        servicesQuery.refetch();
      },
    },
  });

  const deleteServiceMutation = useDeleteService();

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
          title="Delete"
          onPress={() => {
            useConfirmationDialog.getState().setConfirmationDialog({
              type: "warning",
              title: "Confirm delete?",
              confirmButtonFn: () => deleteServiceMutation.mutate({ service_id: item.id }),
            });
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
        <Card>
          <Card.Content>
            <Pressable onPress={() => router.push(`/provide/${item.id}/incoming`)}>
              <View style={[styles.row, styles.header]}>
                <AppChip
                  style={
                    item.status === "disabled"
                      ? {
                          backgroundColor: colors.surfaceDisabled,
                        }
                      : undefined
                  }
                  textStyle={item.status === "disabled" ? { color: colors.onSurfaceDisabled } : undefined}
                >
                  {item.barter_category?.name}
                </AppChip>
                <MenuWrapper item={item} />
              </View>

              <View style={styles.body}>
                <Text
                  variant="titleMedium"
                  style={item.status === "disabled" ? { color: colors.secondary } : undefined}
                >
                  {item.title}
                </Text>
                <Text variant="bodyMedium" style={{ color: colors.secondary }}>
                  {formatServicePrice(item)}
                </Text>
              </View>

              <View style={styles.request}>
                <Text
                  variant="bodyMedium"
                  style={{ color: item.status === "disabled" ? colors.secondary : colors.primary }}
                >
                  {item.pending_count} pending requests
                </Text>
              </View>
            </Pressable>

            <Pressable onPress={() => router.push(`/provide/${item.id}/reviews`)}>
              <View style={styles.row}>
                <RatingChip rating={item.rating} />

                <Spacer x={4} />

                <Text variant="bodyMedium" style={{ color: colors.onYellowContainer }}>
                  {`(${item.reviews_count})`}
                </Text>

                <Spacer x={8} />

                <Text variant="bodyMedium" style={{ color: colors.yellow }}>
                  {`View all reviews`}
                </Text>
              </View>
            </Pressable>
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
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  header: {
    justifyContent: "space-between",
    paddingBottom: 8,
  },
  body: {
    gap: 2,
    paddingBottom: 8,
  },
  request: {
    paddingBottom: 16,
  },
});
