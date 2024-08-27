import React from 'react';
import styles from './dice.module.scss';

// const Player = ({ name, diceValue, score, rolling }) => {
//     return (
//       <div className="player">
//         <h2>{name}</h2>
//         <div className="dice-container">
//           <Dice value={diceValue[0]} rolling={rolling} />
//           <Dice value={diceValue[1]} rolling={rolling} />
//         </div>
//         <p>Score: {score}</p>
//       </div>
//     );
//   };
const Dice = ({ value, rolling }) => {
    return (
      <div className={`${styles.dice} ${rolling ? styles.rolling : ''}`}>
        <div className={`${styles[`face-${value}`]}`}></div>
      </div>
    );
  };

export default Dice;