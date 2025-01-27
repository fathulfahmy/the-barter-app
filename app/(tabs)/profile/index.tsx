import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { IconButton } from "react-native-paper";

import { Stack, router } from "expo-router";

import { ScreenWrapper } from "@/components/screens";
import { AuthProfile } from "@/features/profile/components/auth-profile";
import { useAppTheme } from "@/lib/react-native-paper";

const AuthProfileScreen = () => {
  const { colors } = useAppTheme();

  return (
    <>
      {/* FIXME: headerRight not working on adroid */}
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
        {/* FIXME: headerRight not working on adroid */}
        {Platform.OS === "android" ? (
          <View style={styles.pencil}>
            <IconButton icon="pencil" iconColor={colors.primary} onPress={() => router.push("/profile/edit")} />
          </View>
        ) : null}

        <AuthProfile />
      </ScreenWrapper>
    </>
  );
};

export default AuthProfileScreen;

const styles = StyleSheet.create({
  pencil: {
    alignItems: "flex-end",
  },
});
