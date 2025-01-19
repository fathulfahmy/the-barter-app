import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";

import { useIsFocused } from "@react-navigation/native";
import { router } from "expo-router";

import { AppList, Spacer } from "@/components/ui";
import { AvatarWithName } from "@/components/ui/avatar";
import { useRefreshByUser } from "@/hooks/use-refresh-by-user";
import { useStreamChat } from "@/hooks/use-stream-chat";
import { useUser } from "@/lib/auth/auth";
import { useAppTheme } from "@/lib/react-native-paper";
import { formatInvoiceItems } from "@/utils/format";

import { useInfiniteTransactions } from "../api/get-transactions";
import { OngoingTransactionsSkeleton } from "../skeleton/ongoing-transactions";
import { MenuWrapper } from "./menu-wrapper";

export const OngoingTransactions = ({ barter_service_id }: { barter_service_id?: string }) => {
  /* ======================================== HOOKS */
  const { colors } = useAppTheme();
  const isFocused = useIsFocused();
  const channel = useStreamChat();

  /* ======================================== QUERIES */
  const userQuery = useUser();
  const user = userQuery.data;

  const transactionsQuery = useInfiniteTransactions({
    mode: "ongoing",
    ...(barter_service_id && { barter_service_id }),
    // FIXME: pusher not working on expo go (pusher-websocket-react-native)
    queryConfig: {
      refetchInterval: isFocused ? 3000 : false,
    },
  });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(transactionsQuery.refetch);
  const transactions = transactionsQuery.data?.pages?.flatMap((page) => page.data?.data ?? []) ?? [];

  /* ======================================== FUNCTIONS */
  const handleComplete = (barter_transaction_id: string) => {
    if (barter_service_id) {
      router.push(`/provide/transaction/${barter_transaction_id}/payment`);
    } else {
      router.push(`/my_barters/transaction/${barter_transaction_id}/payment`);
    }
  };

  /* ======================================== RETURNS */
  if (userQuery.isLoading || transactionsQuery.isLoading) {
    return <OngoingTransactionsSkeleton />;
  }

  return (
    <AppList
      data={transactions}
      renderItem={({ item }) => {
        const isUserAcquirer = user?.id === item.barter_acquirer_id;
        const isUserAwaiting = user?.id == item.awaiting_completed_user_id;
        const otherUser = isUserAcquirer ? item.barter_provider : item.barter_acquirer;
        const title = isUserAcquirer ? item.barter_service?.title : formatInvoiceItems(item.barter_invoice);
        const subtitle = isUserAcquirer ? formatInvoiceItems(item.barter_invoice) : item.barter_service?.title;

        return (
          <Card>
            <Card.Content style={styles.card}>
              <View style={styles.header}>
                <AvatarWithName user={otherUser} />
                <MenuWrapper item={item} barter_service_id={barter_service_id} />
              </View>

              <View style={styles.body}>
                <Text variant="titleMedium">{title}</Text>
                <Text variant="bodyMedium" style={{ color: colors.secondary }}>
                  For {subtitle}
                </Text>
              </View>

              <View style={styles.buttons}>
                <Button mode="outlined" onPress={() => channel.createAndRedirect(otherUser?.id)}>
                  Chat
                </Button>

                <Button mode="contained" onPress={() => handleComplete(item.id)} disabled={isUserAwaiting}>
                  {isUserAwaiting ? "Awaiting other user to complete" : "Complete"}
                </Button>
              </View>
            </Card.Content>
          </Card>
        );
      }}
      onEndReached={() => {
        transactionsQuery.hasNextPage && transactionsQuery.fetchNextPage();
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
    marginBottom: 8,
  },
  body: {
    gap: 2,
  },
  buttons: {
    gap: 4,
  },
});
