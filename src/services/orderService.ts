import api from './api';
import type { Order } from '../types/product';

export const checkout = async (): Promise<Order> => {
  const response = await api.post<Order>('/orders/checkout');
  return response.data;
};

export const getMyOrders = async (): Promise<Order[]> => {
  const response = await api.get<Order[]>('/orders');
  return response.data;
};