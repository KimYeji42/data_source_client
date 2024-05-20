import styles from '../../styleModule/createTableStyle.module.css';

export default function InsertDBNameUI({data}) {
    return(
        <div className={styles.insertBox}>
            <input className={`form-control ${styles.insertDB}`} type="text" placeholder={data} readOnly style={{background: '#E8E8E8'}}/>
        </div>
    )
}