import React from "react";
import { View } from "react-native";

type Props = {
  x?: number;
  y?: number;
  flex?: number;
};

export const Spacer: React.FC<Props> = ({ x, y, flex }) => {
  return <View style={{ width: x, height: y, flex: flex }}></View>;
};
