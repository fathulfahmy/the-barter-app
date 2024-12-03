import { Button, Text } from "react-native-paper";

import { Link } from "expo-router";

import { ScreenWrapper } from "@/components/screens/screen-wrapper";

export default function ProvideListScreen() {
  return (
    <ScreenWrapper>
      <Text>Provide</Text>
      <Link href="/provide/create" asChild>
        <Button mode="contained">Go to Provide Create</Button>
      </Link>
      <Link href="/provide/1/request" asChild>
        <Button mode="contained">Go to Provide Request</Button>
      </Link>
    </ScreenWrapper>
  );
}
