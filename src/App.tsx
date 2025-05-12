import { useState } from 'react';
import Board from './components/Board';
import './styles.css';

export type Player = 'X' | 'O' | null;

function App() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');

  return (
    <div className="app">
      <h1>Tic-tac-toe</h1>
      <Board
        board={board}
        currentPlayer={currentPlayer}
        setBoard={setBoard}
        setCurrentPlayer={setCurrentPlayer}
      />
    </div>
  );
}

export default App;