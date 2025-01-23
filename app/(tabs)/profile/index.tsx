import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";

import { Stack, router } from "expo-router";

import { ScreenWrapper } from "@/components/screens";
import { Buttons } from "@/components/ui/button";
import { useConfirmationDialog } from "@/components/ui/dialog";
import { AuthProfile } from "@/features/profile/components/auth-profile";
import { MonthlyTransactionsChart } from "@/features/statistic/components/monthly-transactions-chart";
import { TrendingServicesChart } from "@/features/statistic/components/trending-services-chart";
import { useLogout } from "@/lib/auth/auth";
import { useAppTheme } from "@/lib/react-native-paper";

const AuthProfileScreen = () => {
  const { colors } = useAppTheme();
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

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <IconButton
              icon="pencil"
              iconColor={colors.onPrimary}
              onPress={() => router.push("/profile/edit")}
              style={{ margin: 0 }}
            />
          ),
        }}
      />

      <ScreenWrapper>
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <AuthProfile />

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
        </ScrollView>
      </ScreenWrapper>
    </>
  );
};

export default AuthProfileScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 24,
  },
});
