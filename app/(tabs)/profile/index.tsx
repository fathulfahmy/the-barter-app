import React from "react";
import { IconButton } from "react-native-paper";

import { Stack, router } from "expo-router";

import { ScreenWrapper } from "@/components/screens";
import { AuthProfile } from "@/features/profile/components/auth-profile";
import { useAppTheme } from "@/lib/react-native-paper";

const AuthProfileScreen = () => {
  const { colors } = useAppTheme();

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
        <AuthProfile />
      </ScreenWrapper>
    </>
  );
};

export default AuthProfileScreen;
