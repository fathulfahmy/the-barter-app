import React from "react";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ScreenWrapper } from "@/components/screens";
import { RegisterForm } from "@/features/auth/components/register-form";

const RegisterScreen = () => {
  const insets = useSafeAreaInsets();

  const containerStyle = {
    paddingBottom: Platform.OS === "web" ? 16 : insets.bottom,
  };

  return (
    <ScreenWrapper style={containerStyle}>
      <RegisterForm />
    </ScreenWrapper>
  );
};

export default RegisterScreen;
