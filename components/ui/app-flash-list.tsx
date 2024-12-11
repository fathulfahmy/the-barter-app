import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { FlashList, FlashListProps } from "@shopify/flash-list";

import { EmptyStateScreen } from "../screens";

type AppFlashListProps<T> = FlashListProps<T> & {
  containerStyle?: StyleProp<ViewStyle>;
};

export const AppFlashList = <T,>({ containerStyle, ...props }: AppFlashListProps<T>) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <FlashList
        {...props}
        ListEmptyComponent={<EmptyStateScreen />}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
