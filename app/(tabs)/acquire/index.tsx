import React from "react";

import { Stack } from "expo-router";

import { ScreenWrapper } from "@/components/screens";
import { Acquire } from "@/features/service/components/acquire";

const AcquireScreen = () => {
  return (
    <>
      <Stack.Screen options={{ headerShadowVisible: false }} />
      <ScreenWrapper>
        <Acquire />
      </ScreenWrapper>
    </>
  );
};

export default AcquireScreen;
