import React, { useEffect, useState } from "react";
import { Icon, IconButton } from "react-native-paper";

import { Redirect, Tabs } from "expo-router";

import { HapticTab } from "@/components/ui";
import { useTabBarBadges } from "@/features/statistic/api/get-tab-bar-badges";
import { useAuthToken } from "@/lib/auth/token";
import { useAppTheme } from "@/lib/react-native-paper";
import { client } from "@/lib/stream-chat/client";

const TabsLayout = () => {
  /* ======================================== STATES */
  const [unreadCount, setUnreadCount] = useState(0);

  /* ======================================== HOOKS */
  const { colors } = useAppTheme();
  const { token } = useAuthToken();

  /* ======================================== QUERIES */
  const tabBarBadgesQuery = useTabBarBadges({
    queryConfig: {
      refetchInterval: 3000,
    },
  });
  const tabBarBadges = tabBarBadgesQuery?.data?.data ?? { pending_barter_transactions: 0 };

  /* ======================================== EFFECTS */
  useEffect(() => {
    const handleEvent = (event: any) => {
      if (event.total_unread_count !== undefined) {
        setUnreadCount(event.total_unread_count);
      }
    };

    client.on(handleEvent);

    return () => {
      client.off(handleEvent);
    };
  }, []);

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
        tabBarBadgeStyle: {
          backgroundColor: colors.red,
          color: colors.onRed,
        },
      }}
      backBehavior="history"
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
          tabBarBadge: tabBarBadges
            ? tabBarBadges?.pending_barter_transactions > 0
              ? tabBarBadges.pending_barter_transactions
              : undefined
            : undefined,
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
          tabBarBadge: unreadCount > 0 ? unreadCount : undefined,
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
