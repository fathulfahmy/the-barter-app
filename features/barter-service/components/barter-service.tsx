import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import { Link } from "expo-router";

import { LoadingStateScreen } from "@/components/screens";
import { AppChip, RatingChip } from "@/components/ui/chip";
import { useAppTheme } from "@/lib/react-native-paper";
import { formatBarterServicePrice } from "@/utils/format";

import { useBarterService } from "../api/get-barter-service";

export const BarterService = ({ barterServiceId }: { barterServiceId: string }) => {
  const { colors } = useAppTheme();

  const barterServiceQuery = useBarterService({ barterServiceId });

  if (barterServiceQuery.isLoading) {
    return <LoadingStateScreen />;
  }

  const barterService = barterServiceQuery.data?.data;

  if (!barterService) return null;

  return (
    <View style={styles.container}>
      <AppChip>{barterService.barter_category?.name}</AppChip>

      <Text variant="titleLarge">{barterService.title}</Text>
      <Text variant="bodyLarge">{barterService.description}</Text>
      <Text variant="bodyMedium" style={{ color: colors.secondary }}>
        {formatBarterServicePrice(barterService)}
      </Text>

      {barterService.completed_count > 0 && (
        <View style={styles.review}>
          <RatingChip rating={barterService?.rating} />
          <Link href={`/acquire/${barterService.id}/reviews`} asChild>
            <Text
              variant="bodyMedium"
              style={{ color: colors.yellow }}
            >{`View ${barterService.completed_count} fulfilled barters`}</Text>
          </Link>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  review: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
