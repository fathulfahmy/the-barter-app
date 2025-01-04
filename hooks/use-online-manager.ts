import React from "react";
import { Platform } from "react-native";

import { onlineManager } from "@tanstack/react-query";
import * as Network from "expo-network";

export const useOnlineManager = () => {
  React.useEffect(() => {
    // React Query already supports on reconnect auto refetch in web browser
    if (Platform.OS !== "web") {
      const subscription = Network.addNetworkStateListener((state) => {
        onlineManager.setOnline(state.isConnected != null && state.isConnected && Boolean(state.isInternetReachable));
      });

      return () => {
        subscription.remove();
      };
    }
  }, []);
};
