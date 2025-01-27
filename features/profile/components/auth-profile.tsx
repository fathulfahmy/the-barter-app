import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import { AppAvatar } from "@/components/ui/avatar";
import { Buttons } from "@/components/ui/button";
import { useConfirmationDialog } from "@/components/ui/dialog";
import { Remarks } from "@/features/remark/components/remarks";
import { MonthlyTransactionsChart } from "@/features/statistic/components/monthly-transactions-chart";
import { TrendingServicesChart } from "@/features/statistic/components/trending-services-chart";
import { useLogout, useUser } from "@/lib/auth/auth";

export const AuthProfile = () => {
  /* ======================================== QUERIES */
  const userQuery = useUser();
  const user = userQuery.data;

  /* ======================================== MUTATIONS */
  const logout = useLogout();

  const handleLogout = () => {
    useConfirmationDialog.getState().setConfirmationDialog({
      type: "warning",
      title: "Confirm logout?",
      confirmButtonFn: () => {
        logout.mutate(undefined);
      },
    });
  };

  /* ======================================== RETURNS */
  if (userQuery.isLoading) return null;

  return (
    <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
      <View style={styles.avatar}>
        <AppAvatar uri={user?.avatar?.uri} name={user?.name} size={96} />
        <Text variant="titleMedium">{user?.name}</Text>
      </View>

      <Remarks />

      <View style={styles.container}>
        <MonthlyTransactionsChart />

        <TrendingServicesChart />

        <Buttons
          vertical
          buttons={[
            {
              label: "Logout",
              mode: "contained",
              onPress: handleLogout,
              disabled: logout.isPending,
              loading: logout.isPending,
            },
          ]}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  avatar: {
    paddingVertical: 32,
    gap: 8,
    alignItems: "center",
  },
  title: {
    textAlign: "center",
  },
});
