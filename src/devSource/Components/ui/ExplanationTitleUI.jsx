import styles from '../../styleModule/createTableStyle.module.css';

export default function ExplanationTitleUI({title}) {
    return(
        <div className={styles.explanationBox}>
            {title}
            <div className={styles.add}>
                (선택 사항)
            </div>
        </div>
    )
}