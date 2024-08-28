import React from 'react';
import styles from './popup.module.scss';

const Popup = ({ winner, onRestart }) => {
    console.log('Popup Component Rendered. Winner:', winner);
    return (
      <div className={styles.popup}>
        <div className={styles.popupContent}>
          <h2>{winner}</h2>
          <button onClick={onRestart}>Restart</button>
        </div>
      </div>
    );
  }

export default Popup;