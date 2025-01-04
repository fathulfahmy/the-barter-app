import ContentLoader, { Rect } from "react-content-loader/native";
import { ScrollView, StyleSheet } from "react-native";
import { Card, Divider } from "react-native-paper";

import { useAppTheme } from "@/lib/react-native-paper";

export const InvoiceSkeleton = () => {
  const { colors } = useAppTheme();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={{ backgroundColor: colors.surfaceVariant }}>
        <Card.Content>
          {/* ======================================== HEADER */}
          <ContentLoader
            width="100%"
            height={130}
            backgroundColor={colors.surface}
            foregroundColor={colors.surfaceVariant}
          >
            <Rect x="0" y="10" rx="4" ry="4" width="35%" height="40" />
            <Rect x="0" y="70" rx="4" ry="4" width="35%" height="20" />
            <Rect x="0" y="100" rx="4" ry="4" width="45%" height="20" />
          </ContentLoader>
        </Card.Content>
      </Card>

      <Card style={{ backgroundColor: colors.background }}>
        <Card.Content>
          {/* ======================================== PROVIDER */}
          <ContentLoader
            width="100%"
            height={170}
            backgroundColor={colors.surfaceVariant}
            foregroundColor={colors.surface}
          >
            <Rect x="0" y="10" rx="4" ry="4" width="40%" height="20" />
            <Rect x="0" y="40" rx="4" ry="4" width="20%" height="20" />
            <Rect x="0" y="70" rx="4" ry="4" width="60%" height="20" />
            <Rect x="0" y="100" rx="4" ry="4" width="20%" height="20" />
            <Rect x="0" y="130" rx="4" ry="4" width="70%" height="20" />
          </ContentLoader>

          <Divider />

          {/* ======================================== ACQUIRER */}
          <ContentLoader
            width="100%"
            height={240}
            backgroundColor={colors.surfaceVariant}
            foregroundColor={colors.surface}
          >
            <Rect x="0" y="20" rx="4" ry="4" width="40%" height="20" />
            <Rect x="0" y="50" rx="4" ry="4" width="20%" height="20" />
            <Rect x="0" y="80" rx="4" ry="4" width="60%" height="20" />
            <Rect x="0" y="110" rx="4" ry="4" width="20%" height="20" />
            <Rect x="0" y="140" rx="4" ry="4" width="30%" height="20" />
            <Rect x="0" y="170" rx="4" ry="4" width="20%" height="20" />
            <Rect x="0" y="200" rx="4" ry="4" width="70%" height="20" />
          </ContentLoader>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 8,
  },
});
