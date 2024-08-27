import React from 'react';
import Dice from '../dice/dice';
import styles from './player.module.scss';

const Player = ({ name, diceValue, score, rolling, rollsLeft }) => {
    return (
      <div className={styles.player}>
        <h2>{name}</h2>
        <div className={styles.diceContainer}>
          <Dice value={diceValue[0]} rolling={rolling} />
          <Dice value={diceValue[1]} rolling={rolling} />
        </div>
        <p>Score: {score}</p>
        <p>Rolls Left: {rollsLeft}</p>
      </div>
    );
  };

export default Player;