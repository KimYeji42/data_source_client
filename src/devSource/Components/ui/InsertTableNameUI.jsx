import styles from '../../styleModule/createTableStyle.module.css';

export default function InsertTableNameUI({setTableName}){
    return(
        <div className={styles.insertBox}>
                <input
                    className={`form-control ${styles.insertTable}`}
                    type="text"
                    onChange={(e) => setTableName(e.target.value)} // 입력 값이 변경될 때마다 setTableName 함수를 호출하여 값을 업데이트합니다.
                    placeholder=""
                />
        </div>
    )
}