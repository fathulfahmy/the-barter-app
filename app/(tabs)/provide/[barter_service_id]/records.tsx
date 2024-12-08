import { useCallback, useEffect } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { useFocusEffect, useLocalSearchParams } from "expo-router";

import { ScreenWrapper } from "@/components/screens";
import {
  getInfiniteBarterRecordsQueryOptions,
  useInfiniteBarterRecords,
} from "@/features/barter-record/api/get-barter-records";
import { BarterRecords } from "@/features/barter-record/components/barter-records";

const ProvideRecordsScreen = () => {
  const { barter_service_id } = useLocalSearchParams<{ barter_service_id: string }>();
  const queryClient = useQueryClient();
  const { refetch } = useInfiniteBarterRecords({ barterServiceId: barter_service_id });

  useEffect(() => {
    queryClient.prefetchInfiniteQuery(getInfiniteBarterRecordsQueryOptions(barter_service_id));
  }, [queryClient, barter_service_id]);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  return (
    <ScreenWrapper>
      <BarterRecords barterServiceId={barter_service_id} />
    </ScreenWrapper>
  );
};

export default ProvideRecordsScreen;
