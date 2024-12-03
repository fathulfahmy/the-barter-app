import { Button, Text } from "react-native-paper";

import { Link } from "expo-router";

import { ScreenWrapper } from "@/components/screens/screen-wrapper";

export default function ProvideRecordScreen() {
  return (
    <ScreenWrapper>
      <Text>ProvideRecordScreen</Text>
      <Link href="/provide/1/request" replace asChild>
        <Button mode="contained"> Go to Provide Request</Button>
      </Link>
    </ScreenWrapper>
  );
}
