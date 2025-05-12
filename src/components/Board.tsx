import { useEffect, useState } from 'react';
import Cell from './Cell';
import type { Player } from '../App';

type BoardProps = {
  board: Player[];
  currentPlayer: 'X' | 'O';
  setBoard: React.Dispatch<React.SetStateAction<Player[]>>;
  setCurrentPlayer: React.Dispatch<React.SetStateAction<'X' | 'O'>>;
};

type WinResult = {
  winner: Player | 'DRAW';
  line?: number[];
};

const Board = ({ board, currentPlayer, setBoard, setCurrentPlayer }: BoardProps) => {
  const [winningLine, setWinningLine] = useState<number[]>([]);
  const [isResetting, setIsResetting] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const checkWinner = (board: Player[]): WinResult => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], line: pattern };
      }
    }

    return { 
      winner: board.includes(null) ? null : 'DRAW'
    };
  };

  const resetGame = () => {
    setFadeOut(true);
    setTimeout(() => {
      setBoard(Array(9).fill(null));
      setCurrentPlayer('X');
      setWinningLine([]);
      setFadeOut(false);
      setIsResetting(false);
    }, 1200);
  };

  useEffect(() => {
    const gameResult = checkWinner(board);
    if (gameResult.winner && !isResetting) {
      setIsResetting(true);
      
      if (gameResult.winner === 'DRAW') {
        resetGame();
      } else {
        setWinningLine(gameResult.line || []);
        setTimeout(resetGame, 1500);
      }
    }
  }, [board]);

  const makeComputerMove = () => {
    if (currentPlayer === 'O' && !isResetting) {
      const emptyCells = board
        .map((cell, index) => (cell === null ? index : null))
        .filter((cell) => cell !== null) as number[];

      if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const computerMove = emptyCells[randomIndex];

        setTimeout(() => {
          const newBoard = [...board];
          newBoard[computerMove] = 'O';
          setBoard(newBoard);

          const gameResult = checkWinner(newBoard);
          if (gameResult.winner) {
            setWinningLine(gameResult.line || []);
          } else {
            setCurrentPlayer('X');
          }
        }, 500);
      }
    }
  };

  useEffect(() => {
    makeComputerMove();
  }, [currentPlayer]);

  const handleCellClick = (index: number) => {
    if (board[index] !== null || currentPlayer === 'O' || isResetting) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const gameResult = checkWinner(newBoard);
    if (gameResult.winner) {
      setWinningLine(gameResult.line || []);
    } else {
      setCurrentPlayer('O');
    }
  };

  return (
    <div className="board-container">
      <div className="board">
        {board.map((cell, index) => (
          <Cell
            key={index}
            value={cell}
            onClick={() => handleCellClick(index)}
            isWinning={winningLine.includes(index)}
            fadeOut={fadeOut}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;