import { useState, useEffect } from 'react';
import { getAllProducts, createProduct, deleteProduct, updateProduct } from '../services/productService';
import type { Product, Category } from '../types/product';
import { getAllCategories } from '../services/categoryService';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [editingProductId, setEditingProductId] = useState<number | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      setError('Failed to load products');
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (err) {
      setError('Failed to load categories');
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      await fetchProducts();
      await fetchCategories();
      setLoading(false);
    };
    loadInitialData();
  }, []);

  const handleFormSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
  
    const productData = {
      name,
      description,
      price: Number(price),
      stock: Number(stock),
      categoryId: Number(categoryId),
    };
  
    try {
      if (editingProductId) {
        await updateProduct(editingProductId, productData);
      } else {
        await createProduct(productData);
      }
  
      setName('');
      setDescription('');
      setPrice('');
      setStock('');
      setCategoryId('');
      setEditingProductId(null);
  
      await fetchProducts();
    } catch (err) {
      setError(editingProductId ? 'Failed to update product' : 'Failed to create product');
    }
  };

  const handleDeleteProduct = async (id: number) => {
    setError('');
    try {
      await deleteProduct(id);
      await fetchProducts();
     
    } catch (err) {
      setError('Failed to delete product');
    }
  };

  const handleEditClick = (product: Product) => {
    setEditingProductId(product.id);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setStock(String(product.stock));
    setCategoryId(String(product.categoryId));

  };



  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Admin Products Page</h1>

      <h2>{editingProductId ? 'Update Product' : 'Create Product'}</h2>
      <form onSubmit={handleFormSubmit}>

        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>


        <div>
          <label>Description</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>


        <div>
          <label>Price</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>


        <div>
          <label>Stock</label>
          <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} required />
        </div>


        <div>
          <label>Category</label>
          <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>


        <button type="submit">{editingProductId ? 'Update Product' : 'Create Product'}</button>
      </form>


      <div>
        <h2>Products</h2>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <strong>{product.name}</strong> - R{product.price} ({product.stock} in stock)
              <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
              <button onClick={() => handleEditClick(product)}>edit</button>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}