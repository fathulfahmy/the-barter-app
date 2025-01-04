import React from "react";
import { StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";

import { Stack, router } from "expo-router";

import { ScreenWrapper } from "@/components/screens";

const NotFoundStateScreen = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Oops" }} />

      <ScreenWrapper style={styles.container}>
        <Text variant="bodyLarge" style={styles.text}>
          Not Found
        </Text>
        <Button mode="contained" onPress={() => router.push("/_sitemap")}>
          Sitemap
        </Button>
      </ScreenWrapper>
    </>
  );
};

export default NotFoundStateScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  text: {
    textAlign: "center",
  },
});
