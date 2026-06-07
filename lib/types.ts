export interface WCImage {
  id: number;
  src: string;
  name: string;
  alt: string;
}

export interface WCAttribute {
  id: number;
  name: string;
  slug: string;
  position: number;
  visible: boolean;
  variation: boolean;
  options: string[];
}

export interface WCCategory {
  id: number;
  name: string;
  slug: string;
  parent: number;
  count: number;
  image: WCImage | null;
}

export interface WCVariation {
  id: number;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  purchasable: boolean;
  stock_status: "instock" | "outofstock" | "onbackorder";
  stock_quantity: number | null;
  attributes: Array<{
    id: number;
    name: string;
    slug: string;
    option: string;
  }>;
  image: WCImage | null;
  sku: string;
}

export interface WCProduct {
  id: number;
  name: string;
  slug: string;
  type: "simple" | "variable" | "grouped" | "external";
  status: "publish" | "draft" | "pending" | "private";
  featured: boolean;
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  purchasable: boolean;
  stock_status: "instock" | "outofstock" | "onbackorder";
  stock_quantity: number | null;
  images: WCImage[];
  attributes: WCAttribute[];
  variations: number[];
  categories: Array<{ id: number; name: string; slug: string }>;
  price_html: string;
  related_ids: number[];
  average_rating: string;
  rating_count: number;
}

export interface WCOrderPayload {
  payment_method: "paypal";
  payment_method_title: string;
  set_paid: boolean;
  billing: WCBillingAddress;
  shipping: WCBillingAddress;
  line_items: Array<{
    product_id: number;
    variation_id?: number;
    quantity: number;
  }>;
}

export interface WCBillingAddress {
  first_name: string;
  last_name: string;
  address_1: string;
  city: string;
  postcode: string;
  country: string;
  email: string;
  phone: string;
}

export interface CartItem {
  id: number;
  variationId?: number;
  name: string;
  slug: string;
  price: number;
  quantity: number;
  image: string;
  color?: string;
  sku?: string;
}
