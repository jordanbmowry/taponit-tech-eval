import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Hamburger.module.css';

export default function Hamburger({ products }) {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu((prevState) => !prevState);
  };

  return (
    <div
      className={`${styles.hamburger} ${showMenu ? styles.open : ''}`}
      onClick={toggleMenu}
    >
      <div className={styles.bar1}></div>
      <div className={styles.bar2}></div>
      <div className={styles.bar3}></div>
      <ul className={styles['mobile-menu']}>
        <li className={styles.home}>
          <NavLink to='/'>Home</NavLink>
        </li>
        {products.map((product) => (
          <li key={Math.random().toString(36).substring(2, 9)}>
            <NavLink to={`/${product.product_id}`}>{product.title}</NavLink>
          </li>
        ))}
        <li>
          Total likes:{' '}
          {products.reduce(
            (acc, curr) => acc + Number.parseInt(curr.likes, 10),
            0
          )}
        </li>
      </ul>
    </div>
  );
}
