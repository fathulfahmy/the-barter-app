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

  const whole = Math.floor(rating);
  const fraction = rating % 1 >= 0.5;
  const total = 5;

  const renderStars = () => {
    let stars = [];

    for (let i = 0; i < total; i++) {
      if (i < whole) {
        stars.push(
          <Icon
            key={`full-${i}`}
            source="star"
            size={size ?? fonts.bodyMedium.fontSize}
            color={color ?? colors.yellow}
            {...props}
          />,
        );
      } else if (i === whole && fraction) {
        stars.push(
          <Icon
            key={`half-${i}`}
            source="star-half-full"
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
