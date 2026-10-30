export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  comparePrice?: number;
  category: string;
  rating: number;
  reviewCount: number;
  stock: number;
  isFeatured?: boolean;
  material: string;
  warranty: string;
  colors: string[];
  images: string[];
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: 'admin' | 'customer';
  avatarUrl?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    country: string;
    phone: string;
  };
  paymentMethod: string;
  totalAmount: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentStatus: 'Paid' | 'Unpaid';
  trackingNumber: string;
  createdAt: string;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}
