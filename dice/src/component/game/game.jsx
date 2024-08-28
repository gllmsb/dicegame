import { useEffect, useState } from "react"
import { Player } from "../player/player";
import { Controls } from "../controls/controls";
import { Popup } from "../popup/popup";
import styles from './game.module.scss';

export const Game = () => {
    const [player1Score, setPlayer1Score] = useState(0);
    const [aiScore, setAiScore] = useState(0);
    const [player1Dice, setPlayer1Dice] = useState([null, null]);
    const [aiDice, setAiDice] = useState([null, null]);
    const [player1Rolls, setPlayer1Rolls] = useState(0);
    const [aiRolls, setAiRolls] = useState(0);
    const [currentPlayer, setCurrentPlayer] = useState("Player 1");
    const [rolling, setRolling] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false);
    const [gameResult, setGameResult] = useState('');
    const maxRolls = 6;

    const gameOver = player1Rolls === maxRolls && aiRolls === maxRolls;

    const rollDice = () => {
        if (gameOver) return;

        setRolling(true);
        const rollValue1 = Math.floor(Math.random() * 6) + 1;
        const rollValue2 = Math.floor(Math.random() * 6) + 1;

        setTimeout(() => {
            if (currentPlayer === 'Player 1') {
                if (player1Rolls < maxRolls) {
                    setPlayer1Dice([rollValue1, rollValue2]);
                    setPlayer1Score(prev => prev + rollValue1 + rollValue2);
                    setPlayer1Rolls(prev => prev + 1);
                    setCurrentPlayer('AI');
                    rollAiDice();
                }
            }
        }, 1000);
    };

    const rollAiDice = () => {
        const rollValue1 = Math.floor(Math.random() * 6) + 1;
        const rollValue2 = Math.floor(Math.random() * 6) + 1;

        setTimeout(() => {
            if (aiRolls < maxRolls) {
                setAiDice([rollValue1, rollValue2]);
                setAiScore(prev => prev + rollValue1 + rollValue2);
                setAiRolls(prev => prev + 1);
                setCurrentPlayer('Player 1');
            }

            if (player1Rolls === maxRolls && aiRolls === maxRolls) {
                setGameOver(true);
                determineWinner();
            }

            setRolling(false);
        }, 1000);   
    };

    const determineWinner = () => {
        let result;
        if (player1Score > aiScore) {
            result = 'Player 1 Wins!';
        } else if (aiScore > player1Score) {
            result = 'AI Wins!';
        } else {
            result = "It's a Tie!";
        }
    
        setGameResult(result);
        setPopupVisible(true); 
    };

    const restartGame = () => {
        setPlayer1Score(0);
        setAiScore(0);
        setPlayer1Dice([null, null]);
        setAiDice([null, null]);
        setPlayer1Rolls(0);
        setAiRolls(0);
        setCurrentPlayer('Player 1');
        setRolling(false);
        setPopupVisible(false);
    };

    // useEffect(() => {
    //     console.log('Game Over:', gameOver);
    //     console.log('Popup Visible:', popupVisible);
    
    //     if (gameOver) {
    //         setPopupVisible(true);
    //     }
    // }, [gameOver, popupVisible]);
    useEffect(() => {
        if (gameOver) {
            determineWinner();
        }
    }, [gameOver]);

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

            <div className={styles.controlsContainer}>
                {!gameOver && (
                <Controls onRollDice={rollDice} currentPlayer={currentPlayer} rolling={rolling}/>
                )}
            </div>
            {popupVisible && (
                <Popup winner={gameResult} onRestart={restartGame} />
            )}
        </div>
    );
};