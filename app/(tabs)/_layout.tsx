import { Icon } from "react-native-paper";

import { Redirect, Tabs } from "expo-router";

import { LoadingStateScreen } from "@/components/screens";
import { HapticTab } from "@/components/ui";
import { useToken } from "@/lib/auth/token";
import { useAppTheme } from "@/lib/react-native-paper";

const TabsLayout = () => {
  const { colors } = useAppTheme();
  const { token, isLoading } = useToken();

  if (isLoading) {
    return <LoadingStateScreen />;
  }

  if (!token) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.outline,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.outlineVariant,
        },
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="acquire"
        options={{
          tabBarLabel: "Acquire",
          tabBarIcon: ({ color, focused, size }) => <Icon source={"magnify"} color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="provide"
        options={{
          tabBarLabel: "Provide",
          tabBarIcon: ({ color, focused, size }) => (
            <Icon source={focused ? "briefcase" : "briefcase-outline"} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="review"
        options={{
          tabBarLabel: "Review",
          tabBarIcon: ({ color, focused, size }) => (
            <Icon source={focused ? "star" : "star-outline"} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          tabBarLabel: "Chat",
          tabBarIcon: ({ color, focused, size }) => (
            <Icon source={focused ? "chat" : "chat-outline"} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, focused, size }) => (
            <Icon source={focused ? "account" : "account-outline"} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen name="index" options={{ href: null }} />
    </Tabs>
  );
};

export default TabsLayout;
