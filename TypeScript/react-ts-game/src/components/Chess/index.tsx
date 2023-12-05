import { ChessType } from "../../types/enums";
import styles from "./index.module.css";

interface ChessProps {
    type: ChessType,
    size: number,
    onClick?: () => void;
}

const Chess: React.FC<ChessProps> = (props) => {
    const { type, size, onClick } = props;

    return <div onClick={() => {
        if (type !== ChessType.NONE) return;
        onClick?.();
    }} className={styles['chess-item']} style={{
        width: size + 'px',
        height: size + 'px'
    }}>
        <div className={`${styles['chess-type']} ${styles[type]}`}></div>
    </div>;
};

export default Chess;