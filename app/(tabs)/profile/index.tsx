import { Button } from "react-native-paper";

import { Link, router } from "expo-router";

import { ScreenWrapper } from "@/components/screens/screen-wrapper";
import { useLogout } from "@/lib/auth/auth";

export default function ProfileScreen() {
  const logout = useLogout({ onSuccess: () => router.replace("/(tabs)") });

  const onSubmit = () => logout.mutate(undefined);

  return (
    <ScreenWrapper>
      <Link href="/profile/edit" asChild>
        <Button mode="contained">Go to Profile Edit</Button>
      </Link>
      <Link href="/profile/1" asChild>
        <Button mode="contained">Go to Profile Detail</Button>
      </Link>
      <Button mode="contained" onPress={onSubmit}>
        Logout
      </Button>
    </ScreenWrapper>
  );
}
