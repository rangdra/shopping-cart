import { CSSProperties } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

interface IProps {
  rating: number;
  onClick?: any;
  style?: CSSProperties;
}
const Rating = ({ rating, onClick, style }: IProps) => {
  return (
    <div>
      {[...Array(5)].map((_, idx) => (
        <span key={idx} onClick={() => onClick(idx)} style={style}>
          {rating > idx ? (
            <AiFillStar fontSize={15} />
          ) : (
            <AiOutlineStar fontSize={15} />
          )}
        </span>
      ))}
    </div>
  );
};

export default Rating;
