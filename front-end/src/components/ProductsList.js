import styles from './ProductsList.module.css';
// components
import Product from './Product';

export default function ProductsList(props) {
  return (
    <div className={styles.grid}>
      {props.products.map((product) => (
        <Product
          displayLink={true}
          product={product}
          key={product.product_id}
        />
      ))}
    </div>
  );
}
