import styles from "../styles.module.css";

export default function SideBarHeaderUI({headerTitle}){
    return(
        <div className={styles.titleBarSide}>
            <h3>{headerTitle}</h3>
            <h4>▼</h4>
        </div>
    )
}