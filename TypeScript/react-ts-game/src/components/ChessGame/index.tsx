import { useCallback, useState } from 'react';
import styles from './index.module.css';
import ChessBoard from '../ChessBoard';
import { ChessGameStatus, ChessType } from '../../types/enums';

interface ChessGameProps { }

const SIZE = 50, ROWS = 3, COLS = 3;
const DefaultChesses = new Array(ROWS * COLS).fill(ChessType.NONE);

const ChessGame: React.FC<ChessGameProps> = (props) => {
    const [isGameOver, setIsGameOver] = useState(false);
    const [gameStatus, setGameStatus] = useState<ChessGameStatus>(ChessGameStatus.RED_PLAY_CHESS);
    const [whoPlayChess, setWhoPlayChess] = useState<ChessType>(ChessType.RED);
    const [chesses, setChesses] = useState<Array<ChessType>>([...DefaultChesses]);

    const handleGameRestart = useCallback(() => {
        setChesses([...DefaultChesses]);
        setGameStatus(ChessGameStatus.RED_PLAY_CHESS);
        setIsGameOver(false);
        setWhoPlayChess(ChessType.RED);
    }, []);

    const handleGameStatus = useCallback(() => {
        // equal
        // red-win
        // black-win

    }, [chesses]);

    const handlePlayChess = useCallback((chessIndex:number) => {
        setChesses((prevState) => {
            prevState[chessIndex] = whoPlayChess;
            return [
                ...prevState
            ];
        });

        const isRedChess = whoPlayChess === ChessType.RED;
        setWhoPlayChess(ChessType[isRedChess?'BLACK':'RED']);
        setGameStatus(ChessGameStatus[`${isRedChess?'BLACK':'RED'}_PLAY_CHESS`]);
    }, [whoPlayChess]);

    return <div className={styles['chess-game']}>
        <h1 className={styles.title}>井字棋游戏</h1>
        <ChessBoard size={SIZE} rows={ROWS} cols={COLS} {...{
            isGameOver, chesses
        }} onClick={handlePlayChess}></ChessBoard>
        <button type="button" onClick={handleGameRestart} className={styles['restart-btn']}>重新开始</button>
    </div>;
};


export default ChessGame;