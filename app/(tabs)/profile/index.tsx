import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

import { router } from "expo-router";

import { ScreenWrapper } from "@/components/screens";
import { AuthProfile } from "@/features/profile/components/auth-profile";
import { Provide } from "@/features/service/components/provide";
import { useLogout, useUser } from "@/lib/auth/auth";

const AuthProfileScreen = () => {
  const { data } = useUser();

  const logout = useLogout({ onSuccess: () => router.replace("/(tabs)") });

  const onSubmit = () => logout.mutate(undefined);

  return (
    <ScreenWrapper>
      <AuthProfile user={data} />

      <Provide />

      <View style={{ paddingVertical: 8, paddingHorizontal: 16 }}>
        <Button mode="contained" onPress={onSubmit} loading={logout.isPending} disabled={logout.isPending}>
          Logout
        </Button>
      </View>
    </ScreenWrapper>
  );
};

export default AuthProfileScreen;
