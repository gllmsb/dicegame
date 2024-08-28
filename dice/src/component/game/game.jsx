import React, { useState, useEffect } from 'react';
import Player from '../player/player';
import Controls from '../controls/controls';
import Popup from '../popup/popup';

const Game = () => {
    const [player1Score, setPlayer1Score] = useState(0);
    const [aiScore, setAiScore] = useState(0);
    const [player1Dice, setPlayer1Dice] = useState([null, null]);
    const [aiDice, setAiDice] = useState([null, null]);
    const [player1Rolls, setPlayer1Rolls] = useState(0);
    const [aiRolls, setAiRolls] = useState(0);
    const [currentPlayer, setCurrentPlayer] = useState('Player 1');
    const [rolling, setRolling] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false);
    const [gameResult, setGameResult] = useState('');
    const maxRolls = 6;
  
    // Function to handle dice roll
    const rollDice = () => {
      if (gameOver) return; // Prevent rolling if the game is over
  
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
            rollAiDice(); // Roll AI dice after Player 1's roll
          }
        }
      }, 1000); // Simulate dice roll time
    };
  
    // Function to handle AI dice roll
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
  
        // Check if both players have used their rolls
        if (player1Rolls === maxRolls && aiRolls === maxRolls) {
          setGameOver(true);
          determineWinner();
        }
  
        setRolling(false);
      }, 1000); // Simulate dice roll time
    };
  
    // Determine the winner and show the popup
    const determineWinner = () => {
      console.log('Determining winner...');
      let result;
      if (player1Score > aiScore) result = 'Player 1 Wins!';
      else if (aiScore > player1Score) result = 'AI Wins!';
      else result = 'It\'s a Tie!';
  
      setGameResult(result);
      setPopupVisible(true); // Show the popup
      console.log('Popup should now be visible:', popupVisible); // Might not immediately reflect true due to asynchronous state update
    };
  
    // Restart the game
    const restartGame = () => {
      console.log('Restarting game...');
      setPlayer1Score(0);
      setAiScore(0);
      setPlayer1Dice([null, null]);
      setAiDice([null, null]);
      setPlayer1Rolls(0);
      setAiRolls(0);
      setCurrentPlayer('Player 1');
      setRolling(false);
      setGameOver(false);
      setPopupVisible(false); // Hide the popup
      console.log('Popup visibility after restart:', popupVisible);
    };
  
    const gameOver = player1Rolls === maxRolls && aiRolls === maxRolls;
  
    useEffect(() => {
      console.log('gameOver:', gameOver);
      console.log('popupVisible:', popupVisible);
    }, [gameOver, popupVisible]);
  
    return (
      <div className="game">
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
        {!gameOver && (
          <Controls onRollDice={rollDice} currentPlayer={currentPlayer} rolling={rolling} />
        )}
        {popupVisible && (
          <Popup winner={gameResult} onRestart={restartGame} />
        )}
      </div>
    );
  };

export default Game;