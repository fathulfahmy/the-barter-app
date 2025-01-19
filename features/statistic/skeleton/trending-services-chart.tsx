import React from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
import { View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { Card, Text } from "react-native-paper";

import { useAppTheme } from "@/lib/react-native-paper";
import { barDimensions, chartDimensions } from "@/utils/chart";

export const TrendingServicesChartSkeleton = () => {
  const { colors } = useAppTheme();

  const data = [{ value: 5 }, { value: 8 }, { value: 10 }, { value: 6 }, { value: 3 }];

  return (
    <Card style={{ backgroundColor: colors.surface }}>
      <Card.Content style={{ gap: 32 }}>
        {/* ======================================== TITLE */}
        <Text variant="bodyLarge" style={{ textAlign: "center" }}>
          Trending services
        </Text>

        <View>
          {/* ======================================== Y AXIS LABEL */}
          <Text variant="bodyMedium" style={{ color: colors.outline, marginBottom: 4 }}>
            Transactions
          </Text>
          {/* ======================================== CHART */}
          <BarChart
            data={data}
            maxValue={10}
            width={chartDimensions.width}
            height={chartDimensions.height}
            initialSpacing={barDimensions.spacing}
            barWidth={barDimensions.bar}
            spacing={barDimensions.spacing}
            showFractionalValues={false}
            endSpacing={0}
            adjustToWidth
            isAnimated
            disableScroll
            disablePress
            noOfSections={4}
            rulesType="dashed"
            dashWidth={4}
            dashGap={4}
            xAxisThickness={1}
            yAxisThickness={1}
            xAxisLabelsHeight={0}
            yAxisExtraHeight={50}
            frontColor={colors.surfaceVariant}
            rulesColor={colors.outlineVariant}
            xAxisColor={colors.outlineVariant}
            yAxisColor={colors.outlineVariant}
            yAxisTextStyle={{ color: colors.outline }}
            xAxisLabelTextStyle={{ color: colors.outline }}
          />
        </View>

        {/* ======================================== LIST */}
        <ContentLoader
          width="100%"
          height={140}
          backgroundColor={colors.surfaceVariant}
          foregroundColor={colors.surface}
        >
          <Rect x="0" y="0" rx="4" ry="4" width="50%" height="20" />
          <Rect x="0" y="30" rx="4" ry="4" width="90%" height="20" />
          <Rect x="0" y="60" rx="4" ry="4" width="60%" height="20" />
          <Rect x="0" y="90" rx="4" ry="4" width="80%" height="20" />
          <Rect x="0" y="120" rx="4" ry="4" width="70%" height="20" />
        </ContentLoader>
      </Card.Content>
    </Card>
  );
};
