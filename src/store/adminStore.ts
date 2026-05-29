import { create } from 'zustand';
import { products, reviews, type Product, type Review } from '../data/products';

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: { productId: string; name: string; quantity: number; price: number }[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  address: string;
  phone: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  totalSpent: number;
  joinDate: string;
  status: 'active' | 'inactive';
}

export interface Coupon {
  id: string;
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  minOrder: number;
  expiryDate: string;
  usageCount: number;
  maxUsage: number;
  active: boolean;
}

interface AdminState {
  products: Product[];
  orders: Order[];
  customers: Customer[];
  reviews: Review[];
  coupons: Coupon[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, data: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  addCoupon: (coupon: Coupon) => void;
  deleteCoupon: (id: string) => void;
  updateReview: (id: string, data: Partial<Review>) => void;
  deleteReview: (id: string) => void;
}

const initialOrders: Order[] = [
  {
    id: 'ORD-2024-001',
    customerName: 'Sarah Mitchell',
    customerEmail: 'user@example.com',
    items: [
      { productId: 'lm-001', name: 'Aura Halo LED Mirror', quantity: 1, price: 8500 },
      { productId: 'ml-001', name: 'Zellige Brass Table Lamp', quantity: 2, price: 4600 },
    ],
    total: 17700,
    status: 'delivered',
    date: '2024-12-15',
    address: '123 Luxury Lane, Casablanca, Morocco 20000',
    phone: '+212 612 345 678',
  },
  {
    id: 'ORD-2024-002',
    customerName: 'James Cooper',
    customerEmail: 'james@email.com',
    items: [
      { productId: 'mm-002', name: 'Modern Beni Ourain Rug', quantity: 1, price: 13000 },
    ],
    total: 13000,
    status: 'shipped',
    date: '2024-12-18',
    address: '45 Avenue Hassan II, Rabat, Morocco 10000',
    phone: '+212 623 456 789',
  },
  {
    id: 'ORD-2024-003',
    customerName: 'Amina Hassan',
    customerEmail: 'amina@email.com',
    items: [
      { productId: 'br-001', name: 'Silk Bedding Set - Ivory', quantity: 1, price: 8500 },
      { productId: 'br-004', name: 'Scented Candle Collection', quantity: 2, price: 1600 },
    ],
    total: 11700,
    status: 'processing',
    date: '2024-12-20',
    address: '78 Rue Mohammed V, Marrakech, Morocco 40000',
    phone: '+212 634 567 890',
  },
  {
    id: 'ORD-2024-004',
    customerName: 'David Laurent',
    customerEmail: 'david@email.com',
    items: [
      { productId: 'ml-005', name: 'Marrakech Chandelier', quantity: 1, price: 19000 },
      { productId: 'wd-001', name: 'Geometric Metal Wall Art', quantity: 1, price: 4000 },
    ],
    total: 23000,
    status: 'pending',
    date: '2024-12-21',
    address: '12 Boulevard Anfa, Casablanca, Morocco 20000',
    phone: '+212 645 678 901',
  },
  {
    id: 'ORD-2024-005',
    customerName: 'Emma Wilson',
    customerEmail: 'emma@email.com',
    items: [
      { productId: 'lr-001', name: 'Imperial Gold Tray Set', quantity: 1, price: 2900 },
      { productId: 'mm-003', name: 'Brass Tea Set', quantity: 1, price: 4600 },
      { productId: 'mm-001', name: 'Zellige Tile Coasters', quantity: 2, price: 900 },
    ],
    total: 9300,
    status: 'delivered',
    date: '2024-12-10',
    address: '33 Rue de la Liberté, Tangier, Morocco 90000',
    phone: '+212 656 789 012',
  },
];

const initialCustomers: Customer[] = [
  { id: 'cust-1', name: 'Sarah Mitchell', email: 'user@example.com', phone: '+212 612 345 678', orders: 3, totalSpent: 28460, joinDate: '2024-01-15', status: 'active' },
  { id: 'cust-2', name: 'James Cooper', email: 'james@email.com', phone: '+212 623 456 789', orders: 2, totalSpent: 18980, joinDate: '2024-03-22', status: 'active' },
  { id: 'cust-3', name: 'Amina Hassan', email: 'amina@email.com', phone: '+212 634 567 890', orders: 5, totalSpent: 42340, joinDate: '2024-02-10', status: 'active' },
  { id: 'cust-4', name: 'David Laurent', email: 'david@email.com', phone: '+212 645 678 901', orders: 1, totalSpent: 22980, joinDate: '2024-06-05', status: 'active' },
  { id: 'cust-5', name: 'Emma Wilson', email: 'emma@email.com', phone: '+212 656 789 012', orders: 4, totalSpent: 31560, joinDate: '2024-04-18', status: 'active' },
  { id: 'cust-6', name: 'Omar Farouk', email: 'omar@email.com', phone: '+212 667 890 123', orders: 2, totalSpent: 15670, joinDate: '2024-05-30', status: 'inactive' },
];

const initialCoupons: Coupon[] = [
  { id: 'cp-1', code: 'WELCOME20', discount: 20, type: 'percentage', minOrder: 200, expiryDate: '2025-06-30', usageCount: 45, maxUsage: 100, active: true },
  { id: 'cp-2', code: 'LUXURY50', discount: 50, type: 'fixed', minOrder: 500, expiryDate: '2025-03-31', usageCount: 12, maxUsage: 50, active: true },
  { id: 'cp-3', code: 'GOLD15', discount: 15, type: 'percentage', minOrder: 150, expiryDate: '2025-01-31', usageCount: 89, maxUsage: 100, active: true },
  { id: 'cp-4', code: 'HOLIDAY25', discount: 25, type: 'percentage', minOrder: 300, expiryDate: '2024-12-31', usageCount: 156, maxUsage: 200, active: false },
];

export const useAdminStore = create<AdminState>()((set, get) => ({
  products: [...products],
  orders: initialOrders,
  customers: initialCustomers,
  reviews: [...reviews],
  coupons: initialCoupons,
  addProduct: (product) => set({ products: [...get().products, product] }),
  updateProduct: (id, data) =>
    set({
      products: get().products.map(p => (p.id === id ? { ...p, ...data } : p)),
    }),
  deleteProduct: (id) =>
    set({ products: get().products.filter(p => p.id !== id) }),
  updateOrderStatus: (id, status) =>
    set({
      orders: get().orders.map(o => (o.id === id ? { ...o, status } : o)),
    }),
  addCoupon: (coupon) => set({ coupons: [...get().coupons, coupon] }),
  deleteCoupon: (id) =>
    set({ coupons: get().coupons.filter(c => c.id !== id) }),
  updateReview: (id, data) =>
    set({
      reviews: get().reviews.map(r => (r.id === id ? { ...r, ...data } : r)),
    }),
  deleteReview: (id) =>
    set({ reviews: get().reviews.filter(r => r.id !== id) }),
}));
