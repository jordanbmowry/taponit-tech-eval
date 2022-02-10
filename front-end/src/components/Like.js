import styles from './Like.module.css';
// SVGs
import LikeFilled from '../assets/favorite-filled.svg';
import LikeEmpty from '../assets/favorite-empty.svg';
// hooks
import { useState } from 'react';
import { useFetch } from '../hooks/useFetch';
// snackbar module

export default function Like(props) {
  const { created_at, updated_at, product_id, ...rest } = props.product;
  const [hasUserLikedProduct, setHasUserLikedProduct] = useState(() => {
    return localStorage.getItem(`liked-product-${product_id}`) || false;
  });

  const { put } = useFetch();

  const handleLikeClick = async () => {
    const controller = new AbortController();
    const body = { ...rest, likes: rest.likes + 1 };
    try {
      console.log({ body });
      const updatedProduct = await put(
        `/products/${product_id}`,
        body,
        controller
      );
      props.setProducts((prevProducts) => [
        ...prevProducts.filter(
          (product) => product.product_id !== updatedProduct.product_id
        ),
        updatedProduct,
      ]);
      props.setProduct((prevProduct) => ({
        ...prevProduct,
        likes: prevProduct.likes + 1,
      }));
      localStorage.setItem(`liked-product-${product_id}`, true);
      setHasUserLikedProduct(true);
    } catch (error) {
      console.error(error);
    } finally {
      controller.abort();
    }
  };

  const handleUnlikeClick = async () => {
    const controller = new AbortController();
    const body = { ...rest, likes: rest.likes - 1 };
    try {
      console.log({ body });
      const updatedProduct = await put(
        `/products/${product_id}`,
        body,
        controller
      );
      props.setProducts((prevProducts) => [
        ...prevProducts.filter(
          (product) => product.product_id !== updatedProduct.product_id
        ),
        updatedProduct,
      ]);
      localStorage.setItem(`liked-product-${product_id}`, false);
      props.setProduct((prevProduct) => ({
        ...prevProduct,
        likes: prevProduct.likes - 1,
      }));
      setHasUserLikedProduct(false);
    } catch (error) {
      console.error(error);
    } finally {
      controller.abort();
    }
  };

  return (
    <>
      {!hasUserLikedProduct && (
        <img
          className={styles.like}
          src={LikeFilled}
          alt='filled heart svg'
          onClick={handleLikeClick}
        />
      )}
      {hasUserLikedProduct && (
        <img
          className={styles.unlike}
          src={LikeEmpty}
          alt='empty heart svg'
          onClick={handleUnlikeClick}
        />
      )}
    </>
  );
}
