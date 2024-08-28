import styles from './controls.module.scss';

export const Controls = ({ onRollDice, currentPlayer, rolling}) => {

    return(
        <div className={styles.controls}>
            <p>{currentPlayer}'s Turn</p>
            <button onClick={onRollDice} disabled={rolling}>
                {rolling ? 'Rolling...' : 'Roll Dice'}
            </button>
        </div>
    )
}