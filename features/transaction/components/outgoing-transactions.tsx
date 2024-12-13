import { StyleSheet, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";

import { router } from "expo-router";

import { LoadingStateScreen } from "@/components/screens";
import { AppFlashList, AvatarWithName, Spacer } from "@/components/ui";
import { useRefreshByUser } from "@/hooks/use-refresh-by-user";
import { useAppTheme } from "@/lib/react-native-paper";
import { formatInvoiceItems } from "@/utils/format";

import { useInfiniteTransactions } from "../api/get-transactions";

export const OutgoingTransactions = ({ barter_service_id }: { barter_service_id?: string }) => {
  const { colors } = useAppTheme();

  const transactionsQuery = useInfiniteTransactions({
    mode: "outgoing",
    ...(barter_service_id && { barter_service_id }),
  });

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(transactionsQuery.refetch);

  if (transactionsQuery.isLoading) {
    return <LoadingStateScreen />;
  }

  const barter_transactions = transactionsQuery.data?.pages.flatMap((page) => page.data.data);

  return (
    <AppFlashList
      data={barter_transactions}
      renderItem={({ item }) => (
        <Card>
          <Card.Content style={styles.card}>
            <View style={styles.cardHeader}>
              <AvatarWithName user={item.barter_provider} />
            </View>

            <View style={styles.cardBody}>
              <Text variant="titleMedium">{item.barter_service?.title}</Text>
              <Text variant="bodyMedium" style={{ color: colors.secondary }}>
                {`For ${formatInvoiceItems(item.barter_invoice)}`}
              </Text>
            </View>

            <View style={{ gap: 4 }}>
              <Button mode="contained" onPress={() => router.push(`/chat/${item.barter_acquirer_id}`)}>
                Chat
              </Button>
            </View>
          </Card.Content>
        </Card>
      )}
      estimatedItemSize={15}
      onEndReached={() => {
        transactionsQuery.hasNextPage && transactionsQuery.fetchNextPage();
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
