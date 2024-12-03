import { ScreenWrapper } from "@/components/screens/screen-wrapper";
import { LoginForm } from "@/features/auth/components/login-form";

export default function Login() {
  return (
    <ScreenWrapper contentContainerStyle={{ flex: 1, padding: 16 }}>
      <LoginForm />
    </ScreenWrapper>
  );
}
