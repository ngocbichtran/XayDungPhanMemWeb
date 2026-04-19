export interface ProductAdmin {
  id: number;
  category_id: number;
  name: string;
  price: string | number;
  sale_price: string | number;
  quantity: number;
  image: string;
  description: string;
  status: number;
  category_name?: string;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface ProductClient {
  id: number;
  category_id: number;
  name: string;
  price: string | number;
  sale_price: string | number;
  quantity: number;
  image: string;
  description: string;
}

export interface User {
  id: number;
  full_name: string;
  email: string;
  roles: string[];
  avatar?: string | null;
}
