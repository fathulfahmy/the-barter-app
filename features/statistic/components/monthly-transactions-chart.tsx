import React from "react";
import { StyleSheet, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { Card, Text } from "react-native-paper";

import { useAppTheme } from "@/lib/react-native-paper";
import { StatsData } from "@/types/api";
import { chartDimensions, getDatasetMaxValue, tooltipDimensions } from "@/utils/chart";
import { formatSentenceCase, parseRgbToRgba } from "@/utils/format";

import { useMonthlyTransactions } from "../api/get-monthly-transactions";
import { MonthlyTransactionsChartSkeleton } from "../skeleton/monthly-transactions-chart";
import { MonthlyTransactionsTooltip } from "./monthly-transactions-tooltip";

export const MonthlyTransactionsChart = () => {
  /* ======================================== HOOKS */
  const { colors, fonts } = useAppTheme();

  /* ======================================== QUERIES */
  const monthlyTransactionsQuery = useMonthlyTransactions();
  const monthlyTransactions = monthlyTransactionsQuery.data?.data ?? [];

  /* ======================================== TRANSFORMATIONS */
  const stats = [
    {
      label: "ongoing",
      color: colors.outline,
      data: monthlyTransactions?.[0],
    },
    {
      label: "completed",
      color: colors.primary,
      data: monthlyTransactions?.[1],
    },
  ];

  const dataset = stats.map((set) => ({
    data: set.data,
    color: set.color,
    startFillColor: parseRgbToRgba(set.color, 0.5),
    endFillColor: parseRgbToRgba(set.color, 1),
  }));

  const colorset = stats.map((set) => set.color);

  /* ======================================== RETURNS */
  if (monthlyTransactionsQuery.isLoading) {
    return <MonthlyTransactionsChartSkeleton />;
  }

  return (
    <Card style={{ backgroundColor: colors.surface }}>
      <Card.Content style={styles.container}>
        <Text variant="bodyLarge" style={styles.title}>
          This month's transactions
        </Text>

        <View>
          <Text variant="bodyMedium" style={{ color: colors.outline, marginBottom: 4 }}>
            Transactions
          </Text>
          <LineChart
            dataSet={dataset}
            maxValue={getDatasetMaxValue(dataset)}
            width={chartDimensions.width}
            height={chartDimensions.height}
            yAxisExtraHeight={tooltipDimensions.height}
            showFractionalValues={false}
            areaChart
            adjustToWidth
            isAnimated
            animateOnDataChange
            disableScroll
            hideDataPoints
            initialSpacing={0}
            thickness={0}
            startOpacity={0.9}
            endOpacity={0.2}
            noOfSections={4}
            rulesType="dashed"
            dashWidth={4}
            dashGap={4}
            xAxisLabelsHeight={0}
            xAxisThickness={1}
            yAxisThickness={1}
            rulesColor={colors.outlineVariant}
            xAxisColor={colors.outlineVariant}
            yAxisColor={colors.outlineVariant}
            yAxisTextStyle={{ color: colors.outline }}
            xAxisLabelTextStyle={{ color: colors.outline }}
            pointerConfig={{
              autoAdjustPointerLabelPosition: false,
              radius: 4,
              pointerStripWidth: 1,
              pointerStripHeight: 8 + chartDimensions.height,
              pointerLabelWidth: tooltipDimensions.width,
              pointerLabelHeight: tooltipDimensions.height,
              strokeDashArray: [4, 4],
              pointerStripColor: colors.outlineVariant,
              pointerColorsForDataSet: colorset,
              pointerLabelComponent: (items: StatsData[], secondaryDataItem: any, pointerIndex: number) => (
                <MonthlyTransactionsTooltip dataset={dataset} items={items} pointerIndex={pointerIndex} />
              ),
            }}
          />
        </View>

        <View style={styles.legendContainer}>
          {stats.map((item: any, index: number) => (
            <View key={index} style={styles.legend}>
              <View
                style={{
                  borderRadius: 50,
                  backgroundColor: item.color,
                  width: fonts.labelSmall.fontSize,
                  height: fonts.labelSmall.fontSize,
                }}
              />
              <Text>{formatSentenceCase(item.label)}</Text>
            </View>
          ))}
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 32,
  },
  title: {
    textAlign: "center",
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  legend: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
});
