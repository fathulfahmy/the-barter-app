import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ScreenWrapper } from "@/components/screens";
import { LoginForm } from "@/features/auth/components/login-form";

const LoginScreen = () => {
  const insets = useSafeAreaInsets();

  const contentContainerStyle = {
    padding: 16,
    paddingBottom: Platform.OS === "web" ? 16 : insets.bottom,
  };

  return (
    <ScreenWrapper contentContainerStyle={contentContainerStyle}>
      <LoginForm />
    </ScreenWrapper>
  );
};

export default LoginScreen;
