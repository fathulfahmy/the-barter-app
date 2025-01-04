import ContentLoader, { Circle, Rect } from "react-content-loader/native";
import { ScrollView, StyleSheet, View } from "react-native";

import { useAppTheme } from "@/lib/react-native-paper";

export const ServiceSkeleton = () => {
  const { colors } = useAppTheme();

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* ======================================== CATEGORY CHIP */}
        <ContentLoader width="30%" height={30} backgroundColor={colors.surfaceVariant} foregroundColor={colors.surface}>
          <Rect x="0" y="0" rx="4" ry="4" width="100%" height="30" />
        </ContentLoader>

        {/* ======================================== AVATAR WITH NAME */}
        <View style={styles.avatar}>
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

        {/* ======================================== BODY */}
        <ContentLoader
          width="100%"
          height={130}
          backgroundColor={colors.surfaceVariant}
          foregroundColor={colors.surface}
        >
          <Rect x="0" y="0" rx="4" ry="4" width="50%" height="30" />
          <Rect x="0" y="50" rx="4" ry="4" width="90%" height="20" />
          <Rect x="0" y="80" rx="4" ry="4" width="100%" height="20" />
          <Rect x="0" y="110" rx="4" ry="4" width="90%" height="20" />
        </ContentLoader>

        {/* ======================================== PRICE */}
        <ContentLoader
          width="100%"
          height={20}
          backgroundColor={colors.surfaceVariant}
          foregroundColor={colors.surface}
        >
          <Rect x="0" y="0" rx="4" ry="4" width="70%" height="20" />
        </ContentLoader>

        {/* ======================================== REVIEW */}
        <View style={styles.avatar}>
          <ContentLoader
            width="15%"
            height={30}
            backgroundColor={colors.surfaceVariant}
            foregroundColor={colors.surface}
          >
            <Rect x="0" y="0" rx="4" ry="4" width="100%" height="30" />
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

        {/* ======================================== GALLERY */}
        <View style={styles.gallery}>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 20,
  },
  avatar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  review: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  gallery: {
    flexDirection: "row",
    gap: 8,
  },
});
