import api from "./api";
import type { Cart, CartItem } from "../types/product";

export const getCart = async (): Promise<Cart> => {
    const response = await api.get<Cart>('/cart');
    return response.data;
};

export const addItem = async (productId: number, quantity: number): Promise<CartItem> => {
    const response = await api.post<CartItem>('/cart/items', { productId, quantity });
    return response.data;
};

export const updateItemQuantity = async (productId: number, quantity: number): Promise<CartItem> => {
    const response = await api.patch<CartItem>(`/cart/items/${productId}`, { quantity });
    return response.data;
};

export const removeItem = async (productId: number): Promise<CartItem> => {
    const response = await api.delete<CartItem>(`/cart/items/${productId}`);
    return response.data;
};