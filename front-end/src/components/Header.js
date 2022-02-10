import styles from './Header.module.css';
// components
import { NavLink } from 'react-router-dom';
import Hamburger from './Hamburger';
// hooks
import { useState } from 'react';

export default function Header({ products }) {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu((prevState) => !prevState);
  };

  return (
    <header className={styles.header}>
      <div className={styles.title}>
        <NavLink to='/'>TapOnIt Assessment</NavLink>
      </div>
      <nav>
        <ul>
          <li className={styles.home}>
            <NavLink to='/'>Home</NavLink>
          </li>
          {products.map((product) => (
            <li key={Math.random().toString(36).substring(2, 9)}>
              <NavLink to={`/${product.product_id}`}>{product.title}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <Hamburger products={products} />
    </header>
  );
}
