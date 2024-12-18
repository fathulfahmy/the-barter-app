import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { FlashList, FlashListProps } from "@shopify/flash-list";

import { EmptyStateScreen } from "../screens";

type AppListProps<T> = FlashListProps<T> & {
  containerStyle?: StyleProp<ViewStyle>;
};

export const AppList = <T,>({ containerStyle, ...props }: AppListProps<T>) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <FlashList
        {...props}
        keyExtractor={(item, index) => index.toString()}
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
