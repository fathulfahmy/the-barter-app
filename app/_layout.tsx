import React from "react";
import { AppStateStatus, LogBox, Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { en, registerTranslation } from "react-native-paper-dates";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { QueryClient, QueryClientProvider, focusManager } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { ConfirmationDialog } from "@/components/ui/dialog";
import { StatusDialog } from "@/components/ui/dialog/status-dialog";
import { Notification } from "@/components/ui/notification";
import { useAppState } from "@/hooks/use-app-state";
import { useOnlineManager } from "@/hooks/use-online-manager";
import { AuthTokenProvider } from "@/lib/auth/token";
import { AppLightTheme } from "@/lib/react-native-paper";
import { defaultQueryConfig } from "@/lib/react-query";
import { StreamChatProvider } from "@/lib/stream-chat/provider";
import { StripePaymentProvider } from "@/lib/stripe";

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

const queryClient = new QueryClient({
  defaultOptions: defaultQueryConfig,
});

const RootLayout = () => {
  // FIXME: line chart tooltip on press
  LogBox.ignoreLogs(["Maximum update depth exceeded"]);

  const theme = AppLightTheme;

  useOnlineManager();
  useAppState(onAppStateChange);
  useReactQueryDevTools(queryClient);

  registerTranslation("en", en);

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        <AuthTokenProvider>
          <SafeAreaProvider>
            <GestureHandlerRootView>
              <ActionSheetProvider>
                <StreamChatProvider>
                  <StripePaymentProvider>
                    <StatusBar style="light" backgroundColor={theme.colors.primary} />
                    <Stack>
                      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                      <Stack.Screen name="+not-found" />
                    </Stack>
                    <StatusDialog />
                    <ConfirmationDialog />
                    <Notification />
                  </StripePaymentProvider>
                </StreamChatProvider>
              </ActionSheetProvider>
            </GestureHandlerRootView>
          </SafeAreaProvider>
        </AuthTokenProvider>
      </PaperProvider>
    </QueryClientProvider>
  );
};

export default RootLayout;
