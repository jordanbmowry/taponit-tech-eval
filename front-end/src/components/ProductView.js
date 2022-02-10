import styles from './ProductView.module.css';
// hooks
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
// components
import Product from './Product';
import Loader from './Loader';

export default function ProductView(props) {
  const { product_id } = useParams();
  const { get, loading, error } = useFetch();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const controller = new AbortController();
    const fetchProducts = async () => {
      try {
        const data = await get(`/products/${product_id}`, controller);
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
    return () => controller.abort();
  }, [product_id]);

  return (
    <div className={styles['product-view']}>
      {loading && <Loader />}
      {!loading && (
        <Product
          product={product}
          setProduct={setProduct}
          showLikeButton={true}
          setProducts={props.setProducts}
        />
      )}
    </div>
  );
}
