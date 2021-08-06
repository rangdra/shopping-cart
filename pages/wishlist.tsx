import Head from 'next/head';
import CardProduct from '../components/CardProduct';
import Header from '../components/Header';
import { useGlobalContext } from '../context/GlobalContext';
import { Product } from '../types';

const Wishlist = () => {
  const {
    state: { wishlist },
  } = useGlobalContext();
  return (
    <>
      <Head>
        <title>My Wishlist | Shopping Cart</title>
      </Head>
      <Header />
      <div className="container mt-4">
        <h2>My Wishlist</h2>
        <div className="row">
          {wishlist.length > 0 ? (
            wishlist.map((product: Product) => (
              <div className="mb-3 col-12 col-sm-6 col-md-4" key={product.id}>
                <CardProduct product={product} />
              </div>
            ))
          ) : (
            <div className="text-center alert alert-danger" role="alert">
              Produk kosong
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
