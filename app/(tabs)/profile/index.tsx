import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { Button, IconButton } from "react-native-paper";

import { Stack, router } from "expo-router";

import { LoadingStateScreen, ScreenWrapper } from "@/components/screens";
import { AuthProfile } from "@/features/profile/components/auth-profile";
import { Provide } from "@/features/service/components/provide";
import { useLogout, useUser } from "@/lib/auth/auth";
import { useAppTheme } from "@/lib/react-native-paper";

const AuthProfileScreen = () => {
  const { colors } = useAppTheme();
  const userQuery = useUser();

  const user = userQuery.data;

  const logout = useLogout({ onSuccess: () => router.replace("/(tabs)") });

  const onSubmit = () => logout.mutate(undefined);

  if (userQuery.isLoading) {
    return <LoadingStateScreen />;
  }

  return (
    <>
      {/* temporary fix headerRight not working on adroid */}
      <Stack.Screen
        options={{
          headerRight:
            Platform.OS === "android"
              ? undefined
              : () => (
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
        {/* temporary fix headerRight not working on adroid */}
        {Platform.OS === "android" && (
          <View style={styles.pencil}>
            <IconButton icon="pencil" iconColor={colors.primary} onPress={() => router.push("/profile/edit")} />
          </View>
        )}

        <AuthProfile user={user} />

        <Provide />

        <View style={styles.button}>
          <Button mode="contained" onPress={onSubmit} disabled={logout.isPending} loading={logout.isPending}>
            Logout
          </Button>
        </View>
      </ScreenWrapper>
    </>
  );
};

export default AuthProfileScreen;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  pencil: {
    alignItems: "flex-end",
  },
});
