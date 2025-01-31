import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";

import { ScreenWrapper } from "./screen-wrapper";

export const ErrorStateScreen = () => {
  return (
    <ScreenWrapper style={styles.container}>
      <Text variant="bodyMedium" style={styles.text}>
        Error
      </Text>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
  },
});
