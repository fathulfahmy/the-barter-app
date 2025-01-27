import { default as dayjs } from "dayjs";

import { Invoice, Service } from "@/types/api";

/* ======================================== PARSE STRING TO TITLE CASE 
                                            example title case -> Example Title Case 
*/
export const formatTitleCase = (sentence: string): string => {
  if (!sentence) return "";
  const words = sentence.trim();

  return words
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

/* ======================================== PARSE STRING TO SENTENCE CASE
                                            example sentence case -> Example sentence case 
*/
export const formatSentenceCase = (sentence: string | undefined | null): string => {
  if (!sentence) return "";

  const cleaned = sentence.replace(/[-_]/g, " ").trim();

  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1).toLowerCase();
};

/* ======================================== REMOVE SUFFIX FROM A STRING 
                                            rejected -> reject
*/
export const formatStripSuffix = (word: string, suffix: string): string => {
  if (word.endsWith(suffix)) {
    return word.slice(0, -suffix.length);
  }
  return word;
};

/* ======================================== PARSE STRING TO ONE LINE SENTENCE WITH ELLIPSES
                                            example very long sentence -> example very long se...
 */
export const formatEllipses = (sentence: string | undefined | null, maxLength = 20): string => {
  if (!sentence || maxLength <= 0) return "";

  return sentence.length > maxLength ? `${sentence.slice(0, maxLength)}...` : sentence;
};

/* ======================================== PARSE NUMBER TO STRING WITH CURRENCY SYMBOL 
                                            1000 -> "RM1,000.00"
*/
export const formatCurrency = (amount: number | null | undefined): string => {
  if (!amount) return "RM0.00";

  if (isNaN(amount)) return "RM0.00";

  return `RM${amount.toLocaleString("ms-MY", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

/* ======================================== PARSE DATE/DATETIME TO DATE
                                            "2025-01-01" -> "01 Jan 2025"
*/
export const formatDate = (date: Date | null | undefined) => {
  if (!date) return null;
  return dayjs(date).format("DD MMM YYYY");
};

/* ======================================== PARSE DATE/DATETIME TO TIME
                                            "2025-01-01T14:30:00" -> "02:30 PM"
*/
export const formatTime = (date: Date | null | undefined) => {
  if (!date) return null;
  return dayjs(date).format("hh:mm A");
};

/* ======================================== PARSE DATE/DATETIME TO DATETIME
                                            "2025-01-01T14:30:00" -> "01 Jan 2025, 02:30 PM"
*/
export const formatDateTime = (date: Date | null | undefined) => {
  if (!date) return null;
  return dayjs(date).format("DD MMM YYYY, hh:mm A");
};

/* ======================================== PARSE NAME TO AVATAR LABEL
                                            "John Doe" -> "JD"
*/
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

/* ======================================== PARSE COLOR TO RGBA 
                                            RGB, HEX, HSL to RGBA 
*/
export const parseRgbToRgba = (color: string, alpha: number): string => {
  return color.replace("rgb", "rgba").replace(")", `, ${alpha})`);
};

export const parseHexToRgba = (color: string, alpha: number): string => {
  let hex = color.slice(1);

  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  if (hex.length === 6) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  if (hex.length === 8) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    const a = parseInt(hex.slice(6, 8), 16) / 255;
    return `rgba(${r}, ${g}, ${b}, ${a * alpha})`;
  }

  return `rgba(0, 0, 0, ${alpha})`;
};

export const parseHslToRgba = (color: string, alpha: number): string => {
  const isHsla = color.startsWith("hsla(");
  const value = color.slice(isHsla ? 5 : 4, -1);
  const [h, s, l] = value.split(",").map((value) => value.trim());

  const hue = parseInt(h, 10);
  // Parse 's' and 'l' (100% -> 255)
  const saturation = Math.round(parseFloat(s) * 2.55);
  const lightness = Math.round(parseFloat(l) * 2.55);

  return `rgba(${hue}, ${saturation}, ${lightness}, ${alpha})`;
};

export const parseRgba = (color: string, alpha: number): string => {
  if (!color) return `rgba(0, 0, 0, ${alpha})`;

  if (color.startsWith("rgb(")) {
    return parseRgbToRgba(color, alpha);
  }

  if (color.startsWith("#")) {
    return parseHexToRgba(color, alpha);
  }

  if (color.startsWith("hsl(") || color.startsWith("hsla(")) {
    return parseHslToRgba(color, alpha);
  }

  return `rgba(0, 0, 0, ${alpha})`;
};

/* ======================================== PARSE INVOICE TO INVOICE ITEMS STRING
                                            RM99.99, Example service 1, Example service 2
*/
export const formatInvoiceItems = (invoice: Invoice | null | undefined) => {
  const amount = invoice?.amount;
  const services = invoice?.barter_services?.map((service) => service.title).join(", ");

  if (amount && amount > 0 && services) {
    return `RM${amount.toFixed(2)} and ${services}`;
  } else if (amount && amount > 0) {
    return `RM${amount.toFixed(2)}`;
  } else if (services) {
    return services;
  } else {
    return "Free";
  }
};

/* ======================================== PARSE SERVICE TO SERVICE PRICE STRING
                                            RM11.11 - RM99.99 per unit
*/
export const formatServicePrice = (service: Service | null | undefined) => {
  const minPrice = formatCurrency(service?.min_price);
  const maxPrice = formatCurrency(service?.max_price);
  const priceUnit = service?.price_unit;
  return `${minPrice} - ${maxPrice} per ${priceUnit}`;
};

/* ======================================== PARSE NUMBER TO RATING
                                            4 -> 4.0
*/
export const formatRating = (rating: number | null | undefined) => {
  return rating?.toFixed(1) ?? 0.0;
};

/* ======================================== PARSE TRANSACTION ID TRANSACTION ID STRING 
                                            123 -> 0000000123 
*/
export const formatTransactionId = (transactionId: string | null | undefined) => {
  if (!transactionId) {
    return "0000000000";
  }

  return transactionId.padStart(10, "0");
};
