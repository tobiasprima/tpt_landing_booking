export interface BusinessSettings {
  hero_title: string;
  hero_subtitle: string;
  hero_image_url: string;
  primary_cta_label: string;
  secondary_cta_label: string;
  about_text: string;
  booking_terms: string;
  currency: string;
  timezone: string;
  default_language: string;
  show_whatsapp_button: boolean;
  show_featured_items: boolean;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
}

export interface Business {
  id: string;
  name: string;
  slug: string;
  logo_url: string;
  theme_color: string;
  whatsapp_number: string;
  public_phone: string;
  public_email: string;
  address: string;
  short_description: string;
  description: string;
  settings: BusinessSettings;
  social_links: SocialLink[];
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  cover_image_url: string;
  short_description: string;
  description: string;
  price_amount: number;
  unit_label: string;
  supports_hourly: boolean;
  supports_half_day: boolean;
  supports_full_day: boolean;
  supports_multi_day: boolean;
}

export interface ServiceOptionValue {
  id: string;
  service_option_group_id: string;
  name: string;
  value_code: string;
  sort_order: number;
  is_active: boolean;
}

export interface ServiceOptionGroup {
  id: string;
  service_id: string;
  name: string;
  slug: string;
  display_type: "select" | "radio" | "swatch";
  sort_order: number;
  is_required: boolean;
  is_active: boolean;
  values?: ServiceOptionValue[];
}

export interface ServiceVariantOptionValue {
  service_option_group_id: string;
  service_option_value_id: string;
}

export interface ServiceVariant {
  id: string;
  service_id: string;
  name: string;
  sku: string;
  price_override_amount?: number | null;
  price_delta_amount: number;
  allotment_quantity: number;
  is_active: boolean;
  option_values?: ServiceVariantOptionValue[];
}

export interface ServicePackage {
  id: string;
  service_id: string;
  name: string;
  slug: string;
  pricing_strategy:
    | "base"
    | "fixed_price"
    | "multiplier"
    | "discount_percent"
    | "discount_amount";
  duration_mode: "hourly" | "half_day" | "full_day" | "custom";
  duration_minutes?: number | null;
  price_amount?: number | null;
  price_multiplier?: number | null;
  discount_percent?: number | null;
  discount_amount?: number | null;
  is_default: boolean;
  sort_order: number;
  is_active: boolean;
}

export interface ServiceVariantPackagePrice {
  id: string;
  service_id: string;
  service_variant_id: string;
  service_package_id: string;
  price_amount: number;
  compare_at_price_amount?: number | null;
  is_active: boolean;
}

export interface ServiceDetailResponse {
  service: Service;
  option_groups: ServiceOptionGroup[];
  variants: ServiceVariant[];
  packages: ServicePackage[];
  matrix_pricing: ServiceVariantPackagePrice[];
}

export interface SelectedOptionSnapshotInput {
  service_option_group_id: string;
  service_option_value_id: string;
  group_name: string;
  value_name: string;
}

export interface BookingInput {
  service_id: string;
  service_variant_id: string;
  service_package_id: string;
  quantity: number;
  selected_options_snapshot: SelectedOptionSnapshotInput[];
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  notes: string;
  requested_start_at: string;
  requested_end_at: string;
}

export interface AvailabilityResponse {
  available: boolean;
  available_unit_count: number;
  available_unit_ids?: string[];
  message: string;
}
