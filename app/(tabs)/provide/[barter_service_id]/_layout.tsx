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

const ProvideDetailTabLayout = () => {
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
      <MaterialTopTabs.Screen
        name="requests"
        options={{ title: "Requests" }}
        initialParams={{ barter_service_id: barter_service_id }}
      />
      <MaterialTopTabs.Screen
        name="records"
        options={{ title: "Records" }}
        initialParams={{ barter_service_id: barter_service_id }}
      />
    </MaterialTopTabs>
  );
};

export default ProvideDetailTabLayout;
