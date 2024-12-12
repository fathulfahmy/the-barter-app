import {
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { withLayoutContext } from "expo-router";

import { useAppTheme } from "@/lib/react-native-paper";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

const MyBartersTabsLayout = () => {
  const { colors } = useAppTheme();

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
      <MaterialTopTabs.Screen name="incoming" options={{ title: "Incoming" }} />
      <MaterialTopTabs.Screen name="outgoing" options={{ title: "Outgoing" }} />
      <MaterialTopTabs.Screen name="ongoing" options={{ title: "Ongoing" }} />
      <MaterialTopTabs.Screen name="history" options={{ title: "History" }} />
    </MaterialTopTabs>
  );
};

export default MyBartersTabsLayout;
