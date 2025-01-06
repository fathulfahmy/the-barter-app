import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { FlashList, FlashListProps } from "@shopify/flash-list";

export type AppListProps<T> = FlashListProps<T> & {
  containerStyle?: StyleProp<ViewStyle>;
};

export const AppList = <T,>({ containerStyle, ...props }: AppListProps<T>) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <FlashList
        keyExtractor={(item, index) => `${index}`}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={15}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 4,
  },
});
