import { Dice } from '../dice/dice';
import styles from './player.module.scss';


export const Player = ({name, diceValue, score, rollsLeft}) => {
    
    return(
        <div className={styles.player}>
            <h2>{name}</h2>
            <div className={styles.diceContainer}>
                <Dice value={diceValue[0]}/>
                <Dice value={diceValue[1]}/>
            </div>
            <p>Score: {score}</p>
            <p>Rolls Left: {rollsLeft}</p>
        </div>
    )
}