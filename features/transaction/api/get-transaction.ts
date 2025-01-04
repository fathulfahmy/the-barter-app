import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { Transaction } from "@/types/api";

/* ======================================== AXIOS */
export const getTransaction = ({
  barter_transaction_id,
}: {
  barter_transaction_id: string;
}): Promise<{ data: Transaction }> => {
  return api.get(`/barter_transactions/${barter_transaction_id}`);
};

/* ======================================== REACT QUERY */
export const getTransactionQueryOptions = (barter_transaction_id: string) => {
  return queryOptions({
    queryKey: ["transaction", barter_transaction_id],
    queryFn: () => getTransaction({ barter_transaction_id }),
  });
};

/* ======================================== HOOK */
type UseTransactionOptions = {
  barter_transaction_id: string;
  queryConfig?: QueryConfig<typeof getTransactionQueryOptions>;
};

export const useTransaction = ({ barter_transaction_id, queryConfig }: UseTransactionOptions) => {
  return useQuery({
    ...getTransactionQueryOptions(barter_transaction_id),
    ...queryConfig,
  });
};
