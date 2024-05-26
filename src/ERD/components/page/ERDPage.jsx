import styles from "../../styleModule/styles.module.css";
import ERDiagramLayout from "../layout/ERDiagramLayout";

export default function ERDPage(){
    return(
        <div>
            <div className={styles.erdTopBar}></div>
            <ERDiagramLayout />
        </div>
    )
}