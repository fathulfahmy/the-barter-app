import React from "react";
import { StyleSheet } from "react-native";
import { Chip, ChipProps, Icon } from "react-native-paper";

import { useAppTheme } from "@/lib/react-native-paper";
import { formatRating } from "@/utils/format";

type RatingChipProps = Omit<ChipProps, "children"> & {
  rating: number | null | undefined;
};

export const RatingChip: React.FC<RatingChipProps> = ({ rating, style, ...props }) => {
  const { colors, fonts } = useAppTheme();

  if (!rating) return null;

  const chipStyle = [
    styles.chip,
    {
      backgroundColor: colors.yellowContainer,
    },
    style,
  ];

  return (
    <Chip
      compact
      icon={() => (
        <Icon
          source={rating > 0 ? "star" : "star-outline"}
          size={fonts.bodyMedium.fontSize}
          color={colors.onYellowContainer}
        />
      )}
      textStyle={{ color: colors.onYellowContainer }}
      style={chipStyle}
      {...props}
    >
      {formatRating(rating)}
    </Chip>
  );
};

const styles = StyleSheet.create({
  chip: {
    alignSelf: "flex-start",
  },
});
