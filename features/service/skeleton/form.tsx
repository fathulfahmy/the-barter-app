import React from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
import { StyleSheet, View } from "react-native";

import { useAppTheme } from "@/lib/react-native-paper";

export const ServiceFormSkeleton = () => {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      {/* ======================================== TITLE */}
      <ContentLoader width="100%" height={85} backgroundColor={colors.surfaceVariant} foregroundColor={colors.surface}>
        <Rect x="0" y="0" rx="4" ry="4" width="30%" height="20" />
        <Rect x="0" y="30" rx="4" ry="4" width="100%" height="55" />
      </ContentLoader>

      {/* ======================================== DESCRIPTION */}
      <ContentLoader width="100%" height={140} backgroundColor={colors.surfaceVariant} foregroundColor={colors.surface}>
        <Rect x="0" y="0" rx="4" ry="4" width="30%" height="20" />
        <Rect x="0" y="30" rx="4" ry="4" width="100%" height="110" />
      </ContentLoader>

      {/* ======================================== CATEGORY */}
      <ContentLoader width="100%" height={85} backgroundColor={colors.surfaceVariant} foregroundColor={colors.surface}>
        <Rect x="0" y="0" rx="4" ry="4" width="30%" height="20" />
        <Rect x="0" y="30" rx="4" ry="4" width="100%" height="55" />
      </ContentLoader>

      {/* ======================================== PRICE RANGE */}
      <ContentLoader width="100%" height={20} backgroundColor={colors.surfaceVariant} foregroundColor={colors.surface}>
        <Rect x="0" y="0" rx="4" ry="4" width="30%" height="20" />
      </ContentLoader>

      <View style={styles.row}>
        <ContentLoader width="32%" height={85} backgroundColor={colors.surfaceVariant} foregroundColor={colors.surface}>
          <Rect x="0" y="0" rx="4" ry="4" width="60%" height="20" />
          <Rect x="0" y="30" rx="4" ry="4" width="100%" height="55" />
        </ContentLoader>
        <ContentLoader width="32%" height={85} backgroundColor={colors.surfaceVariant} foregroundColor={colors.surface}>
          <Rect x="0" y="0" rx="4" ry="4" width="60%" height="20" />
          <Rect x="0" y="30" rx="4" ry="4" width="100%" height="55" />
        </ContentLoader>
        <ContentLoader width="32%" height={85} backgroundColor={colors.surfaceVariant} foregroundColor={colors.surface}>
          <Rect x="0" y="0" rx="4" ry="4" width="60%" height="20" />
          <Rect x="0" y="30" rx="4" ry="4" width="100%" height="55" />
        </ContentLoader>
      </View>

      {/* ======================================== UPLOAD PHOTOS BUTTON */}
      <ContentLoader width="100%" height={40} backgroundColor={colors.surfaceVariant} foregroundColor={colors.surface}>
        <Rect x="0" y="0" rx="4" ry="4" width="100%" height="40" />
      </ContentLoader>

      {/* ======================================== GALLERY */}
      <View style={styles.row}>
        {Array.from({ length: 3 }).map((_, index) => (
          <ContentLoader
            key={index}
            width={150}
            height={150}
            backgroundColor={colors.surfaceVariant}
            foregroundColor={colors.surface}
          >
            <Rect x="0" y="0" rx="0" ry="0" width="100%" height="100%" />
          </ContentLoader>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
