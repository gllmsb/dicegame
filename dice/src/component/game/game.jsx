import React, { useState } from 'react';
import Player from '../player/player';
import Controls from '../controls/controls';
import styles from './game.module.scss';

const Game = () => {
    const [player1Score, setPlayer1Score] = useState(0);
    const [aiScore, setAiScore] = useState(0);
    const [player1Dice, setPlayer1Dice] = useState([null, null]);
    const [aiDice, setAiDice] = useState([null, null]);
    const [player1Rolls, setPlayer1Rolls] = useState(0);
    const [aiRolls, setAiRolls] = useState(0);
    const [currentPlayer, setCurrentPlayer] = useState('Player 1');
    const [rolling, setRolling] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const maxRolls = 6;

    const rollDice = () => {
      setRolling(true);
      const rollValue1 = Math.floor(Math.random() * 6) + 1;
      const rollValue2 = Math.floor(Math.random() * 6) + 1;
  
      setTimeout(() => {
        if (currentPlayer === 'Player 1') {
          if (player1Rolls < maxRolls) {
            setPlayer1Dice([rollValue1, rollValue2]);
            setPlayer1Score(player1Score + rollValue1 + rollValue2);
            setPlayer1Rolls(player1Rolls + 1);
  
            setCurrentPlayer('AI');
            rollAiDice();
          }
        }
      }, 1000);
    };
  
    const rollAiDice = () => {
      setRolling(true);
      const rollValue1 = Math.floor(Math.random() * 6) + 1;
      const rollValue2 = Math.floor(Math.random() * 6) + 1;
  
      setTimeout(() => {
        if (aiRolls < maxRolls) {
          setAiDice([rollValue1, rollValue2]);
          setAiScore(aiScore + rollValue1 + rollValue2);
          setAiRolls(aiRolls + 1);
          setCurrentPlayer('Player 1');
        }
  
        if (player1Rolls === maxRolls && aiRolls === maxRolls) {
          setGameOver(true);
        }
  
        setRolling(false);
      }, 1000);
    };
  
    // Determine the winner
    const winner = () => {
      if (player1Score > aiScore) return 'Player 1 Wins!';
      if (aiScore > player1Score) return 'AI Wins!';
      return 'It\'s a Tie!';
    };
  
    return (
      <div className={styles.game}>
        <Player
          name="Player 1"
          diceValue={player1Dice}
          score={player1Score}
          rolling={rolling && currentPlayer === 'Player 1'}
          rollsLeft={maxRolls - player1Rolls}
        />
        <Player
          name="AI"
          diceValue={aiDice}
          score={aiScore}
          rolling={rolling && currentPlayer === 'AI'}
          rollsLeft={maxRolls - aiRolls}
        />
        {!gameOver ? (
          <Controls onRollDice={rollDice} currentPlayer={currentPlayer} rolling={rolling} />
        ) : (
          <div className={styles.result}>
            <h2>{winner()}</h2>
            <button onClick={() => window.location.reload()}>Play Again</button>
          </div>
        )}
      </div>
    );
  };

export default Game;