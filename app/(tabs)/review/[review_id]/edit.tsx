import { Button, Text } from "react-native-paper";

import { Link } from "expo-router";

import { ScreenWrapper } from "@/components/screens/screen-wrapper";

export default function ReviewEditScreen() {
  return (
    <ScreenWrapper>
      <Text>ReviewEditScreen</Text>
      <Link href="/review/1/payment" asChild>
        <Button mode="contained">Go to Review Payment</Button>
      </Link>
    </ScreenWrapper>
  );
}
