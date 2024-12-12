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
  id: string;
  name: string;
  email: string;
  email_verified_at: Date | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  barter_services?: Service[];
};

export type Category = {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
};

export type ServiceStatus = "enabled" | "disabled";

export type ServicePivot = {
  barter_invoice_id: string;
  barter_service_id: string;
};

export type Service = {
  id: string;
  barter_provider_id: string;
  barter_category_id: string;
  title: string;
  description: string;
  min_price: number;
  max_price: number;
  price_unit: string;
  rating: number;
  status: ServiceStatus;
  created_at: Date;
  updated_at: Date;
  pending_count: number;
  completed_count: number;
  barter_provider?: User | null;
  barter_category?: Category | null;
  pivot?: ServicePivot | null;
};

export type TransactionStatus = "pending" | "accepted" | "rejected" | "completed" | "cancelled";

export type Transaction = {
  id: string;
  barter_acquirer_id: string;
  barter_provider_id: string;
  barter_service_id: string;
  status: TransactionStatus;
  created_at: Date;
  updated_at: Date;
  barter_acquirer?: User | null;
  barter_provider?: User | null;
  barter_service?: Service | null;
  barter_invoice?: Invoice | null;
  barter_reviews?: Review[] | null;
};

export type InvoiceStatus = "pending" | "accepted" | "rejected" | "success" | "failed";

export type Invoice = {
  id: string;
  barter_acquirer_id: string;
  barter_transaction_id: string;
  amount?: number;
  status: InvoiceStatus;
  created_at: Date;
  updated_at: Date;
  exchanged_services: string[];
  barter_transaction?: Transaction | null;
  barter_services?: Service[] | null;
};

export type Review = {
  id: string;
  author_id: string;
  barter_service_id: string;
  barter_transaction_id: string;
  description: string;
  rating: number;
  created_at: Date;
  updated_at: Date;
  author?: User | null;
  barter_service?: Service | null;
  barter_transaction?: Transaction | null;
};
