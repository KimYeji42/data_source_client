import styles from "../../../project/components/styles.module.css";

export default function TableTitleUI ({title , subTitle}){
    return(
        <div>
            <div className={styles.tableTitleBox}>
                <h1 className={styles.title}>{title}</h1>
                <h5 className={styles.subTitle}>{subTitle}</h5>
            </div>
            <div style={{width : '30%'}}>
                <hr className={styles.textLine}/>

            </div>
        </div>
    )
}