import { Button, Text } from "react-native-paper";

import { Link } from "expo-router";

import { ScreenWrapper } from "@/components/screens/screen-wrapper";

export default function ProvideRequestScreen() {
  return (
    <ScreenWrapper>
      <Text>ProvideRequestScreen</Text>
      <Link href="/provide/1/record" replace asChild>
        <Button mode="contained"> Go to Provide Record</Button>
      </Link>
    </ScreenWrapper>
  );
}
