import { Button, Text } from "react-native-paper";

import { Link } from "expo-router";

import { ScreenWrapper } from "@/components/screens/screen-wrapper";

export default function ReviewListScreen() {
  return (
    <ScreenWrapper>
      <Text>Review</Text>
      <Link href="/review/1/edit" asChild>
        <Button mode="contained">Go to Review Edit</Button>
      </Link>
      <Link href="/review/1/payment" asChild>
        <Button mode="contained">Go to Review Payment</Button>
      </Link>
      <Link href="/review/1/invoice" asChild>
        <Button mode="contained">Go to Review Invoice</Button>
      </Link>
    </ScreenWrapper>
  );
}
