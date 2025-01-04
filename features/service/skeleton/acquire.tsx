import React from "react";
import ContentLoader, { Circle, Rect } from "react-content-loader/native";
import { StyleSheet, View } from "react-native";
import { Card } from "react-native-paper";

import { AppList, Spacer } from "@/components/ui";
import { useAppTheme } from "@/lib/react-native-paper";

export const AcquireSkeleton = () => {
  const { colors } = useAppTheme();
  const items = Array.from({ length: 6 }, (_, i) => i);

  return (
    <AppList
      data={items}
      renderItem={() => (
        <Card>
          <Card.Content>
            <View style={styles.header}>
              <View style={styles.avatar}>
                {/* ======================================== AVATAR WITH NAME */}
                <ContentLoader
                  width="10%"
                  height={32}
                  backgroundColor={colors.surfaceVariant}
                  foregroundColor={colors.surface}
                >
                  <Circle cx="16" cy="16" r="16" />
                </ContentLoader>
                <ContentLoader
                  width="40%"
                  height={20}
                  backgroundColor={colors.surfaceVariant}
                  foregroundColor={colors.surface}
                >
                  <Rect x="0" y="0" rx="4" ry="4" width="100%" height="20" />
                </ContentLoader>
              </View>

              {/* ======================================== RATING CHIP */}
              <ContentLoader
                width="20%"
                height={32}
                backgroundColor={colors.surfaceVariant}
                foregroundColor={colors.surface}
              >
                <Rect x="0" y="0" rx="4" ry="4" width="100%" height="100%" />
              </ContentLoader>
            </View>

            {/* ======================================== BODY */}
            <ContentLoader
              width="100%"
              height={110}
              backgroundColor={colors.surfaceVariant}
              foregroundColor={colors.surface}
            >
              <Rect x="0" y="20" rx="4" ry="4" width="60%" height="20" />
              <Rect x="0" y="50" rx="4" ry="4" width="70%" height="20" />
              <Rect x="0" y="80" rx="4" ry="4" width="40%" height="20" />
            </ContentLoader>
          </Card.Content>
        </Card>
      )}
      ItemSeparatorComponent={() => <Spacer y={8} />}
      containerStyle={{ flex: 1 }}
      contentContainerStyle={{ padding: 16 }}
    />
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});