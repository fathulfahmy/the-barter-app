import { View } from "react-native";
import { Button } from "react-native-paper";

import { Stack, router } from "expo-router";

import { ScreenWrapper } from "@/components/screens";
import { AuthProfile } from "@/features/profile/components/auth-profile";
import { ProvideList } from "@/features/provide/components/provide-list";
import { useLogout, useUser } from "@/lib/auth/auth";

const AuthProfileScreen = () => {
  const { data } = useUser();

  const logout = useLogout({ onSuccess: () => router.replace("/(tabs)") });

  const onSubmit = () => logout.mutate(undefined);

  return (
    <>
      <Stack.Screen options={{ headerBackVisible: true }} />
      <ScreenWrapper>
        <AuthProfile user={data} />

        <ProvideList />

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
