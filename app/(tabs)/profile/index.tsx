import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { IconButton } from "react-native-paper";

import { Stack, router } from "expo-router";

import { ScreenWrapper } from "@/components/screens";
import { Buttons } from "@/components/ui/button";
import { AuthProfile } from "@/features/profile/components/auth-profile";
import { Provide } from "@/features/service/components/provide";
import { useLogout } from "@/lib/auth/auth";
import { useAppTheme } from "@/lib/react-native-paper";

const AuthProfileScreen = () => {
  const { colors } = useAppTheme();
  const logout = useLogout();

  const onSubmit = () => logout.mutate(undefined);

  return (
    <>
      {/* FIXME: headerRight not working on android (expo-router) */}
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
        {/* FIXME: headerRight not working on android (expo-router) */}
        {Platform.OS === "android" && (
          <View style={styles.pencil}>
            <IconButton icon="pencil" iconColor={colors.primary} onPress={() => router.push("/profile/edit")} />
          </View>
        )}

        <AuthProfile />

        {/* TODO: STATISTICS - transaction count. incoming, outgoing, ongoing, completed */}
        {/* TODO: STATISTICS - transaction per month line graph. line 1: all, line 2: completed */}
        <Provide />

        <Buttons
          vertical
          buttons={[
            {
              label: "Logout",
              mode: "contained",
              onPress: onSubmit,
              disabled: logout.isPending,
              loading: logout.isPending,
            },
          ]}
          style={styles.buttons}
        />
      </ScreenWrapper>
    </>
  );
};

export default AuthProfileScreen;

const styles = StyleSheet.create({
  buttons: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  pencil: {
    alignItems: "flex-end",
  },
});
