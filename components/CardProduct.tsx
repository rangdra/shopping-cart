import Image from 'next/image';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useGlobalContext } from '../context/GlobalContext';
import { Product } from '../types';
import { numberWithCommas } from '../utils';
import Rating from './Rating';

interface IProps {
  product: Product;
}

const CardProduct = ({ product }: IProps) => {
  const {
    cartDispatch,
    state: { cart, wishlist },
  } = useGlobalContext();
  return (
    <div className="shadow card">
      <div className="position-relative card-img-top" style={{ height: 200 }}>
        <Image
          src={product.image}
          alt="backgrund"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <h6 className="mb-2 card-subtitle text-muted">
          Rp. {numberWithCommas(product.price)}
        </h6>
        <p className="card-text" style={{ marginBottom: 0 }}>
          {product.fastDelivery ? 'Same Day (6-8 jam)' : 'Regular (2-3 hari)'}
        </p>
        <Rating rating={product.ratings} />
        {cart.some((p) => p.id === product.id) ? (
          <button
            className="mt-2 text-center w-100 d-block btn btn-danger"
            onClick={() =>
              cartDispatch({ type: 'REMOVE_FROM_CART', payload: product })
            }
          >
            Remove from cart
          </button>
        ) : (
          <button
            className="mt-2 text-center w-100 d-block btn btn-primary"
            disabled={!product.inStock}
            onClick={() =>
              cartDispatch({ type: 'ADD_TO_CART', payload: product })
            }
          >
            {!product.inStock ? 'Out of Stock' : 'Add to Cart'}
          </button>
        )}
        {wishlist.some((p) => p.id === product.id) ? (
          <button
            className="mt-2 text-center w-100 d-block btn btn-danger"
            onClick={() =>
              cartDispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product })
            }
          >
            <AiFillHeart fontSize={20} /> Remove from wishlist
          </button>
        ) : (
          <button
            className="mt-2 text-center w-100 d-block btn btn-danger"
            // disabled={!product.inStock}
            onClick={() =>
              cartDispatch({ type: 'ADD_TO_WISHLIST', payload: product })
            }
          >
            <AiOutlineHeart fontSize={20} /> Add to wishlist
          </button>
        )}
      </div>
    </div>
  );
};

export default CardProduct;
