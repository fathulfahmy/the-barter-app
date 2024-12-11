import { IconButton } from "react-native-paper";

import { Stack, router } from "expo-router";

import { ScreenWrapper } from "@/components/screens";
import { ProvideList } from "@/features/provide/components/provide-list";
import { useAppTheme } from "@/lib/react-native-paper";

const ProvideScreen = () => {
  const { colors } = useAppTheme();
  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <IconButton icon="plus" iconColor={colors.onPrimary} onPress={() => router.push("/provide/create")} />
          ),
        }}
      />
      <ScreenWrapper>
        <ProvideList />
      </ScreenWrapper>
    </>
  );
};

export default ProvideScreen;
