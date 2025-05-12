import Lottie from 'lottie-react';
import crossAnimation from '@assets/animations/cross.json'
import ovalAnimation from '@assets/animations/oval.json'
import type { Player } from '../App';

type CellProps = {
  value: Player;
  onClick: () => void;
  isWinning?: boolean;
  fadeOut?: boolean;
};

const Cell = ({ value, onClick, isWinning, fadeOut }: CellProps) => {
  return (
    <div 
      className={`cell ${isWinning ? 'winning-cell' : ''} ${fadeOut ? 'fade-out' : ''}`} 
      onClick={onClick}
    >
      {value === 'X' && (
        <Lottie
          animationData={crossAnimation}
          loop={false}
          autoplay={true}
          style={{ width: '80%', height: '80%' }}
        />
      )}
      {value === 'O' && (
        <Lottie
          animationData={ovalAnimation}
          loop={false}
          autoplay={true}
          style={{ width: '80%', height: '80%' }}
        />
      )}
    </div>
  );
};

export default Cell;