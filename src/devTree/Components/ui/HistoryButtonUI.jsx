import styles from "../../styles/styles.module.css";

export default function HistoryButtonUI({title , onClick}){
    return(
        <div className={styles.HistoryBtns}>
            <button className={styles.HistoryBtn} onClick={onClick}>{title}</button>
        </div>
    )
}