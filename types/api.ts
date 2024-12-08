export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T[];
  error?: string[];
};

export type AuthResponse = {
  token: string;
  token_type: string;
  user: User;
};

export type PaginatorLink = {
  url: string | null;
  label: string;
  active: boolean;
};

export type Paginator<T> = {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  links: PaginatorLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
};

export type User = {
  id: number;
  name: string;
  email: string;
  email_verified_at: Date | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  barter_services?: BarterService[];
};

export type BarterCategory = {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
};

export type BarterServiceStatus = "enabled" | "disabled";

export type BarterServicePivot = {
  barter_invoice_id: number;
  barter_service_id: number;
};

export type BarterService = {
  id: number;
  barter_provider_id: number;
  barter_category_id: number;
  title: string;
  description: string;
  min_price: number;
  max_price: number;
  price_unit: string;
  rating: number;
  status: BarterServiceStatus;
  created_at: Date;
  updated_at: Date;
  pending_count: number;
  completed_count: number;
  barter_provider?: User | null;
  barter_category?: BarterCategory | null;
  pivot?: BarterServicePivot | null;
};

export type BarterTransactionStatus = "pending" | "accepted" | "rejected" | "completed" | "cancelled";

export type BarterTransaction = {
  id: number;
  barter_acquirer_id: number;
  barter_provider_id: number;
  barter_service_id: number;
  amount: number;
  status: BarterTransactionStatus;
  created_at: Date;
  updated_at: Date;
  barter_acquirer?: User | null;
  barter_service?: BarterService | null;
  barter_invoice?: BarterInvoice | null;
};

export type BarterInvoiceStatus = "pending" | "accepted" | "rejected" | "success" | "failed";

export type BarterInvoice = {
  id: number;
  barter_acquirer_id: number;
  barter_transaction_id: number;
  amount?: number;
  status: BarterInvoiceStatus;
  created_at: Date;
  updated_at: Date;
  exchanged_services: string[];
  barter_transaction?: BarterTransaction | null;
  barter_services?: BarterService[] | null;
};

export type BarterReview = {
  id: number;
  author_id: number;
  barter_service_id: number;
  barter_transaction_id: number;
  description: string;
  rating: number;
  created_at: Date;
  updated_at: Date;
  author?: User | null;
  barter_service?: BarterService | null;
  barter_transaction?: BarterTransaction | null;
};
