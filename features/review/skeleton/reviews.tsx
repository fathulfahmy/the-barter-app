import React from "react";
import ContentLoader, { Circle, Rect } from "react-content-loader/native";
import { StyleSheet, View } from "react-native";
import { Card } from "react-native-paper";

import { AppList, Spacer } from "@/components/ui";
import { useAppTheme } from "@/lib/react-native-paper";

export const ReviewsSkeleton = () => {
  const { colors } = useAppTheme();
  const items = Array.from({ length: 4 }, (_, i) => i);

  return (
    <AppList
      data={items}
      renderItem={() => (
        <Card>
          <Card.Content>
            {/* ======================================== AVATAR WITH NAME */}
            <View style={styles.row}>
              <ContentLoader
                width={30}
                height={30}
                backgroundColor={colors.surfaceVariant}
                foregroundColor={colors.surface}
              >
                <Circle cx="15" cy="15" r="15" />
              </ContentLoader>
              <ContentLoader
                width="50%"
                height={20}
                backgroundColor={colors.surfaceVariant}
                foregroundColor={colors.surface}
              >
                <Rect x="0" y="0" rx="4" ry="4" width="100%" height="20" />
              </ContentLoader>
            </View>

            {/* ======================================== BODY */}
            <ContentLoader
              width="100%"
              height={200}
              backgroundColor={colors.surfaceVariant}
              foregroundColor={colors.surface}
            >
              <Rect x="0" y="20" rx="4" ry="4" width="70%" height="20" />
              <Rect x="0" y="50" rx="4" ry="4" width="50%" height="20" />
              <Rect x="0" y="90" rx="4" ry="4" width="30%" height="10" />
              <Rect x="0" y="110" rx="4" ry="4" width="80%" height="10" />
              <Rect x="0" y="130" rx="4" ry="4" width="100%" height="10" />
              <Rect x="0" y="150" rx="4" ry="4" width="90%" height="10" />
              <Rect x="0" y="170" rx="4" ry="4" width="70%" height="10" />
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
