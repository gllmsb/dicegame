import React from 'react';

const Controls = ({ onRollDice, currentPlayer, rolling }) => {
  return (
    <div className="controls">
      <h3>{currentPlayer}'s Turn</h3>
      <button onClick={onRollDice} disabled={rolling}>
        Roll Dice
      </button>
    </div>
  );
};

export default Controls;