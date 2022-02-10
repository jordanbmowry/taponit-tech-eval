// hooks
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useFetch } from './hooks/useFetch';
// components
import Header from './components/Header';
import Loader from './components/Loader';
import ProductsList from './components/ProductsList';
import ProductView from './components/ProductView';

function App() {
  const [products, setProducts] = useState([]);
  const { get, loading, error } = useFetch();

  useEffect(() => {
    const controller = new AbortController();
    const fetchProducts = async () => {
      try {
        const { data } = await get('/products', controller);
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
    return () => controller.abort();
  }, []);

  return (
    <Router>
      <div className='app'>
        {products && <Header products={products} />}
        <Switch>
          <Route exact path='/'>
            {loading && <Loader />}
            {!loading && <ProductsList products={products} />}
          </Route>
          <Route path='/:product_id'>
            <ProductView setProducts={setProducts} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
