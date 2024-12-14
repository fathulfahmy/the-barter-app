import React from "react";
import { View } from "react-native";
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
        <AuthProfile user={user} />

        <Provide />

        <View style={{ paddingVertical: 8, paddingHorizontal: 16 }}>
          <Button mode="contained" onPress={onSubmit} loading={logout.isPending} disabled={logout.isPending}>
            Logout
          </Button>
        </View>
      </ScreenWrapper>
    </>
  );
};

export default AuthProfileScreen;
