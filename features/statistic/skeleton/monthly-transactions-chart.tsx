import React from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
import { View } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { Card, Text } from "react-native-paper";

import { useAppTheme } from "@/lib/react-native-paper";
import { chartDimensions, createFakeStatsData, tooltipDimensions } from "@/utils/chart";

export const MonthlyTransactionsChartSkeleton = () => {
  const { colors } = useAppTheme();

  const dataset = [
    {
      data: createFakeStatsData(30, 1, 20),
      color: colors.surfaceVariant,
      startFillColor: colors.surfaceVariant,
      endFillColor: colors.surfaceVariant,
    },
    {
      data: createFakeStatsData(30, 1, 30),
      color: colors.surfaceVariant,
      startFillColor: colors.surfaceVariant,
      endFillColor: colors.surfaceVariant,
    },
  ];

  return (
    <Card style={{ backgroundColor: colors.surface }}>
      <Card.Content style={{ gap: 32 }}>
        {/* ======================================== TITLE */}
        <Text variant="bodyLarge" style={{ textAlign: "center" }}>
          This month's transactions
        </Text>

        <View>
          {/* ======================================== Y AXIS LABEL */}
          <Text variant="bodyMedium" style={{ color: colors.outline, marginBottom: 4 }}>
            Transactions
          </Text>
          {/* ======================================== CHART */}
          <LineChart
            dataSet={dataset}
            maxValue={30}
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
          />
        </View>

        {/* ======================================== LEGEND */}
        <View style={{ alignItems: "center" }}>
          <ContentLoader
            width="50%"
            height={20}
            backgroundColor={colors.surfaceVariant}
            foregroundColor={colors.surface}
          >
            <Rect x="0" y="0" rx="4" ry="4" width="100%" height="20" />
          </ContentLoader>
        </View>
      </Card.Content>
    </Card>
  );
};
