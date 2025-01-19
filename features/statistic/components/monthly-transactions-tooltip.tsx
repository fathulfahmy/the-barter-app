import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";

import { useAppTheme } from "@/lib/react-native-paper";
import { StatsData } from "@/types/api";
import { tooltipDimensions } from "@/utils/chart";

export const MonthlyTransactionsTooltip = ({
  dataset,
  items,
  pointerIndex,
}: {
  dataset: any;
  items: StatsData[];
  pointerIndex: number;
}) => {
  /* ======================================== HOOKS */
  const { colors, fonts } = useAppTheme();

  /* ======================================== TRANSFORMATIONS */
  const mark = Math.floor((dataset[0]?.data?.length ?? 0) * 0.55);
  const isNearRightEdge = pointerIndex >= mark;

  const tooltipStyle = {
    width: tooltipDimensions.width,
    marginTop: -30,
    marginLeft: isNearRightEdge ? -tooltipDimensions.width : tooltipDimensions.offset,
    backgroundColor: colors.background,
  };

  /* ======================================== RETURNS */
  return (
    <Card style={tooltipStyle}>
      <Card.Content>
        {/* ======================================== DATE */}
        <Text style={{ marginBottom: 8, color: colors.outline }}>{items[0].label}</Text>

        {items.map((item: any, index: number) => (
          <View key={index} style={styles.row}>
            {/* ======================================== CIRCLE */}
            <View
              style={{
                borderRadius: 50,
                backgroundColor: dataset[index].endFillColor,
                width: fonts.labelSmall.fontSize,
                height: fonts.labelSmall.fontSize,
              }}
            />
            {/* ======================================== DATA */}
            <Text>{item.value}</Text>
          </View>
        ))}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
