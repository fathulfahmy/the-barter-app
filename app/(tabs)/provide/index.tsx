import React from "react";
import { Platform } from "react-native";
import { IconButton } from "react-native-paper";

import { Stack, router } from "expo-router";

import { ScreenWrapper } from "@/components/screens";
import { Provide } from "@/features/service/components/provide";
import { useAppTheme } from "@/lib/react-native-paper";

const ProvideScreen = () => {
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
                    icon="plus"
                    iconColor={colors.onPrimary}
                    onPress={() => router.push("/provide/create")}
                    style={{ margin: 0 }}
                  />
                ),
          headerShadowVisible: false,
        }}
      />
      <ScreenWrapper>
        {/* FIXME: headerRight not working on adroid */}
        <Provide />
      </ScreenWrapper>
    </>
  );
};

export default ProvideScreen;
