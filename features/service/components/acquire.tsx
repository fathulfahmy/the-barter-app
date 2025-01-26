import React, { useState } from "react";
import { Keyboard, StyleSheet, View } from "react-native";
import { Badge, Card, Checkbox, IconButton, Searchbar, Text } from "react-native-paper";

import { router } from "expo-router";

import { AppList, Spacer } from "@/components/ui";
import { AvatarWithName } from "@/components/ui/avatar";
import { RatingChip } from "@/components/ui/chip";
import { AppDialog } from "@/components/ui/dialog";
import { useCategories } from "@/features/category/api/get-categories";
import { useDebounce } from "@/hooks/use-debounce";
import { useRefreshByUser } from "@/hooks/use-refresh-by-user";
import { useAppTheme } from "@/lib/react-native-paper";
import { formatServicePrice } from "@/utils/format";

import { useInfiniteServices } from "../api/get-services";
import { AcquireSkeleton } from "../skeleton/acquire";

export const Acquire = () => {
  /* ======================================== STATES */
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchCategories, setSearchCategories] = useState<string[]>([]);
  const [tempCategories, setTempCategories] = useState<string[]>([]);

  /* ======================================== HOOKS */
  const { colors } = useAppTheme();
  const debouncedQuery = useDebounce(searchQuery, 500);

  //======================================== QUERIES
  const servicesQuery = useInfiniteServices({
    mode: "acquire",
    search: debouncedQuery,
    categories: searchCategories,
    queryConfig: {
      refetchOnWindowFocus: false,
    },
  });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(servicesQuery.refetch);
  const services = servicesQuery.data?.pages?.flatMap((page) => page?.data?.data ?? []) ?? [];

  const categoriesQuery = useCategories();
  const categories = categoriesQuery.data?.data;

  /* ======================================== FUNCTIONS */
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

      {/* ======================================== LIST */}
      {servicesQuery.isLoading ? (
        <AcquireSkeleton />
      ) : (
        <AppList
          data={services}
          renderItem={({ item }) => (
            <Card onPress={() => router.push(`/acquire/${item.id}`)}>
              <Card.Content>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 16,
  },
  body: {
    gap: 2,
    paddingBottom: 16,
  },
});
