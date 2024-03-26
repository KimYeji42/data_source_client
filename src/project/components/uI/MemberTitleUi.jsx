import styles from '../memberManagementStyle.module.css';


export default function MemberTitleUi({text}){
    return(
        <div className={styles.memberTitle}>
            <h1 className={styles.title}>
                {text}
            </h1>
        </div>
    )
}