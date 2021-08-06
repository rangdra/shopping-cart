import Head from 'next/head';
import { useRef } from 'react';

import Header from '../components/Header';
import CardProduct from '../components/CardProduct';
import { useGlobalContext } from '../context/GlobalContext';
import Filters from '../components/Filters';

export default function Home() {
  const {
    state: { products },
    filterState: { byStock, byFastDelivery, sort, byRating, searchQuery },
    filterDispatch,
  } = useGlobalContext();

  const refShowProduct = useRef<HTMLDivElement | null>(null);

  const transformProducts = () => {
    let sortedProducts = products;

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === 'termurahKeTermahal' ? a.price - b.price : b.price - a.price
      );
    }

    if (!byStock) {
      sortedProducts = sortedProducts.filter((product) => product.inStock);
    }

    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((product) => product.fastDelivery);
    }

    if (byRating) {
      sortedProducts = sortedProducts.filter(
        (product) => product.ratings >= byRating
      );
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery)
      );
    }
    return sortedProducts;
  };
  return (
    <>
      <Head>
        <title>Shopping Cart</title>
      </Head>
      <Header refShowProduct={refShowProduct} />

      <div className="container mt-4" ref={refShowProduct}>
        <Filters />
      </div>
      <div className="container mt-4">
        <div className="row">
          {transformProducts().length > 0 ? (
            transformProducts().map((product) => (
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
}
