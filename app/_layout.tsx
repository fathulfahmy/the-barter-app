import { AppStateStatus, Platform, useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { QueryClient, QueryClientProvider, focusManager } from "@tanstack/react-query";
import { Stack } from "expo-router";

import { ConfirmationDialog } from "@/components/ui/dialog";
import { Notification } from "@/components/ui/notification";
import { useAppState } from "@/hooks/use-app-state";
import { useOnlineManager } from "@/hooks/use-online-manager";
import { TokenProvider } from "@/lib/auth/token";
import { AppDarkTheme, AppLightTheme } from "@/types/react-native-paper";

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

const queryClient = new QueryClient();

const RootLayout = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? AppDarkTheme : AppLightTheme;

  useOnlineManager();
  useAppState(onAppStateChange);
  useReactQueryDevTools(queryClient);

  return (
    <PaperProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <TokenProvider>
          <SafeAreaProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
            <ConfirmationDialog />
            <Notification />
          </SafeAreaProvider>
        </TokenProvider>
      </QueryClientProvider>
    </PaperProvider>
  );
};

export default RootLayout;
