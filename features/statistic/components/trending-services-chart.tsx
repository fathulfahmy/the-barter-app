import React from "react";
import { StyleSheet, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { Card, Text } from "react-native-paper";

import { useIsFocused } from "@react-navigation/native";

import { useAppTheme } from "@/lib/react-native-paper";
import { barDimensions, chartDimensions, getDataMaxValue } from "@/utils/chart";
import { parseRgbToRgba } from "@/utils/format";

import { useTrendingServices } from "../api/get-trending-services";
import { TrendingServicesChartSkeleton } from "../skeleton/trending-services-chart";

export const TrendingServicesChart = () => {
  /* ======================================== HOOKS */
  const { colors } = useAppTheme();
  const isFocused = useIsFocused();

  /* ======================================== QUERIES */
  const trendingServicesQuery = useTrendingServices({
    queryConfig: {
      refetchInterval: isFocused ? 3000 : false,
    },
  });
  const trendingServices = trendingServicesQuery.data?.data ?? [];

  /* ======================================== RETURNS */
  if (trendingServicesQuery.isLoading) {
    return <TrendingServicesChartSkeleton />;
  }

  return (
    <Card style={{ backgroundColor: colors.surface }}>
      <Card.Content style={styles.container}>
        <Text variant="bodyLarge" style={styles.title}>
          Trending services
        </Text>

        <View>
          <Text variant="bodyMedium" style={{ color: colors.outline, marginBottom: 4 }}>
            Transactions
          </Text>
          <BarChart
            data={trendingServices}
            maxValue={getDataMaxValue(trendingServices)}
            width={chartDimensions.width}
            height={chartDimensions.height}
            initialSpacing={barDimensions.spacing}
            barWidth={barDimensions.bar}
            spacing={barDimensions.spacing}
            showFractionalValues={false}
            endSpacing={0}
            adjustToWidth
            isAnimated
            showGradient
            showValuesAsTopLabel
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
            frontColor={parseRgbToRgba(colors.primary, 0.5)}
            gradientColor={parseRgbToRgba(colors.primary, 1)}
            rulesColor={colors.outlineVariant}
            xAxisColor={colors.outlineVariant}
            yAxisColor={colors.outlineVariant}
            yAxisTextStyle={{ color: colors.outline }}
            xAxisLabelTextStyle={{ color: colors.outline }}
            topLabelTextStyle={{ color: colors.primary }}
            topColor={colors.primary}
          />
        </View>
        <View style={styles.list}>
          {trendingServices.map((item: any, index: number) => (
            <Text key={index} variant="bodyMedium">
              {index + 1}. {item.label}
            </Text>
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
  list: {
    gap: 8,
  },
});
