export interface FragranceNote {
  name: string;
  type: 'top' | 'heart' | 'base';
}

export interface Fragrance {
  id: string;
  name: string;
  number: string;
  subtitle: string;
  family: 'Woody' | 'Fresh' | 'Amber' | 'Oud' | 'Signature';
  description: string;
  story: string;
  size: string;
  price: number;
  originalPrice?: number;
  inStock: boolean;
  isLimitedEdition?: boolean;
  isSignature?: boolean;
  badge?: string;
  rating: number;
  reviewsCount: number;
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  longevity: string;
  sillage: string;
  concentration: string;
  bottleStyle: 'statesman' | 'imperial' | 'midnight' | 'heritage' | 'crystal_decanter' | 'fluted_column';
  liquidTint: string;
}

export interface CartItem {
  fragrance: Fragrance;
  size: string;
  quantity: number;
  unitPrice: number;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
}

export interface OrderItem {
  id: string;
  fragranceName: string;
  number: string;
  size: string;
  quantity: number;
  price: number;
}

export interface CustomerOrder {
  id: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: 'Processing' | 'Dispatched' | 'Delivered';
  trackingNumber: string;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
}

export interface UserAccount {
  name: string;
  email: string;
  phone: string;
  savedAddresses: ShippingAddress[];
  orders: CustomerOrder[];
}
