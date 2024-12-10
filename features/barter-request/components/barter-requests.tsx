import { StyleSheet, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";

import { FlashList } from "@shopify/flash-list";
import { Link } from "expo-router";

import { EmptyStateScreen, LoadingStateScreen } from "@/components/screens";
import { AvatarWithName, Spacer } from "@/components/ui";
import { useConfirmationDialog } from "@/components/ui/dialog";
import { useInfiniteProvideList } from "@/features/provide/api/get-provide-list";
import { useRefreshByUser } from "@/hooks/use-refresh-by-user";
import { useAppTheme } from "@/lib/react-native-paper";
import { BarterTransactionStatus } from "@/types/api";
import { formatBarterInvoiceItems, formatSentenceCase, formatStripEdSuffix } from "@/utils/format";

import { useInfiniteBarterRequests } from "../api/get-barter-requests";
import { useUpdateBarterRequest } from "../api/update-barter-request";

export const BarterRequests = ({ barterServiceId }: { barterServiceId: string }) => {
  const { colors } = useAppTheme();

  const barterRequestsQuery = useInfiniteBarterRequests({ barterServiceId });
  const provideListQuery = useInfiniteProvideList();

  const updateBarterRequestMutation = useUpdateBarterRequest({
    mutationConfig: {
      onSuccess: () => {
        barterRequestsQuery.refetch();
        provideListQuery.refetch();
      },
    },
  });

  const handleSubmit = ({
    barterTransactionId,
    status,
  }: {
    barterTransactionId: string;
    status: BarterTransactionStatus;
  }) => {
    useConfirmationDialog.getState().setConfirmationDialog({
      type: "warning",
      title: `${formatSentenceCase(formatStripEdSuffix(status))} request?`,
      confirmButtonFn() {
        updateBarterRequestMutation.mutate({
          barterTransactionId,
          data: {
            status,
          },
        });
      },
    });
  };

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(barterRequestsQuery.refetch);

  if (barterRequestsQuery.isLoading) {
    return <LoadingStateScreen />;
  }

  const barter_requests = barterRequestsQuery.data?.pages.flatMap((page) => page.data.data);

  return (
    <FlashList
      data={barter_requests}
      renderItem={({ item }) => (
        <Card>
          <Card.Content style={styles.card}>
            <View style={styles.cardHeader}>
              <AvatarWithName user={item.barter_acquirer} />
            </View>

            <View style={styles.cardBody}>
              <Text variant="titleMedium">{formatBarterInvoiceItems(item.barter_invoice)}</Text>
              <Text
                variant="bodyMedium"
                style={{ color: colors.secondary }}
              >{`For ${item.barter_service?.title}`}</Text>
            </View>

            <View style={{ gap: 4 }}>
              <Link href={`/chat/${item.barter_acquirer_id}`} asChild>
                <Button mode="contained">Chat</Button>
              </Link>

              <View style={{ flexDirection: "row", gap: 4 }}>
                <Button
                  mode="contained"
                  textColor={colors.onRed}
                  style={{ flex: 1, backgroundColor: colors.red }}
                  onPress={() => handleSubmit({ status: "rejected", barterTransactionId: item.id })}
                  loading={updateBarterRequestMutation.isPending}
                  disabled={updateBarterRequestMutation.isPending}
                >
                  Reject
                </Button>
                <Button
                  mode="contained"
                  textColor={colors.onGreen}
                  style={{ flex: 1, backgroundColor: colors.green }}
                  onPress={() => handleSubmit({ status: "accepted", barterTransactionId: item.id })}
                  loading={updateBarterRequestMutation.isPending}
                  disabled={updateBarterRequestMutation.isPending}
                >
                  Accept
                </Button>
              </View>
            </View>
          </Card.Content>
        </Card>
      )}
      estimatedItemSize={15}
      onEndReached={() => {
        barterRequestsQuery.hasNextPage && barterRequestsQuery.fetchNextPage();
      }}
      onRefresh={refetchByUser}
      refreshing={isRefetchingByUser}
      ItemSeparatorComponent={() => <Spacer y={8} />}
      ListEmptyComponent={<EmptyStateScreen />}
      contentContainerStyle={{ padding: 16 }}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
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
