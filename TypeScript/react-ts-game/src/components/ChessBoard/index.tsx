import { ChessType } from "../../types/enums";
import Chess from "../Chess";
import styles from './index.module.css';

interface ChessBoardProps {
    chesses: Array<ChessType>,
    rows: number,
    cols: number,
    size: number,
    isGameOver: boolean,
    onClick?: (chessIndex: number) => void
}

const ChessBoard: React.FC<ChessBoardProps> = (props) => {
    const { chesses, isGameOver, onClick, rows, cols, size } = props;
    const ChessElements = chesses.map((type, i) => <Chess {...{
        size,
        type,
        onClick: () => {
            if (isGameOver) return;
            onClick?.(i);
        }
    }} key={i}></Chess>);

    return <div className={styles['chess-board']} style={{
        gridTemplateColumns: `repeat(${cols}, ${size}px)`,
        gridTemplateRows: `repeat(${rows}, ${size}px)`
    }}>
        {ChessElements}
    </div>;
};


export default ChessBoard;