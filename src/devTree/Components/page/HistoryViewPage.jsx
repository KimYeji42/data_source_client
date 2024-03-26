import styles from "../../styles/styles.module.css";
import CommitChartUI from "../ui/CommitChartUI";
import HistoryCanvasLayOut from "../layout/HistoryCanvasLayOut";
import ChangeCommitLayOut from "../layout/ChangeCommitLayOut";

export default function HistoryViewPage(){
    return(
        <>
            <div className={styles.HistoryCanverLayOut}>
                <HistoryCanvasLayOut/>
            </div>

            <div className={styles.HistoryCanverBack} >
                <div className={styles.HistoryCanver}>
                    <CommitChartUI/>
                    <ChangeCommitLayOut/>
                </div>
            </div>
        </>
    )

}