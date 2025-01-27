import React from "react";
import { Card, Text } from "react-native-paper";

import { AppList, Spacer } from "@/components/ui";
import { useRefreshByUser } from "@/hooks/use-refresh-by-user";
import { useStreamChat } from "@/hooks/use-stream-chat";
import { useUser } from "@/lib/auth/auth";
import { useAppTheme } from "@/lib/react-native-paper";
import { formatDateTime, formatInvoiceItems } from "@/utils/format";

import { useInfiniteRemarks } from "../api/get-remarks";
import { RemarksSkeleton } from "../skeleton/remarks";

export const Remarks = () => {
  /* ======================================== HOOKS */
  const { colors } = useAppTheme();
  const channel = useStreamChat();

  /* ======================================== QUERIES */
  const userQuery = useUser();
  const user = userQuery.data;

  const remarksQuery = useInfiniteRemarks();
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(remarksQuery.refetch);
  const remarks = remarksQuery.data?.pages?.flatMap((page) => page?.data?.data ?? []) ?? [];

  /* ======================================== RETURNS */
  if (remarksQuery.isLoading) {
    return <RemarksSkeleton />;
  }

  return (
    <AppList
      data={remarks}
      renderItem={({ item }) => {
        const isUserAcquirer = user?.id === item.barter_transaction?.barter_acquirer_id;
        const otherUser = item.barter_transaction?.other_user;
        const title = isUserAcquirer
          ? formatInvoiceItems(item.barter_transaction?.barter_invoice)
          : item.barter_transaction?.barter_service?.title;

        return (
          <Card onPress={() => channel.createAndRedirect(otherUser?.id)}>
            <Card.Content>
              <Text variant="bodyMedium">{formatDateTime(item.datetime)}</Text>
              <Text variant="bodyMedium" style={{ color: colors.secondary }}>
                {title}
              </Text>
            </Card.Content>
          </Card>
        );
      }}
      onEndReached={() => {
        remarksQuery.hasNextPage && remarksQuery.fetchNextPage();
      }}
      onRefresh={refetchByUser}
      refreshing={isRefetchingByUser}
      ItemSeparatorComponent={() => <Spacer y={8} />}
      contentContainerStyle={{ padding: 16 }}
      containerStyle={{ flex: 1 }}
      nestedScrollEnabled
    />
  );
};
