import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { AiFillDelete } from 'react-icons/ai';

import Header from '../components/Header';
import Rating from '../components/Rating';
import { numberWithCommas } from '../utils';
import { useGlobalContext } from '../context/GlobalContext';

export default function Cart() {
  const [total, setTotal] = useState(0);
  const {
    state: { cart },
    cartDispatch,
  } = useGlobalContext();

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty!, 0)
    );
  }, [cart]);
  return (
    <>
      <Head>
        <title>Cart | Shopping Cart</title>
      </Head>
      <Header />
      <div className="container mt-4">
        <h2>Your Cart</h2>
        <div className="mt-3 row">
          <div className="mb-2 col-md-9 col-12">
            <div className="table-responsive">
              <table className="table align-middle">
                <thead className="table-secondary">
                  <tr className="head-table">
                    <td>Product</td>
                    <td>Price</td>
                    <td>Rating</td>
                    <td>Quantity</td> <td></td>
                  </tr>
                </thead>
                <tbody>
                  {cart.length > 0 ? (
                    cart.map((product) => (
                      <tr key={product.id}>
                        <td className="d-flex align-items-center">
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={50}
                            height={50}
                          />
                          <span className="ms-2">{product.name}</span>
                        </td>
                        <td>Rp. {numberWithCommas(product.price) || 0}</td>
                        <td>
                          <Rating rating={product.ratings} />
                        </td>
                        <td>
                          <select
                            className="form-select"
                            style={{ width: 120, cursor: 'pointer' }}
                            value={product.qty}
                            onChange={(e) =>
                              cartDispatch({
                                type: 'CHANGE_CART_QTY',
                                payload: {
                                  id: product.id,
                                  qty: e.target.value,
                                },
                              })
                            }
                          >
                            {[...Array(product.inStock).keys()].map((x) => (
                              <option key={x + 1}>{x + 1}</option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <AiFillDelete
                            fontSize={20}
                            style={{ cursor: 'pointer' }}
                            className="text-danger"
                            onClick={() =>
                              cartDispatch({
                                type: 'REMOVE_FROM_CART',
                                payload: product,
                              })
                            }
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <p>Cart kosong</p>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-3 col-12">
            <div className="card card-order">
              <div
                className="text-center card-header"
                style={{ backgroundColor: '#e2e3e5' }}
              >
                ORDER SUMMARY
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  Subtotal ({cart.length}) items
                </li>
                <li className="list-group-item">
                  Total: Rp. {numberWithCommas(total)}
                </li>
              </ul>
              <div className="card-body">
                <button className="btn btn-primary w-100">
                  Proceed to checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
