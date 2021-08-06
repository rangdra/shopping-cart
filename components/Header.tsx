import Link from 'next/link';
import Image from 'next/image';
import { FaShoppingCart, FaShoppingBag } from 'react-icons/fa';
import { AiFillDelete, AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import { FC } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import Hero from './Hero';
import { useRouter } from 'next/dist/client/router';
import { IRefProps } from '../types';

const Header: FC<IRefProps> = ({ refShowProduct }) => {
  const {
    state: { cart, wishlist },
    cartDispatch,
  } = useGlobalContext();
  const router = useRouter();
  return (
    <>
      <nav
        className="shadow navbar navbar-light sticky-top"
        style={{ backgroundColor: '#fff' }}
      >
        <div className="container">
          <Link href="/">
            <a className="navbar-brand d-flex align-items-center">
              <Image src="/images/logo.png" alt="logo" width={36} height={36} />
              <span className="ms-2 fw-bold text-uppercase">Shopping Cart</span>
            </a>
          </Link>

          <div className="dropdown">
            <Link href="/wishlist">
              <a className="btn btn-danger me-2" title="My Wishlist">
                {wishlist.length === 0 ? (
                  <AiOutlineHeart fontSize={20} className="me-2" />
                ) : (
                  <AiFillHeart fontSize={20} className="me-2" />
                )}
                {wishlist.length}
              </a>
            </Link>
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <FaShoppingCart fontSize={20} className="me-2" /> {cart.length}
            </button>

            <ul
              className="dropdown-menu dropdown-menu-sm-end"
              aria-labelledby="dropdownMenuButton1"
              style={{ width: 300 }}
            >
              {cart.length > 0 ? (
                cart.map((product) => (
                  <li
                    onClick={() => router.push('/cart')}
                    key={product.id}
                    style={{ cursor: 'pointer' }}
                    className="dropdown-item d-flex align-items-center justify-content-between "
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      height={50}
                      width={50}
                      objectFit="cover"
                    />
                    <div style={{ flex: 1 }} className="ms-3">
                      <h5>{product.name}</h5>
                      <h6 className="text-muted">Rp. {product.price}</h6>
                    </div>
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
                  </li>
                ))
              ) : (
                <li className="dropdown-item">
                  <p>Tidak ada product</p>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      {router.pathname === '/' && <Hero refShowProduct={refShowProduct} />}
    </>
  );
};

export default Header;
