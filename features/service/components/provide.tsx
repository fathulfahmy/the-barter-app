import React, { useState } from "react";
import { Keyboard, Platform, Pressable, StyleSheet, View } from "react-native";
import { Badge, Card, Checkbox, IconButton, Menu, Searchbar, Text } from "react-native-paper";

import { useIsFocused } from "@react-navigation/native";
import { router } from "expo-router";

import { EmptyStateScreen } from "@/components/screens";
import { AppList, Spacer } from "@/components/ui";
import { AppMenu } from "@/components/ui/app-menu";
import { AppChip, RatingChip } from "@/components/ui/chip";
import { AppDialog, useConfirmationDialog } from "@/components/ui/dialog";
import { useCategories } from "@/features/category/api/get-categories";
import { useUpdateService } from "@/features/service/api/update-service";
import { useDebounce } from "@/hooks/use-debounce";
import { useRefreshByUser } from "@/hooks/use-refresh-by-user";
import { useAppTheme } from "@/lib/react-native-paper";
import { ServiceStatus } from "@/types/api";
import { formatServicePrice } from "@/utils/format";

import { useDeleteService } from "../api/delete-service";
import { useInfiniteServices } from "../api/get-services";
import { ProvideSkeleton } from "../skeleton/provide";

export const Provide = () => {
  /* ======================================== STATES */
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchCategories, setSearchCategories] = useState<string[]>([]);
  const [tempCategories, setTempCategories] = useState<string[]>([]);

  /* ======================================== HOOKS */
  const { colors } = useAppTheme();
  const isFocused = useIsFocused();
  const debouncedQuery = useDebounce(searchQuery, 500);

  //======================================== QUERIES
  const servicesQuery = useInfiniteServices({
    mode: "provide",
    search: debouncedQuery,
    categories: searchCategories,
    // FIXME: pusher not working on expo go (pusher-websocket-react-native)
    queryConfig: {
      refetchInterval: isFocused ? 3000 : false,
    },
  });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(servicesQuery.refetch);
  const services = servicesQuery.data?.pages?.flatMap((page) => page?.data?.data ?? []) ?? [];

  const categoriesQuery = useCategories();
  const categories = categoriesQuery.data?.data;

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

  const handleCategorySelect = (id: string) => {
    setTempCategories((checked) =>
      checked.includes(id) ? checked.filter((checkedIds) => checkedIds !== id) : [...checked, id],
    );
  };

  /* ======================================== STYLES */
  const topBarStyle = [styles.topBar, { backgroundColor: colors.primary }];
  const filterBadgeStyle = [
    styles.filterBadge,
    { backgroundColor: colors.tertiaryContainer, color: colors.onTertiaryContainer },
  ];

  /* ======================================== RETURNS */
  return (
    <>
      {/* ======================================== TOP BAR */}
      <View style={topBarStyle}>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
          inputStyle={styles.searchbarInput}
        />
        <AppDialog
          renderTriggerButton={(open) => (
            <View style={{ position: "relative" }}>
              <IconButton
                icon="filter"
                iconColor={colors.onPrimary}
                onPress={() => {
                  Keyboard.dismiss();
                  setTempCategories([...searchCategories]);
                  open();
                }}
              />
              {searchCategories.length > 0 ? <Badge style={filterBadgeStyle}>{searchCategories.length}</Badge> : null}
            </View>
          )}
          title="Filter by category"
          body={
            <AppList
              data={categories}
              extraData={tempCategories}
              renderItem={({ item }) => (
                <Checkbox.Item
                  label={item.name}
                  status={tempCategories.includes(item.id) ? "checked" : "unchecked"}
                  onPress={() => handleCategorySelect(item.id)}
                />
              )}
              containerStyle={{ flex: 1 }}
            />
          }
          confirmButtonText="Done"
          confirmButtonFn={() => setSearchCategories(tempCategories)}
        />
      </View>

      {Platform.OS === "android" ? (
        <View style={styles.plus}>
          <IconButton icon="plus" iconColor={colors.primary} onPress={() => router.push("/provide/create")} />
        </View>
      ) : null}

      {/* ======================================== LIST */}
      {servicesQuery.isLoading ? (
        <ProvideSkeleton />
      ) : (
        <AppList
          data={services}
          renderItem={({ item }) => (
            <Card>
              <Card.Content>
                <View style={[styles.row, styles.header]}>
                  <AppChip
                    style={item.status === "disabled" ? { backgroundColor: colors.surfaceDisabled } : undefined}
                    textStyle={
                      item.status === "disabled"
                        ? {
                            color: colors.onBackground,
                          }
                        : undefined
                    }
                  >
                    {item.barter_category?.name}
                  </AppChip>

                  <AppMenu
                    renderMenuItem={(close) => (
                      <>
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
                          onPress={() => {
                            handleSubmit({
                              status: item.status === "enabled" ? "disabled" : "enabled",
                              barter_service_id: item.id,
                            });
                            close();
                          }}
                        />
                      </>
                    )}
                  />
                </View>

                <Pressable onPress={() => router.push(`/provide/${item.id}/incoming`)}>
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

                {item.reviews_count > 0 ? (
                  <Pressable onPress={() => router.push(`/provide/${item.id}/reviews`)}>
                    <View style={styles.row}>
                      <RatingChip
                        rating={item.rating}
                        style={item.status === "disabled" ? { backgroundColor: colors.surfaceDisabled } : undefined}
                        textStyle={
                          item.status === "disabled"
                            ? {
                                color: colors.onBackground,
                              }
                            : undefined
                        }
                      />

                      <Spacer x={4} />

                      <Text variant="bodyMedium" style={{ color: colors.onYellowContainer }}>
                        {`(${item.reviews_count})`}
                      </Text>

                      <Spacer x={8} />

                      <Text
                        variant="bodyMedium"
                        style={{ color: item.status === "disabled" ? colors.onBackground : colors.yellow }}
                      >
                        View all reviews
                      </Text>
                    </View>
                  </Pressable>
                ) : null}
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
          ListEmptyComponent={<EmptyStateScreen />}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  searchbar: {
    flex: 1,
    height: 40,
  },
  searchbarInput: {
    minHeight: 0,
  },
  filterBadge: {
    position: "absolute",
    top: 4,
    right: 4,
  },
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
  plus: {
    alignItems: "flex-end",
  },
});
