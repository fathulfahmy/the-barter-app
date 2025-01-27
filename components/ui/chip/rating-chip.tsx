import React from "react";
import { StyleSheet } from "react-native";
import { Chip, ChipProps, Icon } from "react-native-paper";

import { useAppTheme } from "@/lib/react-native-paper";
import { formatRating } from "@/utils/format";

type RatingChipProps = Omit<ChipProps, "children"> & {
  rating: number | null | undefined;
};

export const RatingChip: React.FC<RatingChipProps> = ({ rating, style, textStyle, ...props }) => {
  const { colors, fonts } = useAppTheme();

  if (!rating) return null;

  const chipStyle = [
    styles.chip,
    {
      backgroundColor: colors.yellowContainer,
    },
    style,
  ];

  const chipTextStyle = [
    {
      color: colors.onYellowContainer,
    },
    textStyle,
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
      {...props}
      textStyle={chipTextStyle}
      style={chipStyle}
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
