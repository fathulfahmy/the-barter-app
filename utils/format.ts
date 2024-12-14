import { default as dayjs } from "dayjs";
import { ImagePickerAsset } from "expo-image-picker";

import { Invoice, Service } from "@/types/api";

export const formatTitleCase = (sentence: string): string => {
  if (!sentence) return "";
  const words = sentence.trim();

  return words
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const formatSentenceCase = (title: string): string => {
  if (!title) return "";
  const words = title.trim();

  return words.charAt(0).toUpperCase() + words.slice(1).toLowerCase();
};

export const formatStripSuffix = (word: string, suffix: string): string => {
  if (word.endsWith(suffix)) {
    return word.slice(0, -suffix.length);
  }
  return word;
};

export const formatMaskSensitiveData = (sensitiveData: string): string => {
  return sensitiveData.replace(/.(?=.{4})/g, "*");
};

export const formatDateTime = (date: number) => dayjs(date).format("D MMMM, YYYY h:mm A");

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

export const formatInvoiceItems = (invoice: Invoice | null | undefined) => {
  const amount = invoice?.amount?.toFixed(2);
  const services = invoice?.exchanged_services?.join(", ");

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

export const formatServicePrice = (service: Service | null | undefined) => {
  const minPrice = service?.min_price?.toFixed(2) ?? "0.00";
  const maxPrice = service?.max_price?.toFixed(2) ?? "0.00";
  const priceUnit = service?.price_unit ?? "unit";
  return `RM${minPrice} - RM${maxPrice} per ${priceUnit}`;
};

export const formatRating = (rating: number | null | undefined) => {
  return rating?.toFixed(1) ?? 0.0;
};

export const formatImagePickerBase64 = (asset: ImagePickerAsset) => {
  return `data:image/${asset.mimeType};base64,${asset.base64}`;
};
