import React, { ComponentProps } from "react";
import { StyleSheet, View } from "react-native";
import { Icon } from "react-native-paper";

import { useAppTheme } from "@/lib/react-native-paper";

type RatingStarsProps = Omit<ComponentProps<typeof Icon>, "source" | "size" | "color"> & {
  rating: number;
  size?: number;
  color?: string;
};

export const RatingStars: React.FC<RatingStarsProps> = ({ rating, size, color, ...props }) => {
  const { colors, fonts } = useAppTheme();

  const fullStars = Math.floor(rating);

  const renderStars = () => {
    let stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Icon
            key={`full-${i}`}
            source="star"
            size={size ?? fonts.bodyMedium.fontSize}
            color={color ?? colors.yellow}
            {...props}
          />,
        );
      } else {
        stars.push(
          <Icon
            key={`empty-${i}`}
            source="star-outline"
            size={size ?? fonts.bodyMedium.fontSize}
            color={color ?? colors.yellow}
            {...props}
          />,
        );
      }
    }

    return stars;
  };
  return <View style={styles.container}>{renderStars()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 2,
  },
});
