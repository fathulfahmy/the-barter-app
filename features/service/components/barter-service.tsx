import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import { Link } from "expo-router";

import { LoadingStateScreen } from "@/components/screens";
import { AppChip, RatingChip } from "@/components/ui/chip";
import { useAppTheme } from "@/lib/react-native-paper";
import { formatServicePrice } from "@/utils/format";

import { useService } from "../api/get-service";

export const Service = ({ barter_service_id }: { barter_service_id: string }) => {
  const { colors } = useAppTheme();

  const serviceQuery = useService({ barter_service_id });

  if (serviceQuery.isLoading) {
    return <LoadingStateScreen />;
  }

  const service = serviceQuery.data?.data;

  if (!service) return null;

  return (
    <View style={styles.container}>
      <AppChip>{service.barter_category?.name}</AppChip>

      <Text variant="titleLarge">{service.title}</Text>
      <Text variant="bodyLarge">{service.description}</Text>
      <Text variant="bodyMedium" style={{ color: colors.secondary }}>
        {formatServicePrice(service)}
      </Text>

      {service.completed_count > 0 && (
        <View style={styles.review}>
          <RatingChip rating={service?.rating} />
          <Link href={`/acquire/${service.id}/reviews`} asChild>
            <Text
              variant="bodyMedium"
              style={{ color: colors.yellow }}
            >{`View ${service.completed_count} fulfilled barters`}</Text>
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
