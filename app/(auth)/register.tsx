import { ScreenWrapper } from "@/components/screens/screen-wrapper";
import { RegisterForm } from "@/features/auth/components/register-form";

export default function Register() {
  return (
    <ScreenWrapper contentContainerStyle={{ flex: 1, padding: 16 }}>
      <RegisterForm />
    </ScreenWrapper>
  );
}
