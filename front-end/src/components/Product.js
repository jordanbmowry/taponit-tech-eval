import styles from './Product.module.css';
import { Link } from 'react-router-dom';
//components
import Like from './Like';

export default function Product(props) {
  const { title, description, product_image, price, product_id, likes } =
    props.product;

  return (
    <div className={styles.product}>
      <h2 className={styles.title}>{title}</h2>

      <img className={styles.img} src={product_image} alt={title} />

      <p className={styles.description}>{description}</p>
      <div className={styles.container}>
        <p>Likes: {likes}</p>
        <p className={styles.price}>Price: ${price}</p>
        {props.displayLink && (
          <Link className={styles.link} to={`/${product_id}`}>
            See {title}
          </Link>
        )}
        {props.showLikeButton && (
          <Like
            setProduct={props.setProduct}
            setProducts={props.setProducts}
            product={props.product}
          />
        )}
      </div>
    </div>
  );
}
