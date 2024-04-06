import styles from '../../styleModule/createTableStyle.module.css';

export default function InsertDBNameUI({data}) {
    return(
        <div className={styles.insertBox}>
            <input className={styles.insertDB} type="text" placeholder={data} readOnly />
        </div>
    )
}