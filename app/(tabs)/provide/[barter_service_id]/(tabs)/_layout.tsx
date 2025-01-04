import React from "react";

import {
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { useLocalSearchParams, withLayoutContext } from "expo-router";

import { useAppTheme } from "@/lib/react-native-paper";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

const ProvideDetailTabsLayout = () => {
  const { colors } = useAppTheme();
  const { barter_service_id } = useLocalSearchParams<{ barter_service_id: string }>();

  return (
    <MaterialTopTabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.outline,
        tabBarStyle: {
          backgroundColor: colors.background,
        },
        tabBarIndicatorStyle: {
          backgroundColor: colors.primary,
        },
      }}
    >
      <MaterialTopTabs.Screen name="incoming" options={{ title: "Incoming" }} initialParams={{ barter_service_id }} />
      <MaterialTopTabs.Screen name="ongoing" options={{ title: "Ongoing" }} initialParams={{ barter_service_id }} />
      <MaterialTopTabs.Screen name="history" options={{ title: "History" }} initialParams={{ barter_service_id }} />
    </MaterialTopTabs>
  );
};

export default ProvideDetailTabsLayout;
