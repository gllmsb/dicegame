import styles from './dice.module.scss';

export const Dice = ({value}) => {
    
    return(
        <div className={styles.dice}>
            {value !== null ? value : '-'}
        </div>
    )
}