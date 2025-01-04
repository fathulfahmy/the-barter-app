import React from "react";
import { StyleProp, View, ViewProps, ViewStyle } from "react-native";

type Props = ViewProps & {
  x?: number;
  y?: number;
  style?: StyleProp<ViewStyle>;
};

export const Spacer: React.FC<Props> = ({ x, y, style, ...props }) => {
  return <View {...props} style={[{ width: x, height: y }, style]}></View>;
};
