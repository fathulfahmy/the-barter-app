import { default as dayjs } from "dayjs";

import { BarterInvoice, BarterService } from "@/types/api";

export const formatDate = (date: number) => dayjs(date).format("D MMMM, YYYY h:mm A");

export const formatAvatarName = (name: string | null | undefined) => {
  if (!name) {
    return "TBA";
  }

  const parts = name.trim().split(/\s+/);

  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }

  return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
};

export const formatBarterInvoiceItems = (barterInvoice: BarterInvoice | null | undefined) => {
  const amount = barterInvoice?.amount?.toFixed(2);
  const services = barterInvoice?.exchanged_services?.join(", ");

  if (amount && services) {
    return `RM${amount} and ${services}`;
  } else if (amount) {
    return `RM${amount}`;
  } else if (services) {
    return services;
  } else {
    return "RM0.00";
  }
};

export const formatBarterServicePrice = (barterService: BarterService | null | undefined) => {
  const minPrice = barterService?.min_price?.toFixed(2) ?? "0.00";
  const maxPrice = barterService?.max_price?.toFixed(2) ?? "0.00";
  const priceUnit = barterService?.price_unit ?? "unit";
  return `RM${minPrice} - RM${maxPrice} per ${priceUnit}`;
};

export const formatRating = (rating: number | null | undefined) => {
  return rating?.toFixed(1) ?? 0.0;
};
