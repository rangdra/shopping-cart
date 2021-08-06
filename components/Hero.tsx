import Image from 'next/image';
import { FC } from 'react';
import { IRefProps } from '../types';

const Hero: FC<IRefProps> = ({ refShowProduct }) => {
  const showProduct = () => {
    if (refShowProduct) {
      window.scrollTo({
        top: refShowProduct.current!.offsetTop - 70,
        behavior: 'smooth',
      });
    }
  };
  return (
    <div className="position-relative img-hero" style={{ height: 300 }}>
      <Image
        src="/images/bg.jpg"
        alt="backgrund"
        layout="fill"
        objectFit="cover"
      />
      <div className="text-center position-absolute d-flex justify-content-center align-items-center w-100 h-100 flex-column">
        <h1
          className="text-light fw-bold text-uppercase"
          style={{ fontSize: 36 }}
        >
          Shopping cart
        </h1>
        <button className="mt-1 btn btn-secondary" onClick={showProduct}>
          Get a Product
        </button>
      </div>
    </div>
  );
};

export default Hero;
