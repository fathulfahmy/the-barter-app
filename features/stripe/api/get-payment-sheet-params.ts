import { z } from "zod";

import { api } from "@/lib/axios";
import { PaymentSheetParams } from "@/types/api";

/* ======================================== VALIDATION */
export const paymentSheetParamsInputSchema = z.object({
  amount: z.coerce.number().min(1).max(99999999.99),
});

export type PaymentSheetParamsInput = z.infer<typeof paymentSheetParamsInputSchema>;

/* ======================================== AXIOS */
export const getPaymentSheetParams = ({
  data,
}: {
  data: PaymentSheetParamsInput;
}): Promise<{ data: PaymentSheetParams }> => {
  return api.post(`/stripe/payment_sheet`, data);
};
