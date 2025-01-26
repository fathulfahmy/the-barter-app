import React from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
import { Card } from "react-native-paper";

import { AppList, Spacer } from "@/components/ui";
import { useAppTheme } from "@/lib/react-native-paper";

export const ProvideSkeleton = () => {
  const { colors } = useAppTheme();
  const items = Array.from({ length: 4 }, (_, i) => i);

  return (
    <AppList
      data={items}
      renderItem={() => (
        <Card>
          <Card.Content>
            {/* ======================================== CATEGORY CHIP */}
            <ContentLoader
              width="50%"
              height={30}
              backgroundColor={colors.surfaceVariant}
              foregroundColor={colors.surface}
            >
              <Rect x="0" y="0" rx="4" ry="4" width="100%" height="100%" />
            </ContentLoader>

            {/* ======================================== BODY */}
            <ContentLoader
              width="100%"
              height={140}
              backgroundColor={colors.surfaceVariant}
              foregroundColor={colors.surface}
            >
              <Rect x="0" y="20" rx="4" ry="4" width="90%" height="20" />
              <Rect x="0" y="50" rx="4" ry="4" width="70%" height="20" />
              <Rect x="0" y="80" rx="4" ry="4" width="40%" height="20" />
              <Rect x="0" y="120" rx="4" ry="4" width="50%" height="20" />
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
