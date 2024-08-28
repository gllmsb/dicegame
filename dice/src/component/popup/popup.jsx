import styles from './popup.module.scss';

export const Popup = ({ winner, onRestart }) => {
    return (
        <div className={styles.popup}>
            <div className={styles.popupContent}>
                <h2>Game Over</h2>
                <p>{winner}</p>
                <button onClick={onRestart}>Restart Game</button>
            </div>
        </div>
    );
};