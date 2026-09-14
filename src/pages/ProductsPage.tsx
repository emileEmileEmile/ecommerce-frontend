import { useState, useEffect } from 'react';
import { getAllProducts } from '../services/productService';
import type { Product } from '../types/product';

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const data = await getAllProducts();
          setProducts(data);

        } catch (err) {
          setError('Failed to load products')

        } finally {
          setLoading(false);
        }
      };
      fetchProducts();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
      <div>
        <h1>Products</h1>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <strong>{product.name}</strong> - R{product.price} ({product.stock} in stock)
            </li>
          ))}
        </ul>
      </div>

    );




  }