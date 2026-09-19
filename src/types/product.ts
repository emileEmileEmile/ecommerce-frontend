export interface Category {
    id: number;
    name: string;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    stock: number;
    categoryId: number;
    createdAt: string;
    updatedAt: string;
}

export interface CreateProductInput {
    name: string;
    description: string;
    price: number;
    stock: number;
    categoryId: number;
}

export interface CartItem {
    id: number;
    quantity: number;
    productId: number;
    cartId: number;
    product: Product;
}

export interface Cart {
    id: number;
    userId: number;
    items: CartItem[];
}

export interface OrderItem {
    id: number;
    quantity: number;
    price: string;
    productId: number;
    product: Product;
  }
  
  export interface Order {
    id: number;
    status: string;
    total: string;
    createdAt: string;
    items: OrderItem[];
  }