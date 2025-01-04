import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { IconButton } from "react-native-paper";

import { Stack, router } from "expo-router";

import { ScreenWrapper } from "@/components/screens";
import { Provide } from "@/features/service/components/provide";
import { useAppTheme } from "@/lib/react-native-paper";

const ProvideScreen = () => {
  const { colors } = useAppTheme();

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
                    icon="plus"
                    iconColor={colors.onPrimary}
                    onPress={() => router.push("/provide/create")}
                    style={{ margin: 0 }}
                  />
                ),
        }}
      />
      <ScreenWrapper>
        {/* FIXME: headerRight not working on android (expo-router) */}
        {Platform.OS === "android" && (
          <View style={styles.plus}>
            <IconButton icon="plus" iconColor={colors.primary} onPress={() => router.push("/provide/create")} />
          </View>
        )}
        <Provide />
      </ScreenWrapper>
    </>
  );
};

export default ProvideScreen;

const styles = StyleSheet.create({
  plus: {
    alignItems: "flex-end",
  },
});
