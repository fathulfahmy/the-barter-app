import React from "react";
import { Icon, IconButton } from "react-native-paper";

import { Redirect, Tabs } from "expo-router";

import { HapticTab } from "@/components/ui";
import { useAuthToken } from "@/lib/auth/auth-token";
import { useAppTheme } from "@/lib/react-native-paper";
import { useInitialPrefetch } from "@/utils/use-initial-prefetch";

const TabsLayout = () => {
  /* ======================================== HOOKS */
  const { colors } = useAppTheme();
  const { token } = useAuthToken();
  useInitialPrefetch();

  /* ======================================== RETURNS */
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
        tabBarHideOnKeyboard: true,
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
        name="my_barters"
        options={{
          tabBarLabelStyle: { height: 0, padding: 0 },
          tabBarIcon: ({ color, focused, size }) => (
            <IconButton
              icon={"swap-vertical-variant"}
              containerColor={color}
              iconColor={colors.onPrimary}
              style={{ marginTop: 16 }}
            />
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
