import styles from "../../styleModule/styles.module.css";
import ERDSidebarLayout from "../layout/ERDiagramLayout";

export default function ERDPage(){
    return(
        <div>
            <div className={styles.erdTopBar}></div>
            <ERDSidebarLayout/>
        </div>
    )
}