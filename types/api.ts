export type AuthResponse = {
  auth_token: string;
  chat_token: string;
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

export type Media = {
  uri: string;
  name: string | null;
  type: string | null;
};

export type User = {
  id: string;
  name: string;
  email: string;
  email_verified_at: Date | null;
  bank_name: string;
  bank_account_number: string;
  suspension_starts_at: Date | null;
  suspension_ends_at: Date | null;
  suspension_reason: string | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  avatar: Media | null;
  barter_services?: Service[];
  is_suspended_temporarily: boolean;
  is_suspended_permanently: boolean;
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
  deleted_at: Date | null;
  pending_count: number;
  completed_count: number;
  reviews_count: number;
  images: Media[];
  barter_provider?: User | null;
  barter_category?: Category | null;
  pivot?: ServicePivot | null;
};

export type TransactionStatus = "pending" | "accepted" | "rejected" | "awaiting_completed" | "completed" | "cancelled";

export type Transaction = {
  id: string;
  barter_acquirer_id: string;
  barter_provider_id: string;
  awaiting_user_id: string;
  barter_service_id: string;
  status: TransactionStatus;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  other_user: User;
  barter_acquirer?: User | null;
  barter_provider?: User | null;
  barter_service?: Service | null;
  barter_invoice?: Invoice | null;
  barter_reviews?: Review[] | null;
};

export type Invoice = {
  id: string;
  barter_acquirer_id: string;
  barter_transaction_id: string;
  amount?: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
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
  deleted_at: Date | null;
  author?: User | null;
  barter_service?: Service | null;
  barter_transaction?: Transaction | null;
};

export type PaymentSheetParams = {
  payment_intent: string;
  ephemeral_key: string;
  customer: string;
  publishable_key: string;
};

export type Reason = {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
};

export type ReportModelName = "user" | "barter_service" | "barter_transaction" | "barter_review";

export type ReportStatus = "unread" | "read";

export type Report = {
  id: string;
  author_id: string;
  user_report_reason_id: string;
  model_id: string;
  model_name: ReportModelName;
  status: ReportStatus;
  created_at: Date;
  updated_at: Date;
};

export type StatsData = {
  value: number;
  label: string;
};
