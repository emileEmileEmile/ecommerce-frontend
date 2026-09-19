import { useState, useEffect } from 'react';
import { getMyOrders } from '../services/orderService';
import type { Order } from '../types/product';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getMyOrders();
        setOrders(data);
      } catch (err) {
        setError('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Your Orders</h1>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} style={{ border: '1px solid #ccc', margin: '1rem 0', padding: '1rem' }}>
            <p>Order #{order.id} — {order.status} — R{order.total}</p>
            <p>{new Date(order.createdAt).toLocaleString()}</p>
            <ul>
              {order.items.map((item) => (
                <li key={item.id}>
                  {item.product.name} x{item.quantity} — R{item.price} each
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}