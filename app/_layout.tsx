import React from "react";
import { AppStateStatus, Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { QueryClient, QueryClientProvider, focusManager } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { OverlayProvider } from "stream-chat-expo";

import { ConfirmationDialog } from "@/components/ui/dialog";
import { StatusDialog } from "@/components/ui/dialog/status-dialog";
import { Notification } from "@/components/ui/notification";
import { useAppState } from "@/hooks/use-app-state";
import { useOnlineManager } from "@/hooks/use-online-manager";
import { TokenProvider } from "@/lib/auth/token";
import { AppLightTheme } from "@/lib/react-native-paper";
import { AppStripeProvider } from "@/lib/stripe";

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

const queryClient = new QueryClient();

const RootLayout = () => {
  const theme = AppLightTheme;

  useOnlineManager();
  useAppState(onAppStateChange);
  useReactQueryDevTools(queryClient);

  return (
    <PaperProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <TokenProvider>
          <SafeAreaProvider>
            <GestureHandlerRootView>
              <OverlayProvider>
                <AppStripeProvider>
                  <Stack>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                    <Stack.Screen name="+not-found" />
                  </Stack>
                  <StatusDialog />
                  <ConfirmationDialog />
                  <Notification />
                </AppStripeProvider>
              </OverlayProvider>
            </GestureHandlerRootView>
          </SafeAreaProvider>
        </TokenProvider>
      </QueryClientProvider>
    </PaperProvider>
  );
};

export default RootLayout;
