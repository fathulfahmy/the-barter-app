import { Button, Text } from "react-native-paper";

import { Link } from "expo-router";

import { ScreenWrapper } from "@/components/screens";

const ReviewEditScreen = () => {
  return (
    <ScreenWrapper>
      <Text variant="bodyMedium">ReviewEditScreen</Text>
      <Link href="/review/1/payment" asChild>
        <Button mode="contained">Go to Review Payment</Button>
      </Link>
    </ScreenWrapper>
  );
};

export default ReviewEditScreen;
