import styles from "../styleModule/mainStyles.module.css";

export default function MainTopButtonUI({buttonName}){
    return(
        <div>
            <button className={styles.mainTopButton}>{buttonName}</button>
        </div>
    )
}