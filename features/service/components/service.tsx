import React from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import { router } from "expo-router";

import { Gallery, Spacer } from "@/components/ui";
import { AvatarWithName } from "@/components/ui/avatar";
import { AppChip, RatingChip } from "@/components/ui/chip";
import { useAppTheme } from "@/lib/react-native-paper";
import { formatServicePrice } from "@/utils/format";

import { useService } from "../api/get-service";
import { ServiceSkeleton } from "../skeleton/service";

export const Service = ({ barter_service_id }: { barter_service_id: string }) => {
  /* ======================================== HOOKS */
  const { colors } = useAppTheme();

  /* ======================================== QUERIES */
  const serviceQuery = useService({ barter_service_id });
  const service = serviceQuery.data?.data;

  /* ======================================== RETURNS */
  if (serviceQuery.isLoading) {
    return <ServiceSkeleton />;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <AppChip>{service?.barter_category?.name}</AppChip>

        <AvatarWithName user={service?.barter_provider} />

        <Text variant="titleLarge">{service?.title}</Text>
        <Text variant="bodyLarge">{service?.description}</Text>
        <Text variant="bodyLarge" style={{ color: colors.secondary }}>
          {formatServicePrice(service)}
        </Text>

        {service?.reviews_count && service.reviews_count > 0 ? (
          <Pressable onPress={() => router.push(`/acquire/${service?.id}/reviews`)}>
            <View style={styles.row}>
              <RatingChip rating={service?.rating} />

              <Spacer x={4} />

              <Text variant="bodyMedium" style={{ color: colors.onYellowContainer }}>
                {`(${service?.reviews_count})`}
              </Text>

              <Spacer x={8} />

              <Text variant="bodyMedium" style={{ color: colors.yellow }}>
                {`View all reviews`}
              </Text>
            </View>
          </Pressable>
        ) : null}
      </View>

      <Gallery contentContainerStyle={styles.gallery} uris={service?.images.map((image) => image.uri)} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  gallery: {
    paddingHorizontal: 16,
  },
});
