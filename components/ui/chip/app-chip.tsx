import { StyleSheet } from "react-native";
import { Chip, ChipProps } from "react-native-paper";

export const AppChip: React.FC<ChipProps> = ({ children, style }) => {
  const chipStyle = [styles.chip, style];

  return (
    <Chip compact style={chipStyle}>
      {children}
    </Chip>
  );
};

const styles = StyleSheet.create({
  chip: {
    alignSelf: "flex-start",
  },
});
