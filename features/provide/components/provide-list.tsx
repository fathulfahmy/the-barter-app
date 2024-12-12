import { StyleSheet, View } from "react-native";
import { Card, IconButton, Menu, Text } from "react-native-paper";

import { router } from "expo-router";

import { EmptyStateScreen, LoadingStateScreen } from "@/components/screens";
import { AppFlashList, Spacer } from "@/components/ui";
import { AppMenu } from "@/components/ui/app-menu";
import { AppChip } from "@/components/ui/chip";
import { useUpdateBarterService } from "@/features/barter-service/api/update-barter-service";
import { useRefreshByUser } from "@/hooks/use-refresh-by-user";
import { useAppTheme } from "@/lib/react-native-paper";
import { BarterServiceStatus } from "@/types/api";
import { formatBarterServicePrice } from "@/utils/format";

import { useInfiniteProvideList } from "../api/get-provide-list";

export const ProvideList = () => {
  const { colors } = useAppTheme();

  const provideListQuery = useInfiniteProvideList();

  const updateBarterServiceMutation = useUpdateBarterService({
    mutationConfig: {
      onSuccess: () => {
        provideListQuery.refetch();
      },
    },
  });

  const handleSubmit = ({ barterServiceId, status }: { barterServiceId: string; status: BarterServiceStatus }) => {
    updateBarterServiceMutation.mutate({
      barterServiceId,
      data: {
        status,
      },
    });
  };

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(provideListQuery.refetch);

  if (provideListQuery.isLoading) {
    return <LoadingStateScreen />;
  }

  const barterServices = provideListQuery.data?.pages.flatMap((page) => page.data.data);

  return (
    <AppFlashList
      data={barterServices}
      renderItem={({ item }) => (
        <Card onPress={() => router.push(`/provide/${item.id}/requests`)}>
          <Card.Content>
            <View style={styles.cardHeader}>
              <AppChip>{item.barter_category?.name}</AppChip>
              <AppMenu
                renderAnchor={(open) => <IconButton icon="dots-horizontal" onPress={open} style={{ margin: 0 }} />}
              >
                <Menu.Item title="Edit" onPress={() => {}} />
                <Menu.Item
                  title={item.status === "enabled" ? "Disable" : "Enable"}
                  onPress={() =>
                    handleSubmit({
                      status: item.status === "enabled" ? "disabled" : "enabled",
                      barterServiceId: item.id,
                    })
                  }
                />
              </AppMenu>
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
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cardBody: {
    gap: 2,
    marginBottom: 16,
  },
});
