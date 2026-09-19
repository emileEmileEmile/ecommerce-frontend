import { useState, useEffect } from 'react';
import { getCart, updateItemQuantity, removeItem } from '../services/cartService';
import type { Cart } from '../types/product';

export default function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCart = async () => {
    try {
      const data = await getCart();
      setCart(data);
    } catch (err) {
      setError('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleQuantityChange = async (productId: number, quantity: number) => {
    if (quantity < 1) return;
    await updateItemQuantity(productId, quantity);
    await fetchCart();
  };

  const handleRemove = async (productId: number) => {
    await removeItem(productId);
    await fetchCart();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!cart) return <p>No cart found</p>;

  const total = cart.items.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0
  );

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.items.map((item) => (
              <li key={item.id}>
                <strong>{item.product.name}</strong> - R{item.product.price} each
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.productId, Number(e.target.value))}
                />
                <button onClick={() => handleRemove(item.productId)}>Remove</button>
              </li>
            ))}
          </ul>
          <h3>Total: R{total.toFixed(2)}</h3>
        </>
      )}
    </div>
  );
}