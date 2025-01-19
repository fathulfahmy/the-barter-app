import { Dimensions } from "react-native";

export const chartDimensions = {
  width: 0.72 * Dimensions.get("window").width,
  height: 0.2 * Dimensions.get("window").height,
};

export const barDimensions = {
  bar: 0.1 * Dimensions.get("window").width,
  spacing: 0.04 * Dimensions.get("window").width,
};

export const tooltipDimensions = {
  width: 120,
  height: 120,
  offset: 24,
};

export const createFakeStatsData = (count: number, minValue: number, maxValue: number) => {
  return Array.from({ length: count }, () => ({
    value: Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue,
  }));
};

export const getDatasetMaxValue = (dataset: any) => {
  return Math.max(...dataset.flatMap((set: any) => set.data.map((item: any) => item.value)));
};

export const getDataMaxValue = (data: any) => {
  return Math.max(...data.map((item: any) => item.value));
};
